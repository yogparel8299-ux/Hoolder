import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function POST(request: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    return NextResponse.json({ error: "missing stripe env" }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const planName = session.metadata?.plan_name || "starter";
    const countryCode = session.metadata?.country_code || "US";

    if (userId) {
      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (subscription) {
        await supabase
          .from("subscriptions")
          .update({
            plan_name: planName,
            status: "active",
            provider_name: "stripe",
            country_code: countryCode,
            provider_customer_id: String(session.customer || ""),
            provider_subscription_id: String(session.subscription || ""),
            external_checkout_id: session.id,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          })
          .eq("id", subscription.id);
      } else {
        await supabase.from("subscriptions").insert({
          user_id: userId,
          plan_name: planName,
          status: "active",
          provider_name: "stripe",
          country_code: countryCode,
          provider_customer_id: String(session.customer || ""),
          provider_subscription_id: String(session.subscription || ""),
          external_checkout_id: session.id
        });
      }

      await supabase.from("user_plans").upsert(
        {
          user_id: userId,
          plan_name: planName,
          status: "active",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        { onConflict: "user_id" }
      );

      await supabase.from("billing_events").insert({
        user_id: userId,
        subscription_id: subscription?.id || null,
        event_type: "payment_success",
        provider_name: "stripe",
        external_id: session.id,
        status: "paid",
        metadata: session as any
      });
    }
  }

  return NextResponse.json({ received: true });
}
