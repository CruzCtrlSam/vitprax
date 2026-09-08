const SUPABASE_URL = "https://ulvvofbakrlpcevunbyi.supabase.co";
const APP_URL = "https://cruzctrlsam.github.io/certivo-practice/";

const PRICE_IDS = {
  weekly: "price_1TtfWp0TcCPzwDfBL5E60kgn",
  ninety: "price_1TtfYz0TcCPzwDfBjIKv18nv",
} as const;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
  const serviceRoleKey = Deno.env.get("SERVICE_ROLE_KEY");
  if (!stripeSecretKey || !serviceRoleKey) {
    return json({ error: "Missing server secrets" }, 500);
  }

  const authHeader = req.headers.get("Authorization") || "";
  const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      Authorization: authHeader,
      apikey: serviceRoleKey,
    },
  });

  if (!userResponse.ok) return json({ error: "Please log in first" }, 401);
  const user = await userResponse.json();

  const body = await req.json().catch(() => ({}));
  const plan = body.plan === "ninety" ? "ninety" : "weekly";
  const price = PRICE_IDS[plan];
  const mode = plan === "weekly" ? "subscription" : "payment";

  const params = new URLSearchParams();
  params.set("mode", mode);
  params.set("line_items[0][price]", price);
  params.set("line_items[0][quantity]", "1");
  params.set("client_reference_id", user.id);
  params.set("customer_email", user.email);
  params.set("success_url", `${APP_URL}?checkout=success`);
  params.set("cancel_url", `${APP_URL}?checkout=cancelled`);
  params.set("metadata[user_id]", user.id);
  params.set("metadata[plan]", plan);

  if (mode === "subscription") {
    params.set("subscription_data[metadata][user_id]", user.id);
    params.set("subscription_data[metadata][plan]", plan);
  } else {
    params.set("payment_intent_data[metadata][user_id]", user.id);
    params.set("payment_intent_data[metadata][plan]", plan);
  }

  const checkoutResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const checkout = await checkoutResponse.json();
  if (!checkoutResponse.ok) return json({ error: checkout.error?.message || "Stripe checkout failed" }, 400);

  return json({ url: checkout.url });
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
