import { ensureUserPlan } from "../../actions/usage";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

function getPeriodKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
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

  const taskPercent = Math.min(100, Math.round((tasksUsed / plan.tasks_limit) * 100));
  const tokenPercent = Math.min(100, Math.round((tokensUsed / plan.token_limit) * 100));

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Usage & Limits</div>
          <h1>Control AI cost before it controls you.</h1>
          <p>
            Hoolder uses hard limits to keep free users attractive but profitable.
          </p>
        </div>

        <span className="badge">{plan.name.toUpperCase()}</span>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Tasks</h2>
          <p>{tasksUsed} / {plan.tasks_limit} tasks used this month</p>

          <div style={{
            width: "100%",
            height: 12,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 999,
            overflow: "hidden",
            marginTop: 14
          }}>
            <div style={{
              width: `${taskPercent}%`,
              height: "100%",
              background: "#34d399"
            }} />
          </div>
        </div>

        <div className="card">
          <h2>Tokens</h2>
          <p>{tokensUsed} / {plan.token_limit} token budget used</p>

          <div style={{
            width: "100%",
            height: 12,
            background: "rgba(255,255,255,0.08)",
            borderRadius: 999,
            overflow: "hidden",
            marginTop: 14
          }}>
            <div style={{
              width: `${tokenPercent}%`,
              height: "100%",
              background: "#60a5fa"
            }} />
          </div>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Companies</h3>
          <p>Limit: {plan.companies_limit}</p>
        </div>

        <div className="card">
          <h3>Agents</h3>
          <p>Limit: {plan.agents_limit}</p>
        </div>

        <div className="card">
          <h3>Swarms</h3>
          <p>Limit: {plan.swarms_limit}</p>
        </div>

        <div className="card">
          <h3>Team Members</h3>
          <p>Limit: {plan.team_members_limit}</p>
        </div>

        <div className="card">
          <h3>Marketplace Fee</h3>
          <p>{plan.marketplace_fee_percent}% per dataset sale</p>
        </div>

        <div className="card">
          <h3>BYOK</h3>
          <p>{plan.byok_enabled ? "Enabled" : "Not included"}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <h2>Profit protection logic</h2>
        <p>
          Free users can try Hoolder, but heavy usage is blocked before it burns AI credits.
          Paid users unlock higher limits. Pro users can bring their own API key.
        </p>
      </div>
    </div>
  );
}
