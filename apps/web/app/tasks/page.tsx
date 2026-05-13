import Link from "next/link";
import Sidebar from "../../components/shell/sidebar";

const tasks = [
  {
    title: "Analyze Q3 Competitor Data",
    agent: "Research Agent",
    status: "Running",
    badge: "badge-green",
    priority: "High",
    cost: "$1.40",
    updated: "2m ago"
  },
  {
    title: "Draft Weekly Newsletter",
    agent: "Content Swarm",
    status: "Awaiting Approval",
    badge: "badge-yellow",
    priority: "Medium",
    cost: "$0.80",
    updated: "15m ago"
  },
  {
    title: "Scrape Pricing Pages",
    agent: "Sales Agent",
    status: "Completed",
    badge: "badge",
    priority: "Low",
    cost: "$0.30",
    updated: "1h ago"
  },
  {
    title: "Generate Lead List",
    agent: "Sales Agent",
    status: "Failed",
    badge: "badge-red",
    priority: "High",
    cost: "$0.90",
    updated: "3h ago"
  },
  {
    title: "Prepare Dataset Listing Copy",
    agent: "Dataset Agent",
    status: "Queued",
    badge: "badge",
    priority: "Medium",
    cost: "$0.20",
    updated: "8m ago"
  }
];

export default function TasksPage() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-main">
        <div className="topbar">
          <input
            className="input"
            placeholder="Search tasks, agents, approvals..."
            style={{ maxWidth: 460, borderRadius: 999 }}
          />

          <div style={{ flex: 1 }} />

          <Link href="/schedules" className="btn btn-soft">
            Schedules
          </Link>

          <button className="btn btn-lime">
            + Create Task
          </button>
        </div>

        <div className="app-content">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "end", flexWrap: "wrap" }}>
            <div>
              <div className="badge badge-lime">Task operations</div>

              <h1 style={{ fontSize: 52, lineHeight: 1, letterSpacing: "-0.06em", margin: "18px 0 10px", fontWeight: 900 }}>
                Run work through agents.
              </h1>

              <p className="muted" style={{ fontSize: 18, maxWidth: 760 }}>
                Create tasks, assign agents, track execution, review outputs and stop runaway AI spend before it happens.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/approvals" className="btn btn-secondary">
                Approval Queue
              </Link>

              <Link href="/usage" className="btn btn-primary">
                Usage Limits
              </Link>
            </div>
          </div>

          <div className="grid-4" style={{ marginTop: 34 }}>
            <div className="card kpi-lime">
              <div style={{ fontWeight: 800 }}>Running</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>48</div>
            </div>

            <div className="card kpi-blue">
              <div style={{ fontWeight: 800 }}>Completed</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>184</div>
            </div>

            <div className="card kpi-purple">
              <div style={{ fontWeight: 800 }}>Awaiting approval</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>5</div>
            </div>

            <div className="card kpi-green">
              <div style={{ fontWeight: 800 }}>Limit blocked</div>
              <div style={{ fontSize: 46, fontWeight: 950, marginTop: 20 }}>3</div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ marginTop: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
              Create task
            </h2>

            <div className="grid-2" style={{ marginTop: 22 }}>
              <div>
                <label className="label">Task title</label>
                <input className="input" placeholder="Analyze competitor pricing and summarize changes" />
              </div>

              <div>
                <label className="label">Assign agent</label>
                <select className="select">
                  <option>Research Agent</option>
                  <option>Sales Agent</option>
                  <option>Coding Agent</option>
                  <option>Finance Agent</option>
                  <option>Content Swarm</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ marginTop: 18 }}>
              <div>
                <label className="label">Description</label>
                <textarea className="textarea" placeholder="Describe the output, format, deadline, sources and approval rules..." />
              </div>

              <div>
                <label className="label">Execution settings</label>

                <div style={{ display: "grid", gap: 12 }}>
                  <select className="select">
                    <option>Priority: High</option>
                    <option>Priority: Medium</option>
                    <option>Priority: Low</option>
                  </select>

                  <select className="select">
                    <option>Approval required</option>
                    <option>No approval needed</option>
                  </select>

                  <select className="select">
                    <option>Hard usage limit enabled</option>
                    <option>Allow overage with BYOK</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-lime">
                Create Task
              </button>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.04em" }}>
                Task queue
              </h2>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["All", "Running", "Completed", "Awaiting Approval", "Failed", "Limit Blocked"].map((filter) => (
                  <button key={filter} className={filter === "All" ? "btn btn-lime" : "btn btn-soft"}>
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-wrap" style={{ marginTop: 22 }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Agent</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Cost</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.title}>
                      <td>
                        <b>{task.title}</b>
                      </td>

                      <td className="muted">
                        {task.agent}
                      </td>

                      <td>
                        <span className={`badge ${task.badge}`}>
                          {task.status}
                        </span>
                      </td>

                      <td>
                        {task.priority}
                      </td>

                      <td>
                        {task.cost}
                      </td>

                      <td className="muted">
                        {task.updated}
                      </td>

                      <td>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Link href="/tasks/demo-task" className="btn btn-soft">
                            View
                          </Link>

                          <button className="btn btn-secondary">
                            Reset
                          </button>

                          <button className="btn btn-soft">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid-3" style={{ marginTop: 24 }}>
            <div className="card kpi-lime">
              <h3 style={{ marginTop: 0 }}>Never stuck</h3>
              <p>
                If no tasks exist, users see guidance to create their first task, assign an agent and choose approval rules.
              </p>
            </div>

            <div className="card kpi-blue">
              <h3 style={{ marginTop: 0 }}>Cost aware</h3>
              <p>
                Each task shows estimated provider cost and can be blocked if usage limits are reached.
              </p>
            </div>

            <div className="card kpi-purple">
              <h3 style={{ marginTop: 0 }}>Approval ready</h3>
              <p>
                High-impact tasks can pause before execution and wait for human review.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
