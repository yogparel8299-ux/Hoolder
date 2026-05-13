import Link from "next/link";

const features = [
  ["AI agents", "Create research, coding, sales, finance and operations agents with memory, skills and budgets."],
  ["Agent swarms", "Coordinate multiple agents together for complex workflows and team-style execution."],
  ["Recurring tasks", "Run daily, weekly and monthly automations without manual follow-up."],
  ["Approvals", "Keep humans in the loop before sensitive AI actions are executed."],
  ["Dataset marketplace", "Let users sell datasets and let buyers train better agents with protected downloads."],
  ["Usage protection", "Block runaway AI costs with hard limits, BYOK support and usage analytics."]
];

export default function HomePage() {
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

          <nav style={{ display: "flex", gap: 28, color: "var(--muted)", fontWeight: 700 }}>
            <a href="#features">Features</a>
            <a href="#marketplace">Marketplace</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/login" className="btn btn-secondary">Sign in</Link>
            <Link href="/signup" className="btn btn-lime">Start free</Link>
          </div>
        </div>
      </header>

      <section className="container-wide" style={{ padding: "92px 0 42px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}>
          <div>
            <div className="badge badge-lime" style={{ marginBottom: 24 }}>
              AI Company Operating System
            </div>

            <h1 className="hero-title">
              Run your AI company from one operating system.
            </h1>

            <p style={{ marginTop: 28, fontSize: 22, lineHeight: 1.55, color: "var(--muted)", maxWidth: 720 }}>
              Hoolder helps teams create agents, manage swarms, schedule recurring tasks, review outputs, sell datasets, control usage, and manage billing from one premium workspace.
            </p>

            <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
              <Link href="/signup" className="btn btn-lime">Start free</Link>
              <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ borderRadius: 24, background: "#eef1ef", padding: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="card kpi-lime">
                  <div style={{ fontSize: 13, fontWeight: 800 }}>Active agents</div>
                  <div style={{ fontSize: 44, fontWeight: 900, marginTop: 20 }}>128</div>
                </div>
                <div className="card kpi-blue">
                  <div style={{ fontSize: 13, fontWeight: 800 }}>Tasks today</div>
                  <div style={{ fontSize: 44, fontWeight: 900, marginTop: 20 }}>482</div>
                </div>
                <div className="card kpi-purple">
                  <div style={{ fontSize: 13, fontWeight: 800 }}>Dataset sales</div>
                  <div style={{ fontSize: 34, fontWeight: 900, marginTop: 20 }}>₹18.4k</div>
                </div>
                <div className="card kpi-green">
                  <div style={{ fontSize: 13, fontWeight: 800 }}>Usage safe</div>
                  <div style={{ fontSize: 34, fontWeight: 900, marginTop: 20 }}>68%</div>
                </div>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <b>Swarm topology</b>
                  <span className="badge badge-green">Healthy</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 22 }}>
                  {["Research", "Coding", "Sales"].map((item) => (
                    <div key={item} className="card-flat" style={{ textAlign: "center", fontWeight: 800 }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <b>Approval queue</b>
                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  {["Financial report", "Outbound campaign", "Dataset publish"].map((item) => (
                    <div key={item} className="card-flat" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{item}</span>
                      <span className="badge">Review</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container-wide" style={{ padding: "92px 0" }}>
        <div style={{ maxWidth: 760 }}>
          <div className="badge">Platform</div>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            Everything your AI company needs to operate.
          </h2>
        </div>

        <div className="grid-3" style={{ marginTop: 38 }}>
          {features.map(([title, text]) => (
            <div key={title} className="card">
              <h3 style={{ fontSize: 24, margin: 0 }}>{title}</h3>
              <p className="muted" style={{ lineHeight: 1.7 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="marketplace" className="container-wide" style={{ padding: "92px 0" }}>
        <div className="card" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 32, alignItems: "center" }}>
          <div>
            <span className="badge badge-lime">Dataset marketplace</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Turn data into a revenue engine.
            </h2>
            <p className="muted" style={{ fontSize: 18, lineHeight: 1.7 }}>
              Users list datasets for free. Buyers purchase datasets. Hoolder earns only when a sale happens.
            </p>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {[
              ["Global Finance Dataset", "₹4,999", "Finance"],
              ["Sales Leads Dataset", "₹2,499", "Sales"],
              ["Customer Support Dataset", "₹1,999", "Support"]
            ].map(([name, price, type]) => (
              <div key={name} className="card-flat" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <b>{name}</b>
                  <div className="muted" style={{ marginTop: 4 }}>{type} · protected download</div>
                </div>
                <b>{price}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="container-wide" style={{ padding: "92px 0" }}>
        <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 42px" }}>
          <span className="badge">Pricing</span>
          <h2 className="section-title" style={{ marginTop: 18 }}>
            Profitable from day one.
          </h2>
          <p className="muted" style={{ fontSize: 18 }}>
            Hard limits protect you from unlimited AI cost.
          </p>
        </div>

        <div className="grid-4">
          {[
            ["Free", "₹0", "3 agents", "1 swarm", "25 tasks/month", "15% dataset fee"],
            ["Starter", "₹999/mo", "10 agents", "5 swarms", "300 tasks/month", "12% dataset fee"],
            ["Growth", "₹2,999/mo", "30 agents", "20 swarms", "1,500 tasks/month", "10% dataset fee"],
            ["Pro", "₹9,999/mo", "100 agents", "100 swarms", "10,000 tasks/month", "5% dataset fee"]
          ].map((plan) => (
            <div key={plan[0]} className="card">
              {plan[0] === "Starter" && <div className="badge badge-lime">Best for founders</div>}
              <h3 style={{ fontSize: 24 }}>{plan[0]}</h3>
              <div style={{ fontSize: 38, fontWeight: 900 }}>{plan[1]}</div>
              <div style={{ display: "grid", gap: 12, marginTop: 28 }}>
                {plan.slice(2).map((f) => <span key={f} className="muted">{f}</span>)}
              </div>
              <Link href="/signup" className="btn btn-primary" style={{ width: "100%", marginTop: 30 }}>
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: "48px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container-wide" style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <b>Hoolder</b>
          <div style={{ display: "flex", gap: 22, color: "var(--muted)" }}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/refund">Refund</Link>
            <Link href="/ai-policy">AI Policy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
