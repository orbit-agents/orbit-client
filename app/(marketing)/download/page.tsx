import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";
import { Button } from "../_components/ui/Button";
import { AppleIcon, LinuxIcon, WindowsIcon, DownloadIcon } from "../_components/icons/Icons";

export const metadata = {
  title: "Download Orbit",
  description: "Get Orbit for macOS, Windows, and Linux. v0.4.2 — released May 2026.",
};

const VERSION = "0.4.2";
const RELEASED = "May 6, 2026";

type Build = {
  Icon: ({ size }: { size?: number }) => ReactNode;
  os: string;
  primary: { label: string; href: string; sub: string };
  alt?: { label: string; href: string; sub: string }[];
  notes: string[];
};

const BUILDS: Build[] = [
  {
    Icon: AppleIcon,
    os: "macOS",
    primary: {
      label: "Download for macOS",
      href: `/dl/Orbit-${VERSION}-arm64.dmg`,
      sub: "Apple silicon · .dmg · 84 MB",
    },
    alt: [
      {
        label: "Intel build",
        href: `/dl/Orbit-${VERSION}-x64.dmg`,
        sub: ".dmg · 91 MB",
      },
    ],
    notes: [
      "macOS 12 Monterey or newer",
      "Signed and notarized with our Apple Developer cert",
      "Auto-updates on each launch — opt out in Settings",
    ],
  },
  {
    Icon: WindowsIcon,
    os: "Windows",
    primary: {
      label: "Download for Windows",
      href: `/dl/Orbit-${VERSION}-x64.msi`,
      sub: "x64 · .msi · 96 MB",
    },
    notes: [
      "Windows 10 build 1903 or newer",
      "EV code-signed installer",
      "Includes the WebView2 runtime check on first launch",
    ],
  },
  {
    Icon: LinuxIcon,
    os: "Linux",
    primary: {
      label: "Download AppImage",
      href: `/dl/Orbit-${VERSION}-x86_64.AppImage`,
      sub: "x86_64 · AppImage · 102 MB",
    },
    alt: [
      {
        label: ".deb (Debian / Ubuntu)",
        href: `/dl/orbit_${VERSION}_amd64.deb`,
        sub: "x86_64 · 89 MB",
      },
      {
        label: ".rpm (Fedora / RHEL)",
        href: `/dl/orbit-${VERSION}-1.x86_64.rpm`,
        sub: "x86_64 · 90 MB",
      },
    ],
    notes: [
      "Requires webkit2gtk-4.1",
      "Works on most modern X11 and Wayland desktops",
      "AppImage is portable — no install step needed",
    ],
  },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Do I need to bring my own model API key?",
    a: (
      <>
        Yes. Orbit runs agents through your own provider account — Anthropic by default. Drop your
        key into <em>Settings → Connections</em> on first launch. Nothing leaves your machine
        besides the API calls you make.
      </>
    ),
  },
  {
    q: "Where does my data live?",
    a: (
      <>
        On your machine. Workspaces, conversations, and memory are stored locally in{" "}
        <code className="mono">~/.orbit</code>. There&apos;s no Orbit cloud — we don&apos;t see
        your code or your prompts.
      </>
    ),
  },
  {
    q: "Is Orbit free?",
    a: (
      <>
        The desktop app is free during early access. Pricing for Teams arrives with v1.0 — single
        seats stay free.
      </>
    ),
  },
  {
    q: "Can I use it offline?",
    a: (
      <>
        The workspace runs offline. The agents need network access to reach whichever model
        provider you&apos;ve configured.
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
            <Dot status="run" pulse />
            <span>v{VERSION} · released {RELEASED}</span>
          </Pill>
        }
        title={<>Get Orbit on your machine.</>}
        lede="Free during early access. macOS, Windows, and Linux builds — pick your platform and you&apos;re running in under a minute."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              {BUILDS.map((b, i) => (
                <BuildCell key={b.os} build={b} rightBorder={i < BUILDS.length - 1} />
              ))}
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px dashed var(--line3)" }}>
              <div style={{ padding: "26px 28px", background: "var(--ink0)", borderRight: "1px dashed var(--line3)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.3px" }}>
                  System requirements
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.7 }}>
                  <li>· 4 GB free RAM (8 GB recommended for ≥ 5 agents)</li>
                  <li>· 500 MB disk + room for your workspace data</li>
                  <li>· Active internet connection for agent model calls</li>
                  <li>· An API key for your model provider</li>
                </ul>
              </div>
              <div style={{ padding: "26px 28px", background: "var(--ink0)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.3px" }}>
                  After you install
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.7 }}>
                  <li>1. Sign in with your work email</li>
                  <li>2. Connect your model provider in Settings → Connections</li>
                  <li>3. Open the sample workspace, or point Orbit at one of your projects</li>
                  <li>4. Spawn your first agent. The canvas is yours.</li>
                </ul>
              </div>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
              Common questions.
            </h2>
            <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: "0 0 28px", maxWidth: 720 }}>
              The handful of things people always ask before they install. The full handbook lives
              in the <a href="/docs" style={{ color: "var(--accent)" }}>docs</a>.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FAQS.map((f, i) => (
                <li
                  key={f.q}
                  style={{
                    padding: "20px 0",
                    borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                  }}
                >
                  <h3 style={{ fontSize: 15.5, fontWeight: 500, margin: "0 0 6px", letterSpacing: "-0.2px" }}>
                    {f.q}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0, maxWidth: 760 }}>
                    {f.a}
                  </p>
                </li>
              ))}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, color: "var(--textDim)", margin: "0 0 6px" }}>
                  Looking for older builds?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  See every release on the{" "}
                  <a href="/changelog" style={{ color: "var(--accent)" }}>
                    changelog
                  </a>
                  .
                </p>
              </div>
              <Button as="a" href="/docs/install" variant="ghost">
                Read the install guide →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function BuildCell({ build, rightBorder }: { build: Build; rightBorder: boolean }) {
  const { Icon } = build;
  return (
    <div
      style={{
        padding: "32px 28px 28px",
        background: "var(--ink0)",
        borderRight: rightBorder ? "1px dashed var(--line3)" : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, color: "var(--text)" }}>
        <Icon size={22} />
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.2px" }}>{build.os}</span>
        <span
          className="mono"
          style={{
            marginLeft: "auto",
            fontSize: 10,
            color: "var(--textFaint)",
            letterSpacing: "0.08em",
          }}
        >
          v{VERSION}
        </span>
      </div>

      <Button as="a" href={build.primary.href} variant="primary" style={{ width: "100%", justifyContent: "center" }}>
        <DownloadIcon /> {build.primary.label}
      </Button>
      <div
        className="mono"
        style={{
          marginTop: 8,
          fontSize: 10.5,
          color: "var(--textFaint)",
          letterSpacing: "0.04em",
          textAlign: "center",
        }}
      >
        {build.primary.sub}
      </div>

      {build.alt && build.alt.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
          {build.alt.map((a) => (
            <a
              key={a.label}
              href={a.href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                padding: "8px 12px",
                border: "1px dashed var(--line3)",
                borderRadius: 4,
                fontSize: 12.5,
                color: "var(--text2)",
              }}
            >
              <span>{a.label}</span>
              <span className="mono" style={{ color: "var(--textFaint)", fontSize: 10.5 }}>
                {a.sub}
              </span>
            </a>
          ))}
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0 0" }}>
        {build.notes.map((n) => (
          <li
            key={n}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 12,
              color: "var(--text3)",
              lineHeight: 1.55,
              padding: "3px 0",
            }}
          >
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>·</span>
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
