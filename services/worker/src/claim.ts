import { supabaseAdmin } from "./db";

export async function getClaimableAssignments() {
  const { data, error } = await supabaseAdmin
    .from("task_assignments")
    .select("*, tasks(*)")
    .order("assigned_at", { ascending: true });

  if (error) throw error;
  return (data || []).filter((row: any) => row.tasks?.status === "queued");
}

export async function claimTask(taskId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("tasks")
    .update({ status: "running", claimed_at: now })
    .eq("id", taskId)
    .eq("status", "queued")
    .select("id")
    .maybeSingle();

  if (error) throw error;
  return !!data;
}
