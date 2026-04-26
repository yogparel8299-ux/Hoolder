import { reviewApproval } from "../../actions/approvals";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function ApprovalsPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: approvals } = await supabase
    .from("approvals")
    .select(`
      id,
      status,
      notes,
      reviewed_at,
      task_runs (
        id,
        task_id,
        status,
        task_outputs (
          id,
          output_text,
          created_at
        ),
        tasks (
          title,
          description
        )
      )
    `)
    .order("reviewed_at", { ascending: false, nullsFirst: true });

  return (
    <div className="container">
      <h1>Approvals</h1>

      <div className="grid">
        {(approvals || []).map((approval: any) => {
          const run = approval.task_runs;
          const task = run?.tasks;
          const output = run?.task_outputs?.[0];

          return (
            <div key={approval.id} className="card">
              <h3>{task?.title || "Untitled task"}</h3>
              <p>Status: {approval.status}</p>
              <p>{task?.description || "No task description"}</p>

              <div className="card" style={{ marginTop: 12 }}>
                <h4>Agent Output</h4>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {output?.output_text || "No output yet"}
                </pre>
              </div>

              {approval.status === "pending" ? (
                <form action={reviewApproval} className="grid" style={{ marginTop: 12 }}>
                  <input type="hidden" name="approval_id" value={approval.id} />

                  <textarea
                    className="textarea"
                    name="notes"
                    placeholder="Review notes"
                  />

                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="button" name="status" value="approved" type="submit">
                      Approve
                    </button>

                    <button className="button" name="status" value="rejected" type="submit">
                      Reject
                    </button>
                  </div>
                </form>
              ) : null}
            </div>
          );
        })}

        {!approvals?.length ? (
          <div className="card">
            <h3>No approvals yet</h3>
            <p>Completed agent work that needs review will appear here.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
