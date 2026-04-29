import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["Companies", "/companies"],
  ["Agents", "/agents"],
  ["Tasks", "/tasks"],
  ["Swarms", "/swarms"],
  ["Approvals", "/approvals"],
  ["Datasets", "/datasets"],
  ["Team", "/team"],
  ["Pricing", "/pricing"]
];

export function Sidebar() {
  return (
    <aside className="sidebar">
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
  );
}
