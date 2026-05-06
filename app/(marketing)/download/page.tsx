import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";
import { Button } from "../_components/ui/Button";
import { AppleIcon, LinuxIcon } from "../_components/icons/Icons";

export const metadata = {
  title: "Download — Orbit",
  description: "Run Orbit locally. Pre-alpha — build from source.",
};

const PREREQS: { name: string; version: string; detail: ReactNode }[] = [
  {
    name: "Node.js",
    version: "20+",
    detail: <>Pinned via <code className="mono">.nvmrc</code>. Use <code className="mono">nvm use</code> or <code className="mono">fnm</code>.</>,
  },
  {
    name: "pnpm",
    version: "10+",
    detail: <><code className="mono">corepack enable && corepack prepare pnpm@latest --activate</code></>,
  },
  {
    name: "Rust",
    version: "stable",
    detail: <>Install via <a href="https://rustup.rs" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>rustup.rs</a>. The Tauri backend is Rust.</>,
  },
  {
    name: "Claude Code CLI",
    version: "authenticated",
    detail: (
      <>
        Install + sign in: <a href="https://docs.claude.com/claude-code" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>docs.claude.com/claude-code</a>. Orbit spawns it as the agent engine.
      </>
    ),
  },
  {
    name: "Tauri 2 system deps",
    version: "platform-specific",
    detail: (
      <>
        See <a href="https://v2.tauri.app/start/prerequisites" target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>v2.tauri.app/start/prerequisites</a>. On Linux that&apos;s typically <code className="mono">webkit2gtk-4.1</code>, <code className="mono">libssl-dev</code>, <code className="mono">libgtk-3-dev</code>, <code className="mono">librsvg2-dev</code>.
      </>
    ),
  },
];

export default function DownloadPage() {
  return (
    <>
      <PageHero
        eyebrow="Download"
        pill={
          <Pill>
            <Dot status="wait" />
            <span>Pre-alpha · no binary releases yet</span>
          </Pill>
        }
        title={<>Run Orbit on your machine.</>}
        lede="Orbit hasn't cut a tagged release yet. The instructions below build the desktop app from source via Tauri — same path the team uses every day."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame
            padding={40}
            borderColor="var(--warn)"
            cornerColor="var(--warn)"
            style={{ background: "rgba(245,158,11,0.04)" }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: 16 }}>
              <span
                style={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                  borderRadius: 99,
                  border: "1px solid var(--warn)",
                  color: "var(--warn)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                !
              </span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 500, margin: "0 0 6px", color: "var(--text)" }}>
                  We don&apos;t ship binaries yet.
                </h3>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.6, margin: 0, maxWidth: 720 }}>
                  Orbit is pre-alpha. Phase 0 through Phase 8 are complete in the repo, but we
                  haven&apos;t cut a packaged release. To run Orbit today you build from source.
                  Once we tag a 0.1, this page will fill up with macOS / Windows / Linux installers.
                </p>
              </div>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
              Prerequisites.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 32px", maxWidth: 720 }}>
              Five things on your machine before <code className="mono">tauri:dev</code> will work.
              Everything is open and free.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {PREREQS.map((p, i) => (
                <li
                  key={p.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 80px 1fr",
                    gap: 24,
                    padding: "18px 0",
                    borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>
                    {p.name}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 11,
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.version}
                  </span>
                  <span style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6 }}>
                    {p.detail}
                  </span>
                </li>
              ))}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
              Quick start.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 24px", maxWidth: 720 }}>
              Three commands. The first <code className="mono">tauri:dev</code> compiles the Rust
              backend and takes several minutes; subsequent runs are fast.
            </p>
            <div
              className="mono"
              style={{
                background: "var(--bg)",
                border: "1px dashed var(--line3)",
                borderRadius: 4,
                padding: "20px 24px",
                fontSize: 13,
                color: "var(--text2)",
                lineHeight: 1.7,
              }}
            >
              <Cmd>git clone https://github.com/orbit-agents/orbit.git</Cmd>
              <Cmd>cd orbit</Cmd>
              <Cmd>pnpm install</Cmd>
              <Cmd>pnpm --filter @orbit/desktop tauri:dev</Cmd>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 28px" }}>
              Platform notes.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              <PlatformCell
                Icon={AppleIcon}
                name="macOS"
                bullets={[
                  "Apple silicon and Intel both supported",
                  "Release builds will be signed with an Apple Developer cert",
                  "No extra system deps beyond Tauri's defaults",
                ]}
                rightBorder
              />
              <PlatformCell
                Icon={AppleIcon}
                name="Windows"
                bullets={[
                  "MSI installer in the release path",
                  "Phase 8 terminal uses ConPTY — Windows 10 1903+",
                  "Tauri 2 deps: WebView2 runtime",
                ]}
                rightBorder
              />
              <PlatformCell
                Icon={LinuxIcon}
                name="Linux"
                bullets={[
                  "AppImage in the release path",
                  "webkit2gtk-4.1 required at runtime",
                  "libssl-dev, libgtk-3-dev, librsvg2-dev for the build",
                ]}
              />
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, color: "var(--textDim)", margin: "0 0 6px" }}>
                  Stuck on the build?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Open an issue or read{" "}
                  <a
                    href="https://github.com/orbit-agents/orbit/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    CONTRIBUTING.md
                  </a>
                  .
                </p>
              </div>
              <Button
                as="a"
                href="https://github.com/orbit-agents/orbit"
                variant="primary"
                target="_blank"
                rel="noreferrer"
              >
                Browse the source →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function Cmd({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <span style={{ color: "var(--accent)", flexShrink: 0 }}>$</span>
      <span>{children}</span>
    </div>
  );
}

function PlatformCell({
  Icon,
  name,
  bullets,
  rightBorder,
}: {
  Icon: ({ size }: { size?: number }) => ReactNode;
  name: string;
  bullets: string[];
  rightBorder?: boolean;
}) {
  return (
    <div
      style={{
        padding: "26px 24px",
        background: "var(--ink0)",
        borderRight: rightBorder ? "1px dashed var(--line3)" : "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, color: "var(--text)" }}>
        <Icon size={20} />
        <span style={{ fontSize: 16, fontWeight: 500 }}>{name}</span>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 12.5,
              color: "var(--text3)",
              lineHeight: 1.55,
              padding: "4px 0",
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
