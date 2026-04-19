import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  await requireUser();

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="grid grid-3">
        <div className="card"><h3>Companies</h3><p>Manage AI businesses</p></div>
        <div className="card"><h3>Agents</h3><p>Create and supervise agents</p></div>
        <div className="card"><h3>Swarms</h3><p>Run coordinated teams</p></div>
        <div className="card"><h3>Tasks</h3><p>Create and assign work</p></div>
        <div className="card"><h3>Approvals</h3><p>Review outputs before release</p></div>
        <div className="card"><h3>Budgets</h3><p>Track cost and limits</p></div>
      </div>
    </div>
  );
}
