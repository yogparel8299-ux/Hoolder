"use server";

import { createClient } from "../lib/supabase/server";

function getNextRun(frequency: string) {
  const now = new Date();

  if (frequency === "daily") {
    now.setDate(now.getDate() + 1);
  } else if (frequency === "weekly") {
    now.setDate(now.getDate() + 7);
  } else if (frequency === "monthly") {
    now.setMonth(now.getMonth() + 1);
  } else {
    now.setDate(now.getDate() + 1);
  }

  return now.toISOString();
}

export async function createSchedule(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const company_id = String(formData.get("company_id") || "");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const priority = String(formData.get("priority") || "medium");
  const frequency = String(formData.get("frequency") || "daily");
  const requires_approval =
    String(formData.get("requires_approval") || "true") === "true";

  if (!company_id || !title) {
    throw new Error("Missing schedule fields");
  }

  const { error } = await supabase.from("task_schedules").insert({
    company_id,
    created_by: user.id,
    title,
    description: description || null,
    priority,
    frequency,
    next_run_at: getNextRun(frequency),
    requires_approval,
    is_active: true
  });

  if (error) throw error;
}

export async function runScheduleNow(formData: FormData) {
  const supabase = await createClient();

  const schedule_id = String(formData.get("schedule_id") || "");

  if (!schedule_id) throw new Error("Missing schedule id");

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: schedule, error } = await supabase
    .from("task_schedules")
    .select("*")
    .eq("id", schedule_id)
    .eq("created_by", user.id)
    .single();

  if (error || !schedule) throw error;

  const { error: taskError } = await supabase.from("tasks").insert({
    company_id: schedule.company_id,
    title: schedule.title,
    description: schedule.description,
    priority: schedule.priority,
    created_by: user.id,
    requires_approval: schedule.requires_approval,
    status: "pending"
  });

  if (taskError) throw taskError;

  await supabase
    .from("task_schedules")
    .update({
      last_run_at: new Date().toISOString(),
      next_run_at: getNextRun(schedule.frequency)
    })
    .eq("id", schedule.id);
}

export async function toggleSchedule(formData: FormData) {
  const supabase = await createClient();

  const schedule_id = String(formData.get("schedule_id") || "");
  const is_active = String(formData.get("is_active") || "false") === "true";

  if (!schedule_id) throw new Error("Missing schedule id");

  const { error } = await supabase
    .from("task_schedules")
    .update({
      is_active: !is_active
    })
    .eq("id", schedule_id);

  if (error) throw error;
}

export async function deleteSchedule(formData: FormData) {
  const supabase = await createClient();

  const schedule_id = String(formData.get("schedule_id") || "");

  if (!schedule_id) throw new Error("Missing schedule id");

  const { error } = await supabase
    .from("task_schedules")
    .delete()
    .eq("id", schedule_id);

  if (error) throw error;
}
