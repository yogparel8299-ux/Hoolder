import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

const prices: Record<string, number> = {
  starter: 999,
  growth: 2999,
  pro: 9999
};

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const plan = request.nextUrl.searchParams.get("plan") || "starter";
  const amountInr = prices[plan] || 999;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  if (!keyId || !keySecret) {
    return NextResponse.redirect(new URL("/billing?error=missing_razorpay_keys", request.url));
  }

  const razorpay = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });

  const paymentLink = await razorpay.paymentLink.create({
    amount: amountInr * 100,
    currency: "INR",
    accept_partial: false,
    description: `Hoolder ${plan} plan`,
    customer: {
      email: user.email || undefined
    },
    notify: {
      sms: false,
      email: true
    },
    reminder_enable: true,
    callback_url: `${appUrl}/billing?payment=razorpay_success`,
    callback_method: "get",
    notes: {
      user_id: user.id,
      plan_name: plan
    }
  });

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: sub } = subscription
    ? { data: subscription }
    : await supabase
        .from("subscriptions")
        .insert({
          user_id: user.id,
          plan_name: "free",
          status: "active",
          provider_name: "razorpay",
          country_code: "IN"
        })
        .select()
        .single();

  await supabase.from("billing_events").insert({
    user_id: user.id,
    subscription_id: sub?.id || null,
    event_type: "checkout_created",
    provider_name: "razorpay",
    amount_inr: amountInr,
    checkout_url: paymentLink.short_url,
    external_id: paymentLink.id,
    status: "created",
    metadata: {
      plan_name: plan,
      payment_link_id: paymentLink.id
    }
  });

  return NextResponse.redirect(paymentLink.short_url);
}
