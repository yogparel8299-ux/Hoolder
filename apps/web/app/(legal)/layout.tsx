export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 20px" }}>
      {children}
    </div>
  );
}
