import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";
import { Button } from "../_components/ui/Button";

export const metadata = {
  title: "Changelog — Orbit",
  description: "From scaffold to Phase 8. Phase completion timeline + recent commits.",
};

const REPO = "https://github.com/orbit-agents/orbit";

type Phase = {
  n: string;
  title: string;
  date: string;
  deliverable: string;
  commit?: string;
};

// Dates and commit SHAs sourced from `gh api repos/orbit-agents/orbit/commits` snapshot
const PHASES: Phase[] = [
  {
    n: "8",
    title: "Group conversations · terminal · MCP",
    date: "2026-05-06",
    deliverable:
      "Multi-agent rooms posted via the broker, an xterm.js terminal tab bound to a per-agent PTY, and an MCP server registry that materializes a per-agent --mcp-config at spawn.",
    commit: "305b30f",
  },
  {
    n: "7",
    title: "Tasks · activity feed · sticky notes",
    date: "2026-05-06",
    deliverable:
      "Task pseudo-tool: agents create, update, mark-done. Task Inbox view across all agents. Activity feed groups task transitions and remembered facts. Human-only sticky notes — shift-click anywhere on the canvas.",
    commit: "6548465",
  },
  {
    n: "6",
    title: "Git isolation",
    date: "2026-05-06",
    deliverable:
      "One git worktree per agent, one branch per agent. libgit2 (git2) — no external git binary required at runtime. Per-agent Diff tab + Branch section in Settings.",
    commit: "732c5a7",
  },
  {
    n: "5",
    title: "Teams + folder access",
    date: "2026-05-06",
    deliverable:
      "Canvas team regions auto-derive their bounds from member positions. Per-agent folder allowlist passed to Claude Code via --add-dir, enforced at the IPC boundary.",
    commit: "93c6f16",
  },
  {
    n: "4",
    title: "Agent-to-agent messaging",
    date: "2026-05-06",
    deliverable:
      "Broker, send_to pseudo-tool, animated arcs on the canvas. Loop guard at depth 8. V1 Ledger design system applied across the app.",
    commit: "e7ee0ce",
  },
  {
    n: "3",
    title: "Soul · Purpose · Memory",
    date: "2026-05-06",
    deliverable:
      "Persisted identity injected into every system prompt. Memory writable by the agent via <remember>. Optional CLAUDE.md import on spawn. Live identity updates flagged with a pending pill.",
    commit: "83700d3",
  },
  {
    n: "2",
    title: "Canvas + multiple agents",
    date: "2026-04-25",
    deliverable:
      "React Flow canvas with multiple agent nodes, each an independent Claude Code subprocess. Drag-to-arrange, status rings, draft + scroll preservation per agent.",
    commit: "634b377",
  },
  {
    n: "1",
    title: "One agent, end-to-end",
    date: "2026-04-22",
    deliverable:
      "Spawn a single Claude Code subprocess, stream output to a chat panel, persist conversations in SQLite. Tool calls render as expandable cards.",
    commit: "76ad380",
  },
  {
    n: "0",
    title: "Foundation",
    date: "2026-04-21",
    deliverable:
      "Repo scaffold, three-panel shell, design tokens, CI. The shell every later phase is bolted onto.",
  },
];

const RECENT_COMMITS: { sha: string; date: string; subject: string }[] = [
  { sha: "612d113", date: "2026-05-06", subject: "docs(phases): mark Phase 4 complete and dedupe Phase 6 header" },
  { sha: "305b30f", date: "2026-05-06", subject: "feat(phase-8): frontend — group chat, terminal tab, MCP settings" },
  { sha: "b1d2c49", date: "2026-05-06", subject: "feat(phase-8): backend — group threads, terminal PTY, MCP servers" },
  { sha: "6548465", date: "2026-05-06", subject: "feat(tasks): Phase 7 frontend — Tasks panel, Inbox view, sticky notes" },
  { sha: "923a1b1", date: "2026-05-06", subject: "feat(tasks): Phase 7 backend — tasks, activity feed, sticky notes" },
  { sha: "732c5a7", date: "2026-05-06", subject: "feat(git): Phase 6 frontend — Diff tab + Branch section" },
  { sha: "33796d3", date: "2026-05-06", subject: "feat(git): Phase 6 backend — per-agent libgit2 worktrees + diff API" },
  { sha: "93c6f16", date: "2026-05-06", subject: "feat(teams): Phase 5 frontend — sidebar Teams, canvas regions, folder access" },
  { sha: "4416bed", date: "2026-05-06", subject: "feat(teams): Phase 5 backend — teams, folder access, broker race fix" },
  { sha: "e7ee0ce", date: "2026-05-06", subject: "feat(broker): Phase 4 frontend + V1 Ledger design system" },
  { sha: "430432b", date: "2026-05-06", subject: "feat(broker): Phase 4 backend — agent-to-agent messaging via <send_to>" },
  { sha: "83700d3", date: "2026-05-06", subject: "feat(identity): empty-fallback fix, IdentityEditor tests, mark Phase 3 complete" },
  { sha: "28de6f0", date: "2026-05-06", subject: "feat(identity): Phase 3 frontend — settings accordion, memory list, dirty pill" },
  { sha: "d194b3c", date: "2026-05-06", subject: "feat(identity): Phase 3 backend — soul, purpose, memory, remember tool" },
  { sha: "634b377", date: "2026-04-25", subject: "test(canvas): Phase 2 store + agent-node tests, ADR 0004, phase docs" },
];

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        pill={
          <Pill>
            <Dot status="run" pulse />
            <span>No tagged releases yet · pre-alpha</span>
          </Pill>
        }
        title={<>From scaffold to Phase 8.</>}
        lede="Orbit hasn't cut a tagged release yet, so the changelog is the phase completion timeline. Each phase shipped a usable artifact — not a scaffold."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 28px" }}>
              Phase timeline.
            </h2>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {PHASES.map((p, i) => (
                <PhaseRow key={p.n} phase={p} first={i === 0} />
              ))}
            </ol>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
                  Recent commits.
                </h2>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0 }}>
                  The latest 15 commits to <code className="mono">main</code>, snapshot at build
                  time. Live feed: <a
                    href={`${REPO}/commits/main`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    GitHub
                  </a>.
                </p>
              </div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {RECENT_COMMITS.map((c, i) => (
                <li key={c.sha}>
                  <a
                    href={`${REPO}/commit/${c.sha}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "100px 100px 1fr 24px",
                      gap: 16,
                      padding: "12px 8px",
                      borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                      alignItems: "baseline",
                      borderRadius: 2,
                    }}
                  >
                    <span className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>
                      {c.sha}
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--textFaint)" }}>
                      {c.date}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.5 }}>
                      {c.subject}
                    </span>
                    <span className="mono" style={{ color: "var(--textFaint)", fontSize: 13, textAlign: "right" }}>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, color: "var(--textDim)", margin: "0 0 6px" }}>
                  Tagged releases
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Will appear here once Orbit cuts its first 0.1.
                </p>
              </div>
              <Button
                as="a"
                href={`${REPO}/releases`}
                variant="ghost"
                target="_blank"
                rel="noreferrer"
              >
                Watch releases →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function PhaseRow({ phase, first }: { phase: Phase; first: boolean }) {
  return (
    <li
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "120px 100px 1fr",
        gap: 32,
        padding: "28px 0",
        borderTop: first ? "none" : "1px dashed var(--line3)",
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
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
            display: "inline-flex",
            width: "fit-content",
          }}
        >
          complete
        </span>
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--textFaint)", paddingTop: 2 }}>
        {phase.date}
      </div>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.3px" }}>
          {phase.title}
        </h3>
        <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0, maxWidth: 720 }}>
          {phase.deliverable}
        </p>
        {phase.commit && (
          <a
            href={`${REPO}/commit/${phase.commit}`}
            target="_blank"
            rel="noreferrer"
            className="mono"
            style={{
              display: "inline-block",
              marginTop: 10,
              fontSize: 10.5,
              color: "var(--textMute)",
              letterSpacing: "0.06em",
            }}
          >
            commit <span style={{ color: "var(--accent)" }}>{phase.commit}</span> ↗
          </a>
        )}
      </div>
    </li>
  );
}
