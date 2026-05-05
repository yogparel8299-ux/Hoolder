import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  // ===== BASIC COUNTS =====

  const { count: agentsCount } = await supabase
    .from("agents")
    .select("*", { count: "exact", head: true });

  const { count: tasksCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true });

  const { count: datasetsCount } = await supabase
    .from("datasets")
    .select("*", { count: "exact", head: true });

  const { count: ordersCount } = await supabase
    .from("dataset_orders")
    .select("*", { count: "exact", head: true });

  // ===== TASK STATUS =====

  const { data: tasks } = await supabase
    .from("tasks")
    .select("status");

  const taskStats = {
    pending: 0,
    running: 0,
    completed: 0,
    failed: 0,
    awaiting_approval: 0
  };

  (tasks || []).forEach((t) => {
    if (taskStats[t.status as keyof typeof taskStats] !== undefined) {
      taskStats[t.status as keyof typeof taskStats]++;
    }
  });

  // ===== USAGE =====

  const { data: usage } = await supabase
    .from("usage_logs")
    .select("tokens_input,tokens_output,cost_usd")
    .limit(100);

  let totalTokens = 0;
  let totalCost = 0;

  (usage || []).forEach((u) => {
    totalTokens += (u.tokens_input || 0) + (u.tokens_output || 0);
    totalCost += u.cost_usd || 0;
  });

  // ===== DATASET REVENUE =====

  const { data: sales } = await supabase
    .from("dataset_orders")
    .select("amount_inr, seller_earning_inr, platform_fee_inr");

  let totalRevenue = 0;
  let totalSellerEarnings = 0;
  let totalPlatformFees = 0;

  (sales || []).forEach((s) => {
    totalRevenue += s.amount_inr || 0;
    totalSellerEarnings += s.seller_earning_inr || 0;
    totalPlatformFees += s.platform_fee_inr || 0;
  });

  // ===== RECENT TASKS =====

  const { data: recentTasks } = await supabase
    .from("tasks")
    .select("id,title,status,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  // ===== RECENT DATASETS =====

  const { data: recentDatasets } = await supabase
    .from("datasets")
    .select("id,title,price_inr,created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Dashboard</div>
          <h1>Your AI company overview.</h1>
          <p>
            Track agents, tasks, datasets, usage and revenue in one place.
          </p>
        </div>
      </div>

      {/* ===== TOP METRICS ===== */}
      <div className="grid grid-4">
        <div className="card">
          <h3>Agents</h3>
          <h1>{agentsCount || 0}</h1>
        </div>

        <div className="card">
          <h3>Tasks</h3>
          <h1>{tasksCount || 0}</h1>
        </div>

        <div className="card">
          <h3>Datasets</h3>
          <h1>{datasetsCount || 0}</h1>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <h1>{ordersCount || 0}</h1>
        </div>
      </div>

      {/* ===== TASK STATUS ===== */}
      <div className="grid grid-5" style={{ marginTop: 18 }}>
        {Object.entries(taskStats).map(([key, value]) => (
          <div key={key} className="card">
            <h3>{key.replace("_", " ")}</h3>
            <h1>{value}</h1>
          </div>
        ))}
      </div>

      {/* ===== USAGE ===== */}
      <div className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Usage</h2>
          <p>Total tokens: {totalTokens}</p>
          <p>Estimated cost: ${totalCost.toFixed(4)}</p>
        </div>

        <div className="card">
          <h2>Dataset Revenue</h2>
          <p>Total sales: ₹{totalRevenue}</p>
          <p>Seller earnings: ₹{totalSellerEarnings}</p>
          <p>Platform fees: ₹{totalPlatformFees}</p>
        </div>
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      <div className="grid grid-2" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Recent Tasks</h2>

          {(recentTasks || []).map((task) => (
            <div key={task.id} style={{ marginTop: 10 }}>
              <strong>{task.title}</strong>
              <p>{task.status}</p>
            </div>
          ))}

          {!recentTasks?.length && <p>No tasks yet.</p>}
        </div>

        <div className="card">
          <h2>Recent Datasets</h2>

          {(recentDatasets || []).map((d) => (
            <div key={d.id} style={{ marginTop: 10 }}>
              <strong>{d.title}</strong>
              <p>₹{d.price_inr}</p>
            </div>
          ))}

          {!recentDatasets?.length && <p>No datasets yet.</p>}
        </div>
      </div>
    </div>
  );
}
