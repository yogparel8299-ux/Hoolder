import { supabaseAdmin } from "../db";
import { runOpenAI } from "../providers/openai";

export async function runSwarmTask(assignment: any) {
  const task = assignment.tasks;

  const { data: members, error } = await supabaseAdmin
    .from("swarm_members")
    .select("agent_id, agents(*)")
    .eq("swarm_id", assignment.swarm_id);

  if (error) throw error;

  const { data: run, error: runError } = await supabaseAdmin
    .from("task_runs")
    .insert({
      task_id: task.id,
      swarm_id: assignment.swarm_id,
      status: "running",
      started_at: new Date().toISOString()
    })
    .select()
    .single();

  if (runError || !run) throw runError;

  try {
    const pieces: string[] = [];
    let totalInput = 0;
    let totalOutput = 0;

    for (const member of members || []) {
      const agent = member.agents;
      if (!agent) continue;

      const result = await runOpenAI({
        systemPrompt: agent.system_prompt,
        role: agent.role,
        title: task.title,
        description: task.description,
        model: agent.model
      });

      totalInput += result.tokens_input;
      totalOutput += result.tokens_output;

      pieces.push(
        [
          `Agent: ${agent.name}`,
          `Role: ${agent.role}`,
          "",
          result.output
        ].join("\n")
      );
    }

    const merged =
      pieces.length > 0
        ? pieces.join("\n\n---\n\n")
        : `Swarm completed task: ${task.title}`;

    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: merged
    });

    await supabaseAdmin
      .from("task_runs")
      .update({
        status: task.requires_approval ? "awaiting_approval" : "completed",
        finished_at: new Date().toISOString(),
        tokens_input: totalInput,
        tokens_output: totalOutput,
        estimated_cost_usd: 0
      })
      .eq("id", run.id);

    if (task.requires_approval) {
      await supabaseAdmin.from("approvals").insert({
        task_run_id: run.id,
        status: "pending"
      });

      await supabaseAdmin
        .from("tasks")
        .update({ status: "awaiting_approval" })
        .eq("id", task.id);
    } else {
      await supabaseAdmin
        .from("tasks")
        .update({ status: "completed" })
        .eq("id", task.id);
    }
  } catch (error) {
    await supabaseAdmin
      .from("task_runs")
      .update({
        status: "failed",
        finished_at: new Date().toISOString()
      })
      .eq("id", run.id);

    await supabaseAdmin
      .from("tasks")
      .update({ status: "failed" })
      .eq("id", task.id);

    throw error;
  }
}
