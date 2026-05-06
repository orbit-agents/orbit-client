import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";
import { DashedFrame } from "../ui/DashedFrame";

type Spec = { k: string; v: ReactNode };
type Agent = {
  id: string;
  name: string;
  av: string;
  avBg: string;
  avFg: string;
  role: string;
  glow: string;
  blurb: string;
  specs: Spec[];
  featured?: boolean;
  now?: ReactNode;
};

function ChipRow({ chips }: { chips: string[] }) {
  return (
    <span style={{ display: "inline-flex", gap: 4 }}>
      {chips.map((c) => (
        <Chip key={c}>{c}</Chip>
      ))}
    </span>
  );
}

function AtlasNow() {
  return (
    <div
      className="mono"
      style={{
        marginTop: 4,
        marginBottom: 18,
        background: "var(--ink2)",
        border: "1px solid var(--line1)",
        borderRadius: 6,
        padding: "12px 14px",
        fontSize: 11.5,
        color: "var(--text3)",
        lineHeight: 1.55,
      }}
    >
      <div
        style={{
          color: "var(--textFaint)",
          fontSize: 9.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: 99,
            background: "var(--accent)",
            animation: "om-pulse 1.6s ease-in-out infinite",
          }}
        />
        currently · platform-core
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>
        ▸ goal: <span style={{ color: "var(--accent)" }}>&quot;refactor session handling, add CSRF&quot;</span>
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>
        {"  ├─ "}
        <span style={{ color: "var(--think)" }}>forge</span> · implement middleware{" "}
        <span style={{ color: "var(--textFaint)" }}>(in progress, 11m)</span>
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>
        {"  ├─ "}
        <span style={{ color: "var(--think)" }}>ranger</span> · add e2e for auth flow{" "}
        <span style={{ color: "var(--textFaint)" }}>(queued)</span>
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>
        {"  ├─ "}
        <span style={{ color: "var(--think)" }}>scribe</span> · update docs/auth.md{" "}
        <span style={{ color: "var(--textFaint)" }}>(queued)</span>
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>
        {"  └─ "}
        <span style={{ color: "var(--think)" }}>keeper</span> · review &amp; gate PR{" "}
        <span style={{ color: "var(--textFaint)" }}>(waiting)</span>
      </div>
    </div>
  );
}

const AGENTS: Agent[] = [
  {
    id: "atlas",
    name: "Atlas",
    av: "A",
    avBg: "#1e262e",
    avFg: "#96b4c7",
    role: "planner · orchestrator",
    glow: "rgba(150,180,199,0.14)",
    featured: true,
    blurb:
      "The one you talk to first. Atlas takes a goal in plain English, splits it into tasks, picks the right agent for each one, and runs the squad. When something blocks, Atlas decides what to do next — re-route, ask you, or stop.",
    now: <AtlasNow />,
    specs: [
      {
        k: "model",
        v: (
          <>
            claude-sonnet-4.5 <span style={{ color: "var(--textFaint)" }}>· 200k ctx</span>
          </>
        ),
      },
      {
        k: "tools",
        v: (
          <span style={{ display: "inline-flex", gap: 4 }}>
            <Chip>plan</Chip>
            <Chip>delegate</Chip>
            <Chip>read(all)</Chip>
          </span>
        ),
      },
      { k: "memory", v: "workspace-scoped, persistent" },
    ],
  },
  {
    id: "keeper",
    name: "Keeper",
    av: "K",
    avBg: "#1f2a22",
    avFg: "#9ccfb0",
    role: "reviewer",
    glow: "rgba(74,222,128,0.1)",
    blurb: "Reads diffs, runs static checks, leaves line comments. Conservative — won't approve without tests.",
    specs: [
      { k: "model", v: "opus-4 · 200k" },
      { k: "tools", v: <ChipRow chips={["git", "shell", "fs(ro)"]} /> },
    ],
  },
  {
    id: "forge",
    name: "Forge",
    av: "F",
    avBg: "#2a241c",
    avFg: "#d4b088",
    role: "builder",
    glow: "rgba(212,176,136,0.1)",
    blurb: "Implements features end-to-end. Writes the code, the tests, and the migration in one pass.",
    specs: [
      { k: "model", v: "sonnet-4.5 · 200k" },
      { k: "tools", v: <ChipRow chips={["git", "shell", "fs(rw)", "test"]} /> },
    ],
  },
  {
    id: "scribe",
    name: "Scribe",
    av: "S",
    avBg: "#1f2128",
    avFg: "#a0a9c8",
    role: "writer",
    glow: "rgba(160,169,200,0.1)",
    blurb: "Docs, changelogs, PR descriptions. Reads the diff and explains what changed in plain English.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["git", "fs(rw)"]} /> },
    ],
  },
  {
    id: "compass",
    name: "Compass",
    av: "C",
    avBg: "#1e262a",
    avFg: "#96b9c7",
    role: "scout",
    glow: "rgba(150,185,199,0.1)",
    blurb: "Explores unfamiliar codebases. Maps dependencies, finds the file you're looking for.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["grep", "fs(ro)", "graph"]} /> },
    ],
  },
  {
    id: "ranger",
    name: "Ranger",
    av: "R",
    avBg: "#1f281f",
    avFg: "#a3c398",
    role: "tester",
    glow: "rgba(163,195,152,0.1)",
    blurb: "Runs e2e and integration suites, triages flakes, isolates the smallest failing case.",
    specs: [
      { k: "model", v: "sonnet-4.5" },
      { k: "tools", v: <ChipRow chips={["test", "shell", "log"]} /> },
    ],
  },
  {
    id: "mason",
    name: "Mason",
    av: "M",
    avBg: "#2a2420",
    avFg: "#c9a690",
    role: "deployer",
    glow: "rgba(201,166,144,0.1)",
    blurb: "Builds artifacts, talks to CI, watches rollouts. Stops on the first metric that drifts.",
    specs: [
      { k: "model", v: "sonnet-4.5" },
      {
        k: "tools",
        v: (
          <span style={{ display: "inline-flex", gap: 4 }}>
            <Chip>ci</Chip>
            <Chip>deploy</Chip>
            <Chip>metrics</Chip>
            <Chip variant="danger">prod</Chip>
          </span>
        ),
      },
    ],
  },
  {
    id: "scout",
    name: "Scout",
    av: "S",
    avBg: "#262028",
    avFg: "#c4a4d0",
    role: "researcher",
    glow: "rgba(196,164,208,0.1)",
    blurb: "Reads docs, RFCs, Stack Overflow. Cites sources. Won't quote what it didn't read.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["web", "read"]} /> },
    ],
  },
];

export function Agents() {
  return (
    <section
      id="agents"
      style={{
        padding: "120px 0",
        position: "relative",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--line3) 20%, var(--line3) 80%, transparent)",
          pointerEvents: "none",
        }}
      />
      <SectionContainer>
        <DashedFrame padding={48}>
          <div
            className="reveal"
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "space-between",
              marginBottom: 48,
              gap: 32,
            }}
          >
          <div>
            <Eyebrow>The roster</Eyebrow>
            <h2
              style={{
                fontSize: 44,
                lineHeight: 1.05,
                letterSpacing: "-1.2px",
                fontWeight: 600,
                margin: "14px 0 0",
                maxWidth: 640,
                textWrap: "balance",
              }}
            >
              A small cast, each with one job they&apos;re great at.
            </h2>
          </div>
          <div style={{ textAlign: "right", maxWidth: 320 }}>
            <p style={{ fontSize: 13.5, color: "var(--textDim)", margin: "0 0 12px", lineHeight: 1.55 }}>
              Eight starters out of the box. Clone any of them, swap the model, edit the persona,
              restrict the tools. Or build your own from scratch.
            </p>
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: "var(--textFaint)",
                letterSpacing: "0.06em",
                display: "inline-flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <span>
                <b style={{ color: "var(--accent)", fontWeight: 500 }}>8</b> starters
              </span>
              <span>
                <b style={{ color: "var(--accent)", fontWeight: 500 }}>∞</b> custom
              </span>
                <span>
                  <b style={{ color: "var(--accent)", fontWeight: 500 }}>any</b> model
                </span>
              </div>
            </div>
          </div>

          <div
            className="reveal-stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridAutoRows: "minmax(220px, auto)",
              border: "1px dashed var(--line3)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            {AGENTS.map((a) => (
              <AgentCell key={a.id} agent={a} />
            ))}
          </div>

          <div
            className="reveal"
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "14px 18px",
              background: "var(--ink0)",
              border: "1px dashed var(--line3)",
              borderRadius: 2,
            }}
          >
            <div className="mono" style={{ fontSize: 11, color: "var(--textDim)", letterSpacing: "0.04em" }}>
              <b style={{ color: "var(--text)", fontWeight: 500 }}>Build your own.</b> A persona prompt, a model, a list of tools — that&apos;s the whole spec.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button>Browse community agents →</Button>
              <Button variant="primary">+ New agent</Button>
            </div>
          </div>
        </DashedFrame>
      </SectionContainer>
    </section>
  );
}

function AgentCell({ agent }: { agent: Agent }) {
  const featured = !!agent.featured;
  return (
    <div
      style={{
        background: "var(--ink0)",
        padding: featured ? "28px 28px 24px" : "22px 22px 18px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        gridColumn: featured ? "span 3" : "span 2",
        gridRow: featured ? "span 2" : undefined,
        display: "flex",
        flexDirection: "column",
        transition: "background .25s ease",
        borderRight: "1px dashed var(--line3)",
        borderBottom: "1px dashed var(--line3)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 14 }}>
        <span
          className="mono"
          style={{
            width: featured ? 44 : 32,
            height: featured ? 44 : 32,
            borderRadius: featured ? 7 : 5,
            fontSize: featured ? 17 : 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: agent.avBg,
            color: agent.avFg,
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {agent.av}
        </span>
        <span
          style={{
            fontSize: featured ? 22 : 15.5,
            fontWeight: 500,
            letterSpacing: featured ? "-0.5px" : "-0.2px",
          }}
        >
          {agent.name}
        </span>
        <span
          className="mono"
          style={{
            marginLeft: "auto",
            fontSize: featured ? 10.5 : 9.5,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--textFaint)",
            padding: featured ? "4px 9px" : "3px 7px",
            border: "1px solid var(--line2)",
            borderRadius: 99,
          }}
        >
          {agent.role}
        </span>
      </div>
      <p
        style={{
          fontSize: featured ? 15 : 13,
          color: "var(--text3)",
          lineHeight: featured ? 1.55 : 1.5,
          margin: featured ? "0 0 20px" : "0 0 16px",
          maxWidth: featured ? 460 : undefined,
          textWrap: "pretty",
        }}
      >
        {agent.blurb}
      </p>
      {agent.now}
      <div
        style={{
          borderTop: "1px solid var(--line1)",
          paddingTop: 12,
          display: "grid",
          gap: 7,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10.5,
          color: "var(--textDim)",
          marginTop: "auto",
        }}
      >
        {agent.specs.map((s) => (
          <div key={s.k} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span
              style={{
                color: "var(--textFaint)",
                width: 56,
                flexShrink: 0,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: 9.5,
              }}
            >
              {s.k}
            </span>
            <span style={{ color: "var(--text2)", fontSize: 11 }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
