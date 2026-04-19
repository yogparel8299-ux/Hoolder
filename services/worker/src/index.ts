import { getClaimableAssignments, claimTask } from "./claim";
import { runSingleAgentTask } from "./runners/single-agent";
import { runSwarmTask } from "./runners/swarm";

async function tick() {
  const assignments = await getClaimableAssignments();

  for (const assignment of assignments) {
    const task = assignment.tasks;
    if (!task?.id) continue;

    const claimed = await claimTask(task.id);
    if (!claimed) continue;

    if (assignment.assignment_type === "agent") {
      await runSingleAgentTask(assignment);
    } else {
      await runSwarmTask(assignment);
    }
  }
}

async function main() {
  console.log("Hoolder worker started");

  while (true) {
    try {
      await tick();
    } catch (error) {
      console.error("Worker tick failed", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 8000));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
