"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/builder", label: "Builder" },
  { href: "/companies", label: "Companies" },
  { href: "/agents", label: "Agents" },
  { href: "/tasks", label: "Tasks" },
  { href: "/schedules", label: "Schedules" },
  { href: "/swarms", label: "Swarms" },
  { href: "/approvals", label: "Approvals" },
  { href: "/datasets", label: "Datasets" },
  { href: "/team", label: "Team" },
  { href: "/usage", label: "Usage" },
  { href: "/billing", label: "Billing" },
  { href: "/settings", label: "Settings" },
  { href: "/pricing", label: "Pricing" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link
        href="/dashboard"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px 18px 12px",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: "-0.01em",
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "#1c1c1e",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          H
        </span>
        Hoolder
      </Link>
      <nav>
        {links.map((l) => {
          const active = pathname === l.href || pathname?.startsWith(l.href + "/");
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
