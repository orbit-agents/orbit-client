export type NavLink = { slug: string; title: string; tag?: string };
export type NavGroup = { group: string; links: NavLink[] };

export const DOC_NAV: NavGroup[] = [
  {
    group: "Get started",
    links: [
      { slug: "install", title: "Install Orbit", tag: "5 min" },
      { slug: "connections", title: "Connect a model provider", tag: "3 min" },
      { slug: "quickstart", title: "Your first workspace", tag: "10 min" },
    ],
  },
  {
    group: "Concepts",
    links: [
      { slug: "identity", title: "Soul, Purpose, Memory" },
      { slug: "tasks", title: "Tasks and the inbox" },
      { slug: "coordination", title: "Coordination model" },
    ],
  },
  {
    group: "Workspaces",
    links: [
      { slug: "workspaces", title: "Project workspaces" },
      { slug: "folder-access", title: "Folder access control" },
      { slug: "teams", title: "Teams" },
    ],
  },
  {
    group: "Integrations",
    links: [
      { slug: "mcp", title: "MCP servers" },
      { slug: "terminal", title: "Terminal & shells" },
      { slug: "engine", title: "Engine integration" },
    ],
  },
  {
    group: "Reference",
    links: [
      { slug: "architecture", title: "Architecture" },
      { slug: "shortcuts", title: "Keyboard shortcuts" },
      { slug: "configuration", title: "Configuration" },
      { slug: "troubleshooting", title: "Troubleshooting" },
    ],
  },
];

export type NoteLink = { slug: string; n: string; title: string };

export const NOTES_NAV: NoteLink[] = [
  { n: "01", slug: "01-desktop-not-cloud", title: "Why a desktop app, not a cloud product" },
  { n: "02", slug: "02-long-running-processes", title: "Agents as long-running processes" },
  { n: "03", slug: "03-brokered-coordination", title: "Why coordination is brokered" },
  { n: "04", slug: "04-canvas-state", title: "Canvas state ownership" },
  { n: "05", slug: "05-memory-tradeoffs", title: "Memory: prompt-injected vs. tool-mediated" },
  { n: "06", slug: "06-derived-team-bounds", title: "Team bounds derived from members" },
  { n: "07", slug: "07-workspace-isolation", title: "Workspace isolation per agent" },
  { n: "08", slug: "08-group-conversations", title: "Group conversations and the broker fanout" },
];

export function flatNav(): { slug: string; title: string; group: string }[] {
  return DOC_NAV.flatMap((g) => g.links.map((l) => ({ slug: l.slug, title: l.title, group: g.group })));
}

export function neighbors(slug: string) {
  const flat = flatNav();
  const idx = flat.findIndex((d) => d.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export function noteNeighbors(slug: string) {
  const idx = NOTES_NAV.findIndex((n) => n.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? NOTES_NAV[idx - 1] : null,
    next: idx < NOTES_NAV.length - 1 ? NOTES_NAV[idx + 1] : null,
  };
}
