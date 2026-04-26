import Link from "next/link";

export function Sidebar() {
  return (
    <div
      style={{
        width: 220,
        height: "100vh",
        background: "#0f0f12",
        padding: 20,
        borderRight: "1px solid #1f1f23"
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Hoolder</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/companies">Companies</Link>
        <Link href="/agents">Agents</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/swarms">Swarms</Link>
        <Link href="/approvals">Approvals</Link>
        <Link href="/pricing">Pricing</Link>
      </div>
    </div>
  );
}
