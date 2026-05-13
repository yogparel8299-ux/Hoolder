"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Builder", href: "/builder" },
  { name: "Companies", href: "/companies" },
  { name: "Agents", href: "/agents" },
  { name: "Tasks", href: "/tasks" },
  { name: "Schedules", href: "/schedules" },
  { name: "Swarms", href: "/swarms" },
  { name: "Approvals", href: "/approvals" },
  { name: "Datasets", href: "/datasets" },
  { name: "Team", href: "/team" },
  { name: "Usage", href: "/usage" },
  { name: "Billing", href: "/billing" },
  { name: "Settings", href: "/settings" },
  { name: "Pricing", href: "/pricing" }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 34,
          padding: "0 10px"
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: 14,
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            color: "#10220d",
            fontSize: 18
          }}
        >
          H
        </div>

        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 850,
              letterSpacing: "-0.04em"
            }}
          >
            Hoolder
          </div>

          <div
            style={{
              fontSize: 12,
              color: "var(--muted)"
            }}
          >
            AI Company OS
          </div>
        </div>
      </div>

      <nav>
        {links.map((link) => {
          const active =
            pathname === link.href ||
            pathname?.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: 40,
          padding: 14,
          borderRadius: 24,
          background: "white",
          border: "1px solid var(--border)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              background: "#eef1ef",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800
            }}
          >
            CF
          </div>

          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: 14
              }}
            >
              Caelum Fly
            </div>

            <div
              style={{
                fontSize: 12,
                color: "var(--muted)"
              }}
            >
              Founder
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: "10px 12px",
            borderRadius: 16,
            background: "rgba(185,255,61,0.18)",
            border: "1px solid rgba(185,255,61,0.45)",
            fontSize: 12,
            fontWeight: 800,
            color: "#23400f"
          }}
        >
          PRO PLAN ACTIVE
        </div>
      </div>
    </aside>
  );
}
