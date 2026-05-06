import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Chip } from "../_components/ui/Chip";
import { Button } from "../_components/ui/Button";

export const metadata = {
  title: "Agents — Orbit",
  description: "Soul. Purpose. Memory. The shape of an Orbit agent.",
};

const TRIPLE: { k: string; title: string; lede: string; example: string; phase: string }[] = [
  {
    k: "soul",
    title: "Soul",
    lede:
      "How an agent thinks and speaks. Edit-once; injected into every turn's system prompt. Survives restarts and re-spawns.",
    example: "I always use TypeScript strict mode and prefer `unknown` over `any`. I write conservative reviews and won't approve without tests.",
    phase: "Phase 3",
  },
  {
    k: "purpose",
    title: "Purpose",
    lede:
      "What this agent is doing right now. Optional CLAUDE.md import on spawn. Live edits flag a pending pill until the next turn picks them up.",
    example: "Refactor session handling for the auth migration. Add CSRF protection. Coordinate with Forge on the middleware changes.",
    phase: "Phase 3",
  },
  {
    k: "memory",
    title: "Memory",
    lede:
      "Facts the agent accumulates. You can edit any entry; the agent can append via <remember>...</remember>. Capped at the 50 most-recent entries × 8 KB each in the prompt.",
    example: "We use Tailwind v3, not v4. The users table is `usres` (legacy typo). PR reviews block on missing tests.",
    phase: "Phase 3",
  },
];

const TOOLS: { name: string; desc: string; phase: string; danger?: boolean }[] = [
  { name: "read", desc: "Read files in the agent's allowlisted folders.", phase: "Phase 1" },
  { name: "write", desc: "Edit files within the agent's git worktree.", phase: "Phase 1" },
  { name: "bash", desc: "Run shell commands in the agent's worktree.", phase: "Phase 1" },
  { name: "git", desc: "Worktree-isolated git ops via libgit2 (no external git binary required).", phase: "Phase 6" },
  { name: "remember", desc: "Append a fact to the agent's persistent Memory list.", phase: "Phase 3" },
  { name: "send_to(<agent>)", desc: "Hand work to another agent. Routed through the core broker — never agent → agent direct.", phase: "Phase 4" },
  { name: "task", desc: "Create / update / mark-done tasks visible in the right panel and the global Inbox.", phase: "Phase 7" },
  { name: "mcp:*", desc: "Any tool exposed by an MCP server you've registered. Materialized at spawn via --mcp-config.", phase: "Phase 8" },
];

const STARTERS: { id: string; name: string; av: string; avBg: string; avFg: string; role: string; soul: string; tools: string[] }[] = [
  { id: "atlas",   name: "Atlas",   av: "A", avBg: "#1e262e", avFg: "#96b4c7", role: "planner",   soul: "Splits goals into tasks and routes them. Only delegates — never writes code itself.", tools: ["plan", "send_to", "read"] },
  { id: "keeper",  name: "Keeper",  av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", role: "reviewer",  soul: "Reads diffs, runs static checks, leaves line comments. Won't approve without tests.", tools: ["git", "bash", "read"] },
  { id: "forge",   name: "Forge",   av: "F", avBg: "#2a241c", avFg: "#d4b088", role: "builder",   soul: "Implements features end-to-end — code, tests, migration in one pass.", tools: ["write", "git", "bash", "task"] },
  { id: "scribe",  name: "Scribe",  av: "S", avBg: "#1f2128", avFg: "#a0a9c8", role: "writer",    soul: "Docs, changelogs, PR descriptions. Reads the diff and explains what changed.", tools: ["read", "write"] },
  { id: "compass", name: "Compass", av: "C", avBg: "#1e262a", avFg: "#96b9c7", role: "scout",     soul: "Maps unfamiliar codebases. Cites every reference; won't quote what it didn't read.", tools: ["read", "bash"] },
  { id: "ranger",  name: "Ranger",  av: "R", avBg: "#1f281f", avFg: "#a3c398", role: "tester",    soul: "Runs e2e suites, triages flakes, isolates the smallest failing case.", tools: ["bash", "read"] },
  { id: "mason",   name: "Mason",   av: "M", avBg: "#2a2420", avFg: "#c9a690", role: "deployer",  soul: "Talks to CI, watches rollouts. Stops on the first metric that drifts.", tools: ["bash", "mcp:ci"] },
  { id: "scout",   name: "Scout",   av: "S", avBg: "#262028", avFg: "#c4a4d0", role: "researcher",soul: "Reads docs, RFCs, Stack Overflow. Cites sources.", tools: ["read", "mcp:web"] },
];

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agents"
        title={<>Soul. Purpose. Memory.</>}
        lede="An Orbit agent is a Claude Code subprocess in its own working directory. Identity is three persisted fields the core injects on every turn. The result feels less like a chatbot and more like a teammate that remembers."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              {TRIPLE.map((t, i) => (
                <div
                  key={t.k}
                  style={{
                    padding: "32px 28px",
                    background: "var(--ink0)",
                    borderRight: i === TRIPLE.length - 1 ? "none" : "1px dashed var(--line3)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      color: "var(--textFaint)",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {t.k}
                  </div>
                  <h2
                    style={{
                      fontSize: 26,
                      lineHeight: 1.2,
                      letterSpacing: "-0.5px",
                      fontWeight: 500,
                      margin: "0 0 10px",
                    }}
                  >
                    {t.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "var(--textDim)",
                      lineHeight: 1.55,
                      margin: "0 0 20px",
                    }}
                  >
                    {t.lede}
                  </p>
                  <div
                    className="mono"
                    style={{
                      marginTop: "auto",
                      background: "var(--ink2)",
                      border: "1px dashed var(--line3)",
                      borderRadius: 4,
                      padding: "12px 14px",
                      fontSize: 11,
                      color: "var(--text3)",
                      lineHeight: 1.55,
                    }}
                  >
                    <div style={{ color: "var(--textFaint)", marginBottom: 6, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 9.5 }}>
                      example
                    </div>
                    {t.example}
                  </div>
                  <div
                    className="mono"
                    style={{
                      marginTop: 14,
                      fontSize: 10.5,
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {t.phase}
                  </div>
                </div>
              ))}
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
              Tools every agent has.
            </h2>
            <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 720 }}>
              The default toolset, plus pseudo-tools we ship for orchestration and any MCP server
              you register. Tools landed in different phases — older ones are battle-tested, newer
              ones still rough.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {TOOLS.map((t, i) => (
                <li
                  key={t.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 80px",
                    gap: 20,
                    padding: "14px 0",
                    borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                    alignItems: "baseline",
                  }}
                >
                  <span className="mono" style={{ fontSize: 13, color: "var(--text)" }}>
                    {t.name}
                  </span>
                  <span style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.55 }}>
                    {t.desc}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                      textAlign: "right",
                    }}
                  >
                    {t.phase}
                  </span>
                </li>
              ))}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: "1px dashed var(--line3)" }}>
              <div style={{ padding: "28px 28px", background: "var(--ink0)", borderRight: "1px dashed var(--line3)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 10px", letterSpacing: "-0.3px" }}>
                  The engine is swappable.
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
                  Today the engine wraps the Claude Code CLI. The{" "}
                  <code className="mono" style={{ color: "var(--accent)" }}>AgentEngine</code> trait
                  is the seam — future engines can wrap the Anthropic API directly, another CLI, or a
                  local model. Code outside <code className="mono">agents::</code> doesn&apos;t change.
                </p>
                <p
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    color: "var(--textFaint)",
                    letterSpacing: "0.06em",
                    marginTop: 12,
                  }}
                >
                  See ADR 0002 — Claude Code as engine
                </p>
              </div>
              <div style={{ padding: "28px 28px", background: "var(--ink0)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 10px", letterSpacing: "-0.3px" }}>
                  Inter-agent messaging is brokered.
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
                  Agents never talk directly. Every <code className="mono" style={{ color: "var(--accent)" }}>send_to</code> goes
                  through the core broker, which logs to SQLite, applies rate limits, and emits a
                  flight event the canvas animates. Loop guard at depth 8.
                </p>
                <p
                  className="mono"
                  style={{
                    fontSize: 10.5,
                    color: "var(--textFaint)",
                    letterSpacing: "0.06em",
                    marginTop: 12,
                  }}
                >
                  See ADR 0006 — &lt;send_to&gt; pseudo-tool
                </p>
              </div>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 32, flexWrap: "wrap" }}>
              <div>
                <h2
                  style={{
                    fontSize: 28,
                    lineHeight: 1.15,
                    letterSpacing: "-0.6px",
                    fontWeight: 600,
                    margin: "0 0 8px",
                  }}
                >
                  Starter examples.
                </h2>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 600 }}>
                  Personas other Orbit users have shared. Clone any of them, edit the Soul, swap
                  the tool list, and ship.
                </p>
              </div>
              <div className="mono" style={{ fontSize: 10.5, color: "var(--textFaint)", letterSpacing: "0.08em" }}>
                each one is just <span style={{ color: "var(--accent)" }}>soul + tools</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              {STARTERS.map((s, i) => (
                <StarterCell key={s.id} starter={s} index={i} total={STARTERS.length} />
              ))}
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function StarterCell({
  starter,
  index,
  total,
}: {
  starter: { id: string; name: string; av: string; avBg: string; avFg: string; role: string; soul: string; tools: string[] };
  index: number;
  total: number;
}) {
  const isRight = index % 2 === 1;
  const isLastRow = index >= total - (total % 2 === 0 ? 2 : 1);
  return (
    <div
      style={{
        padding: "22px 22px 20px",
        background: "var(--ink0)",
        borderRight: isRight ? "none" : "1px dashed var(--line3)",
        borderBottom: isLastRow ? "none" : "1px dashed var(--line3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 12 }}>
        <span
          className="mono"
          style={{
            width: 32,
            height: 32,
            borderRadius: 5,
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: starter.avBg,
            color: starter.avFg,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {starter.av}
        </span>
        <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.2px" }}>{starter.name}</span>
        <span
          className="mono"
          style={{
            marginLeft: "auto",
            fontSize: 9.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--textFaint)",
            padding: "3px 7px",
            border: "1px solid var(--line3)",
            borderRadius: 99,
          }}
        >
          {starter.role}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.55, margin: "0 0 14px" }}>
        {starter.soul}
      </p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: "auto" }}>
        {starter.tools.map((tool) => (
          <Chip key={tool}>{tool}</Chip>
        ))}
      </div>
    </div>
  );
}
