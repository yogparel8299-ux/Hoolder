import { supabaseAdmin } from "../db";
import { runOpenAI } from "../providers/openai";

export async function runSingleAgentTask(assignment: any) {
  const task = assignment.tasks;

  const { data: agent, error: agentError } = await supabaseAdmin
    .from("agents")
    .select("*")
    .eq("id", assignment.agent_id)
    .single();

  if (agentError || !agent) throw new Error("Agent not found");

  const { data: run, error: runError } = await supabaseAdmin
    .from("task_runs")
    .insert({
      task_id: task.id,
      agent_id: agent.id,
      status: "running",
      started_at: new Date().toISOString()
    })
    .select()
    .single();

  if (runError || !run) throw runError;

  try {
    const result = await runOpenAI({
      systemPrompt: agent.system_prompt,
      role: agent.role,
      title: task.title,
      description: task.description,
      model: agent.model
    });

    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: result.output
    });

    await supabaseAdmin.from("task_runs").update({
      status: task.requires_approval ? "awaiting_approval" : "completed",
      finished_at: new Date().toISOString(),
      tokens_input: result.tokens_input,
      tokens_output: result.tokens_output,
      estimated_cost_usd: result.cost_usd
    }).eq("id", run.id);

    await supabaseAdmin.from("usage_logs").insert({
      company_id: task.company_id,
      agent_id: agent.id,
      task_run_id: run.id,
      provider: agent.provider,
      model: agent.model,
      tokens_input: result.tokens_input,
      tokens_output: result.tokens_output,
      cost_usd: result.cost_usd
    });

    await supabaseAdmin.from("activity_logs").insert({
      company_id: task.company_id,
      actor_type: "agent",
      actor_id: agent.id,
      action: "task_run_finished",
      entity_type: "task",
      entity_id: task.id,
      metadata: { run_id: run.id }
    });

    if (task.requires_approval) {
      await supabaseAdmin.from("approvals").insert({
        task_run_id: run.id,
        status: "pending"
      });

      await supabaseAdmin.from("tasks").update({ status: "awaiting_approval" }).eq("id", task.id);
    } else {
      await supabaseAdmin.from("tasks").update({ status: "completed" }).eq("id", task.id);
    }
  } catch (error) {
    await supabaseAdmin.from("task_runs").update({
      status: "failed",
      finished_at: new Date().toISOString()
    }).eq("id", run.id);

    await supabaseAdmin.from("tasks").update({ status: "failed" }).eq("id", task.id);
    throw error;
  }
}
