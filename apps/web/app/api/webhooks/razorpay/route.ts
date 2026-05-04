import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

function verifySignature(body: string, signature: string, secret: string) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expected === signature;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "missing webhook secret" }, { status: 500 });
  }

  if (!verifySignature(body, signature, secret)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);
  const supabase = await createClient();

  const payload = event.payload?.payment_link?.entity || event.payload?.payment?.entity;
  const payment = event.payload?.payment?.entity;

  const paymentLinkId = payload?.id || payment?.notes?.payment_link_id;
  const planName = payload?.notes?.plan_name || payment?.notes?.plan_name || "starter";
  const userId = payload?.notes?.user_id || payment?.notes?.user_id;
  const paymentId = payment?.id || null;

  if (event.event === "payment_link.paid" && userId) {
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
          provider_name: "razorpay",
          last_payment_id: paymentId,
          external_checkout_id: paymentLinkId,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq("id", subscription.id);
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
      provider_name: "razorpay",
      external_id: paymentLinkId,
      status: "paid",
      metadata: event
    });
  }

  return NextResponse.json({ received: true });
}
