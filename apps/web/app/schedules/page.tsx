import {
  createSchedule,
  deleteSchedule,
  runScheduleNow,
  toggleSchedule
} from "../../actions/schedules";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/auth";

export default async function SchedulesPage() {
  await requireUser();
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id,name");

  const { data: schedules } = await supabase
    .from("task_schedules")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <div className="page-kicker">Schedules</div>
          <h1>Recurring tasks for daily AI operations.</h1>
          <p>
            Create daily, weekly or monthly work that repeats automatically.
            Perfect for reports, content, research, monitoring and follow-ups.
          </p>
        </div>
      </div>

      <div className="grid grid-2">
        <form action={createSchedule} className="card grid">
          <h2>Create schedule</h2>

          <select className="select" name="company_id" required>
            {(companies || []).map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            name="title"
            placeholder="Example: Daily competitor research"
            required
          />

          <textarea
            className="textarea"
            name="description"
            placeholder="Describe what should be created every time this schedule runs"
          />

          <select className="select" name="frequency">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          <select className="select" name="priority">
            <option value="medium">Medium priority</option>
            <option value="high">High priority</option>
            <option value="low">Low priority</option>
          </select>

          <select className="select" name="requires_approval">
            <option value="true">Approval required</option>
            <option value="false">No approval</option>
          </select>

          <button className="button" type="submit">
            Create schedule
          </button>
        </form>

        <div className="grid">
          {(schedules || []).map((schedule) => (
            <div key={schedule.id} className="card">
              <span className="badge">
                {schedule.is_active ? "Active" : "Paused"}
              </span>

              <h2 style={{ marginTop: 14 }}>{schedule.title}</h2>
              <p>{schedule.description || "No description"}</p>

              <p>Frequency: {schedule.frequency}</p>
              <p>Priority: {schedule.priority}</p>
              <p>
                Next run:{" "}
                {schedule.next_run_at
                  ? new Date(schedule.next_run_at).toLocaleString()
                  : "Not scheduled"}
              </p>
              <p>
                Last run:{" "}
                {schedule.last_run_at
                  ? new Date(schedule.last_run_at).toLocaleString()
                  : "Never"}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  marginTop: 16
                }}
              >
                <form action={runScheduleNow}>
                  <input type="hidden" name="schedule_id" value={schedule.id} />
                  <button className="button" type="submit">
                    Run now
                  </button>
                </form>

                <form action={toggleSchedule}>
                  <input type="hidden" name="schedule_id" value={schedule.id} />
                  <input
                    type="hidden"
                    name="is_active"
                    value={String(schedule.is_active)}
                  />
                  <button className="button" type="submit">
                    {schedule.is_active ? "Pause" : "Resume"}
                  </button>
                </form>

                <form action={deleteSchedule}>
                  <input type="hidden" name="schedule_id" value={schedule.id} />
                  <button className="button" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}

          {!schedules?.length ? (
            <div className="card">
              <h2>No schedules yet</h2>
              <p>
                Create a daily or weekly recurring task to keep agents working
                without manual setup.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
