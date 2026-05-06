import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Button } from "../_components/ui/Button";

export const metadata = {
  title: "How it works — Orbit",
  description: "Three layers, two boundaries. The architecture in detail.",
};

const FLOW_STEPS: { n: string; title: string; body: ReactNode }[] = [
  {
    n: "1",
    title: "Agent A wants to talk to Agent B",
    body: (
      <>
        Atlas decides Forge should pick up the next subtask. It emits a{" "}
        <code style={{ color: "var(--accent)" }}>&lt;send_to&gt;</code> tool call on stdout —
        nothing crosses to B yet.
      </>
    ),
  },
  {
    n: "2",
    title: "agents:: parses the tool call",
    body: <>The Rust core demuxes A&apos;s stdout. It pulls the structured payload: <code>{`{ from: A, to: B, content }`}</code>.</>,
  },
  {
    n: "3",
    title: "broker:: receives the message",
    body: (
      <>
        The broker logs to <code>db::</code>, applies rate limiting, and emits a{" "}
        <code style={{ color: "var(--accent)" }}>message-in-flight</code> event the UI
        renders as the animated arc.
      </>
    ),
  },
  {
    n: "4",
    title: "broker:: forwards to agents::send(B, …)",
    body: <>Loop guard checks depth ≤ 8. Self-send and unknown-recipient errors return here, never reaching B.</>,
  },
  {
    n: "5",
    title: "agents:: writes to B's stdin on B's next turn",
    body: <>B receives a left-aligned &quot;from Atlas&quot; bubble. Reply path is symmetric.</>,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title={<>Three layers, two boundaries.</>}
        lede="Orbit is a Rust core that conducts a team of subprocess agents and a React UI that subscribes to its events. The seams are deliberate — they're how the system stays auditable."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <ArchitectureDiagram />
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <h2
              style={{
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                fontWeight: 600,
                margin: "0 0 8px",
              }}
            >
              The two boundaries.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 720 }}>
              Each boundary is intentional. Cross either one only through the channel that owns it.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px dashed var(--line3)" }}>
              <BoundaryCell
                title="UI ↔ Core"
                channel="Tauri IPC"
                body={
                  <>
                    The UI never touches filesystem, git, SQLite, or agent processes directly. Every
                    state change goes through Tauri commands (request/response) and Tauri events (core
                    pushes to UI). The core stays authoritative; the UI stays testable in isolation.
                  </>
                }
                rightBorder
              />
              <BoundaryCell
                title="Core ↔ Agent"
                channel="AgentEngine trait"
                body={
                  <>
                    Every agent subprocess is wrapped by an implementation of the{" "}
                    <code style={{ color: "var(--accent)" }}>AgentEngine</code> trait. Today it wraps
                    the Claude Code CLI. Tomorrow it can wrap the Anthropic API directly, another CLI,
                    or a local model — without touching code outside <code>agents::</code>.
                  </>
                }
              />
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <h2
              style={{
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                fontWeight: 600,
                margin: "0 0 8px",
              }}
            >
              The most load-bearing path: agent → agent.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 720 }}>
              Inter-agent messages always go through the core broker — never directly between agents.
              That&apos;s what gives transparency, auditability, rate-limiting, and replay.
            </p>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FLOW_STEPS.map((s) => (
                <li
                  key={s.n}
                  className="reveal"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr",
                    gap: 24,
                    padding: "24px 0",
                    borderTop: "1px dashed var(--line3)",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 24,
                      color: "var(--accent)",
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <h3
                      className="mono"
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--text)",
                        margin: "0 0 6px",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "var(--textDim)",
                        lineHeight: 1.6,
                        margin: 0,
                        maxWidth: 640,
                      }}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <h2
              style={{
                fontSize: 28,
                lineHeight: 1.15,
                letterSpacing: "-0.6px",
                fontWeight: 600,
                margin: "0 0 28px",
              }}
            >
              The rest of the core.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              <SmallCell
                title="Persistence"
                body={
                  <>
                    SQLite per map at <code>~/.orbit/maps/&lt;id&gt;.db</code>. Schema versioned via{" "}
                    <code>sqlx migrate</code>; migrations are idempotent and never edited once merged.
                  </>
                }
                rightBorder
              />
              <SmallCell
                title="Process supervision"
                body={
                  <>
                    The core watches every subprocess. On crash it re-spawns with exponential backoff,
                    re-hydrating Soul + Purpose + Memory from SQLite. Three strikes in a minute pauses
                    the agent and surfaces the failure to the UI.
                  </>
                }
                rightBorder
              />
              <SmallCell
                title="Filesystem access control"
                body={
                  <>
                    Each agent has a <code>folderAccess</code> allowlist. The core refuses any FS op
                    outside it. Enforced at the IPC boundary — agents never touch the filesystem
                    directly.
                  </>
                }
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
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--textDim)",
                    margin: "0 0 6px",
                  }}
                >
                  Want the canonical version?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Read{" "}
                  <a
                    href="https://github.com/orbit-agents/orbit/blob/main/docs/architecture.md"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    docs/architecture.md
                  </a>{" "}
                  on GitHub.
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

function BoundaryCell({
  title,
  channel,
  body,
  rightBorder,
}: {
  title: string;
  channel: string;
  body: ReactNode;
  rightBorder?: boolean;
}) {
  return (
    <div
      style={{
        padding: "28px 28px 26px",
        background: "var(--ink0)",
        borderRight: rightBorder ? "1px dashed var(--line3)" : "none",
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 4px", letterSpacing: "-0.3px" }}>{title}</h3>
      <div
        className="mono"
        style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.06em", marginBottom: 14 }}
      >
        {channel}
      </div>
      <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>{body}</p>
    </div>
  );
}

function SmallCell({
  title,
  body,
  rightBorder,
}: {
  title: string;
  body: ReactNode;
  rightBorder?: boolean;
}) {
  return (
    <div
      style={{
        padding: "24px 24px 22px",
        background: "var(--ink0)",
        borderRight: rightBorder ? "1px dashed var(--line3)" : "none",
      }}
    >
      <h4 style={{ fontSize: 14, fontWeight: 500, margin: "0 0 10px" }}>{title}</h4>
      <p style={{ fontSize: 13, color: "var(--textDim)", lineHeight: 1.55, margin: 0 }}>{body}</p>
    </div>
  );
}

function ArchitectureDiagram() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 12 }}>
      <Layer
        label="UI"
        sub="React, Tauri webview"
        body="Canvas · Sidebar · Chat · Settings · Tabs"
      />
      <Boundary label="Tauri IPC" detail="commands + events" />
      <Layer
        label="Core"
        sub="Rust, Tauri backend"
        body={
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Block name="core::" desc="supervise" />
            <Block name="broker::" desc="route · audit" />
            <Block name="agents::" desc="registry · spawn · pipe IO" />
            <Block name="ipc::" desc="commands" />
            <Block name="db::" desc="sqlx (SQLite)" />
            <Block name="git::" desc="worktree (libgit2)" />
            <Block name="AgentEngine" desc="trait — swappable" accent />
            <Block name="tracing::" desc="structured logs" />
          </div>
        }
      />
      <Boundary label="AgentEngine trait" detail="stdin / stdout" />
      <Layer
        label="Agent workers"
        sub="claude CLI subprocesses"
        body="Each agent is a long-lived process in its own working directory. Soul + Purpose + Memory injected on every turn."
      />
    </div>
  );
}

function Layer({
  label,
  sub,
  body,
}: {
  label: string;
  sub: string;
  body: ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--ink2)",
        border: "1px dashed var(--line3)",
        borderRadius: 4,
        padding: "18px 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
        <span
          style={{
            fontSize: 16,
            fontWeight: 500,
            color: "var(--text)",
            letterSpacing: "-0.3px",
          }}
        >
          {label}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--textFaint)",
            letterSpacing: "0.06em",
          }}
        >
          {sub}
        </span>
      </div>
      <div style={{ fontSize: 13, color: "var(--textDim)", lineHeight: 1.55 }}>{body}</div>
    </div>
  );
}

function Boundary({ label, detail }: { label: string; detail: string }) {
  return (
    <div
      className="mono"
      style={{
        textAlign: "center",
        fontSize: 10.5,
        color: "var(--accent)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "4px 0",
        position: "relative",
      }}
    >
      <span style={{ background: "var(--ink0)", padding: "0 12px", position: "relative", zIndex: 1 }}>
        ↕ {label} <span style={{ color: "var(--textFaint)", marginLeft: 6 }}>{detail}</span>
      </span>
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: 1,
          borderTop: "1px dashed var(--line3)",
          zIndex: 0,
        }}
      />
    </div>
  );
}

function Block({ name, desc, accent }: { name: string; desc: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: "var(--ink0)",
        border: `1px solid ${accent ? "var(--accentBd)" : "var(--line2)"}`,
        borderRadius: 4,
        padding: "10px 12px",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 12,
          color: accent ? "var(--accent)" : "var(--text)",
          marginBottom: 2,
        }}
      >
        {name}
      </div>
      <div style={{ fontSize: 10.5, color: "var(--textMute)" }}>{desc}</div>
    </div>
  );
}
