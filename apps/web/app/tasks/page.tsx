import { assignTask, createTask } from "../../actions/tasks";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function TasksPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: goals } = await supabase.from("goals").select("id,title");
  const { data: agents } = await supabase.from("agents").select("id,name");
  const { data: swarms } = await supabase.from("swarms").select("id,name");
  const { data: tasks } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Tasks</h1>
      <div className="grid grid-2">
        <div className="grid">
          <form action={createTask} className="card grid">
            <h3>Create task</h3>
            <select className="select" name="company_id">
              {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="select" name="goal_id">
              <option value="">No goal</option>
              {(goals || []).map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
            <input className="input" name="title" placeholder="Task title" />
            <textarea className="textarea" name="description" placeholder="Task description" />
            <select className="select" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select className="select" name="requires_approval">
              <option value="true">Approval required</option>
              <option value="false">No approval</option>
            </select>
            <button className="button" type="submit">Create task</button>
          </form>

          <form action={assignTask} className="card grid">
            <h3>Assign task</h3>
            <select className="select" name="task_id">
              {(tasks || []).map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
            <select className="select" name="assignment_type">
              <option value="agent">Single agent</option>
              <option value="swarm">Swarm</option>
            </select>
            <select className="select" name="agent_id">
              <option value="">Choose agent</option>
              {(agents || []).map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <select className="select" name="swarm_id">
              <option value="">Choose swarm</option>
              {(swarms || []).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <button className="button" type="submit">Assign task</button>
          </form>
        </div>

        <div className="grid">
          {(tasks || []).map((task) => (
            <div key={task.id} className="card">
              <h3>{task.title}</h3>
              <p>{task.description || "No description"}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
