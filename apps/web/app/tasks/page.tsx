import { createTask } from "../../actions/tasks";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function TasksPage() {
  await requireUser();

  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id,name");

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Tasks</h1>

      <div className="grid grid-2">
        <form action={createTask} className="card grid">
          <h3>Create task</h3>

          <select className="select" name="company_id">
            {(companies || []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input className="input" name="title" placeholder="Task title" />
          <textarea className="textarea" name="description" placeholder="Description" />

          <label>
            <input type="checkbox" name="requires_approval" /> Requires approval
          </label>

          <button className="button" type="submit">
            Create task
          </button>
        </form>

        <div className="grid">
          {(tasks || []).map((task) => (
            <div key={task.id} className="card">
              <h3>{task.title}</h3>
              <p>{task.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
