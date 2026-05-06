import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";

const THEM = [
  "One thread, one task at a time.",
  "Tool calls hidden behind summaries.",
  "No way to compare two attempts side by side.",
  "Code lives in the cloud — your repo too.",
  "Context vanishes when the tab closes.",
  "Reviews are a vibe check, not a gate.",
];

const US = [
  "A canvas of agents working in parallel.",
  "Every grep, diff and shell call, threaded.",
  "Spawn squads — A/B two builders on the same task.",
  "Local-first sandbox; you choose what leaves.",
  "Workspaces persist — pick up where you left off.",
  "Explicit approve / request-changes on every PR.",
];

export function Compare() {
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line0)" }}>
      <SectionContainer>
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 36 }}>
          <Eyebrow color="var(--accent)">Why orbit</Eyebrow>
          <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.8px", fontWeight: 600, margin: "12px 0 12px" }}>
            One thread vs. a whole workspace.
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
            Most agent tools give you a single chat window and call it a day. Orbit treats agents
            the way you treat people on a team — many at once, each with a job, all visible.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 1fr",
            gap: 0,
            alignItems: "stretch",
            border: "1px solid var(--line1)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <Col side="them" title="chat-only tools">
            {THEM.map((line, i) => (
              <Row key={i} side="them" first={i === 0}>{line}</Row>
            ))}
          </Col>
          <div
            className="mono"
            style={{
              background: "var(--ink2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "var(--textFaint)",
              letterSpacing: "0.2em",
              writingMode: "vertical-rl",
            }}
          >
            vs
          </div>
          <Col side="us" title="orbit">
            {US.map((line, i) => (
              <Row key={i} side="us" first={i === 0}>{line}</Row>
            ))}
          </Col>
        </div>
      </SectionContainer>
    </section>
  );
}

function Col({
  side,
  title,
  children,
}: {
  side: "them" | "us";
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        padding: "28px 28px 24px",
        background: side === "them" ? "var(--ink1)" : "var(--ink0)",
      }}
    >
      <h3
        className="mono"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: side === "us" ? "var(--accent)" : "var(--textDim)",
          margin: "0 0 18px",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({
  side,
  first,
  children,
}: {
  side: "them" | "us";
  first?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderTop: first ? "none" : "1px solid var(--line2)",
        display: "flex",
        alignItems: "start",
        gap: 10,
        fontSize: 13.5,
        lineHeight: 1.45,
        color: side === "us" ? "var(--text2)" : "var(--textDim)",
      }}
    >
      <span
        className="mono"
        style={{
          width: 14,
          height: 14,
          borderRadius: 99,
          flexShrink: 0,
          marginTop: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          background: side === "us" ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.1)",
          color: side === "us" ? "var(--accent)" : "var(--err)",
        }}
      >
        {side === "us" ? "✓" : "×"}
      </span>
      <span>{children}</span>
    </div>
  );
}
