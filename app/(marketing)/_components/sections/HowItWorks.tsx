import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { DashedFrame } from "../ui/DashedFrame";
import { HowSidebar } from "../utils/HowSidebar";
// import { LanyardSlot } from "../ui/LanyardSlot";

export function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: "96px 0",
        background: "rgba(15,15,15,0.7)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, var(--line2) 12%, var(--line2) 88%, transparent)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      {/* <LanyardSlot
        className="lanyard-floater"
        style={{
          position: "absolute",
          top: -40,
          right: "max(24px, calc((100vw - 1200px) / 2 + 24px))",
          width: 480,
          height: 720,
          zIndex: 2,
          pointerEvents: "none",
          // DEBUG: visible border so we can confirm placement. Remove once verified.
          outline: "1px dashed rgba(74,222,128,0.5)",
        }}
      /> */}
      <SectionContainer>
        <DashedFrame padding="48px 56px">
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 80, position: "relative" }}>
            <HowSidebar />

            <div className="reveal-stagger" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <Step
                n="1"
                label="step 01"
                title="Summon agents."
                body="Pick from the roster (Keeper, Forge, Scribe, Mason, Atlas…) or spin up your own. Each is a persona + tools + model + limits — all editable."
              >
                <Line><K>$</K> orbit summon keeper</Line>
                <Line muted>→ persona: <T>reviewer</T></Line>
                <Line muted>→ tools: <T>git, shell, fs(ro)</T></Line>
                <Line accent>✓ keeper joined platform-core</Line>
              </Step>

              <Step
                n="2"
                label="step 02"
                title="Hand them a task."
                body="Describe what you want in plain language, or drag a Linear ticket onto the canvas. Watch the status dots light up as they plan, think, and start touching files."
              >
                <Line><B>forge</B> · thinking</Line>
                <Line><T>{`> plan: extract limiter, add tests`}</T></Line>
                <Line muted>{`  ↳ touching `}<T>src/middleware/*</T></Line>
                <Line><W>scribe</W> · waiting on review</Line>
              </Step>

              <Step
                n="3"
                label="step 03"
                title="Review and ship."
                body={`When an agent's done, it opens a run in the inbox. Read the diff, read the reviewer's notes, hit approve. Orbit pushes the branch and opens the PR.`}
              >
                <Line><T>run #142 · forge · rate-limiter</T></Line>
                <Line><span style={{ color: "#4ade80" }}>+ 312</span>{"  "}<span style={{ color: "#ef4444" }}>− 41</span>{"  "}6 files{"  "}· 14 tests pass</Line>
                <Line muted>  reviewer: keeper — looks good, one nit on naming</Line>
                <Line accent>[ approve & open PR ]   [ request changes ]</Line>
              </Step>
            </div>
          </div>
        </DashedFrame>
      </SectionContainer>
    </section>
  );
}

function Step({
  n,
  label,
  title,
  body,
  children,
}: {
  n: string;
  label: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <div
      data-step={n}
      className="step"
      style={{
        padding: "32px 0",
        borderTop: "1px dashed var(--line3)",
        display: "grid",
        gridTemplateColumns: "70px 1fr 360px",
        gap: 32,
        alignItems: "start",
        position: "relative",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 32,
          top: 32,
          width: 6,
          height: 6,
          borderRadius: 99,
          background: "var(--accent)",
          boxShadow: "0 0 0 4px var(--ink0), 0 0 0 5px var(--accentBd)",
        }}
      />
      <div className="mono nm" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.04em", padding: "24px 0 0 16px" }}>
        {label}
      </div>
      <div>
        <h4 style={{ fontSize: 22, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.4px", margin: "0 0 10px" }}>
          {title}
        </h4>
        <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 420 }}>
          {body}
        </p>
      </div>
      <div
        className="step-vis"
        style={{
          alignSelf: "stretch",
          background: "var(--ink2)",
          border: "1px solid var(--line1)",
          borderRadius: 6,
          padding: 14,
          minHeight: 130,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11.5,
          color: "var(--text3)",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.5,
          }}
        />
        {children}
      </div>
    </div>
  );
}

function Line({ children, muted, accent }: { children: ReactNode; muted?: boolean; accent?: boolean }) {
  const color = accent ? "var(--accent)" : muted ? "var(--textGhost)" : "var(--textMute)";
  return <div className="ln" style={{ color }}>{children}</div>;
}

function K({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--accent)" }}>{children}</span>;
}
function B({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--think)" }}>{children}</span>;
}
function W({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--warn)" }}>{children}</span>;
}
function T({ children }: { children: ReactNode }) {
  return <span style={{ color: "var(--text2)" }}>{children}</span>;
}
