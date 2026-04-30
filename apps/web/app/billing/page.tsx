import {
  activatePlanManually,
  ensureSubscription,
  requestPlanUpgrade
} from "../../actions/billing";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

const plans = [
  {
    name: "free",
    label: "Free",
    price: "₹0",
    desc: "Try Hoolder without burning platform cost.",
    features: ["25 tasks/month", "3 agents", "1 swarm", "15% dataset fee"]
  },
  {
    name: "starter",
    label: "Starter",
    price: "₹999/mo",
    desc: "For solo founders and early users.",
    features: ["300 tasks/month", "10 agents", "5 swarms", "12% dataset fee"]
  },
  {
    name: "growth",
    label: "Growth",
    price: "₹2,999/mo",
    desc: "For startups using agents daily.",
    features: ["1,500 tasks/month", "30 agents", "20 swarms", "10% dataset fee"]
  },
  {
    name: "pro",
    label: "Pro",
    price: "₹9,999/mo",
    desc: "For serious AI operations.",
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

  const { data: providers } = await supabase
    .from("payment_providers")
    .select("*")
    .order("country_code", { ascending: true });

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Billing</div>
          <h1>Global billing, local payment providers.</h1>
          <p>
            Hoolder can route Indian users to Razorpay, US/EU users to Stripe,
            Brazil users to Mercado Pago, African users to Paystack, and global
            users to Paddle or Lemon Squeezy.
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

            <form action={requestPlanUpgrade} className="grid" style={{ marginTop: 16 }}>
              <input type="hidden" name="plan_name" value={plan.name} />

              <select className="select" name="country_code" defaultValue="IN">
                <option value="IN">India — Razorpay/Cashfree</option>
                <option value="US">United States — Stripe</option>
                <option value="GB">United Kingdom — Stripe</option>
                <option value="BR">Brazil — Mercado Pago</option>
                <option value="NG">Nigeria — Paystack</option>
                <option value="GLOBAL">Global — Paddle</option>
              </select>

              <button className="button" type="submit">
                Request upgrade
              </button>
            </form>

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
          <h2>Supported Providers</h2>
          {(providers || []).map((provider) => (
            <p key={provider.id}>
              {provider.country_code}: {provider.provider_name}
            </p>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Billing Events</h2>

        {(events || []).map((event) => (
          <div key={event.id} style={{ borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12 }}>
            <p>Event: {event.event_type}</p>
            <p>Provider: {event.provider_name || "manual"}</p>
            <p>Amount: ₹{Number(event.amount_inr || 0).toFixed(0)}</p>
          </div>
        ))}

        {!events?.length ? (
          <p>No billing events yet.</p>
        ) : null}
      </div>
    </div>
  );
}
