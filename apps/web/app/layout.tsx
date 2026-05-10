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
        <div className="min-h-screen bg-[#fafafa] text-[#1c1c1e]">
          {children}
        </div>
      </body>
    </html>
  );
}
