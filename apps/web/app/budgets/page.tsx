import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";

export default async function BudgetsPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: agents } = await supabase.from("agents").select("name, monthly_budget_usd");
  const { data: usage } = await supabase.from("usage_logs").select("cost_usd");
  const totalUsage = (usage || []).reduce((sum, item) => sum + Number(item.cost_usd), 0);

  return (
    <div className="container">
      <h1>Budgets</h1>
      <div className="card">
        <h3>Total usage</h3>
        <p>${totalUsage.toFixed(2)}</p>
      </div>
      <div className="grid" style={{ marginTop: 16 }}>
        {(agents || []).map((agent) => (
          <div key={agent.name} className="card">
            <h3>{agent.name}</h3>
            <p>Monthly budget: ${Number(agent.monthly_budget_usd).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
