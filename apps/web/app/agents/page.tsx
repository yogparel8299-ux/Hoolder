import { createAgent } from "../../actions/agents";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function AgentsPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: agents } = await supabase.from("agents").select("*").order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Agents</h1>

      <div className="grid grid-2">
        <form action={createAgent} className="card grid">
          <h3>Create agent</h3>

          <select className="select" name="company_id">
            {(companies || []).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input className="input" name="name" placeholder="Agent name" />
          <input className="input" name="role" placeholder="Role" />
          <input className="input" name="provider" defaultValue="openai" />
          <input className="input" name="model" defaultValue="gpt-4o-mini" />
          <input className="input" name="monthly_budget_usd" defaultValue="50" />
          <textarea className="textarea" name="description" placeholder="Description" />
          <textarea className="textarea" name="system_prompt" placeholder="System prompt" />

          <button className="button" type="submit">Create agent</button>
        </form>

        <div className="grid">
          {(agents || []).map((agent) => (
            <div key={agent.id} className="card">
              <h3>{agent.name}</h3>
              <p>{agent.role}</p>
              <p>{agent.provider} / {agent.model}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
