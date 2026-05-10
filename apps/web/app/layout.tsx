import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Hoolder — Run your AI company from one operating system",
  description:
    "Hoolder is the AI company operating system. Build agents, manage swarms, schedule tasks, review approvals, sell datasets and control usage from one premium workspace.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
