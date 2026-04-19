import { requireUser } from "@/lib/auth";

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="card">
        <p>Add provider keys and company settings later.</p>
      </div>
    </div>
  );
}
