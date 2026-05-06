import { BrandMark } from "../icons/BrandMark";

const LINKS = ["Docs", "Changelog", "GitHub", "Discord", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer style={{ padding: "40px 0 56px" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          color: "var(--textMute)",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BrandMark size={16} simple />
          <span style={{ color: "var(--textDim)", fontWeight: 500 }}>orbit</span>
          <span className="mono" style={{ color: "var(--textGhost)", marginLeft: 8 }}>© 2026</span>
        </div>
        <nav style={{ display: "flex", gap: 22, marginLeft: "auto" }}>
          {LINKS.map((l) => (
            <a key={l} href="#" style={{ color: "inherit" }}>
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
