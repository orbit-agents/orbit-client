import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";

export const metadata = {
  title: "Product — Orbit",
  description: "A spatial workspace for orchestrating AI agents on your machine.",
};

type Feature = {
  group: string;
  title: string;
  oneLiner: string;
  bullets: string[];
};

const FEATURES: Feature[] = [
  {
    group: "Workspace",
    title: "Spatial canvas",
    oneLiner: "A map for your agents. Place them, group them, watch them work.",
    bullets: [
      "Three-panel layout — canvas, sidebar, right rail — every panel resizable",
      "Double-click to spawn an agent at a point; drag to rearrange",
      "Status ring on every node: idle, streaming, waiting on you",
      "Designed for up to 10 agents per map without the room getting noisy",
    ],
  },
  {
    group: "Workspace",
    title: "Per-agent isolation",
    oneLiner: "Conversations, drafts, scroll position — all kept separate.",
    bullets: [
      "Each agent has its own chat, its own working directory, its own state",
      "Switch between agents without losing context",
      "Persistent across restarts — every map is a real artifact on disk",
    ],
  },
  {
    group: "Identity",
    title: "Soul, Purpose, Memory",
    oneLiner: "Agents that remember who they are between sessions.",
    bullets: [
      "Soul defines voice and standards; Purpose is the task in front of them",
      "Memory is a writable list of facts the agent maintains itself",
      "Live edits roll in on the next turn — no restart, no re-prompt",
    ],
  },
  {
    group: "Identity",
    title: "Tasks and inbox",
    oneLiner: "A queue every agent shares with you.",
    bullets: [
      "Agents create, update, and close tasks inline",
      "A unified inbox: Awaiting you, Running, Queued, Blocked, Done",
      "Sticky notes for human-only thoughts — shift-click anywhere on the canvas",
    ],
  },
  {
    group: "Coordination",
    title: "Agent-to-agent messaging",
    oneLiner: "Atlas hands work to Forge. The arc flies across the canvas.",
    bullets: [
      "Every handoff routes through the broker — never agent to agent direct",
      "Animated arcs on the canvas show messages in flight",
      "Loop guard at depth 8; full audit trail in the run log",
    ],
  },
  {
    group: "Coordination",
    title: "Teams and folder access",
    oneLiner: "Group agents that work together. Lock down what they read.",
    bullets: [
      "Team regions on the canvas auto-derive their bounds from members",
      "Drag an agent in to add, drag out to remove",
      "Per-agent folder allowlist enforced at the workspace boundary",
    ],
  },
  {
    group: "Code",
    title: "Workspace isolation",
    oneLiner: "One workspace per agent. No more stepping on each other.",
    bullets: [
      "Every agent runs in its own isolated branch and working directory",
      "Built-in Diff tab and Branch panel inside Settings",
      "Spawn refuses if your tree is dirty; falls back gracefully outside a project",
    ],
  },
  {
    group: "Code",
    title: "Group rooms and shared terminal",
    oneLiner: "Many agents in one room. Real shells when you need them.",
    bullets: [
      "Group threads — post once, every member responds through the broker",
      "Built-in terminal bound to each agent's working directory",
      "MCP server registry — register once, every agent can use the tools",
    ],
  },
];

const NOT_BUILDING = [
  "Cloud sync — workspaces are local-first by intent",
  "Hardware sandboxing or VMs — sandbox is per-task, not per-machine",
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
            <span>v0.4.2 · available now</span>
          </Pill>
        }
        title={<>A workspace for AI teammates.</>}
        lede="Orbit is a desktop app for running and orchestrating AI agents locally. The list below is what's wired up in the app today — capabilities you can use the moment you open it."
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
              {FEATURES.map((f, i) => (
                <FeatureCell key={f.title} feature={f} index={i} total={FEATURES.length} />
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
                Not on the roadmap.
              </h2>
              <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 24px" }}>
                Discipline — the things we&apos;ve explicitly chosen <em>not</em> to ship. Each one
                has a reason; each is reconsiderable.
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

function FeatureCell({ feature, index, total }: { feature: Feature; index: number; total: number }) {
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
            textTransform: "uppercase",
          }}
        >
          {feature.group}
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
          shipped
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
        {feature.title}
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--textDim)",
          lineHeight: 1.55,
          margin: "0 0 16px",
        }}
      >
        {feature.oneLiner}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {feature.bullets.map((b) => (
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
