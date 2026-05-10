"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
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
    <aside className="hidden md:flex w-64 bg-[#f5f5f7] border-r border-[#e5e5ea] flex-col min-h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1c1c1e] rounded-lg flex items-center justify-center">
          <span className="text-white text-sm font-semibold">H</span>
        </div>
        <span className="font-semibold text-lg tracking-tight">Hoolder</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href || pathname?.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-[#1c1c1e] shadow-sm border border-[#e5e5ea]"
                  : "text-[#636366] hover:bg-[#e5e5ea]/50 hover:text-[#1c1c1e]"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#e5e5ea]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#e5e5ea] flex items-center justify-center text-sm font-medium text-[#636366]">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#1c1c1e]">John Doe</span>
            <span className="text-xs text-[#8e8e93]">Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
