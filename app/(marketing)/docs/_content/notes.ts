import type { Doc } from "./types";

export const NOTES: Record<string, Doc> = {
  "01-desktop-not-cloud": {
    slug: "01-desktop-not-cloud",
    group: "Engineering note · 01",
    title: "Why a desktop app, not a cloud product",
    lede: "Orbit runs locally because the alternatives traded properties we didn't want to give up. A short note on the reasoning.",
    blocks: [
      { type: "h2", text: "What we considered" },
      { type: "ol", items: [
        "**Cloud SaaS** — workspaces and agents live on our servers. Users connect through a browser.",
        "**Browser app on user infra** — same browser UI, but the agent runtime is self-hosted by the team.",
        "**Desktop app** — the workspace and the agents both run on the user's machine.",
      ]},

      { type: "h2", text: "What ruled cloud out" },
      { type: "ul", items: [
        "**Code privacy.** Most teams' code is sensitive. A cloud product means we hold the keys to a copy of every customer's source. We don't want that responsibility, and most customers don't want us to have it." ,
        "**Latency to the filesystem.** A cloud agent that has to round-trip to S3 to read a file is two orders of magnitude slower than one reading from a local disk. The interactivity falls apart." ,
        "**Tooling.** Agents work best when they can run the same tools you'd run — your linters, your test suite, your scripts. Replicating an arbitrary developer environment in the cloud is hard, and never quite the same." ,
      ]},

      { type: "h2", text: "What ruled self-hosting out (for now)" },
      { type: "p", text: "Self-hosting solves the privacy problem but adds an operations burden — somebody has to run the workspace service. For our first launch we wanted the install path to be one click, not 'spin up a cluster.' Self-hosted Orbit is on the long-term map; not on the short-term map." },

      { type: "h2", text: "What desktop bought us" },
      { type: "kv", rows: [
        { key: "Privacy", value: "Code never leaves the machine. Model calls go straight to the provider you configured." },
        { key: "Latency", value: "Filesystem and shell ops are local. The agent loop feels live." },
        { key: "Tooling", value: "Agents run inside the developer's actual environment — same shells, same binaries, same versions." },
        { key: "Setup", value: "Install is a single download. No infra to provision, no DNS, no auth proxy to wire up." },
      ]},

      { type: "h2", text: "What it cost us" },
      { type: "ul", items: [
        "Multi-device sync is harder. We don't have it on day one.",
        "Real-time multiplayer (two humans on one canvas) is harder. Also not on day one.",
        "Shipping bug fixes is per-platform: macOS, Windows, Linux all have to be rebuilt and re-signed.",
      ]},
      { type: "p", text: "We think the trade is right for the kind of work Orbit is for. If those costs ever start outweighing the benefits, the architecture has a clean enough seam (UI ↔ Core) that a hosted variant is mostly a deployment question, not a rewrite." },
    ],
  },

  "02-long-running-processes": {
    slug: "02-long-running-processes",
    group: "Engineering note · 02",
    title: "Agents as long-running processes",
    lede: "Why each Orbit agent is a long-lived process instead of a request-per-turn function.",
    blocks: [
      { type: "h2", text: "The two shapes we considered" },
      { type: "kv", rows: [
        { key: "Stateless", value: "Each turn is a fresh API call. State is rebuilt from the database on every request." },
        { key: "Long-lived", value: "Each agent is a process. State lives in memory. The database is a write-through cache, not the runtime." },
      ]},

      { type: "h2", text: "Why long-lived won" },
      { type: "ul", items: [
        "**Streaming.** A long-lived process can keep an open stream to the model and pipe tokens to the UI without re-establishing the conversation each turn." ,
        "**Tool state.** A running terminal session, an open database cursor, an in-flight HTTP request — these are awkward to re-hydrate on every turn. Long-lived processes carry them naturally." ,
        "**Latency.** No cold-start tax. The first token of every turn arrives as fast as the model itself can stream." ,
        "**Mental model.** The agent in your head is a *teammate*, which means a thing that exists between conversations. A long-lived process matches that model directly." ,
      ]},

      { type: "h2", text: "What it costs" },
      { type: "p", text: "RAM. A workspace with 10 agents holds 10 processes plus their conversation state. We cap the soft default at 10 agents per workspace partly because of this — past that the laptop fan starts protesting." },
      { type: "p", text: "We also have to be careful about crashes. The supervisor restarts agents on death with exponential backoff and re-hydrates Soul/Purpose/Memory from the database. Three crashes in a minute pause the agent and surface the failure to the UI — better to stop loud than to thrash quietly." },
    ],
  },

  "03-brokered-coordination": {
    slug: "03-brokered-coordination",
    group: "Engineering note · 03",
    title: "Why coordination is brokered",
    lede: "Inter-agent messages always go through a broker, never agent to agent. A short note on what that bought us.",
    blocks: [
      { type: "h2", text: "The naive design" },
      { type: "p", text: "If agent A wants to talk to agent B, the obvious thing is a direct pipe. A writes; B reads. The broker is overhead the system seems to do without." },

      { type: "h2", text: "What direct pipes give up" },
      { type: "ul", items: [
        "**Auditability.** Direct pipes don't log. If A and B disagree about what was said, you can't replay the conversation." ,
        "**Loop control.** A telling B to ask C to ask A is a real failure mode in agent systems. Without a central forward, there's no place to enforce a depth limit." ,
        "**Rate limiting.** A noisy agent can drown its peers. Limiting at the edge of each agent process means N implementations of the same logic, each free to drift." ,
        "**Observability.** The animated arcs on the canvas are events the broker emits. Without a broker, the UI has to subscribe to N pairs of streams to see message flow — and it can't, because direct pipes are private to the two agents." ,
      ]},

      { type: "h2", text: "What the broker costs" },
      { type: "p", text: "A small amount of latency — a memory copy and a database write per message. In practice this is tens of microseconds, well below the noise floor of an LLM turn." },
      { type: "p", text: "A bit of complexity in the core. The broker is the kind of code where bugs are worst — every agent depends on it being correct. We pay that cost down with tests, end-to-end fuzzing, and a rule that anything load-bearing in the broker has a corresponding regression test." },

      { type: "h2", text: "What we gave up" },
      { type: "p", text: "Direct streaming between agents. Every message is materialized fully before it forwards. For text messages this is fine. If we ever ship streaming inter-agent collaboration (live co-authoring of an artifact, for instance), we'll need a different layer for that — the broker as it stands isn't the right shape." },
    ],
  },

  "04-canvas-state": {
    slug: "04-canvas-state",
    group: "Engineering note · 04",
    title: "Canvas state ownership",
    lede: "Where canvas state lives, who owns it, and why the answer is 'the core, not the UI.'",
    blocks: [
      { type: "h2", text: "Two natural homes" },
      { type: "kv", rows: [
        { key: "UI-owned", value: "Positions, zoom, selection, sticky note text — all in front-end state. The core only knows about agents and tasks." },
        { key: "Core-owned", value: "Everything visual is in the database. The UI subscribes and renders." },
      ]},

      { type: "h2", text: "What we picked" },
      { type: "p", text: "Core-owned, with one carve-out: the *active* selection (whatever is highlighted right now) is UI-only. Everything that survives a refresh — node positions, sticky notes, team bounds, zoom level — lives in the workspace database." },

      { type: "h2", text: "Why" },
      { type: "ul", items: [
        "**Restart safety.** Quitting and reopening the app brings the canvas back exactly as it was. A UI-owned model would have to serialize to disk on every drag, which is what we'd be building anyway." ,
        "**Multi-window.** Even if today only one window can edit a workspace, the model is ready for two. Two views on the same database means changes flow naturally." ,
        "**Consistency with everything else.** Every other piece of state already lives in the core. Treating canvas state differently would make it the odd one out." ,
      ]},

      { type: "h2", text: "What we gave up" },
      { type: "p", text: "Some snappiness on local-only operations. When you drag a node, the UI does an optimistic update and writes through to the core. If the write fails (it shouldn't, but) the UI has to rewind. That code path is rarely exercised but exists. We think the resilience of the model is worth the small amount of careful code." },
    ],
  },

  "05-memory-tradeoffs": {
    slug: "05-memory-tradeoffs",
    group: "Engineering note · 05",
    title: "Memory: prompt-injected vs. tool-mediated",
    lede: "Why Orbit's `remember` capability is a prompt-injected list and not a queryable tool.",
    blocks: [
      { type: "h2", text: "The two shapes" },
      { type: "kv", rows: [
        { key: "Prompt-injected", value: "Memory is rendered into the system prompt on every turn. The agent reads it the way it reads its own Soul." },
        { key: "Tool-mediated", value: "Memory is a database. The agent calls a `recall(query)` tool to fetch what it needs." },
      ]},

      { type: "h2", text: "Why prompt-injected won, for now" },
      { type: "ul", items: [
        "**Latency.** Memory is small (50 entries × 8 KB cap). It fits in the prompt without burning a meaningful share of the context window." ,
        "**Reliability.** Tool-mediated memory means the agent has to *remember to recall* — and agents reliably forget to do that. Prompt-injected memory just shows up." ,
        "**Debuggability.** When something is wrong, you can read the prompt and see the agent's memory directly. With tool-mediated memory you have to trace the recall." ,
      ]},

      { type: "h2", text: "What we know we'll outgrow" },
      { type: "p", text: "The 50-entry × 8 KB cap. For agents that work on a project for months, the most-recent-50 heuristic isn't enough — older facts that are still load-bearing get evicted. The fix is probably a hybrid: keep a small prompt-injected core (the things the agent needs every turn) and hang a `recall` tool off the side for the long tail." },
      { type: "p", text: "We deferred the hybrid until we had real workloads to design against. Premature optimization here would have meant a worse-feeling memory for the first six months." },
    ],
  },

  "06-derived-team-bounds": {
    slug: "06-derived-team-bounds",
    group: "Engineering note · 06",
    title: "Team bounds derived from members",
    lede: "Teams on the canvas auto-fit to their members instead of being explicit rectangles. A short note on why.",
    blocks: [
      { type: "h2", text: "The explicit version" },
      { type: "p", text: "Drag a rectangle. Anything inside the rectangle is a member of the team; anything outside is not. The rectangle has its own size and position; resizing it is a separate gesture from moving the agents." },

      { type: "h2", text: "What goes wrong" },
      { type: "ul", items: [
        "Two sources of truth. The rectangle says 'these eight agents'; the agents' positions agree with that — until you move one slightly. Now you have to update both.",
        "Resize handles. They take canvas surface area, fight with multi-select, and need their own keyboard shortcuts.",
        "Empty teams. An explicit rectangle can be empty; a derived bound can't. Empty teams are almost always a bug — a leftover from somebody who deleted all the members and forgot the team region.",
      ]},

      { type: "h2", text: "The derived version" },
      { type: "p", text: "Membership decides the shape. The team is *whatever rectangle fits its members, with some padding*. Move an agent into the team's region and the bounds expand to include it; move an agent out and the bounds collapse." },
      { type: "p", text: "There's a subtle UX win here: you can never have a team that 'looks empty.' If a team has zero members, the visual just isn't there, which is exactly what you'd want." },

      { type: "h2", text: "What we gave up" },
      { type: "p", text: "The ability to have a team that 'spans' an area without all of its members being inside it. We considered the case where a team is conceptually wide but its members happen to be clustered. In practice nobody asked for this; we'll revisit if it ever comes up." },
    ],
  },

  "07-workspace-isolation": {
    slug: "07-workspace-isolation",
    group: "Engineering note · 07",
    title: "Workspace isolation per agent",
    lede: "Why every agent gets its own branch and working directory instead of sharing one tree.",
    blocks: [
      { type: "h2", text: "The shared-tree version" },
      { type: "p", text: "Every agent works in the same project tree. Conflicts are the user's problem; the system serializes writes to avoid corruption." },

      { type: "h2", text: "Why it doesn't work" },
      { type: "p", text: "Two agents working on the same project will eventually overwrite each other. Even with careful prompting, parallel work on a shared tree is a race. Adding 'wait your turn' logic makes the agents serialize, which kills the parallelism that was the whole reason to have multiple agents in the first place." },

      { type: "h2", text: "The isolated version" },
      { type: "p", text: "Each agent gets a branch. Each branch has its own working tree. Agents read and write inside their own copy; the main tree is untouched until you decide to merge an agent's work in." },
      { type: "ul", items: [
        "Atlas can sketch a feature on its branch while Forge ships the bug fix on its branch.",
        "Keeper reviews diffs without ever touching the agents' trees.",
        "An agent that crashes leaves its branch in whatever state it was — restart, the branch comes back exactly as it was.",
      ]},

      { type: "h2", text: "What it costs" },
      { type: "p", text: "Disk. Per-agent branches are real files on disk; ten agents on a 200 MB project means 2 GB of mostly-redundant trees. We use the underlying VCS's storage — branches are cheap, working directories are not — and prune on close. In practice it's fine on modern laptops." },
      { type: "p", text: "Some friction at the merge. When two agents both touch the same file, you get conflicts when you merge them in. We surface these in the Diff tab with an inline conflict view; you resolve and click merge. It's the same workflow you already use for human-vs-human conflicts." },
    ],
  },

  "08-group-conversations": {
    slug: "08-group-conversations",
    group: "Engineering note · 08",
    title: "Group conversations and the broker fanout",
    lede: "Group rooms feel like a small UX feature, but they exposed a deeper question about how the broker should behave.",
    blocks: [
      { type: "h2", text: "What we shipped" },
      { type: "p", text: "Group rooms — post once, every member of the room gets the message and can reply. Replies fan back through the broker the same way one-to-one messages do." },

      { type: "h2", text: "The interesting design question" },
      { type: "p", text: "When agent A posts to a room with five other members, do all five get the message *at the same time*? The broker can deliver in parallel — all five turns kick off — or in series — wait for one to finish before delivering to the next." },
      { type: "kv", rows: [
        { key: "Parallel", value: "Lower latency. Higher cost. All members work simultaneously; replies arrive interleaved." },
        { key: "Serial", value: "Replies are ordered. Each member can read the previous reply before starting their own. Higher latency." },
      ]},

      { type: "h2", text: "What we picked" },
      { type: "p", text: "Parallel by default, with an opt-in serial mode. Most group conversations are about sharing context, not building on each other turn by turn — parallel matches the way people actually use rooms. When the conversation *is* sequential ('A drafts, B reviews, C approves'), the room can be marked serial and the broker delivers in order." },

      { type: "h2", text: "Loop guard, again" },
      { type: "p", text: "Group rooms are the worst case for the loop guard. A poorly-behaved set of agents can fan a single message into a quadratic explosion if every member replies to every other member's reply. We tightened the depth-8 default; in serial rooms it's depth 4. So far that has caught every fanout-loop we've seen in testing without rejecting any legitimate work." },
    ],
  },
};
