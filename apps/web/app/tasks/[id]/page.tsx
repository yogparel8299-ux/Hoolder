import Link from "next/link";
import Sidebar from "../../../components/shell/sidebar";

export default async function TaskDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <div className="topbar">
          <input
            className="input"
            placeholder="Search task logs, outputs, approvals..."
            style={{ maxWidth: 460, borderRadius: 999 }}
          />

          <div style={{ flex: 1 }} />

          <Link href="/tasks" className="btn btn-soft">
            Back to Tasks
          </Link>

          <Link href="/approvals" className="btn btn-lime">
            Review Output
          </Link>
        </div>

        <div className="app-content">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", flexWrap: "wrap" }}>
            <div>
              <div className="badge badge-lime">Task detail</div>

              <h1 style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.06em", margin: "18px 0 10px", fontWeight: 900 }}>
                Analyze Q3 Competitor Data
              </h1>

              <p className="muted" style={{ fontSize: 18 }}>
                Task ID: {id} · Assigned to Research Agent · Awaiting final approval.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-secondary">Reset Run</button>
              <button className="btn btn-primary">Export Output</button>
              <button className="btn btn-lime">Approve</button>
            </div>
          </div>

          <div className="grid-4" style={{ marginTop: 34 }}>
            <div className="card kpi-lime">
              <div style={{ fontWeight: 800 }}>Status</div>
              <div style={{ fontSize: 34, fontWeight: 950, marginTop: 22 }}>Awaiting</div>
            </div>

            <div className="card kpi-blue">
              <div style={{ fontWeight: 800 }}>Runs</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>3</div>
            </div>

            <div className="card kpi-purple">
              <div style={{ fontWeight: 800 }}>Token usage</div>
              <div style={{ fontSize: 42, fontWeight: 950, marginTop: 20 }}>42.8k</div>
            </div>

            <div className="card kpi-green">
              <div style={{ fontWeight: 800 }}>Estimated cost</div>
              <div style={{ fontSize: 42, fontWeight: 950, marginTop: 20 }}>$1.40</div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Task overview
              </h2>

              <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
                {[
                  ["Assigned agent", "Research Agent"],
                  ["Priority", "High"],
                  ["Approval", "Required"],
                  ["Created", "Today, 9:20 AM"],
                  ["Last run", "2 minutes ago"],
                  ["Workspace", "AI Market Intelligence Desk"]
                ].map(([label, value]) => (
                  <div key={label} className="card-flat" style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <span className="muted">{label}</span>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Cost breakdown
              </h2>

              <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <b>Input tokens</b>
                    <span className="muted">28,400</span>
                  </div>
                  <div className="progress"><span style={{ width: "66%" }} /></div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <b>Output tokens</b>
                    <span className="muted">14,400</span>
                  </div>
                  <div className="progress"><span style={{ width: "38%" }} /></div>
                </div>

                <div className="card-flat">
                  <div className="muted">Provider estimate</div>
                  <b style={{ fontSize: 26 }}>$1.40</b>
                </div>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Output viewer
              </h2>

              <div
                className="card-flat"
                style={{
                  marginTop: 20,
                  minHeight: 320,
                  background: "#111315",
                  color: "white",
                  lineHeight: 1.7
                }}
              >
                <b>Executive summary</b>
                <p style={{ color: "rgba(255,255,255,0.72)" }}>
                  Competitor pricing across the selected market shows three clear movements:
                  enterprise plans are becoming more usage-metered, AI credits are being separated
                  from seat pricing, and dataset access is increasingly packaged as a premium add-on.
                </p>

                <b>Recommended action</b>
                <p style={{ color: "rgba(255,255,255,0.72)" }}>
                  Keep Hoolder&apos;s Starter plan affordable, push Growth toward teams, and make Pro
                  the BYOK-heavy plan for power users while preserving marketplace fee advantages.
                </p>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
                <button className="btn btn-secondary">Download PDF</button>
                <button className="btn btn-secondary">Export CSV</button>
                <button className="btn btn-secondary">Copy Markdown</button>
              </div>
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Approval status
              </h2>

              <div className="card-flat" style={{ marginTop: 20 }}>
                <span className="badge badge-yellow">Awaiting approval</span>
                <p className="muted" style={{ lineHeight: 1.7 }}>
                  This output is paused before final publishing because the task was marked high-impact.
                </p>
              </div>

              <div style={{ marginTop: 20 }}>
                <label className="label">Reviewer notes</label>
                <textarea className="textarea" placeholder="Add notes before approving or rejecting..." />
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <button className="btn btn-lime" style={{ flex: 1 }}>
                  Approve
                </button>
                <button className="btn btn-soft" style={{ flex: 1 }}>
                  Reject
                </button>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 24 }}>
            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Timeline
              </h2>

              <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
                {[
                  ["Created", "Task created and assigned to Research Agent."],
                  ["Queued", "Worker accepted task and checked usage limit."],
                  ["Running", "Agent fetched competitor pricing data."],
                  ["Output generated", "Draft report created successfully."],
                  ["Approval required", "Execution paused for human review."]
                ].map(([title, text]) => (
                  <div key={title} className="card-flat">
                    <b>{title}</b>
                    <p className="muted" style={{ marginBottom: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Run history
              </h2>

              <div className="table-wrap" style={{ marginTop: 20 }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Run</th>
                      <th>Status</th>
                      <th>Cost</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><b>Run 03</b></td>
                      <td><span className="badge badge-yellow">Awaiting</span></td>
                      <td>$1.40</td>
                      <td className="muted">2m ago</td>
                    </tr>
                    <tr>
                      <td><b>Run 02</b></td>
                      <td><span className="badge badge-red">Failed</span></td>
                      <td>$0.42</td>
                      <td className="muted">12m ago</td>
                    </tr>
                    <tr>
                      <td><b>Run 01</b></td>
                      <td><span className="badge">Completed</span></td>
                      <td>$0.96</td>
                      <td className="muted">1h ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
