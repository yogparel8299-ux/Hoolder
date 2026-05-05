import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Builder", "/builder"],
  ["Companies", "/companies"],
  ["Agents", "/agents"],
  ["Tasks", "/tasks"],
  ["Schedules", "/schedules"],
  ["Swarms", "/swarms"],
  ["Approvals", "/approvals"],
  ["Datasets", "/datasets"],
  ["Team", "/team"],
  ["Usage", "/usage"],
  ["Billing", "/billing"],
  ["Settings", "/settings"],
  ["Pricing", "/pricing"]
];

export function Sidebar() {
  return (
    <>
      <aside className="sidebar desktop-sidebar">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <div className="brand-title">Hoolder</div>
            <div className="brand-subtitle">AI company OS</div>
          </div>
        </div>

        <nav className="nav">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="mobile-nav">
        <Link href="/dashboard">Home</Link>
        <Link href="/agents">Agents</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/swarms">Swarms</Link>
        <Link href="/pricing">Pricing</Link>
      </div>
    </>
  );
}
