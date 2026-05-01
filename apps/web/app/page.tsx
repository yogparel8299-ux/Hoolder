import Link from "next/link";

const features = [
  {
    title: "AI Companies",
    desc: "Create workspaces for each company, project or client."
  },
  {
    title: "Agents",
    desc: "Build AI workers with roles, prompts, models and budgets."
  },
  {
    title: "Swarms",
    desc: "Group agents together to complete larger tasks."
  },
  {
    title: "Approvals",
    desc: "Review agent outputs before they become final."
  },
  {
    title: "Dataset Marketplace",
    desc: "Let users buy and sell useful datasets while Hoolder takes a platform fee."
  },
  {
    title: "Usage Protection",
    desc: "Hard limits protect your AI cost and keep the platform profitable."
  }
];

const steps = [
  "Create a company",
  "Add agents",
  "Create tasks",
  "Review outputs",
  "Scale with swarms"
];

export default function HomePage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-content">
          <div className="page-kicker">Hoolder</div>

          <h1>Run your AI company from one premium operating system.</h1>

          <p>
            Hoolder helps founders and teams create AI agents, organize swarms,
            assign tasks, review outputs, manage usage, sell datasets and scale
            AI operations from one calm dashboard.
          </p>

          <div className="hero-actions">
            <Link className="button" href="/signup">
              Start free
            </Link>

            <Link className="button secondary-button" href="/pricing">
              View pricing
            </Link>
          </div>
        </div>

        <div className="hero-panel">
          <div className="mock-window">
            <div className="mock-topbar">
              <span />
              <span />
              <span />
            </div>

            <div className="mock-content">
              <div className="mock-stat">
                <p>Active Agents</p>
                <h2>24</h2>
              </div>

              <div className="mock-stat">
                <p>Running Tasks</p>
                <h2>128</h2>
              </div>

              <div className="mock-line" />
              <div className="mock-line small" />
              <div className="mock-line" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-kicker">Platform</div>
        <h2>Everything needed to operate AI work.</h2>

        <div className="grid grid-3" style={{ marginTop: 24 }}>
          {features.map((feature) => (
            <div className="card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="grid grid-2">
          <div className="card">
            <div className="page-kicker">Workflow</div>
            <h2>From idea to execution in minutes.</h2>
            <p>
              Hoolder turns scattered AI tools into a structured operating system
              where agents, teams, datasets and billing live together.
            </p>
          </div>

          <div className="card">
            {steps.map((step, index) => (
              <div key={step} className="timeline-item">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-card">
        <div>
          <div className="page-kicker">Launch</div>
          <h2>Start free. Upgrade when your AI team creates value.</h2>
          <p>
            Free users get a controlled trial. Paid users unlock higher limits,
            lower dataset fees and stronger operations.
          </p>
        </div>

        <Link className="button" href="/signup">
          Create account
        </Link>
      </section>
    </div>
  );
}
