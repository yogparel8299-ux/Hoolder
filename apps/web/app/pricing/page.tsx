import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    tagline: "Start without risk.",
    desc: "Perfect for trying Hoolder and seeing the workflow.",
    features: [
      "1 company",
      "3 agents",
      "1 swarm",
      "25 tasks/month",
      "Dataset listing allowed",
      "15% dataset marketplace fee"
    ],
    highlight: false
  },
  {
    name: "Starter",
    price: "₹999/mo",
    tagline: "For solo founders.",
    desc: "Run real AI work without overpaying.",
    features: [
      "10 agents",
      "5 swarms",
      "300 tasks/month",
      "Basic schedules",
      "Task output history",
      "12% dataset marketplace fee"
    ],
    highlight: true
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    tagline: "For growing teams.",
    desc: "More agents, more swarms, more serious workflows.",
    features: [
      "30 agents",
      "20 swarms",
      "1,500 tasks/month",
      "Memory system",
      "Analytics",
      "10% dataset marketplace fee"
    ],
    highlight: false
  },
  {
    name: "Pro",
    price: "₹9,999/mo",
    tagline: "For serious operators.",
    desc: "Scale AI operations with stronger controls.",
    features: [
      "100 agents",
      "100 swarms",
      "10,000 tasks/month",
      "BYOK support",
      "Audit logs",
      "5% dataset marketplace fee"
    ],
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Pricing</div>
          <h1>Start free. Upgrade only when Hoolder starts doing real work.</h1>
          <p>
            Free is attractive enough to hook users, but capped enough to protect your AI cost.
            Paid plans unlock higher limits, lower marketplace fees, and stronger operations.
          </p>
        </div>
      </div>

      <div className="grid grid-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="card"
            style={{
              borderColor: plan.highlight ? "rgba(52, 211, 153, 0.55)" : undefined,
              transform: plan.highlight ? "translateY(-8px)" : undefined
            }}
          >
            <span className="badge">{plan.tagline}</span>
            <h2 style={{ marginTop: 16 }}>{plan.name}</h2>
            <h1>{plan.price}</h1>
            <p>{plan.desc}</p>

            <ul style={{ paddingLeft: 18, lineHeight: 1.9, color: "#d4d4d8" }}>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <Link className="button" href="/billing">
              {plan.name === "Free" ? "Start free" : "Upgrade"}
            </Link>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Why this pricing protects profit</h2>
        <p>
          Hoolder never sells unlimited AI. Every plan has hard task and token limits.
          Heavy users upgrade, use overages, or bring their own API key.
        </p>
      </div>
    </div>
  );
}
