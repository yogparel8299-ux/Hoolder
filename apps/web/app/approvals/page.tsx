import { reviewApproval } from "../../actions/approvals";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function ApprovalsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: approvals } = await supabase.from("approvals").select("*").order("reviewed_at", { ascending: false, nullsFirst: true });

  return (
    <div className="container">
      <h1>Approvals</h1>
      <div className="grid">
        {(approvals || []).map((approval) => (
          <form key={approval.id} action={reviewApproval} className="card grid">
            <h3>Approval #{approval.id}</h3>
            <p>Status: {approval.status}</p>
            <input type="hidden" name="approval_id" value={approval.id} />
            <select className="select" name="status" defaultValue="approved">
              <option value="approved">Approve</option>
              <option value="rejected">Reject</option>
            </select>
            <textarea className="textarea" name="notes" placeholder="Review notes" />
            <button className="button" type="submit">Submit review</button>
          </form>
        ))}
      </div>
    </div>
  );
}
