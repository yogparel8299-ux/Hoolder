import { cancelInvite, inviteTeamMember } from "../../actions/team";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function TeamPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id,name");

  const { data: invites } = await supabase
    .from("team_invites")
    .select("id,email,role,status,created_at,companies(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Team Workspace</div>
          <h1>Invite people to work with your AI company.</h1>
          <p>
            Add operators, managers, analysts and founders into your Hoolder workspace.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <form action={inviteTeamMember} className="card grid">
          <h2>Invite member</h2>

          <select className="select" name="company_id" required>
            {(companies || []).map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            name="email"
            type="email"
            placeholder="member@email.com"
            required
          />

          <select className="select" name="role">
            <option value="member">Member</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>

          <button className="button" type="submit">
            Send invite
          </button>
        </form>

        <div className="grid">
          {(invites || []).map((invite: any) => (
            <div key={invite.id} className="card">
              <span className="badge">{invite.status}</span>
              <h3 style={{ marginTop: 12 }}>{invite.email}</h3>
              <p>Role: {invite.role}</p>
              <p>Company: {invite.companies?.name || "Company"}</p>

              <form action={cancelInvite} style={{ marginTop: 12 }}>
                <input type="hidden" name="invite_id" value={invite.id} />
                <button className="button" type="submit">
                  Cancel invite
                </button>
              </form>
            </div>
          ))}

          {!invites?.length ? (
            <div className="card">
              <h3>No team invites yet</h3>
              <p>
                Invite your first teammate when you are ready to collaborate.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
