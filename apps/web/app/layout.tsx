import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoolder — AI Company Operating System",
  description:
    "Run your AI company from one operating system. Manage agents, swarms, tasks, datasets, billing, usage and approvals."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
