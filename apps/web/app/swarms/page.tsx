import { addSwarmMember, createSwarm, removeSwarmMember } from "../../actions/swarms";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function SwarmsPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase.from("companies").select("id,name");
  const { data: agents } = await supabase.from("agents").select("id,name");

  const { data: swarms } = await supabase
    .from("swarms")
    .select(`
      id,
      name,
      objective,
      topology,
      swarm_members (
        agent_id,
        role,
        agents (id, name)
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Swarms</h1>

      <div className="grid grid-2">
        <form action={createSwarm} className="card grid">
          <h3>Create swarm</h3>

          <select className="select" name="company_id">
            {(companies || []).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input className="input" name="name" placeholder="Swarm name" />
          <textarea className="textarea" name="objective" placeholder="Objective" />

          <select className="select" name="topology">
            <option value="mesh">Mesh</option>
            <option value="hierarchy">Hierarchy</option>
          </select>

          <button className="button" type="submit">
            Create swarm
          </button>
        </form>

        <div className="grid">
          {(swarms || []).map((swarm: any) => (
            <div key={swarm.id} className="card">
              <h3>{swarm.name}</h3>
              <p>{swarm.objective || "No objective"}</p>

              <h4 style={{ marginTop: 12 }}>Members</h4>

              {(swarm.swarm_members || []).map((m: any) => (
                <div key={m.agent_id} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{m.agents?.name}</span>

                  <form action={removeSwarmMember}>
                    <input type="hidden" name="swarm_id" value={swarm.id} />
                    <input type="hidden" name="agent_id" value={m.agent_id} />
                    <button className="button" type="submit">
                      Remove
                    </button>
                  </form>
                </div>
              ))}

              <form action={addSwarmMember} style={{ marginTop: 12 }}>
                <input type="hidden" name="swarm_id" value={swarm.id} />

                <select className="select" name="agent_id">
                  {(agents || []).map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>

                <select className="select" name="role">
                  <option value="member">Member</option>
                  <option value="leader">Leader</option>
                </select>

                <button className="button" type="submit">
                  Add member
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
