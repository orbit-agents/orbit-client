import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Chip } from "../_components/ui/Chip";

export const metadata = {
  title: "Agents — Orbit",
  description: "Soul. Purpose. Memory. The shape of an Orbit agent.",
};

const TRIPLE: { k: string; title: string; lede: string; example: string }[] = [
  {
    k: "soul",
    title: "Soul",
    lede:
      "How an agent thinks and speaks. Set it once; it's injected into every turn's system prompt and survives every restart.",
    example:
      "I always use TypeScript strict mode and prefer `unknown` over `any`. I write conservative reviews and won't approve without tests.",
  },
  {
    k: "purpose",
    title: "Purpose",
    lede:
      "What this agent is doing right now. Optional project guide imported on spawn. Edits show a pending pill until the next turn picks them up.",
    example:
      "Refactor session handling for the auth migration. Add CSRF protection. Coordinate with Forge on the middleware changes.",
  },
  {
    k: "memory",
    title: "Memory",
    lede:
      "Facts the agent accumulates as it works. You can edit any entry; the agent appends with the remember tool. Capped at the 50 most-recent × 8 KB each in the prompt.",
    example:
      "We use Tailwind v3, not v4. The users table is `usres` (legacy typo). Reviews block on missing tests.",
  },
];

const TOOLS: { name: string; desc: string; group: string }[] = [
  { name: "read", desc: "Read files in the agent's allowlisted folders.", group: "Files" },
  { name: "write", desc: "Edit files inside the agent's isolated workspace.", group: "Files" },
  { name: "bash", desc: "Run shell commands scoped to the agent's working directory.", group: "Files" },
  { name: "version-control", desc: "Branch, diff, and commit operations inside the per-agent workspace.", group: "Files" },
  { name: "remember", desc: "Append a fact to the agent's persistent memory list.", group: "Identity" },
  { name: "send_to(<agent>)", desc: "Hand work to another agent. Always routed through the broker — never direct.", group: "Coordination" },
  { name: "task", desc: "Create, update, and close tasks visible in the right panel and the global Inbox.", group: "Coordination" },
  { name: "mcp:*", desc: "Any tool exposed by an MCP server you've registered. Materialized at spawn time per agent.", group: "Integrations" },
];

const STARTERS: { id: string; name: string; av: string; avBg: string; avFg: string; role: string; soul: string; tools: string[] }[] = [
  { id: "atlas",   name: "Atlas",   av: "A", avBg: "#1e262e", avFg: "#96b4c7", role: "planner",   soul: "Splits goals into tasks and routes them. Only delegates — never writes code itself.", tools: ["plan", "send_to", "read"] },
  { id: "keeper",  name: "Keeper",  av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", role: "reviewer",  soul: "Reads diffs, runs static checks, leaves line comments. Won't approve without tests.", tools: ["version-control", "bash", "read"] },
  { id: "forge",   name: "Forge",   av: "F", avBg: "#2a241c", avFg: "#d4b088", role: "builder",   soul: "Implements features end-to-end — code, tests, migration in one pass.", tools: ["write", "version-control", "bash", "task"] },
  { id: "scribe",  name: "Scribe",  av: "S", avBg: "#1f2128", avFg: "#a0a9c8", role: "writer",    soul: "Docs, changelogs, release notes. Reads the diff and explains what changed in plain English.", tools: ["read", "write"] },
  { id: "compass", name: "Compass", av: "C", avBg: "#1e262a", avFg: "#96b9c7", role: "scout",     soul: "Maps unfamiliar codebases. Cites every reference; won't quote what it didn't read.", tools: ["read", "bash"] },
  { id: "ranger",  name: "Ranger",  av: "R", avBg: "#1f281f", avFg: "#a3c398", role: "tester",    soul: "Runs end-to-end suites, triages flakes, isolates the smallest failing case.", tools: ["bash", "read"] },
  { id: "mason",   name: "Mason",   av: "M", avBg: "#2a2420", avFg: "#c9a690", role: "deployer",  soul: "Talks to CI, watches rollouts. Stops on the first metric that drifts.", tools: ["bash", "mcp:ci"] },
  { id: "scout",   name: "Scout",   av: "S", avBg: "#262028", avFg: "#c4a4d0", role: "researcher",soul: "Reads docs, RFCs, and the open web. Cites sources.", tools: ["read", "mcp:web"] },
];

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Agents"
        title={<>Soul. Purpose. Memory.</>}
        lede="An Orbit agent is a long-running process with an identity. Three persisted fields the workspace injects on every turn — what it makes feel less like a chatbot and more like a teammate that remembers."
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
              The default toolset, plus the orchestration tools we ship and any MCP server you
              register. Tools are the only way an agent touches the world outside its prompt.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {TOOLS.map((t, i) => (
                <li
                  key={t.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 100px",
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
                      textTransform: "uppercase",
                    }}
                  >
                    {t.group}
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
                  The model is swappable.
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
                  Today Orbit ships with first-class support for the Claude family. The agent layer
                  is built behind a clean trait so other providers and local models slot in without
                  touching anything outside the engine.
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
                  See: Engine integration in the docs
                </p>
              </div>
              <div style={{ padding: "28px 28px", background: "var(--ink0)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 500, margin: "0 0 10px", letterSpacing: "-0.3px" }}>
                  Coordination is brokered.
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
                  Agents never talk directly. Every <code className="mono" style={{ color: "var(--accent)" }}>send_to</code> goes
                  through the workspace broker, which logs the message, applies rate limits, and
                  emits a flight event the canvas animates. Loop guard at depth 8.
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
                  See: Coordination model in the docs
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
                  Starter personas.
                </h2>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 600 }}>
                  Ready-made teammates other Orbit users have shared. Clone any of them, edit the
                  Soul, swap the tool list, and ship.
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
