import "./globals.css";
import { Sidebar } from "../components/shell/sidebar";
import { CompanySelector } from "../components/company-selector";
import { createClient } from "../lib/supabase/server";

export const metadata = {
  title: "Hoolder",
  description: "AI company operating system"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id, name");

  return (
    <html lang="en">
      <body>
        <div className="layout-shell">
          <Sidebar />
          <main className="main-shell">
            <div className="container">
              <div style={{ marginBottom: 20, maxWidth: 320 }}>
                <CompanySelector companies={companies || []} />
              </div>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
