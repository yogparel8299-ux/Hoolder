import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id");
  const { data: agents } = await supabase.from("agents").select("id");
  const { data: tasks } = await supabase.from("tasks").select("status");

  const totalCompanies = companies?.length || 0;
  const totalAgents = agents?.length || 0;
  const totalTasks = tasks?.length || 0;
  const runningTasks = tasks?.filter((t) => t.status === "running").length || 0;

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="grid grid-4">
        <div className="card">
          <h3>Companies</h3>
          <p>{totalCompanies}</p>
        </div>

        <div className="card">
          <h3>Agents</h3>
          <p>{totalAgents}</p>
        </div>

        <div className="card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="card">
          <h3>Running</h3>
          <p>{runningTasks}</p>
        </div>
      </div>
    </div>
  );
}
