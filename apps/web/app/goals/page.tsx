import { createGoal } from "../../actions/goals";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function GoalsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: goals } = await supabase.from("goals").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Goals</h1>
      <div className="grid grid-2">
        <form action={createGoal} className="card grid">
          <h3>Create goal</h3>
          <select className="select" name="company_id">
            {(companies || []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input className="input" name="title" placeholder="Goal title" />
          <textarea className="textarea" name="description" placeholder="Goal description" />
          <select className="select" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button className="button" type="submit">Create goal</button>
        </form>
        <div className="grid">
          {(goals || []).map((goal) => (
            <div key={goal.id} className="card">
              <h3>{goal.title}</h3>
              <p>{goal.description || "No description"}</p>
              <p>{goal.priority}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
