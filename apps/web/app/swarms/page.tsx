import { createSwarm } from "../../actions/swarms";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function SwarmsPage() {
  await requireUser();

  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id,name");

  const { data: swarms } = await supabase
    .from("swarms")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <h1>Swarms</h1>

      <div className="grid grid-2">
        <form action={createSwarm} className="card grid">
          <h3>Create swarm</h3>

          <select className="select" name="company_id">
            {(companies || []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input className="input" name="name" placeholder="Swarm name" />

          <button className="button" type="submit">
            Create swarm
          </button>
        </form>

        <div className="grid">
          {(swarms || []).map((swarm) => (
            <div key={swarm.id} className="card">
              <h3>{swarm.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
