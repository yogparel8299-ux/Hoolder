import { supabaseAdmin } from "./db";

function getPeriodKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function canRunTask(task: any) {
  const userId = task.created_by;
  const periodKey = getPeriodKey();

  let { data: userPlan } = await supabaseAdmin
    .from("user_plans")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!userPlan) {
    const inserted = await supabaseAdmin
      .from("user_plans")
      .insert({
        user_id: userId,
        plan_name: "free",
        status: "active"
      })
      .select()
      .single();

    userPlan = inserted.data;
  }

  const { data: plan } = await supabaseAdmin
    .from("plans")
    .select("*")
    .eq("name", userPlan.plan_name)
    .single();

  let { data: usage } = await supabaseAdmin
    .from("monthly_usage")
    .select("*")
    .eq("user_id", userId)
    .eq("period_key", periodKey)
    .maybeSingle();

  if (!usage) {
    const insertedUsage = await supabaseAdmin
      .from("monthly_usage")
      .insert({
        user_id: userId,
        company_id: task.company_id,
        period_key: periodKey
      })
      .select()
      .single();

    usage = insertedUsage.data;
  }

  if (usage.tasks_used >= plan.tasks_limit) {
    return {
      allowed: false,
      reason: `Task limit reached for ${plan.name} plan.`
    };
  }

  if (usage.tokens_used >= plan.token_limit) {
    return {
      allowed: false,
      reason: `Token limit reached for ${plan.name} plan.`
    };
  }

  return {
    allowed: true,
    plan,
    usage
  };
}

export async function recordUsage(task: any, inputTokens: number, outputTokens: number, costUsd: number) {
  const periodKey = getPeriodKey();

  const { data: usage } = await supabaseAdmin
    .from("monthly_usage")
    .select("*")
    .eq("user_id", task.created_by)
    .eq("period_key", periodKey)
    .maybeSingle();

  if (!usage) return;

  await supabaseAdmin
    .from("monthly_usage")
    .update({
      runs_used: (usage.runs_used || 0) + 1,
      tokens_used: (usage.tokens_used || 0) + inputTokens + outputTokens,
      estimated_cost_usd: Number(usage.estimated_cost_usd || 0) + costUsd
    })
    .eq("id", usage.id);
}

export async function recordBlockedRun(task: any, reason: string) {
  const periodKey = getPeriodKey();

  const { data: usage } = await supabaseAdmin
    .from("monthly_usage")
    .select("*")
    .eq("user_id", task.created_by)
    .eq("period_key", periodKey)
    .maybeSingle();

  if (usage) {
    await supabaseAdmin
      .from("monthly_usage")
      .update({
        blocked_runs: (usage.blocked_runs || 0) + 1
      })
      .eq("id", usage.id);
  }

  await supabaseAdmin
    .from("tasks")
    .update({
      status: "limit_blocked",
      limit_block_reason: reason
    })
    .eq("id", task.id);
}
