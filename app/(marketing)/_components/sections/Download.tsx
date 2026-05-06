import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { AppleIcon, LinuxIcon } from "../icons/Icons";

export function Download() {
  return (
    <section
      id="download"
      style={{
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse, rgba(74,222,128,0.08), transparent 60%)",
          pointerEvents: "none",
          animation: "om-glow-pulse 5s ease-in-out infinite",
        }}
      />
      <SectionContainer>
        <div
          className="reveal"
          style={{
            position: "relative",
            maxWidth: 920,
            margin: "0 auto",
            background: "var(--ink0)",
            border: "1px solid var(--line2)",
            borderRadius: 10,
            padding: "56px 56px 48px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
          }}
        >
          <Eyebrow>Download</Eyebrow>
          <h2
            style={{
              fontSize: 40,
              lineHeight: 1.08,
              letterSpacing: "-1px",
              fontWeight: 600,
              margin: "16px 0 14px",
              textWrap: "balance",
            }}
          >
            Get orbit on your machine.
          </h2>
          <p style={{ fontSize: 15.5, color: "var(--textDim)", lineHeight: 1.55, margin: "0 0 32px", maxWidth: 540 }}>
            Free during private beta. Bring your own API keys (Anthropic, OpenAI, or a local
            model). Your code never leaves your machine.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
            <DLBtn primary lbl="Recommended" name="macOS · Apple silicon">
              <AppleIcon />
            </DLBtn>
            <DLBtn lbl="macOS" name="Intel">
              <AppleIcon />
            </DLBtn>
            <DLBtn lbl="Linux" name=".deb · .rpm · AppImage">
              <LinuxIcon />
            </DLBtn>
          </div>

          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--textMute)",
              display: "flex",
              gap: 18,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span>v0.4.2 · 86 MB</span>
            <Sep />
            <span>requires macOS 13+ or Ubuntu 22+</span>
            <Sep />
            <a href="#" style={{ color: "var(--text3)" }}>Release notes</a>
            <Sep />
            <a href="#" style={{ color: "var(--text3)" }}>SHA256</a>
            <Sep />
            <span style={{ color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "var(--accent)",
                  boxShadow: "0 0 6px rgba(74,222,128,0.5)",
                }}
              />
              Windows · soon
            </span>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function Sep() {
  return <span style={{ color: "var(--textGhost)" }}>│</span>;
}

function DLBtn({
  primary,
  lbl,
  name,
  children,
}: {
  primary?: boolean;
  lbl: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <a
      href="#"
      style={{
        background: primary ? "var(--accentBg)" : "var(--ink2)",
        border: `1px solid ${primary ? "var(--accentBd)" : "var(--line2)"}`,
        borderRadius: 6,
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "background .12s, border-color .12s",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          flexShrink: 0,
          color: primary ? "var(--accent)" : "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          className="mono"
          style={{
            fontSize: 10,
            letterSpacing: "0.1em",
            color: primary ? "var(--accentDim)" : "var(--textMute)",
            textTransform: "uppercase",
          }}
        >
          {lbl}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{name}</span>
      </span>
    </a>
  );
}
