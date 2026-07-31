(function () {
  // Public app configuration only. Do not place service-role keys, Stripe secret
  // keys, webhook secrets, or private content in this file.
  window.CERTIVO_CONFIG = {
    version: "6.7",
    assetVersion: "6.7-no-repeat-sets",
    supabaseUrl: "https://ulvvofbakrlpcevunbyi.supabase.co",
    supabasePublishableKey: "sb_publishable_R1dz6grndk0MOu0I-IVWOA_KbGkq8Lb",
    freeFlashcardLimit: 10,
    plans: {
      weekly: {
        priceId: "price_1TtfWp0TcCPzwDfBL5E60kgn",
        label: "Weekly Access"
      },
      ninety: {
        priceId: "price_1TtfYz0TcCPzwDfBjIKv18nv",
        label: "90-Day Access"
      }
    }
  };
})();
