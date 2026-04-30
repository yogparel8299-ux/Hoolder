"use server";

import { createClient } from "../lib/supabase/server";

const planPrices: Record<string, number> = {
  free: 0,
  starter: 999,
  growth: 2999,
  pro: 9999,
  enterprise: 0
};

function pickProvider(countryCode: string) {
  const code = countryCode.toUpperCase();

  if (code === "IN") return "razorpay";
  if (["US", "GB", "CA", "AU"].includes(code)) return "stripe";
  if (["DE", "FR", "IT", "ES", "NL"].includes(code)) return "stripe";
  if (code === "BR") return "mercado_pago";
  if (["NG", "ZA", "GH", "KE"].includes(code)) return "paystack";

  return "paddle";
}

export async function ensureSubscription() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: existing } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existing) return existing;

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: user.id,
      plan_name: "free",
      status: "active",
      country_code: "IN",
      provider_name: "manual"
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function requestPlanUpgrade(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const plan_name = String(formData.get("plan_name") || "starter");
  const country_code = String(formData.get("country_code") || "IN").toUpperCase();

  const provider_name = pickProvider(country_code);
  const amount_inr = planPrices[plan_name] || 0;

  const subscription = await ensureSubscription();

  await supabase.from("billing_events").insert({
    user_id: user.id,
    subscription_id: subscription.id,
    event_type: "upgrade_requested",
    provider_name,
    amount_inr,
    metadata: {
      plan_name,
      country_code,
      message:
        "Checkout integration placeholder. Connect Razorpay/Stripe/Paddle webhook later."
    }
  });

  return {
    plan_name,
    provider_name,
    amount_inr,
    message: `Upgrade request created. Payment provider: ${provider_name}`
  };
}

export async function activatePlanManually(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const plan_name = String(formData.get("plan_name") || "free");

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!subscription) {
    await supabase.from("subscriptions").insert({
      user_id: user.id,
      plan_name,
      status: "active",
      provider_name: "manual",
      country_code: "IN"
    });
  } else {
    await supabase
      .from("subscriptions")
      .update({
        plan_name,
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString()
      })
      .eq("id", subscription.id);
  }

  await supabase
    .from("user_plans")
    .upsert({
      user_id: user.id,
      plan_name,
      status: "active",
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString()
    }, {
      onConflict: "user_id"
    });

  await supabase.from("billing_events").insert({
    user_id: user.id,
    subscription_id: subscription?.id || null,
    event_type: "manual_plan_activation",
    provider_name: "manual",
    amount_inr: planPrices[plan_name] || 0,
    metadata: { plan_name }
  });
}
