import { supabaseAdmin } from "../db";
import { runOpenAI } from "../providers/openai";

async function getUserProviderKey(userId: string, providerName: string) {
  const { data } = await supabaseAdmin
    .from("provider_keys")
    .select("api_key")
    .eq("user_id", userId)
    .eq("provider_name", providerName)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return data?.api_key || null;
}

async function getAgentMemory(agentId: string) {
  const { data } = await supabaseAdmin
    .from("agent_memories")
    .select("memory_text")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false })
    .limit(5);

  return (data || []).map((m) => `- ${m.memory_text}`).join("\n");
}

function trimMemory(text: string) {
  return text.length > 1200 ? `${text.slice(0, 1200)}...` : text;
}

export async function runSingleAgentTask(assignment: any) {
  const task = assignment.tasks;

  const { data: agent, error: agentError } = await supabaseAdmin
    .from("agents")
    .select("*")
    .eq("id", assignment.agent_id)
    .maybeSingle();

  if (agentError || !agent) {
    await supabaseAdmin
      .from("tasks")
      .update({ status: "failed" })
      .eq("id", task.id);

    throw new Error("Agent not found");
  }

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
    const userKey = await getUserProviderKey(task.created_by, agent.provider);
    const memory = await getAgentMemory(agent.id);

    const result = await runOpenAI({
      apiKey: userKey,
      systemPrompt: agent.system_prompt,
      role: agent.role,
      title: task.title,
      description: task.description,
      model: agent.model,
      memory
    });

    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: result.output
    });

    await supabaseAdmin.from("agent_memories").insert({
      agent_id: agent.id,
      task_id: task.id,
      memory_text: trimMemory(result.output),
      memory_type: "task_output",
      importance: 1
    });

    await supabaseAdmin
      .from("task_runs")
      .update({
        status: task.requires_approval ? "awaiting_approval" : "completed",
        finished_at: new Date().toISOString(),
        tokens_input: result.tokens_input,
        tokens_output: result.tokens_output,
        estimated_cost_usd: result.cost_usd
      })
      .eq("id", run.id);

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
  } catch (error: any) {
    await supabaseAdmin.from("task_outputs").insert({
      task_run_id: run.id,
      output_text: `Execution failed: ${error?.message || "Unknown error"}`
    });

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
