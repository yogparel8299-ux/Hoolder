import { buildCompanyFromPrompt } from "../../actions/builder";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function BuilderPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: requests } = await supabase
    .from("builder_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Company Builder</div>
          <h1>Describe your company. Hoolder creates the operating system.</h1>
          <p>
            Type what you want. Hoolder creates a company, agents, a swarm, and
            an initial task setup automatically.
          </p>
        </div>
      </div>

      <form action={buildCompanyFromPrompt} className="card grid">
        <textarea
          className="textarea"
          name="prompt"
          placeholder="Example: Create a marketing company with content agents, ad copy agents, weekly task workflow and a social media swarm."
          required
        />

        <button className="button" type="submit">
          Build company
        </button>
      </form>

      <div style={{ marginTop: 24 }}>
        <h2>Recent builder requests</h2>

        <div className="grid">
          {(requests || []).map((request) => (
            <div key={request.id} className="card">
              <span className="badge">{request.status}</span>
              <p>{request.prompt}</p>
            </div>
          ))}

          {!requests?.length ? (
            <div className="card">
              <h3>No builder requests yet</h3>
              <p>Use the builder to create your first AI company automatically.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
