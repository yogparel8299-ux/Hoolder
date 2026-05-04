"use server";

import { redirect } from "next/navigation";
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

  return "stripe";
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

export async function startCheckout(formData: FormData) {
  const plan_name = String(formData.get("plan_name") || "starter");
  const country_code = String(formData.get("country_code") || "IN").toUpperCase();
  const provider = pickProvider(country_code);

  if (provider === "razorpay") {
    redirect(`/api/checkout/razorpay?plan=${plan_name}&country=${country_code}`);
  }

  redirect(`/api/checkout/stripe?plan=${plan_name}&country=${country_code}`);
}

export async function activatePlanManually(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const plan_name = String(formData.get("plan_name") || "free");

  const subscription = await ensureSubscription();

  await supabase
    .from("subscriptions")
    .update({
      plan_name,
      status: "active",
      provider_name: "manual",
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })
    .eq("id", subscription.id);

  await supabase.from("user_plans").upsert(
    {
      user_id: user.id,
      plan_name,
      status: "active",
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    { onConflict: "user_id" }
  );

  await supabase.from("billing_events").insert({
    user_id: user.id,
    subscription_id: subscription.id,
    event_type: "manual_plan_activation",
    provider_name: "manual",
    amount_inr: planPrices[plan_name] || 0,
    status: "paid",
    metadata: { plan_name }
  });
}
