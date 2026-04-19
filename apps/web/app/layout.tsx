import "./globals.css";
import { Sidebar } from "@/components/shell/sidebar";

export const metadata = {
  title: "Hoolder",
  description: "AI company operating system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-shell">
          <Sidebar />
          <main className="main-shell">{children}</main>
        </div>
      </body>
    </html>
  );
}
