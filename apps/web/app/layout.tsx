import type { ReactNode } from "react";
import "./globals.css";
import Sidebar from "../components/shell/sidebar";

export const metadata = {
  title: "Hoolder - AI Company Operating System",
  description: "Run your AI company from one operating system."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex bg-[#fafafa] text-[#1c1c1e]">
          <Sidebar />
          <main className="flex-1 min-w-0 p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
