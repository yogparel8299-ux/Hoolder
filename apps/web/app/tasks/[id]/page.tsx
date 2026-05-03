import Link from "next/link";
import { addTaskComment } from "../../../actions/team";
import { createClient } from "../../../lib/supabase/server";
import { requireUser } from "../../../lib/auth";

export default async function TaskDetailPage({ params }: any) {
  await requireUser();
  const supabase = await createClient();

  const { data: task } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", params.id)
    .single();

  const { data: runs } = await supabase
    .from("task_runs")
    .select(`
      id,
      status,
      started_at,
      finished_at,
      tokens_input,
      tokens_output,
      estimated_cost_usd,
      task_outputs (
        id,
        output_text,
        created_at
      ),
      approvals (
        id,
        status,
        notes,
        reviewed_at
      )
    `)
    .eq("task_id", params.id)
    .order("started_at", { ascending: false });

  const { data: comments } = await supabase
    .from("task_comments")
    .select("id,comment,created_at")
    .eq("task_id", params.id)
    .order("created_at", { ascending: false });

  if (!task) {
    return (
      <div className="container">
        <h1>Task not found</h1>
        <Link className="button" href="/tasks">Back to tasks</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <Link className="button" href="/tasks">← Back to tasks</Link>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="page-kicker">Task Detail</div>
        <h1>{task.title}</h1>
        <p>{task.description || "No description"}</p>
        <p>
  Status: <span className="badge">{task.status}</span>
</p>
        <p>Priority: {task.priority}</p>
      </div>

      <div className="grid grid-2" style={{ marginTop: 18 }}>
        {/* LEFT SIDE */}
        <div className="grid">
          <h2>Runs & Outputs</h2>

          {(runs || []).map((run: any) => {
            const output = run.task_outputs?.[0];
            const approval = run.approvals?.[0];

            return (
              <div key={run.id} className="card">
                <h3>Run</h3>
                <p>Status: {run.status}</p>
                <p>Started: {run.started_at || "Not started"}</p>
                <p>Finished: {run.finished_at || "Not finished"}</p>
                <p>Tokens: {run.tokens_input} in / {run.tokens_output} out</p>
                <p>Cost: ${Number(run.estimated_cost_usd).toFixed(4)}</p>

                <div className="card" style={{ marginTop: 12 }}>
                  <h4>Output</h4>
                  <pre style={{ whiteSpace: "pre-wrap" }}>
                    {output?.output_text || "No output yet"}
                  </pre>
                </div>

                <div className="card" style={{ marginTop: 12 }}>
                  <h4>Approval</h4>
                  <p>Status: {approval?.status || "No approval record"}</p>
                  <p>Notes: {approval?.notes || "No notes"}</p>
                </div>
              </div>
            );
          })}

          {!runs?.length && (
            <div className="card">
              <h3>No runs yet</h3>
              <p>Assign this task to an agent or swarm to create a run.</p>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="grid">
          <h2>Team Comments</h2>

          <form action={addTaskComment} className="card grid">
            <input type="hidden" name="task_id" value={task.id} />
            <textarea
              className="textarea"
              name="comment"
              placeholder="Add a team note or instruction..."
              required
            />
            <button className="button" type="submit">
              Add comment
            </button>
          </form>

          {(comments || []).map((comment) => (
            <div key={comment.id} className="card">
              <p>{comment.comment}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))}

          {!comments?.length && (
            <div className="card">
              <h3>No comments yet</h3>
              <p>Use comments to discuss this task with your team.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
