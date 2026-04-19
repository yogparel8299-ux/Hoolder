"use server";

import { createClient } from "../lib/supabase/server";

export async function reviewApproval(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const approval_id = String(formData.get("approval_id") || "");
  const status = String(formData.get("status") || "pending");
  const notes = String(formData.get("notes") || "").trim();

  const { data: approval, error: readError } = await supabase
    .from("approvals")
    .select("id, task_run_id")
    .eq("id", approval_id)
    .single();

  if (readError || !approval) throw readError || new Error("Approval not found");

  const { data: run, error: runError } = await supabase
    .from("task_runs")
    .select("task_id")
    .eq("id", approval.task_run_id)
    .single();

  if (runError || !run) throw runError || new Error("Task run not found");

  await supabase.from("approvals").update({
    status,
    reviewed_by: user.id,
    reviewed_at: new Date().toISOString(),
    notes: notes || null
  }).eq("id", approval_id);

  const taskStatus = status === "approved" ? "completed" : "rejected";
  await supabase.from("tasks").update({ status: taskStatus }).eq("id", run.task_id);
}
