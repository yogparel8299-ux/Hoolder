import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .limit(5);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Dashboard</div>
          <h1>Operate your AI company</h1>
          <p>Start by creating agents, tasks, or swarms.</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-4">
        <Link href="/companies" className="card">
          <h3>Create Company</h3>
          <p>Start a new AI workspace</p>
        </Link>

        <Link href="/agents" className="card">
          <h3>Create Agent</h3>
          <p>Define roles and prompts</p>
        </Link>

        <Link href="/tasks" className="card">
          <h3>Create Task</h3>
          <p>Give work to agents</p>
        </Link>

        <Link href="/swarms" className="card">
          <h3>Create Swarm</h3>
          <p>Group multiple agents</p>
        </Link>
      </div>

      {/* RECENT TASKS */}
      <div style={{ marginTop: 28 }}>
        <h2>Recent Tasks</h2>

        <div className="grid">
          {(tasks || []).map((task) => (
            <Link
              key={task.id}
              href={`/tasks/${task.id}`}
              className="card"
            >
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
            </Link>
          ))}

          {!tasks?.length && (
            <div className="card">
              <p>No tasks yet</p>
            </div>
          )}
        </div>
      </div>

      {/* AGENTS */}
      <div style={{ marginTop: 28 }}>
        <h2>Your Agents</h2>

        <div className="grid">
          {(agents || []).map((agent) => (
            <div key={agent.id} className="card">
              <h3>{agent.name}</h3>
              <p>{agent.role}</p>
            </div>
          ))}

          {!agents?.length && (
            <div className="card">
              <p>No agents created</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
