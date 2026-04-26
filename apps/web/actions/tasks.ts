"use server";

import { createClient } from "../lib/supabase/server";

export async function createTask(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const goal_id = String(formData.get("goal_id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");
  const requires_approval =
    String(formData.get("requires_approval") || "true") === "true";

  if (!company_id || !title) {
    throw new Error("Missing fields");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      company_id,
      goal_id: goal_id || null,
      title,
      description: description || null,
      priority,
      created_by: user.id,
      requires_approval
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function assignTask(formData: FormData) {
  const supabase = await createClient();

  const task_id = String(formData.get("task_id") || "");
  const assignment_type = String(formData.get("assignment_type") || "");
  const agent_id = String(formData.get("agent_id") || "");
  const swarm_id = String(formData.get("swarm_id") || "");

  if (!task_id || !assignment_type) {
    throw new Error("Missing fields");
  }

  const payload =
    assignment_type === "agent"
      ? { task_id, assignment_type, agent_id: agent_id || null, swarm_id: null }
      : { task_id, assignment_type, agent_id: null, swarm_id: swarm_id || null };

  const { data, error } = await supabase
    .from("task_assignments")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from("tasks")
    .update({ status: "queued", claimed_at: null })
    .eq("id", task_id);

  return data;
}

export async function resetTask(formData: FormData) {
  const supabase = await createClient();

  const task_id = String(formData.get("task_id") || "");

  if (!task_id) throw new Error("Missing task id");

  await supabase
    .from("tasks")
    .update({
      status: "pending",
      claimed_at: null
    })
    .eq("id", task_id);

  await supabase.from("task_runs").delete().eq("task_id", task_id);
  await supabase.from("task_assignments").delete().eq("task_id", task_id);
}

export async function deleteTask(formData: FormData) {
  const supabase = await createClient();

  const task_id = String(formData.get("task_id") || "");

  if (!task_id) throw new Error("Missing task id");

  await supabase.from("tasks").delete().eq("id", task_id);
}
