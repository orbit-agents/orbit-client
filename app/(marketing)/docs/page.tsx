import { ReactNode } from "react";
import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Button } from "../_components/ui/Button";

export const metadata = {
  title: "Docs — Orbit",
  description: "Read the source. Architecture, phases, ADRs, contributing.",
};

const REPO = "https://github.com/orbit-agents/orbit";

const TILES: { name: string; path: string; lede: string; tag: string }[] = [
  {
    name: "README",
    path: "README.md",
    lede: "What Orbit is, the prereqs, and the three commands that get the desktop app running.",
    tag: "start here",
  },
  {
    name: "CLAUDE.md",
    path: "CLAUDE.md",
    lede: "The canonical guide for AI and human contributors. Architecture, conventions, design tokens, phase discipline, and the non-negotiable rules.",
    tag: "deepest",
  },
  {
    name: "Architecture",
    path: "docs/architecture.md",
    lede: "Three layers, two boundaries. Diagrams + the message-flow walkthrough.",
    tag: "design",
  },
  {
    name: "Phases",
    path: "docs/phases.md",
    lede: "The build roadmap, with manual test checklists per phase. Phases 0–8 all complete.",
    tag: "roadmap",
  },
  {
    name: "Contributing",
    path: "CONTRIBUTING.md",
    lede: "PR flow, conventional commits, where ADRs live. Read CLAUDE.md first.",
    tag: "process",
  },
];

const ADRS: { n: string; title: string; slug: string }[] = [
  { n: "0001", title: "Tauri over Electron", slug: "0001-tauri-over-electron" },
  { n: "0002", title: "Claude Code as engine", slug: "0002-claude-code-as-engine" },
  { n: "0003", title: "Long-lived Claude subprocess", slug: "0003-long-lived-claude-subprocess" },
  { n: "0004", title: "Canvas state ownership", slug: "0004-canvas-state-ownership" },
  { n: "0005", title: "Remember tool — prompt vs MCP", slug: "0005-remember-tool-prompt-vs-mcp" },
  { n: "0006", title: "send_to pseudo-tool", slug: "0006-send-to-pseudo-tool" },
  { n: "0007", title: "Team bounds derived", slug: "0007-team-bounds-derived" },
  { n: "0008", title: "Git worktrees", slug: "0008-git-worktrees" },
  { n: "0009", title: "Task pseudo-tool", slug: "0009-task-pseudo-tool" },
  { n: "0010", title: "Phase 8 architecture", slug: "0010-phase-8-architecture" },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Docs"
        title={<>Read the source.</>}
        lede="Orbit is open source. The docs that guide contributors are the same docs that explain how the system works. There is no separate marketing pretense — the README is the README."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 28px" }}>
              Start with these.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
              {TILES.map((t, i) => (
                <DocTile
                  key={t.path}
                  tile={t}
                  index={i}
                  total={TILES.length}
                />
              ))}
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
                  Architecture decision records.
                </h2>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 600 }}>
                  Every non-trivial choice has a one-page record explaining{" "}
                  <em>why</em>. Useful when a decision feels weird six months later.
                </p>
              </div>
              <a
                href={`${REPO}/tree/main/docs/decisions`}
                target="_blank"
                rel="noreferrer"
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                }}
              >
                browse all on GitHub →
              </a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {ADRS.map((a, i) => (
                <li key={a.n}>
                  <a
                    href={`${REPO}/blob/main/docs/decisions/${a.slug}.md`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr 24px",
                      gap: 18,
                      padding: "14px 12px",
                      borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                      alignItems: "baseline",
                      transition: "background .15s",
                      borderRadius: 2,
                    }}
                    className="adr-row"
                  >
                    <span
                      className="mono"
                      style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.06em" }}
                    >
                      ADR {a.n}
                    </span>
                    <span style={{ fontSize: 14.5, color: "var(--text)" }}>{a.title}</span>
                    <span
                      className="mono"
                      style={{ color: "var(--textFaint)", fontSize: 14, textAlign: "right" }}
                    >
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
                  Want to contribute?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Read{" "}
                  <a
                    href={`${REPO}/blob/main/CLAUDE.md`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--accent)" }}
                  >
                    CLAUDE.md
                  </a>{" "}
                  first — it&apos;s the source of truth for both human and AI contributors.
                </p>
              </div>
              <Button
                as="a"
                href={REPO}
                variant="primary"
                target="_blank"
                rel="noreferrer"
              >
                Open the repo →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function DocTile({
  tile,
  index,
  total,
}: {
  tile: { name: string; path: string; lede: string; tag: string };
  index: number;
  total: number;
}) {
  const isRight = index % 2 === 1;
  const isLastRow = index >= total - (total % 2 === 0 ? 2 : 1);
  return (
    <a
      href={`${REPO}/blob/main/${tile.path}`}
      target="_blank"
      rel="noreferrer"
      style={{
        padding: "26px 28px 24px",
        background: "var(--ink0)",
        borderRight: isRight ? "none" : "1px dashed var(--line3)",
        borderBottom: isLastRow ? "none" : "1px dashed var(--line3)",
        display: "flex",
        flexDirection: "column",
        gridColumn: index === total - 1 && total % 2 === 1 ? "span 2" : undefined,
        cursor: "pointer",
        transition: "background .2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
        <span className="mono" style={{ fontSize: 13, color: "var(--text)" }}>
          {tile.path}
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
          {tile.tag}
        </span>
        <span
          className="mono"
          style={{ marginLeft: "auto", color: "var(--textFaint)", fontSize: 14 }}
        >
          ↗
        </span>
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.3px" }}>
        {tile.name}
      </h3>
      <p style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.55, margin: 0 }}>
        {tile.lede}
      </p>
    </a>
  );
}
