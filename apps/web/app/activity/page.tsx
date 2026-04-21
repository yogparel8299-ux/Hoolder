import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function ActivityPage() {
  await requireUser();
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="container">
      <h1>Activity</h1>
      <div className="grid">
        {(logs || []).map((log) => (
          <div key={log.id} className="card">
            <h3>{log.action}</h3>
            <p>{log.entity_type}</p>
            <p>{new Date(log.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
