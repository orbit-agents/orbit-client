import { BrandMark } from "../icons/BrandMark";
import { DownloadIcon } from "../icons/Icons";
import { Button } from "../ui/Button";

const NAV = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Agents", href: "/agents" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

export function Topbar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        gap: 24,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <a
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "-0.2px",
        }}
      >
        <BrandMark size={22} />
        <span>orbit</span>
        <span
          className="mono"
          style={{ fontSize: 10.5, color: "var(--textMute)", letterSpacing: "0.04em" }}
        >
          v0.4.2
        </span>
      </a>
      <nav style={{ display: "flex", gap: 22, marginLeft: 18, fontSize: 13, color: "var(--textDim)" }}>
        {NAV.map((n) => (
          <a key={n.label} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href="/sign-in"
          style={{
            padding: "6px 10px",
            color: "var(--textDim)",
            fontSize: 13,
          }}
        >
          Sign in
        </a>
        <Button as="a" href="/download" variant="primary">
          <DownloadIcon /> Download
        </Button>
      </div>
    </div>
  );
}
