import { activatePlanManually, ensureSubscription, startCheckout } from "../../actions/billing";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

const plans = [
  {
    name: "free",
    label: "Free",
    price: "₹0",
    desc: "Try Hoolder with hard limits.",
    features: ["25 tasks/month", "3 agents", "1 swarm", "15% dataset fee"]
  },
  {
    name: "starter",
    label: "Starter",
    price: "₹999/mo",
    desc: "Best for solo founders.",
    features: ["300 tasks/month", "10 agents", "5 swarms", "12% dataset fee"]
  },
  {
    name: "growth",
    label: "Growth",
    price: "₹2,999/mo",
    desc: "Best for startups.",
    features: ["1,500 tasks/month", "30 agents", "20 swarms", "10% dataset fee"]
  },
  {
    name: "pro",
    label: "Pro",
    price: "₹9,999/mo",
    desc: "Best for heavy users and BYOK.",
    features: ["10,000 tasks/month", "100 agents", "BYOK", "5% dataset fee"]
  }
];

export default async function BillingPage() {
  const user = await requireUser();
  await ensureSubscription();

  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: events } = await supabase
    .from("billing_events")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Billing</div>
          <h1>Upgrade with local or global checkout.</h1>
          <p>
            India routes to Razorpay. US/EU/global routes to Stripe. Your plan activates after webhook payment confirmation.
          </p>
        </div>

        <span className="badge">
          Current: {(subscription?.plan_name || "free").toUpperCase()}
        </span>
      </div>

      <div className="grid grid-4">
        {plans.map((plan) => (
          <div key={plan.name} className="card">
            <span className="badge">{plan.label}</span>
            <h1 style={{ marginTop: 16 }}>{plan.price}</h1>
            <p>{plan.desc}</p>

            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            {plan.name !== "free" ? (
              <form action={startCheckout} className="grid" style={{ marginTop: 16 }}>
                <input type="hidden" name="plan_name" value={plan.name} />

                <select className="select" name="country_code" defaultValue="IN">
                  <option value="IN">India — Razorpay</option>
                  <option value="US">United States — Stripe</option>
                  <option value="GB">United Kingdom — Stripe</option>
                  <option value="GLOBAL">Global — Stripe</option>
                </select>

                <button className="button" type="submit">
                  Checkout
                </button>
              </form>
            ) : null}

            <form action={activatePlanManually} style={{ marginTop: 10 }}>
              <input type="hidden" name="plan_name" value={plan.name} />
              <button className="button" type="submit">
                Demo activate
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Current Subscription</h2>
          <p>Plan: {subscription?.plan_name || "free"}</p>
          <p>Status: {subscription?.status || "active"}</p>
          <p>Provider: {subscription?.provider_name || "manual"}</p>
          <p>Country: {subscription?.country_code || "IN"}</p>
        </div>

        <div className="card">
          <h2>Setup required</h2>
          <p>Razorpay needs KEY_ID, KEY_SECRET, WEBHOOK_SECRET.</p>
          <p>Stripe needs SECRET_KEY, WEBHOOK_SECRET and plan price IDs.</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Billing Events</h2>

        {(events || []).map((event) => (
          <div key={event.id} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12 }}>
            <p>Event: {event.event_type}</p>
            <p>Provider: {event.provider_name || "manual"}</p>
            <p>Status: {event.status || "created"}</p>
            {event.checkout_url ? <p>Checkout: {event.checkout_url}</p> : null}
          </div>
        ))}

        {!events?.length ? <p>No billing events yet.</p> : null}
      </div>
    </div>
  );
}
