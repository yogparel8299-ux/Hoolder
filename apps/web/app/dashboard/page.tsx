import Link from "next/link";
import Sidebar from "../../components/shell/sidebar";

const tasks = [
  ["Analyze Q3 Competitor Data", "Research Agent", "Running", "$1.40", "2m ago", "badge-green"],
  ["Draft Weekly Newsletter", "Content Swarm", "Awaiting Approval", "$0.80", "15m ago", "badge-yellow"],
  ["Scrape Pricing Pages", "Sales Agent", "Completed", "$0.30", "1h ago", "badge"],
  ["Generate Lead List", "Sales Agent", "Failed", "$0.90", "3h ago", "badge-red"]
];

export default function DashboardPage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <div className="topbar">
          <input
            className="input"
            placeholder="Search agents, tasks, datasets..."
            style={{ maxWidth: 460, borderRadius: 999 }}
          />

          <div style={{ flex: 1 }} />

          <Link href="/builder" className="btn btn-soft">
            Builder
          </Link>

          <Link href="/tasks" className="btn btn-lime">
            + New Task
          </Link>
        </div>

        <div className="app-content">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", alignItems: "end" }}>
            <div>
              <div className="badge badge-lime">Command center</div>
              <h1 style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.06em", margin: "18px 0 10px", fontWeight: 900 }}>
                Good morning, Caelum.
              </h1>
              <p className="muted" style={{ fontSize: 18 }}>
                Here&apos;s what&apos;s happening in your AI company today.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/agents" className="btn btn-secondary">Create Agent</Link>
              <Link href="/tasks" className="btn btn-primary">Create Task</Link>
              <Link href="/datasets/sell" className="btn btn-lime">Sell Dataset</Link>
            </div>
          </div>

          <div className="grid-4" style={{ marginTop: 34 }}>
            <div className="card kpi-lime">
              <div style={{ fontWeight: 800, fontSize: 13 }}>Total Agents</div>
              <div style={{ fontSize: 48, fontWeight: 950, marginTop: 24 }}>12</div>
              <div style={{ marginTop: 10 }}>2 added this week</div>
            </div>

            <div className="card kpi-blue">
              <div style={{ fontWeight: 800, fontSize: 13 }}>Total Tasks</div>
              <div style={{ fontSize: 48, fontWeight: 950, marginTop: 24 }}>184</div>
              <div style={{ marginTop: 10 }}>45 running now</div>
            </div>

            <div className="card kpi-purple">
              <div style={{ fontWeight: 800, fontSize: 13 }}>Active Swarms</div>
              <div style={{ fontSize: 48, fontWeight: 950, marginTop: 24 }}>3</div>
              <div style={{ marginTop: 10 }}>Across 2 workspaces</div>
            </div>

            <div className="card kpi-green">
              <div style={{ fontWeight: 800, fontSize: 13 }}>Pending Approvals</div>
              <div style={{ fontSize: 48, fontWeight: 950, marginTop: 24 }}>5</div>
              <div style={{ marginTop: 10 }}>Requires attention</div>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 24 }}>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Usage overview</h3>

              <div style={{ marginTop: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <b>Monthly usage</b>
                  <span className="muted">68%</span>
                </div>

                <div className="progress">
                  <span style={{ width: "68%" }} />
                </div>
              </div>

              <div style={{ marginTop: 26, paddingTop: 22, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between" }}>
                <span className="muted">Estimated AI cost</span>
                <b>$42.80</b>
              </div>

              <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between" }}>
                <span className="muted">Blocked runs</span>
                <b>3</b>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Dataset revenue</h3>
              <div style={{ fontSize: 44, fontWeight: 950, marginTop: 20 }}>
                ₹18,400
              </div>
              <p className="muted">Revenue from 4 dataset sales this month.</p>

              <Link href="/datasets" className="btn btn-secondary" style={{ width: "100%", marginTop: 22 }}>
                Manage listings
              </Link>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Billing summary</h3>

              <div className="card-flat" style={{ marginTop: 18 }}>
                <div className="muted">Current plan</div>
                <b style={{ fontSize: 24 }}>Starter — ₹999/mo</b>
              </div>

              <div className="card-flat" style={{ marginTop: 12 }}>
                <div className="muted">Next invoice</div>
                <b>June 12, 2026</b>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            <div className="card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0 }}>Recent tasks</h3>
                <Link href="/tasks" className="btn btn-soft">View all</Link>
              </div>

              <div className="table-wrap" style={{ marginTop: 20 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Agent</th>
                      <th>Status</th>
                      <th>Cost</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map(([task, agent, status, cost, time, badge]) => (
                      <tr key={task}>
                        <td><b>{task}</b></td>
                        <td className="muted">{agent}</td>
                        <td><span className={`badge ${badge}`}>{status}</span></td>
                        <td>{cost}</td>
                        <td className="muted">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Approval queue</h3>

              <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
                {[
                  ["Send Mass Email Campaign", "Requested by Marketing Swarm · High impact"],
                  ["Update Production Database", "Requested by Coding Agent · Critical"],
                  ["Publish Dataset Description", "Requested by Dataset Agent · Marketplace"]
                ].map(([title, sub]) => (
                  <div key={title} className="card-flat">
                    <b>{title}</b>
                    <p className="muted" style={{ margin: "6px 0 14px" }}>{sub}</p>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn btn-lime">Approve</button>
                      <button className="btn btn-soft">Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Swarm health</h3>

              <div style={{ display: "grid", gap: 18, marginTop: 20 }}>
                {[
                  ["Research Swarm", "92%"],
                  ["Content Swarm", "78%"],
                  ["Support Swarm", "65%"]
                ].map(([name, value]) => (
                  <div key={name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <b>{name}</b>
                      <span className="muted">{value}</span>
                    </div>

                    <div className="progress">
                      <span style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Active agents</h3>

              <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                {["Research Agent", "Sales Agent", "Coding Agent", "Finance Agent"].map((agent) => (
                  <div key={agent} className="card-flat" style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>{agent}</b>
                    <span className="badge badge-green">Online</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
