import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container">
      <div className="card" style={{ marginTop: 40 }}>
        <h1>Hoolder</h1>
        <p>
          Build and run AI companies with goals, agents, swarms, tasks,
          approvals, budgets, and logs.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <Link className="button" href="/signup">Get started</Link>
          <Link className="button" href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
