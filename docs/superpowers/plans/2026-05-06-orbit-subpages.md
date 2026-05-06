# Orbit Subpages Implementation Plan

**Goal:** Build dedicated pages for Product, How it works, Agents, Download, Docs, Changelog. Content sourced from the live `orbit-agents/orbit` GitHub repo (README, architecture.md, phases.md, ADRs, recent commits) so every claim on the pages reflects what's actually built.

**Reconciliation note:** the design bundle says "Garrison" — the real product is **Orbit**. The landing already uses "Orbit" everywhere. The agent personas (Atlas / Keeper / Forge / Scribe / Compass / Ranger / Mason / Scout) come from the design bundle, not the repo — the repo treats agents as user-defined entities with Soul / Purpose / Memory. We'll surface the design's personas on the Agents page as **starter examples**, not as built-ins.

---

## Routing & layout refactor

Next.js route groups: `app/(marketing)/...` is currently used only for `_components/`. We'll add real pages under it.

**Move:** `app/page.tsx` → `app/(marketing)/page.tsx` (URL stays `/`).

**Create:** `app/(marketing)/layout.tsx` with the persistent chrome:

```tsx
<RevealOnScroll />
<SmoothScroll />
<Topbar />
{children}
<Footer />
```

This way every marketing page (home + 6 subpages) gets the same topbar/footer, and per-page hero/sections live in their `page.tsx`.

**Topbar nav update:** swap anchors for routes.

| Label        | Old (anchor)  | New (route)        |
| ------------ | ------------- | ------------------ |
| Product      | `#values`     | `/product`         |
| How it works | `#how`        | `/how-it-works`    |
| Agents       | `#agents`     | `/agents`          |
| Download     | `#download`   | `/download`        |
| Docs         | `#`           | `/docs`            |
| Changelog    | `#`           | `/changelog`       |

Home page (`/`) keeps its in-page anchors for the existing sections.

---

## Page-by-page content

Every page wraps content in `DashedFrame` and uses existing primitives (`SectionContainer`, `Eyebrow`, `Button`, `Chip`, `Dot`).

### `/product` — what's in Orbit today

- **Hero** — eyebrow "Product", h1 "Everything Orbit ships today.", lede pointing to phases 0–8 all complete, status pill "Pre-alpha · build from source · Phases 0–8 complete".
- **Capability grid** — 8 cells, one per phase. Each cell: phase number, title, 1-line description, small detail list. Sourced verbatim from `docs/phases.md`:
  - Phase 0: Foundation — three-panel shell, design tokens, CI
  - Phase 1: One agent end-to-end — spawn Claude Code subprocess, stream chat, persist in SQLite
  - Phase 2: Canvas + multiple agents — React Flow canvas, multi-agent state isolation
  - Phase 3: Soul / Purpose / Memory — persisted identity, `<remember>` tool
  - Phase 4: Agent-to-agent messaging — broker, `<send_to>` tool, audit log
  - Phase 5: Teams + folder access — canvas regions, per-agent allowlist
  - Phase 6: Git isolation — worktree per agent, branch per agent, diff tab
  - Phase 7: Tasks + sticky notes — task pseudo-tool, activity feed, human-only stickies
  - Phase 8: Group threads + terminal + MCP — multi-agent rooms, xterm.js PTY, MCP server registry
- **"Not building yet" panel** — surface the explicit non-goals from `CLAUDE.md`: cloud sync, hardware sandboxing, roles, manager agents, custom MCP authoring, mobile.

### `/how-it-works` — the architecture deep dive

- **Hero** — eyebrow "How it works", h1 "Three layers, two boundaries.", lede paraphrasing `architecture.md` opener.
- **Architecture diagram** — redrawn as inline SVG (instead of the ASCII from the doc). Three stacked layers: UI → Core (with sub-blocks: core::, broker::, agents::, ipc::, db::, git::, AgentEngine trait) → Agent workers. Two boundaries labeled: Tauri IPC (top), `AgentEngine` trait (bottom).
- **The two boundaries** — two side-by-side cells explaining UI↔Core (Tauri IPC, request/response + push events) and Core↔Agent (the trait, swappable engine).
- **Message flow walkthrough** — the agent-A → broker → agent-B trace from `architecture.md`, rendered as a numbered timeline with mono code at each step. Each step gets a one-line description.
- **Persistence + supervision + access control** — three-cell strip drawn from `architecture.md` (SQLite per map, exponential-backoff supervisor, per-agent folder allowlist).
- **CTA** — link to the actual [`docs/architecture.md`](https://github.com/orbit-agents/orbit/blob/main/docs/architecture.md) on GitHub.

### `/agents` — Soul / Purpose / Memory + starter roster

- **Hero** — eyebrow "Agents", h1 "Soul. Purpose. Memory.", lede: each agent is a Claude Code subprocess in its own working directory; identity is three persisted fields the core injects on every turn.
- **The triple** — three cells in a row:
  - **Soul** — how they speak, what they care about. Edit-once, used in every system prompt.
  - **Purpose** — what they're doing right now. Auto-imported from `CLAUDE.md` if the toggle is on.
  - **Memory** — facts they accumulate. Editable by the human; writable by the agent via `<remember>...</remember>`. Capped at 50 entries × 8 KB each.
- **Tools available to every agent** — chip grid: `read`, `write`, `bash`, `git` (worktree-isolated), `send_to(<other-agent>)` (Phase 4), `remember` (Phase 3), `task` (Phase 7). Plus MCP-registered tools (Phase 8).
- **Engine abstraction** — small panel: "Today the engine is Claude Code CLI. The `AgentEngine` trait is the seam — future engines can wrap the Anthropic API directly, another CLI, or a local model. (See ADR 0002.)"
- **Starter roster** — same 8 personas already on the home page, but framed as "starter examples — clone, edit Soul/Purpose, ship": Atlas, Keeper, Forge, Scribe, Compass, Ranger, Mason, Scout. Reuse the existing `Agents` section data; render in a denser grid or just link "See full roster on the home page".

### `/download` — install + run from source

- **Hero** — eyebrow "Download", h1 "Run Orbit on your machine.", status pill: "Pre-alpha · no binary releases yet · build from source".
- **Status note** — yellow callout: "We don't ship binaries yet. The instructions below build the desktop app from source via Tauri."
- **Prerequisites grid** — 5 cells, sourced from README:
  - Node.js 20+ (`.nvmrc` enforces)
  - pnpm 10+ (via corepack)
  - Rust stable (rustup)
  - Claude Code CLI (authenticated)
  - Tauri 2 system deps (link to v2.tauri.app/start/prerequisites)
- **Quick start** — terminal-style box with the actual commands:
  ```
  git clone https://github.com/orbit-agents/orbit.git
  cd orbit
  pnpm install
  pnpm --filter @orbit/desktop tauri:dev
  ```
- **Platform notes** — three cells: macOS (signed bundle in release path), Windows (MSI / ConPTY), Linux (AppImage / `webkit2gtk-4.1` required).
- **CTA** — link to GitHub repo + the README.

### `/docs` — documentation index

- **Hero** — eyebrow "Docs", h1 "Read the source.", lede: "Orbit is open source. The docs that guide contributors are the same docs that explain the system."
- **Doc tiles** — 5 cells linking to GitHub raw files:
  - **README** — what Orbit is, install, run.
  - **CLAUDE.md** — the canonical guide for AI + human contributors. Architecture, conventions, design tokens, phase discipline.
  - **Architecture** — three-layer architecture in detail.
  - **Phases** — the build roadmap, with manual test checklists per phase.
  - **Contributing** — PR flow, conventional commits, ADR practice.
- **ADR index** — list all 10 ADRs from `docs/decisions/` with linked GitHub URLs:
  - 0001 — Tauri over Electron
  - 0002 — Claude Code as engine
  - 0003 — Long-lived Claude subprocess
  - 0004 — Canvas state ownership
  - 0005 — Remember tool: prompt vs MCP
  - 0006 — `<send_to>` pseudo-tool
  - 0007 — Team bounds derived
  - 0008 — Git worktrees
  - 0009 — Task pseudo-tool
  - 0010 — Phase 8 architecture
- **Footer link** — GitHub repo.

### `/changelog` — phase completion timeline + recent commits

- **Hero** — eyebrow "Changelog", h1 "From scaffold to Phase 8.", lede: "No tagged releases yet — Orbit is pre-alpha. Below: every phase as it landed, plus the most recent commits."
- **Phase timeline** — 9 entries (Phase 0–8), each a vertical timeline row with: date (the most recent commit on that phase), phase number, title, 2-3 line summary, and a "deliverable" excerpt from `phases.md`. Status: all "Complete" today.
- **Recent commits feed** — collapsible (or paginated to 15) list of the latest commit subjects from the repo, fetched at build time via the GitHub API or hardcoded from the snapshot we already have.
- **Note** — small footer: "Tagged releases will appear here once Orbit cuts its first one."

---

## Shared building blocks

- **`PageHero`** — new primitive (kept inside `_components/sections/PageHero.tsx`) that renders the standard top-of-page block: Eyebrow + h1 + lede, optionally a status pill, plus the dotted-grid bg and breathing glow we use on the home hero. All subpages use this so they feel like one product.
- **External links to GitHub** — wrap with explicit `target="_blank"` + `rel="noreferrer"`.
- **Backend doc URLs** — all references point to `https://github.com/orbit-agents/orbit/blob/main/...` for browsable docs and `https://raw.githubusercontent.com/orbit-agents/orbit/main/...` for raw if we ever want to fetch.

---

## File map

```
app/
├── layout.tsx                       (unchanged — root html/body shell)
├── (marketing)/
│   ├── layout.tsx                   NEW — Topbar + Footer + scroll utilities
│   ├── page.tsx                     MOVED from app/page.tsx — home
│   ├── product/
│   │   └── page.tsx                 NEW
│   ├── how-it-works/
│   │   └── page.tsx                 NEW
│   ├── agents/
│   │   └── page.tsx                 NEW
│   ├── download/
│   │   └── page.tsx                 NEW
│   ├── docs/
│   │   └── page.tsx                 NEW
│   ├── changelog/
│   │   └── page.tsx                 NEW
│   └── _components/
│       └── sections/
│           └── PageHero.tsx         NEW — shared subpage hero
└── page.tsx                         REMOVED (after move)
```

The home page's existing in-page anchors (#values, #how, #agents, #download) keep working — they point to sections within `/`. The topbar's links now point to dedicated routes. Both compose: a user can land on `/` and scroll, or land on `/product` for the deep dive.

---

## Execution order

1. **Refactor:** create `(marketing)/layout.tsx`, move `app/page.tsx` to `app/(marketing)/page.tsx`, update `Topbar` nav to use routes. Build + verify home still renders.
2. **PageHero primitive.**
3. **/product, /how-it-works, /agents, /download, /docs, /changelog** — one per commit, content sourced from the docs we fetched.
4. Final build + walk every route in dev.

That's it. Total ~6 small commits, ~1500–2000 lines of mostly-content JSX. Patterns are already established by the home page; no new architectural decisions.
