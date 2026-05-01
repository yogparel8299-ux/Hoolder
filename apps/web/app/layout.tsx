import "./globals.css";
import { Sidebar } from "../components/shell/sidebar";

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

          <main className="main-shell">
            {children}

            {/* FOOTER START */}
            <footer
              style={{
                marginTop: 60,
                paddingTop: 20,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                fontSize: 13,
                color: "#a1a1aa"
              }}
            >
              <span>© 2026 Hoolder</span>

              <div style={{ display: "flex", gap: 14 }}>
                <a href="/privacy">Privacy</a>
                <a href="/terms">Terms</a>
                <a href="/refund">Refund</a>
                <a href="/ai-policy">AI Policy</a>
              </div>
            </footer>
            {/* FOOTER END */}

          </main>
        </div>
      </body>
    </html>
  );
}
