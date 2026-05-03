import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    badge: "Best for trying",
    desc: "A generous trial that hooks users without burning your AI budget.",
    features: [
      "1 company",
      "3 agents",
      "1 swarm",
      "25 tasks/month",
      "Dataset listing allowed",
      "15% marketplace fee",
      "No memory",
      "No BYOK"
    ],
    cta: "Start free",
    href: "/signup"
  },
  {
    name: "Starter",
    price: "₹999/mo",
    badge: "Most founders start here",
    desc: "For solo founders who want real daily AI execution.",
    features: [
      "1 company",
      "10 agents",
      "5 swarms",
      "300 tasks/month",
      "Task output history",
      "Basic schedules",
      "12% marketplace fee",
      "Standard support"
    ],
    cta: "Upgrade Starter",
    href: "/billing",
    highlight: true
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    badge: "For growing teams",
    desc: "For startups using agents, swarms and datasets every day.",
    features: [
      "3 companies",
      "30 agents",
      "20 swarms",
      "1,500 tasks/month",
      "Memory system",
      "Team workspace",
      "10% marketplace fee",
      "Analytics"
    ],
    cta: "Upgrade Growth",
    href: "/billing"
  },
  {
    name: "Pro",
    price: "₹9,999/mo",
    badge: "Lowest AI cost risk",
    desc: "For serious operators. BYOK protects Hoolder from heavy AI spend.",
    features: [
      "10 companies",
      "100 agents",
      "100 swarms",
      "10,000 tasks/month",
      "BYOK support",
      "Audit logs",
      "5% marketplace fee",
      "Priority queue"
    ],
    cta: "Upgrade Pro",
    href: "/billing"
  }
];

export default function PricingPage() {
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Pricing</div>
          <h1>Start free. Pay only when your AI team starts creating value.</h1>
          <p>
            Hoolder never sells unlimited AI. Every plan has hard limits so the platform stays profitable.
            Heavy users upgrade, pay overages later, or bring their own API key.
          </p>
        </div>
      </div>

      <div className="grid grid-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="card"
            style={{
              borderColor: plan.highlight ? "rgba(52, 211, 153, 0.65)" : undefined,
              boxShadow: plan.highlight ? "0 30px 90px rgba(52, 211, 153, 0.16)" : undefined
            }}
          >
            <span className="badge">{plan.badge}</span>
            <h2 style={{ marginTop: 16 }}>{plan.name}</h2>
            <h1>{plan.price}</h1>
            <p>{plan.desc}</p>

            <ul style={{ paddingLeft: 18, lineHeight: 1.9, color: "#d4d4d8" }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <Link className="button" href={plan.href}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Why users upgrade</h2>
          <p>
            Free users hit limits quickly after seeing value. Starter unlocks real use.
            Growth unlocks teams and memory. Pro unlocks BYOK and lower marketplace fees.
          </p>
        </div>

        <div className="card">
          <h2>Why Hoolder stays profitable</h2>
          <p>
            Free users are capped. Paid users have task/token limits. Heavy AI users move to BYOK,
            meaning their usage cost shifts away from Hoolder.
          </p>
        </div>
      </div>
    </div>
  );
}
