import "dotenv/config";

import { supabaseAdmin } from "./db";
import { runSingleAgentTask } from "./runners/single-agent";
import { runSwarmTask } from "./runners/swarm";
import { processDueSchedules } from "./schedules";

async function tick() {
  await processDueSchedules();

  const { data: assignments, error } = await supabaseAdmin
    .from("task_assignments")
    .select("*, tasks(*)")
    .eq("status", "queued")
    .limit(5);

  if (error) {
    console.error("Worker fetch failed", error);
    return;
  }

  for (const assignment of assignments || []) {
    try {
      await supabaseAdmin
        .from("task_assignments")
        .update({ status: "running" })
        .eq("id", assignment.id);

      await supabaseAdmin
        .from("tasks")
        .update({ status: "running", claimed_at: new Date().toISOString() })
        .eq("id", assignment.task_id);

      if (assignment.assignment_type === "swarm") {
        await runSwarmTask(assignment);
      } else {
        await runSingleAgentTask(assignment);
      }

      await supabaseAdmin
        .from("task_assignments")
        .update({ status: "completed" })
        .eq("id", assignment.id);
    } catch (error) {
      console.error("Worker tick failed", error);

      await supabaseAdmin
        .from("task_assignments")
        .update({ status: "failed" })
        .eq("id", assignment.id);
    }
  }
}

async function main() {
  console.log("Hoolder worker started");

  while (true) {
    await tick();
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
}

main();
