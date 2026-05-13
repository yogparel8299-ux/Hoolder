import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "₹0",
    note: "Start testing the platform",
    badge: "",
    features: ["3 agents", "1 swarm", "25 tasks/month", "15% dataset fee"]
  },
  {
    name: "Starter",
    price: "₹999/mo",
    note: "Best for solo founders",
    badge: "Best for founders",
    features: ["10 agents", "5 swarms", "300 tasks/month", "12% dataset fee"]
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    note: "For serious teams",
    badge: "",
    features: ["30 agents", "20 swarms", "1,500 tasks/month", "10% dataset fee"]
  },
  {
    name: "Pro",
    price: "₹9,999/mo",
    note: "For heavy usage + BYOK",
    badge: "",
    features: ["100 agents", "100 swarms", "10,000 tasks/month", "BYOK support", "5% dataset fee"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "For custom infrastructure",
    badge: "",
    features: ["Custom limits", "Dedicated support", "Enterprise security", "Custom deployment"]
  }
];

export default function PricingPage() {
  return (
    <main className="app-page">
      <header className="nav-blur sticky top-0 z-50">
        <div className="container-wide" style={{ height: 76, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: "var(--accent)", display: "grid", placeItems: "center", fontWeight: 900 }}>
              H
            </div>
            <b style={{ fontSize: 20 }}>Hoolder</b>
          </Link>

          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/login" className="btn btn-secondary">Sign in</Link>
            <Link href="/signup" className="btn btn-lime">Start free</Link>
          </div>
        </div>
      </header>

      <section className="container-wide" style={{ padding: "92px 0 40px", textAlign: "center" }}>
        <div className="badge badge-lime" style={{ margin: "0 auto 24px" }}>
          Pricing
        </div>

        <h1 className="hero-title" style={{ maxWidth: 980, margin: "0 auto" }}>
          Profitable AI infrastructure from day one.
        </h1>

        <p className="muted" style={{ fontSize: 22, lineHeight: 1.55, maxWidth: 780, margin: "28px auto 0" }}>
          Hoolder does not sell unlimited AI. Every plan has hard limits, protected usage, marketplace fees, and BYOK options for heavy users.
        </p>
      </section>

      <section className="container-wide" style={{ padding: "38px 0 92px" }}>
        <div className="grid-4">
          {plans.slice(0, 4).map((plan) => (
            <div key={plan.name} className="card" style={{ position: "relative" }}>
              {plan.badge && (
                <div className="badge badge-lime" style={{ marginBottom: 18 }}>
                  {plan.badge}
                </div>
              )}

              <h2 style={{ fontSize: 26, margin: "0 0 8px", letterSpacing: "-0.04em" }}>
                {plan.name}
              </h2>

              <p className="muted" style={{ minHeight: 46 }}>
                {plan.note}
              </p>

              <div style={{ fontSize: 42, fontWeight: 950, marginTop: 22 }}>
                {plan.price}
              </div>

              <div style={{ display: "grid", gap: 14, marginTop: 30 }}>
                {plan.features.map((feature) => (
                  <div key={feature} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)" }} />
                    <span className="muted">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href="/signup" className={plan.name === "Starter" ? "btn btn-lime" : "btn btn-primary"} style={{ width: "100%", marginTop: 34 }}>
                {plan.name === "Free" ? "Start free" : "Choose plan"}
              </Link>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.04em" }}>Enterprise</h2>
            <p className="muted" style={{ fontSize: 17, lineHeight: 1.6 }}>
              Custom limits, dedicated support, enterprise security, SSO, custom infrastructure and deployment support for serious teams.
            </p>
          </div>

          <Link href="/billing" className="btn btn-secondary">
            Contact sales
          </Link>
        </div>
      </section>

      <section className="container-wide" style={{ padding: "40px 0 92px" }}>
        <div className="card">
          <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 32 }}>
            <div>
              <span className="badge">Comparison</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>
                Know exactly what each plan gives you.
              </h2>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Plan</th>
                    <th>Agents</th>
                    <th>Swarms</th>
                    <th>Tasks</th>
                    <th>Dataset fee</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td><b>Free</b></td>
                    <td>3</td>
                    <td>1</td>
                    <td>25/mo</td>
                    <td>15%</td>
                  </tr>
                  <tr>
                    <td><b>Starter</b></td>
                    <td>10</td>
                    <td>5</td>
                    <td>300/mo</td>
                    <td>12%</td>
                  </tr>
                  <tr>
                    <td><b>Growth</b></td>
                    <td>30</td>
                    <td>20</td>
                    <td>1,500/mo</td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td><b>Pro</b></td>
                    <td>100</td>
                    <td>100</td>
                    <td>10,000/mo</td>
                    <td>5%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide" style={{ padding: "40px 0 92px" }}>
        <div className="grid-3">
          <div className="card kpi-lime">
            <h3 style={{ marginTop: 0 }}>No unlimited AI</h3>
            <p>Every plan has hard limits so AI token costs never silently destroy your margins.</p>
          </div>

          <div className="card kpi-blue">
            <h3 style={{ marginTop: 0 }}>Dataset revenue</h3>
            <p>Listing is free. Hoolder earns only when a dataset sells through the marketplace.</p>
          </div>

          <div className="card kpi-purple">
            <h3 style={{ marginTop: 0 }}>BYOK for power users</h3>
            <p>Pro users can bring provider keys and run heavier workloads without burning platform margin.</p>
          </div>
        </div>
      </section>

      <footer style={{ padding: "48px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container-wide" style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <b>Hoolder</b>
          <div style={{ display: "flex", gap: 22, color: "var(--muted)" }}>
            <Link href="/">Home</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund">Refund</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
