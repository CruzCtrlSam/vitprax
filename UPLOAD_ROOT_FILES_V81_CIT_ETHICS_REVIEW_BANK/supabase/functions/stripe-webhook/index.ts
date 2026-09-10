const SUPABASE_URL = "https://ulvvofbakrlpcevunbyi.supabase.co";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "stripe-signature, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
  if (!webhookSecret || !serviceRoleKey) return json({ error: "Missing server secrets" }, 500);

  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") || "";
  const verified = await verifyStripeSignature(payload, signature, webhookSecret);
  if (!verified) return json({ error: "Invalid Stripe signature" }, 400);

  const event = JSON.parse(payload);

  if (event.type === "checkout.session.completed") {
    await handleCheckoutCompleted(event.data.object, serviceRoleKey);
  }

  if (event.type === "customer.subscription.deleted") {
    await updateBySubscription(event.data.object.id, {
      status: "inactive",
      updated_at: new Date().toISOString(),
    }, serviceRoleKey);
  }

  return json({ received: true });
});

async function handleCheckoutCompleted(session: Record<string, any>, serviceRoleKey: string) {
  const userId = session.client_reference_id || session.metadata?.user_id;
  const plan = session.metadata?.plan === "ninety" ? "ninety" : "weekly";
  if (!userId) throw new Error("Missing user id");

  const row: Record<string, unknown> = {
    user_id: userId,
    stripe_customer_id: session.customer,
    stripe_subscription_id: session.subscription || null,
    plan,
    status: "active",
    access_until: plan === "ninety" ? daysFromNow(90) : null,
    updated_at: new Date().toISOString(),
  };

  await upsertAccess(row, serviceRoleKey);
}

async function upsertAccess(row: Record<string, unknown>, serviceRoleKey: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/certivo_access`, {
    method: "POST",
    headers: restHeaders(serviceRoleKey, "resolution=merge-duplicates"),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

async function updateBySubscription(subscriptionId: string, row: Record<string, unknown>, serviceRoleKey: string) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/certivo_access?stripe_subscription_id=eq.${subscriptionId}`, {
    method: "PATCH",
    headers: restHeaders(serviceRoleKey),
    body: JSON.stringify(row),
  });
  if (!response.ok) throw new Error(await response.text());
}

function restHeaders(serviceRoleKey: string, prefer = "return=minimal") {
  return {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
    Prefer: prefer,
  };
}

function daysFromNow(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

async function verifyStripeSignature(payload: string, header: string, secret: string) {
  const parts = header.split(",").map((part) => part.split("="));
  const timestamp = parts.find(([key]) => key === "t")?.[1];
  const signatures = parts.filter(([key]) => key === "v1").map(([, value]) => value);
  if (!timestamp || !signatures.length) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signedPayload = encoder.encode(`${timestamp}.${payload}`);
  const digest = await crypto.subtle.sign("HMAC", key, signedPayload);
  const expected = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");

  return signatures.some((signature) => timingSafeEqual(signature, expected));
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
