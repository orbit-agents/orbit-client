import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";

export const metadata = {
  title: "Product — Orbit",
  description: "Everything Orbit ships today, mapped to phases 0–8.",
};

type Phase = {
  n: string;
  title: string;
  oneLiner: string;
  bullets: string[];
};

const PHASES: Phase[] = [
  {
    n: "0",
    title: "Foundation",
    oneLiner: "The shell every later phase is bolted onto.",
    bullets: [
      "Three-panel layout (canvas · sidebar · right panel) with drag-resize",
      "Design tokens, dark theme, Geist + JetBrains Mono",
      "CI: lint, typecheck, vitest, cargo fmt/clippy/test",
    ],
  },
  {
    n: "1",
    title: "One agent, end-to-end",
    oneLiner: "Spawn a single agent. Talk to it. Pick up where you left off.",
    bullets: [
      "Spawn a Claude Code subprocess in a working directory",
      "Stream stdout into a chat panel; render tool calls as expandable cards",
      "Persist conversations in SQLite — restart the app, full history is there",
    ],
  },
  {
    n: "2",
    title: "Canvas + multiple agents",
    oneLiner: "Spatial layout. Each agent isolated. Selection synced everywhere.",
    bullets: [
      "React Flow canvas, double-click to spawn at point, drag to rearrange",
      "Per-agent conversation, draft, scroll position — no bleed",
      "Status ring on every node: idle / streaming / waiting-for-human (amber ?)",
      "Soft cap of 10 agents per map (today)",
    ],
  },
  {
    n: "3",
    title: "Soul · Purpose · Memory",
    oneLiner: "Agents have an identity that survives every restart.",
    bullets: [
      "Soul (how they think) and Purpose (what they're doing) edited in Settings",
      "Memory — persistent fact list, editable by you, writable by the agent via <remember>",
      "Optional CLAUDE.md import on spawn; live identity updates flagged with a pending pill",
    ],
  },
  {
    n: "4",
    title: "Agent-to-agent messaging",
    oneLiner: "Atlas hands work to Forge. The arc flies across the canvas.",
    bullets: [
      "Broker routes every <send_to> through the core — never agent → agent directly",
      "Animated arcs on canvas; loop-guard at depth 8; self-send + unknown-recipient errors",
      "Audit trail in SQLite, surfaced in each agent's Settings → Inbox",
    ],
  },
  {
    n: "5",
    title: "Teams + folder access",
    oneLiner: "Group agents that work together. Lock down what they can read.",
    bullets: [
      "Canvas team regions auto-derive their bounds from member positions",
      "Drag an agent into a region to add them; out to remove",
      "Per-agent folder allowlist passed to Claude Code via --add-dir, enforced at the IPC boundary",
    ],
  },
  {
    n: "6",
    title: "Git isolation",
    oneLiner: "One worktree per agent. No more stepping on each other's branches.",
    bullets: [
      "libgit2 (git2) creates orbit/<slug>-<id> worktrees in the orbit data dir",
      "Per-agent Diff tab + Branch section in Settings",
      "Spawn refuses if the source tree is dirty; falls back gracefully outside a repo",
    ],
  },
  {
    n: "7",
    title: "Tasks · activity feed · sticky notes",
    oneLiner: "Plan with the agent. Watch the queue work itself.",
    bullets: [
      "<task> pseudo-tool: agents create / update / mark done; you can edit inline",
      "Task Inbox view across all agents — Awaiting you / Running / Queued / Blocked / Done",
      "Activity feed groups task transitions and remembered facts by Today / Yesterday",
      "Human-only sticky notes — shift-click anywhere on the canvas",
    ],
  },
  {
    n: "8",
    title: "Group chats · terminal · MCP",
    oneLiner: "Many agents in one room. Real shells. Custom tool servers.",
    bullets: [
      "Group threads — post once, every member's reply mirrors back through the broker",
      "Terminal tab on the right panel — xterm.js + portable-pty, bound to the agent's worktree",
      "MCP server registry — configured servers materialize a per-agent --mcp-config on spawn",
    ],
  },
];

const NOT_BUILDING = [
  "Cloud sync — workspaces are local-first by intent",
  "Hardware sandboxing / VMs — sandbox is per-task, not per-machine",
  "Roles system — just a tag for now",
  "Manager agents that spawn other agents",
  "Custom MCP server authoring (use existing servers)",
  "Mobile companion app",
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product"
        pill={
          <Pill>
            <Dot status="run" pulse />
            <span>Pre-alpha · Phases 0–8 complete</span>
          </Pill>
        }
        title={<>Everything Orbit ships today.</>}
        lede="Eight phases, each a usable artifact. The list below is what's actually wired up in the desktop app today — not a roadmap of intent."
      />

      <section style={{ padding: "64px 0 96px" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <div
              className="reveal-stagger"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 0,
                border: "1px dashed var(--line3)",
                borderRadius: 2,
              }}
            >
              {PHASES.map((p, i) => (
                <PhaseCell key={p.n} phase={p} index={i} total={PHASES.length} />
              ))}
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "0 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div className="reveal" style={{ maxWidth: 760 }}>
              <h2
                style={{
                  fontSize: 28,
                  lineHeight: 1.15,
                  letterSpacing: "-0.6px",
                  fontWeight: 600,
                  margin: "0 0 12px",
                }}
              >
                Not building yet.
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 24px" }}>
                Discipline — the things we&apos;ve explicitly chosen <em>not</em> to ship before
                Phase 8 stabilizes. Each one has a reason; each is reconsiderable.
              </p>
              <ul className="mono" style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 12.5, color: "var(--textDim)" }}>
                {NOT_BUILDING.map((n) => (
                  <li
                    key={n}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: "10px 0",
                      borderTop: "1px dashed var(--line3)",
                    }}
                  >
                    <span style={{ color: "var(--textFaint)" }}>×</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function PhaseCell({ phase, index, total }: { phase: Phase; index: number; total: number }) {
  const isRight = index % 2 === 1;
  const isLastRow = index >= total - (total % 2 === 0 ? 2 : 1);
  return (
    <div
      style={{
        padding: "28px 28px 26px",
        borderRight: isRight ? "none" : "1px dashed var(--line3)",
        borderBottom: isLastRow ? "none" : "1px dashed var(--line3)",
        background: "var(--ink0)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.06em",
          }}
        >
          PHASE {phase.n}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 9.5,
            color: "var(--textFaint)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "2px 7px",
            border: "1px solid var(--line3)",
            borderRadius: 99,
          }}
        >
          complete
        </span>
      </div>
      <h3
        style={{
          fontSize: 22,
          lineHeight: 1.25,
          fontWeight: 500,
          letterSpacing: "-0.4px",
          margin: "0 0 8px",
        }}
      >
        {phase.title}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--textDim)",
          lineHeight: 1.55,
          margin: "0 0 16px",
        }}
      >
        {phase.oneLiner}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {phase.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              gap: 8,
              fontSize: 12.5,
              color: "var(--text3)",
              lineHeight: 1.55,
              padding: "5px 0",
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
