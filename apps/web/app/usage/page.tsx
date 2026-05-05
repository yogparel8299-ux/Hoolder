import { ensureUserPlan } from "../../actions/usage";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

function getPeriodKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function Bar({ percent, color }: { percent: number; color: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: 12,
        background: "rgba(255,255,255,0.08)",
        borderRadius: 999,
        overflow: "hidden",
        marginTop: 14
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: color
        }}
      />
    </div>
  );
}

export default async function UsagePage() {
  const user = await requireUser();
  await ensureUserPlan();

  const supabase = await createClient();

  const { data: userPlan } = await supabase
    .from("user_plans")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const { data: plan } = await supabase
    .from("plans")
    .select("*")
    .eq("name", userPlan.plan_name)
    .single();

  const period_key = getPeriodKey();

  const { data: usage } = await supabase
    .from("monthly_usage")
    .select("*")
    .eq("user_id", user.id)
    .eq("period_key", period_key)
    .maybeSingle();

  const tasksUsed = usage?.tasks_used || 0;
  const tokensUsed = usage?.tokens_used || 0;
  const runsUsed = usage?.runs_used || 0;
  const blockedRuns = usage?.blocked_runs || 0;

  const taskPercent = Math.min(100, Math.round((tasksUsed / plan.tasks_limit) * 100));
  const tokenPercent = Math.min(100, Math.round((tokensUsed / plan.token_limit) * 100));

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Usage Protection</div>
          <h1>Hard limits protect your wallet.</h1>
          <p>
            Hoolder blocks execution when users hit plan limits, so AI cost never runs unlimited.
          </p>
        </div>

        <span className="badge">{plan.name.toUpperCase()}</span>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Task creation</h2>
          <p>{tasksUsed} / {plan.tasks_limit} tasks created this month</p>
          <Bar percent={taskPercent} color="#34d399" />
        </div>

        <div className="card">
          <h2>Token budget</h2>
          <p>{tokensUsed} / {plan.token_limit} tokens used this month</p>
          <Bar percent={tokenPercent} color="#60a5fa" />
        </div>
      </div>

      <div className="grid grid-4" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Runs used</h3>
          <h1>{runsUsed}</h1>
        </div>

        <div className="card">
          <h3>Blocked runs</h3>
          <h1>{blockedRuns}</h1>
        </div>

        <div className="card">
          <h3>Estimated cost</h3>
          <h1>${Number(usage?.estimated_cost_usd || 0).toFixed(4)}</h1>
        </div>

        <div className="card">
          <h3>Marketplace fee</h3>
          <h1>{plan.marketplace_fee_percent}%</h1>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Plan limits</h2>
        <p>Companies: {plan.companies_limit}</p>
        <p>Agents: {plan.agents_limit}</p>
        <p>Swarms: {plan.swarms_limit}</p>
        <p>Team members: {plan.team_members_limit}</p>
        <p>BYOK: {plan.byok_enabled ? "Enabled" : "Not included"}</p>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Upgrade logic</h2>
        <p>
          Free users hit value fast but cannot burn unlimited tokens. Paid plans unlock more tasks.
          Pro users can bring their own API key, shifting heavy AI cost away from Hoolder.
        </p>
      </div>
    </div>
  );
}
