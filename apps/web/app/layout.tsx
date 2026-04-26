import "./globals.css";
import { Sidebar } from "../components/shell/sidebar";
import { createClient } from "../lib/supabase/server";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from("companies")
    .select("id, name");

  return (
    <html>
      <body>
        <div style={{ display: "flex" }}>
          <Sidebar />

          <div style={{ padding: "20px", width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <select
                onChange={(e) => {
                  document.cookie = `company_id=${e.target.value}; path=/`;
                  window.location.reload();
                }}
              >
                {(companies || []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
