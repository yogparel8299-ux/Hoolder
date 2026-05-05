import { supabaseAdmin } from "./db";

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

export async function processDueSchedules() {
  const now = new Date().toISOString();

  const { data: schedules, error } = await supabaseAdmin
    .from("task_schedules")
    .select("*")
    .eq("is_active", true)
    .lte("next_run_at", now)
    .limit(10);

  if (error) {
    console.error("Schedule fetch failed", error);
    return;
  }

  for (const schedule of schedules || []) {
    try {
      await supabaseAdmin.from("tasks").insert({
        company_id: schedule.company_id,
        title: schedule.title,
        description: schedule.description,
        priority: schedule.priority,
        created_by: schedule.created_by,
        requires_approval: schedule.requires_approval,
        status: "pending"
      });

      await supabaseAdmin
        .from("task_schedules")
        .update({
          last_run_at: new Date().toISOString(),
          next_run_at: getNextRun(schedule.frequency)
        })
        .eq("id", schedule.id);
    } catch (error) {
      console.error("Schedule run failed", schedule.id, error);
    }
  }
}
