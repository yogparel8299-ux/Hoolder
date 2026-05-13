import Link from "next/link";
import Sidebar from "../../components/shell/sidebar";

const agents = [
  {
    name: "Research Agent",
    provider: "OpenAI",
    model: "GPT-4o",
    status: "Online",
    badge: "badge-green",
    role: "Finds market data, summarizes research, tracks competitors, and prepares investor briefs.",
    skills: ["Web research", "Summaries", "Reports"],
    memory: "Remembers company thesis, tracked sectors, competitor list and preferred report format.",
    budget: "$12.40 / $50"
  },
  {
    name: "Sales Agent",
    provider: "Anthropic",
    model: "Claude",
    status: "Running",
    badge: "badge-lime",
    role: "Creates lead lists, writes outbound sequences, drafts follow-ups and updates CRM notes.",
    skills: ["Lead research", "Email drafts", "CRM"],
    memory: "Remembers ICP, offer positioning, objections, call notes and best-performing outreach.",
    budget: "$8.20 / $100"
  },
  {
    name: "Coding Agent",
    provider: "OpenAI",
    model: "GPT-4.1",
    status: "Idle",
    badge: "badge",
    role: "Writes frontend fixes, reviews bugs, prepares deployment notes and creates implementation plans.",
    skills: ["Code review", "UI fixes", "Debugging"],
    memory: "Remembers repo structure, naming rules, file paths and launch checklist.",
    budget: "$45 / $200"
  },
  {
    name: "Finance Agent",
    provider: "Gemini",
    model: "Gemini Pro",
    status: "Limit Blocked",
    badge: "badge-red",
    role: "Tracks invoices, calculates usage cost, monitors payout liabilities and billing events.",
    skills: ["Invoices", "Payouts", "Cost checks"],
    memory: "Remembers pricing rules, dataset commissions, billing cycles and plan limits.",
    budget: "$50 / $50"
  }
];

export default function AgentsPage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <div className="topbar">
          <input
            className="input"
            placeholder="Search agents, providers, skills..."
            style={{ maxWidth: 460, borderRadius: 999 }}
          />

          <div style={{ flex: 1 }} />

          <Link href="/tasks" className="btn btn-soft">
            Assign Task
          </Link>

          <button className="btn btn-lime">
            + Create Agent
          </button>
        </div>

        <div className="app-content">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", flexWrap: "wrap" }}>
            <div>
              <div className="badge badge-lime">Agent workforce</div>
              <h1 style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.06em", margin: "18px 0 10px", fontWeight: 900 }}>
                Build your AI team.
              </h1>
              <p className="muted" style={{ fontSize: 18, maxWidth: 760 }}>
                Create specialized agents with roles, models, skills, memory and usage budgets.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/settings" className="btn btn-secondary">
                Provider Keys
              </Link>
              <Link href="/usage" className="btn btn-primary">
                Usage Limits
              </Link>
            </div>
          </div>

          <div className="grid-4" style={{ marginTop: 34 }}>
            <div className="card kpi-lime">
              <div style={{ fontWeight: 800 }}>Total agents</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>12</div>
            </div>

            <div className="card kpi-blue">
              <div style={{ fontWeight: 800 }}>Running</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>4</div>
            </div>

            <div className="card kpi-purple">
              <div style={{ fontWeight: 800 }}>Memory enabled</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>9</div>
            </div>

            <div className="card kpi-green">
              <div style={{ fontWeight: 800 }}>Blocked by limits</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>1</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
              Create new agent
            </h2>

            <div className="grid-3" style={{ marginTop: 22 }}>
              <div>
                <label className="label">Agent name</label>
                <input className="input" placeholder="Research Agent" />
              </div>

              <div>
                <label className="label">Provider</label>
                <select className="select">
                  <option>OpenAI</option>
                  <option>Anthropic</option>
                  <option>Gemini</option>
                  <option>Groq</option>
                  <option>OpenRouter</option>
                </select>
              </div>

              <div>
                <label className="label">Model</label>
                <input className="input" placeholder="GPT-4o / Claude / Gemini" />
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: 18 }}>
              <div>
                <label className="label">Role / system prompt</label>
                <textarea className="textarea" placeholder="Describe what this agent should do..." />
              </div>

              <div>
                <label className="label">Skills</label>
                <textarea className="textarea" placeholder="Web research, code review, file reading, CRM sync..." />
              </div>
            </div>

            <div className="grid-3" style={{ marginTop: 18 }}>
              <div>
                <label className="label">Monthly budget</label>
                <input className="input" placeholder="$50" />
              </div>

              <div>
                <label className="label">Memory</label>
                <select className="select">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "end" }}>
                <button className="btn btn-lime" style={{ width: "100%" }}>
                  Deploy Agent
                </button>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            {agents.map((agent) => (
              <div key={agent.name} className="card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "start" }}>
                  <div>
                    <h3 style={{ fontSize: 26, letterSpacing: "-0.04em", margin: 0 }}>
                      {agent.name}
                    </h3>
                    <p className="muted" style={{ marginTop: 6 }}>
                      {agent.provider} · {agent.model}
                    </p>
                  </div>

                  <span className={`badge ${agent.badge}`}>
                    {agent.status}
                  </span>
                </div>

                <div className="card-flat" style={{ marginTop: 20 }}>
                  <div className="label">Role</div>
                  <p style={{ margin: 0, lineHeight: 1.65 }}>
                    {agent.role}
                  </p>
                </div>

                <div style={{ marginTop: 18 }}>
                  <div className="label">Skills</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {agent.skills.map((skill) => (
                      <span key={skill} className="badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-flat" style={{ marginTop: 18 }}>
                  <div className="label">Memory preview</div>
                  <p className="muted" style={{ margin: 0, lineHeight: 1.65 }}>
                    {agent.memory}
                  </p>
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <b>Budget used</b>
                    <span className="muted">{agent.budget}</span>
                  </div>

                  <div className="progress">
                    <span
                      style={{
                        width: agent.name === "Finance Agent" ? "100%" : agent.name === "Coding Agent" ? "45%" : "24%"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 22, flexWrap: "wrap" }}>
                  <button className="btn btn-secondary">Edit</button>
                  <button className="btn btn-soft">Memory</button>
                  <Link href="/tasks" className="btn btn-lime">
                    Assign Task
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
