import { BrandMark } from "../icons/BrandMark";
import { ArrowRight, DownloadIcon } from "../icons/Icons";
import { Button } from "../ui/Button";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Agents", href: "/agents" },
      { label: "Download", href: "/download" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
      { label: "Notes", href: "/docs/notes" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "mailto:hello@orbit.dev" },
    ],
  },
];

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.5c-2.23.48-2.7-.94-2.7-.94-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.13 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.93.08 2.13.51.56.82 1.28.82 2.15 0 3.07-1.87 3.74-3.65 3.94.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function XIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M12.6 1.5h2.3l-5.05 5.78L16 14.5h-4.66l-3.65-4.78-4.18 4.78H1.2L6.6 8.32 1 1.5h4.78l3.3 4.36L12.6 1.5zm-.82 11.6h1.27L4.27 2.83H2.9l8.88 10.27z" />
    </svg>
  );
}

function DiscordIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.55 2.93A12.5 12.5 0 0 0 10.43 2c-.13.24-.29.56-.4.81a11.6 11.6 0 0 0-3.46 0c-.11-.25-.27-.57-.4-.81-1.08.18-2.12.5-3.12.93C1.04 6 .65 8.97.85 11.9a12.6 12.6 0 0 0 3.83 1.93c.31-.42.58-.86.82-1.32-.45-.17-.88-.37-1.29-.6.11-.08.21-.16.31-.25 2.49 1.16 5.18 1.16 7.64 0 .1.09.2.17.31.25-.41.23-.84.43-1.29.6.24.46.51.9.82 1.32a12.6 12.6 0 0 0 3.83-1.93c.24-3.41-.4-6.36-1.28-8.97zM5.7 10.1c-.75 0-1.36-.69-1.36-1.53s.6-1.54 1.36-1.54c.76 0 1.37.69 1.36 1.54 0 .84-.6 1.53-1.36 1.53zm4.6 0c-.75 0-1.36-.69-1.36-1.53s.6-1.54 1.36-1.54c.76 0 1.37.69 1.36 1.54 0 .84-.6 1.53-1.36 1.53z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer
      className="om-footer"
      style={{
        marginTop: 80,
        paddingTop: 64,
        paddingBottom: 32,
        borderTop: "1px solid var(--line0)",
        background: "linear-gradient(180deg, transparent, rgba(74,222,128,0.015) 60%, transparent)",
      }}
    >
      <span className="om-footer-grid-bg" aria-hidden />
      <span className="om-footer-orb" aria-hidden />

      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* CTA stripe */}
        <div className="om-footer-cta">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <h3
              className="om-footer-cta-title"
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.4px",
                color: "var(--text)",
              }}
            >
              Ready to ship with a team of agents?
            </h3>
            <p style={{ margin: 0, fontSize: 13, color: "var(--textDim)" }}>
              Free for personal use. Works on macOS, Windows, and Linux.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button as="a" href="/docs" variant="ghost">
              Read the docs <ArrowRight />
            </Button>
            <Button as="a" href="/download" variant="primary" className="om-cta">
              <DownloadIcon /> Download
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div
          className="om-footer-cols"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
            gap: 32,
          }}
        >
          <div>
            <a href="/" className="om-footer-brand">
              <span className="om-footer-brand-mark" style={{ display: "inline-flex" }}>
                <BrandMark size={22} />
              </span>
              <span style={{ fontWeight: 600, fontSize: 15, color: "var(--text)" }}>orbit</span>
            </a>
            <p
              style={{
                marginTop: 14,
                marginBottom: 18,
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--textDim)",
                maxWidth: 280,
              }}
            >
              Command a team of AI coding agents on real codebases. Native, local, and fast.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="om-footer-social"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon />
              </a>
              <a
                href="https://x.com"
                aria-label="X"
                className="om-footer-social"
                target="_blank"
                rel="noreferrer"
              >
                <XIcon />
              </a>
              <a
                href="https://discord.com"
                aria-label="Discord"
                className="om-footer-social"
                target="_blank"
                rel="noreferrer"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="om-footer-col-title">{col.title}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 4 }}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="om-footer-link">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant brand watermark */}
        <div className="om-watermark-wrap" aria-hidden>
          <span className="om-watermark-mask" />
          <span className="om-watermark">orbit</span>
        </div>
      </div>
    </footer>
  );
}
