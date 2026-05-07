import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Pill } from "../_components/ui/Pill";
import { Dot } from "../_components/ui/Dot";
import { Button } from "../_components/ui/Button";

export const metadata = {
  title: "Changelog — Orbit",
  description: "Release notes for the Orbit desktop app.",
};

type Release = {
  version: string;
  date: string;
  title: string;
  highlights: { kind: "feature" | "improvement" | "fix"; text: string }[];
  current?: boolean;
};

const RELEASES: Release[] = [
  {
    version: "0.4.2",
    date: "May 6, 2026",
    title: "Group rooms, terminal, and the MCP registry",
    current: true,
    highlights: [
      { kind: "feature", text: "Group conversations — post once and every member of the team responds through the broker." },
      { kind: "feature", text: "Built-in terminal tab on the right rail, bound to each agent's working directory." },
      { kind: "feature", text: "MCP server registry. Register a server in Settings; agents can use the tools on their next turn." },
      { kind: "improvement", text: "Faster canvas pan and zoom on workspaces with 8+ agents." },
      { kind: "fix", text: "Fixed an edge case where pasted multi-line input would race the streaming reply." },
    ],
  },
  {
    version: "0.4.0",
    date: "April 28, 2026",
    title: "Tasks, activity feed, and sticky notes",
    highlights: [
      { kind: "feature", text: "Tasks: agents create, update, and close them inline. A unified Inbox spans every agent on the map." },
      { kind: "feature", text: "Activity feed groups task transitions and remembered facts by Today / Yesterday." },
      { kind: "feature", text: "Sticky notes — shift-click anywhere on the canvas. Human-only; agents can read but never write them." },
      { kind: "improvement", text: "The right rail now remembers which tab was open per agent." },
    ],
  },
  {
    version: "0.3.0",
    date: "April 21, 2026",
    title: "Workspace isolation",
    highlights: [
      { kind: "feature", text: "One workspace per agent. Each gets its own branch and its own working directory." },
      { kind: "feature", text: "Per-agent Diff tab and Branch panel inside Settings." },
      { kind: "improvement", text: "Spawn now refuses if your tree is dirty; falls back gracefully when you're outside a project." },
      { kind: "fix", text: "Fixed a memory leak when reopening a workspace with stale agent state." },
    ],
  },
  {
    version: "0.2.0",
    date: "April 14, 2026",
    title: "Teams and folder access",
    highlights: [
      { kind: "feature", text: "Team regions on the canvas auto-derive their bounds from the agents inside them." },
      { kind: "feature", text: "Per-agent folder allowlist enforced at the workspace boundary." },
      { kind: "improvement", text: "Drag any agent into a region to add it; drag out to remove." },
    ],
  },
  {
    version: "0.1.4",
    date: "April 7, 2026",
    title: "Agent-to-agent messaging",
    highlights: [
      { kind: "feature", text: "Agents can hand work to each other through the broker. Animated arcs on the canvas show messages in flight." },
      { kind: "feature", text: "Loop guard at depth 8 stops runaway delegation." },
      { kind: "improvement", text: "Refreshed the visual language across the app — denser type, clearer dividers, calmer accents." },
    ],
  },
  {
    version: "0.1.2",
    date: "March 30, 2026",
    title: "Soul, Purpose, Memory",
    highlights: [
      { kind: "feature", text: "Persisted identity. Soul, Purpose, and Memory survive every restart and re-spawn." },
      { kind: "feature", text: "Memory tool — agents can append a fact themselves. You can edit any entry by hand." },
      { kind: "improvement", text: "Live identity edits show a pending pill until the next turn picks them up." },
    ],
  },
  {
    version: "0.1.0",
    date: "March 24, 2026",
    title: "Multiple agents on a canvas",
    highlights: [
      { kind: "feature", text: "Spatial canvas with multiple agents — each one independent, each with its own state." },
      { kind: "feature", text: "Drag to rearrange. Status rings show idle, streaming, and waiting-on-you." },
      { kind: "improvement", text: "Per-agent draft and scroll position now persist between switches." },
    ],
  },
  {
    version: "0.0.5",
    date: "March 17, 2026",
    title: "First public preview",
    highlights: [
      { kind: "feature", text: "Spawn a single agent. Talk to it. Pick up where you left off." },
      { kind: "feature", text: "Tool calls render as expandable cards — you can see exactly what happened." },
      { kind: "feature", text: "Conversations persist locally. Restart the app and your history is still there." },
    ],
  },
];

export default function ChangelogPage() {
  const latest = RELEASES.find((r) => r.current) ?? RELEASES[0];
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        pill={
          <Pill>
            <Dot status="run" pulse />
            <span>Latest · v{latest.version} · {latest.date}</span>
          </Pill>
        }
        title={<>Release notes.</>}
        lede="Every Orbit release, with the changes worth knowing about. We ship on a roughly weekly cadence — quiet weeks get small fixes, loud weeks get new capabilities."
      />

      <section style={{ padding: "64px 0 96px" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {RELEASES.map((r, i) => (
                <ReleaseRow key={r.version} release={r} first={i === 0} />
              ))}
            </ol>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "0 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, color: "var(--textDim)", margin: "0 0 6px" }}>
                  Want release notes in your inbox?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Subscribe to the{" "}
                  <a href="/newsletter" style={{ color: "var(--accent)" }}>
                    monthly digest
                  </a>{" "}
                  — one email per release cycle.
                </p>
              </div>
              <Button as="a" href="/download" variant="primary">
                Download v{latest.version} →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function ReleaseRow({ release, first }: { release: Release; first: boolean }) {
  return (
    <li
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: 32,
        padding: "32px 0",
        borderTop: first ? "none" : "1px dashed var(--line3)",
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.4px",
            color: "var(--text)",
          }}
        >
          v{release.version}
        </span>
        <span
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--textFaint)",
            letterSpacing: "0.06em",
          }}
        >
          {release.date}
        </span>
        {release.current && (
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--accent)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 7px",
              border: "1px solid var(--accentBd)",
              borderRadius: 99,
              display: "inline-flex",
              width: "fit-content",
              background: "var(--accentBg)",
            }}
          >
            current
          </span>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: 20, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.3px" }}>
          {release.title}
        </h3>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {release.highlights.map((h, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: 16,
                padding: "8px 0",
                fontSize: 13.5,
                color: "var(--textDim)",
                lineHeight: 1.55,
              }}
            >
              <Tag kind={h.kind} />
              <span>{h.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

type TagKind = "feature" | "improvement" | "fix";

function Tag({ kind }: { kind: TagKind }) {
  const map: Record<TagKind, { label: string; color: string }> = {
    feature: { label: "new", color: "var(--accent)" },
    improvement: { label: "improved", color: "#9ccfb0" },
    fix: { label: "fixed", color: "#c9a690" },
  };
  const { label, color } = map[kind];
  return (
    <span
      className="mono"
      style={{
        fontSize: 9.5,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color,
        padding: "2px 8px",
        border: `1px solid ${color}33`,
        borderRadius: 99,
        display: "inline-flex",
        alignSelf: "start",
        width: "fit-content",
      }}
    >
      {label}
    </span>
  );
}

