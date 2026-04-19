import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Companies", "/companies"],
  ["Goals", "/goals"],
  ["Agents", "/agents"],
  ["Swarms", "/swarms"],
  ["Tasks", "/tasks"],
  ["Approvals", "/approvals"],
  ["Budgets", "/budgets"],
  ["Activity", "/activity"],
  ["Settings", "/settings"]
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 style={{ marginTop: 0 }}>Hoolder</h2>
      <p style={{ color: "#94a3b8" }}>AI company operating system</p>
      <nav style={{ marginTop: 24 }}>
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="nav-link">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
