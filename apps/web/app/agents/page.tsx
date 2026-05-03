import { createAgent } from "../../actions/agents";
import { addAgentSkill, deleteAgentSkill } from "../../actions/skills";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function AgentsPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");

  const { data: agents } = await supabase
    .from("agents")
    .select(`
      *,
      agent_skills (
        id,
        skill_name,
        skill_type
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Agents</div>
          <h1>Create AI workers with skills.</h1>
          <p>
            Give agents roles, models, budgets and skills like coding, spreadsheets,
            research, sales, finance, SQL, or email writing.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <form action={createAgent} className="card grid">
          <h2>Create agent</h2>

          <select className="select" name="company_id" required>
            {(companies || []).map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <input className="input" name="name" placeholder="Agent name" required />
          <input className="input" name="role" placeholder="Role" required />
          <input className="input" name="provider" defaultValue="openai" />
          <input className="input" name="model" defaultValue="gpt-4o-mini" />
          <input className="input" name="monthly_budget_usd" defaultValue="50" />
          <textarea className="textarea" name="description" placeholder="Description" />
          <textarea className="textarea" name="system_prompt" placeholder="System prompt" />

          <button className="button" type="submit">
            Create agent
          </button>
        </form>

        <div className="grid">
          {(agents || []).map((agent: any) => (
            <div key={agent.id} className="card">
              <span className="badge">{agent.provider} / {agent.model}</span>
              <h2 style={{ marginTop: 14 }}>{agent.name}</h2>
              <p>{agent.role}</p>
              <p>Budget: ${Number(agent.monthly_budget_usd).toFixed(2)}</p>

              <h3 style={{ marginTop: 18 }}>Skills</h3>

              <div className="grid">
                {(agent.agent_skills || []).map((skill: any) => (
                  <div
                    key={skill.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      borderTop: "1px solid var(--border)",
                      paddingTop: 10
                    }}
                  >
                    <div>
                      <strong>{skill.skill_name}</strong>
                      <p>{skill.skill_type}</p>
                    </div>

                    <form action={deleteAgentSkill}>
                      <input type="hidden" name="skill_id" value={skill.id} />
                      <button className="button" type="submit">
                        Remove
                      </button>
                    </form>
                  </div>
                ))}

                {!agent.agent_skills?.length ? (
                  <p>No skills yet. Add one below.</p>
                ) : null}
              </div>

              <form action={addAgentSkill} className="grid" style={{ marginTop: 16 }}>
                <input type="hidden" name="agent_id" value={agent.id} />

                <input
                  className="input"
                  name="skill_name"
                  placeholder="Skill name e.g. Python, Google Sheets, Sales Research"
                  required
                />

                <select className="select" name="skill_type">
                  <option value="general">General</option>
                  <option value="code">Code</option>
                  <option value="spreadsheet">Spreadsheet</option>
                  <option value="email">Email</option>
                  <option value="research">Research</option>
                  <option value="finance">Finance</option>
                  <option value="sales">Sales</option>
                  <option value="custom">Custom</option>
                </select>

                <button className="button" type="submit">
                  Add skill
                </button>
              </form>
            </div>
          ))}

          {!agents?.length ? (
            <div className="card">
              <h3>No agents yet</h3>
              <p>Create your first agent, then add skills to make it useful.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
