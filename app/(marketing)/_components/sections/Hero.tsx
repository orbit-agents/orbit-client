import { ReactNode } from "react";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { Dot } from "../ui/Dot";
import { DownloadIcon, ArrowRight } from "../icons/Icons";
import { HeroPreview } from "./HeroPreview";
import Prism from "../ui/Prism";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 0 96px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, #000 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 40%, #000 40%, transparent 80%)",
        }}
      >
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          suspendWhenOffscreen
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, transparent 0%, rgba(0,0,0,0.55) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <Pill>
          <Dot status="run" pulse />
          <span>Now in private beta</span>
          <span style={{ width: 1, height: 11, background: "var(--line3)", margin: "0 2px" }} />
          <span className="mono" style={{ color: "var(--textMute)", fontSize: 10.5 }}>
            v0.4.2 · macOS · Linux
          </span>
        </Pill>

        <h1
          style={{
            fontSize: 68,
            lineHeight: 1.04,
            letterSpacing: "-1.6px",
            fontWeight: 600,
            margin: "0 0 20px",
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          Command a small{" "}
          <span style={{ color: "var(--textMute)", fontWeight: 500 }}>garrison</span>
          <br />
          of AI coding agents.
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--textDim)",
            maxWidth: 620,
            margin: "0 auto 36px",
            textWrap: "pretty",
          }}
        >
          Orbit is a desktop app for orchestrating teams of coding agents on real codebases. Watch
          them work on a live canvas, talk to any one in a DM, review their diffs, and ship.
        </p>

        <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
          <Button as="a" href="#download" variant="primary" size="lg">
            <DownloadIcon size={14} /> Download for macOS
          </Button>
          <Button as="a" href="#how" size="lg">
            See it in action <ArrowRight size={12} />
          </Button>
        </div>

        <div
          className="mono"
          style={{
            marginTop: 28,
            display: "inline-flex",
            gap: 18,
            alignItems: "center",
            fontSize: 11,
            color: "var(--textMute)",
          }}
        >
          <MetaItem>Apple silicon · Intel</MetaItem>
          <span style={{ color: "var(--textGhost)" }}>│</span>
          <MetaItem>Bring your own keys</MetaItem>
          <span style={{ color: "var(--textGhost)" }}>│</span>
          <MetaItem>Local sandbox by default</MetaItem>
        </div>
      </div>

      <HeroPreview />
    </section>
  );
}

function MetaItem({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ color: "var(--accent)" }}>✓</span>
      {children}
    </span>
  );
}
