import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "For testing Hoolder and getting hooked.",
    features: [
      "1 company",
      "3 agents",
      "1 swarm",
      "25 tasks / month",
      "Basic approvals",
      "Community support"
    ],
    cta: "Start free"
  },
  {
    name: "Starter",
    price: "₹999/mo",
    desc: "For solo founders and small teams.",
    features: [
      "1 company",
      "10 agents",
      "5 swarms",
      "300 tasks / month",
      "Schedules",
      "Task output history",
      "Priority worker queue"
    ],
    cta: "Upgrade to Starter"
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    desc: "For startups using agents daily.",
    features: [
      "3 companies",
      "30 agents",
      "20 swarms",
      "1,500 tasks / month",
      "Memory system",
      "Analytics",
      "Team access"
    ],
    cta: "Upgrade to Growth"
  },
  {
    name: "Pro",
    price: "₹9,999/mo",
    desc: "For serious AI operations.",
    features: [
      "10 companies",
      "100 agents",
      "100 swarms",
      "10,000 tasks / month",
      "Advanced governance",
      "Audit logs",
      "BYOK support"
    ],
    cta: "Contact sales"
  }
];

export default function PricingPage() {
  return (
    <div className="container">
      <h1>Pricing</h1>
      <p style={{ color: "#aaa", maxWidth: 720 }}>
        Start free, then upgrade when your AI team starts doing real work.
        Hoolder is priced to stay profitable and avoid unlimited AI cost risk.
      </p>

      <div className="grid grid-4" style={{ marginTop: 24 }}>
        {plans.map((plan) => (
          <div key={plan.name} className="card">
            <h2>{plan.name}</h2>
            <h1>{plan.price}</h1>
            <p style={{ color: "#aaa" }}>{plan.desc}</p>

            <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <Link className="button" href="/signup">
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
