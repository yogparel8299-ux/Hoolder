import Link from "next/link";
import { assignTask, createTask, deleteTask, resetTask } from "../../actions/tasks";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function TasksPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: agents } = await supabase.from("agents").select("id,name");
  const { data: swarms } = await supabase.from("swarms").select("id,name");
  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Tasks</h1>

      <div className="grid grid-2">
        <div className="grid">
          <form action={createTask} className="card grid">
            <h3>Create task</h3>

            <select className="select" name="company_id" required>
              {(companies || []).map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>

            <input className="input" name="title" placeholder="Task title" required />
            <textarea className="textarea" name="description" placeholder="Task description" />

            <select className="select" name="priority">
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>

            <select className="select" name="requires_approval">
              <option value="true">Approval required</option>
              <option value="false">No approval</option>
            </select>

            <button className="button" type="submit">
              Create task
            </button>
          </form>

          <form action={assignTask} className="card grid">
            <h3>Assign task</h3>

            <select className="select" name="task_id" required>
              {(tasks || []).map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>

            <select className="select" name="assignment_type">
              <option value="agent">Agent</option>
              <option value="swarm">Swarm</option>
            </select>

            <select className="select" name="agent_id">
              <option value="">Choose agent</option>
              {(agents || []).map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>

            <select className="select" name="swarm_id">
              <option value="">Choose swarm</option>
              {(swarms || []).map((swarm) => (
                <option key={swarm.id} value={swarm.id}>
                  {swarm.name}
                </option>
              ))}
            </select>

            <button className="button" type="submit">
              Assign task
            </button>
          </form>
        </div>

        <div className="grid">
          {(tasks || []).map((task) => (
            <div key={task.id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <form action={resetTask}>
                  <input type="hidden" name="task_id" value={task.id} />
                  <button className="button" type="submit">
                    Reset
                  </button>
                </form>

                <form action={deleteTask}>
                  <input type="hidden" name="task_id" value={task.id} />
                  <button className="button" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
