import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

function getStripePriceId(plan: string) {
  if (plan === "starter") return process.env.STRIPE_STARTER_PRICE_ID;
  if (plan === "growth") return process.env.STRIPE_GROWTH_PRICE_ID;
  if (plan === "pro") return process.env.STRIPE_PRO_PRICE_ID;
  return process.env.STRIPE_STARTER_PRICE_ID;
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const plan = request.nextUrl.searchParams.get("plan") || "starter";
  const country = request.nextUrl.searchParams.get("country") || "US";
  const priceId = getStripePriceId(plan);

  if (!secretKey || !priceId) {
    return NextResponse.redirect(new URL("/billing?error=missing_stripe_keys", request.url));
  }

  const stripe = new Stripe(secretKey);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email || undefined,
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    success_url: `${appUrl}/billing?payment=stripe_success`,
    cancel_url: `${appUrl}/billing?payment=stripe_cancelled`,
    metadata: {
      user_id: user.id,
      plan_name: plan,
      country_code: country
    },
    subscription_data: {
      metadata: {
        user_id: user.id,
        plan_name: plan,
        country_code: country
      }
    }
  });

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  await supabase.from("billing_events").insert({
    user_id: user.id,
    subscription_id: subscription?.id || null,
    event_type: "checkout_created",
    provider_name: "stripe",
    amount_inr: 0,
    checkout_url: session.url,
    external_id: session.id,
    status: "created",
    metadata: {
      plan_name: plan,
      session_id: session.id
    }
  });

  return NextResponse.redirect(session.url || `${appUrl}/billing`);
}
