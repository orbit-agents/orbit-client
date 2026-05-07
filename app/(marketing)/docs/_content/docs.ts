import type { Doc } from "./types";

export const DOCS: Record<string, Doc> = {
  install: {
    slug: "install",
    group: "Get started",
    title: "Install Orbit",
    tag: "5 min",
    lede: "Download the right build for your OS, run the installer, and have Orbit open inside five minutes.",
    blocks: [
      { type: "h2", text: "Pick your platform" },
      { type: "p", text: "Orbit ships native builds for macOS, Windows, and Linux. Every build includes the workspace, the agent runtime, and the embedded terminal — there is nothing else to install before you can spawn an agent." },
      { type: "kv", rows: [
        { key: "macOS", value: "macOS 12 Monterey or newer · Apple silicon and Intel · `.dmg` installer" },
        { key: "Windows", value: "Windows 10 build 1903 or newer · x64 · `.msi` installer" },
        { key: "Linux", value: "Most modern X11 / Wayland desktops · x86_64 · `AppImage`, `.deb`, `.rpm`" },
      ]},
      { type: "callout", tone: "info", title: "Tip", body: "If you're not sure which Linux build to grab, use the AppImage — it is portable and needs no install step. Download, `chmod +x`, and run." },

      { type: "h2", text: "Run the installer" },
      { type: "ol", items: [
        "Open the installer for your platform.",
        "Drag Orbit into Applications (macOS), accept the install prompts (Windows), or `chmod +x` the AppImage (Linux).",
        "Launch the app. The first launch initializes the workspace data directory at `~/.orbit`.",
      ]},

      { type: "h2", text: "First launch" },
      { type: "p", text: "When Orbit opens for the first time you'll see an empty canvas and a welcome prompt asking for two things." },
      { type: "ol", items: [
        "Your work email — used as the local identity that shows up on sticky notes and tasks.",
        "A model provider connection — see [Connect a model provider](/docs/connections).",
      ]},
      { type: "p", text: "Once a connection is configured, the welcome prompt offers to open a sample workspace. We recommend opening it the first time around — it's a small project with a single agent (Forge) already configured, and it gives you somewhere to read what an Orbit conversation actually looks like before you point the app at one of your own projects." },

      { type: "h2", text: "Where Orbit stores things" },
      { type: "kv", rows: [
        { key: "App data", value: "macOS: `~/Library/Application Support/Orbit` · Windows: `%APPDATA%/Orbit` · Linux: `~/.config/orbit`" },
        { key: "Workspace data", value: "`~/.orbit/maps/<id>.db` — one local SQLite database per workspace" },
        { key: "Logs", value: "`~/.orbit/logs/orbit-<date>.log` — rotated daily, 7 days kept" },
        { key: "Cache", value: "`~/.orbit/cache` — safe to delete; rebuilt on next launch" },
      ]},

      { type: "h2", text: "Updates" },
      { type: "p", text: "Orbit checks for updates on launch and downloads them in the background. New versions install on the next restart, so you decide when to apply them." },
      { type: "p", text: "If you'd rather pin a version, disable auto-updates in **Settings → General → Updates** and grab specific builds from the [changelog](/changelog)." },

      { type: "h2", text: "Uninstall" },
      { type: "ul", items: [
        "macOS — drag Orbit out of Applications.",
        "Windows — `Add or remove programs → Orbit → Uninstall`.",
        "Linux — remove the `.AppImage` or `apt remove orbit` / `dnf remove orbit`.",
      ]},
      { type: "p", text: "Your workspace data at `~/.orbit` is left behind on purpose. Delete it by hand if you want a clean slate." },
    ],
  },

  connections: {
    slug: "connections",
    group: "Get started",
    title: "Connect a model provider",
    tag: "3 min",
    lede: "Orbit is bring-your-own-key. Drop your provider credentials in once and every agent on every workspace can use them.",
    blocks: [
      { type: "h2", text: "Why bring-your-own-key" },
      { type: "p", text: "Orbit doesn't proxy your traffic. When an agent calls a model, the request goes from your machine straight to the provider you configured. Nothing routes through Orbit's servers — there are no Orbit servers. Your prompts, your code, your conversations stay local." },

      { type: "h2", text: "Add a connection" },
      { type: "ol", items: [
        "Open **Settings → Connections**.",
        "Click **Add provider** and pick the one you want.",
        "Paste your API key. Orbit stores it in the OS keychain (Keychain on macOS, Credential Manager on Windows, Secret Service on Linux).",
        "Run **Test connection**. A green checkmark means you're done.",
      ]},

      { type: "h2", text: "Supported providers" },
      { type: "kv", rows: [
        { key: "Anthropic", value: "Claude family — recommended default. Set `ANTHROPIC_API_KEY` or paste in Settings." },
        { key: "OpenAI", value: "GPT family. Endpoint is configurable for Azure OpenAI." },
        { key: "Local (Ollama)", value: "Point Orbit at a running Ollama server. Useful for air-gapped environments." },
        { key: "Local (LM Studio)", value: "OpenAI-compatible endpoint at `http://localhost:1234/v1` by default." },
        { key: "Custom", value: "Any OpenAI-compatible endpoint. Specify base URL, API key, and the model id." },
      ]},

      { type: "h2", text: "Per-agent overrides" },
      { type: "p", text: "Most teams pick one default provider for the workspace and let it apply to every agent. If you need finer control — say a code reviewer agent that must use a stronger model — open the agent's **Settings → Engine** panel and override the connection there." },
      { type: "callout", tone: "tip", title: "Tip", body: "Per-agent overrides are most useful for *specialist* agents. Pick a fast model for the planner and a stronger one for the reviewer. Watch the cost graph in Settings drop." },

      { type: "h2", text: "Cost and rate-limit visibility" },
      { type: "ul", items: [
        "**Settings → Usage** shows token spend per agent, per day, with a daily soft cap you can set.",
        "If a provider rate-limits you, the affected agent enters a `cooldown` status on the canvas — work resumes automatically when the limit clears.",
        "Cost numbers are computed locally from the provider's published pricing. They will not match your invoice exactly, but they're close enough to budget against.",
      ]},

      { type: "h2", text: "Rotating a key" },
      { type: "p", text: "Replace the key in **Settings → Connections** and click **Save**. The new key is used on every agent's next turn — no restart, no respawn." },
    ],
  },

  quickstart: {
    slug: "quickstart",
    group: "Get started",
    title: "Your first workspace",
    tag: "10 min",
    lede: "From a fresh install to a working canvas with two agents shipping a small change. The shortest path from open to value.",
    blocks: [
      { type: "h2", text: "Open a project" },
      { type: "p", text: "Orbit thinks in **workspaces**. A workspace is a folder on disk plus the canvas state for it — agents, conversations, tasks, sticky notes, all the per-project state." },
      { type: "ol", items: [
        "Hit `⌘N` (macOS) or `Ctrl+N` (Windows / Linux) to open the **New workspace** dialog.",
        "Pick a folder. A repo, a docs site, anything with files in it.",
        "Name the workspace. The default is the folder name.",
        "Click **Create**. Orbit opens an empty canvas pointed at that folder.",
      ]},

      { type: "h2", text: "Spawn your first agent" },
      { type: "p", text: "Double-click anywhere on the canvas. The spawn dialog opens. The first time, pick the **Forge** starter — it's a generalist builder that's good for first runs." },
      { type: "ol", items: [
        "Pick the **Forge** persona.",
        "Leave the default tools (`read`, `write`, `bash`, `version-control`).",
        "Click **Spawn**. A node appears on the canvas. Its status ring is dim — it's idle, waiting for input.",
      ]},
      { type: "callout", tone: "info", title: "Tip", body: "Every spawn creates an isolated workspace branch for that agent. Your main tree is never touched. You can read more in [Project workspaces](/docs/workspaces)." },

      { type: "h2", text: "Hand it a task" },
      { type: "p", text: "Click the agent node. The right rail opens. Type a prompt:" },
      { type: "code", lang: "text", body: "Add a one-line readme to this project that explains what it does. Keep it under 60 words." },
      { type: "p", text: "Hit `⌘Enter`. The status ring turns amber (streaming). You'll see Forge read files, draft the readme, write it, and stop. The whole loop is visible in the chat — every tool call is an expandable card." },

      { type: "h2", text: "Spawn a reviewer" },
      { type: "p", text: "Double-click somewhere else on the canvas. Pick **Keeper**. Now hand Forge a follow-up:" },
      { type: "code", lang: "text", body: "Have Keeper review the readme you just wrote." },
      { type: "p", text: "Forge will use the `send_to` tool to hand the work over. An animated arc fires across the canvas. Keeper picks the work up, reads the diff, and replies. The whole exchange shows up in the activity feed grouped under **Today**." },

      { type: "h2", text: "Approve the change" },
      { type: "p", text: "Open Forge's **Diff** tab on the right rail. Read the change. If it looks right, click **Merge to main**. The change lands on your project's working tree." },

      { type: "h2", text: "Where to go next" },
      { type: "ul", items: [
        "[Soul, Purpose, Memory](/docs/identity) — give Forge a personality that survives restart.",
        "[Tasks and the inbox](/docs/tasks) — let agents queue work for each other.",
        "[MCP servers](/docs/mcp) — give your agents the same tools the rest of your team uses.",
      ]},
    ],
  },

  identity: {
    slug: "identity",
    group: "Concepts",
    title: "Soul, Purpose, Memory",
    lede: "Three persisted fields that make an Orbit agent feel less like a chatbot and more like a teammate that remembers.",
    blocks: [
      { type: "p", text: "Every Orbit agent has the same three identity slots. Together they decide how the agent thinks, what it's doing right now, and what it has learned. The workspace injects all three on every turn — they're the first thing the agent sees in its system prompt." },

      { type: "h2", text: "Soul" },
      { type: "p", text: "**Soul** is how an agent thinks and speaks. It's where you put the slow-changing stuff — preferences, principles, voice. Edit it once and forget about it." },
      { type: "callout", tone: "tip", title: "Example soul", body: "I always use TypeScript strict mode and prefer `unknown` over `any`. I write conservative reviews and won't approve without tests. I cite a file path with every claim." },
      { type: "p", text: "Soul lives in the agent's **Settings → Identity** panel. Edits take effect on the next turn — no restart, no respawn." },

      { type: "h2", text: "Purpose" },
      { type: "p", text: "**Purpose** is what this agent is doing right now. It's mutable, scoped to a goal, and meant to change as work progresses. If Soul is the agent's personality, Purpose is its standing order." },
      { type: "ul", items: [
        "Purpose is one to a few sentences — short enough to read at a glance.",
        "When you change Purpose mid-task, the right rail flags a **pending** pill. The agent picks the new Purpose up on its next turn.",
        "Optional: import a project guide from a `CLAUDE.md` (or any markdown file) at spawn time — its contents seed the Purpose field.",
      ]},

      { type: "h2", text: "Memory" },
      { type: "p", text: "**Memory** is the list of facts the agent has accumulated. You can edit any entry by hand. The agent appends with the `remember` tool." },
      { type: "code", lang: "text", caption: "What an agent's memory list looks like", body:
`· We use Tailwind v3, not v4. Don't suggest @apply or @config.
· The users table is named \`usres\` (legacy typo). Reads should account for it.
· Reviews block on missing tests. Document why a test was skipped, never just remove it.
· The auth refactor is half-done — \`session.ts\` is on the new pattern, \`middleware.ts\` is not.` },
      { type: "p", text: "Memory is bounded so it doesn't drown the prompt. The 50 most recent entries make it into the system prompt, capped at 8 KB each. Older entries stay in the database and are recoverable — they just aren't injected by default." },

      { type: "h2", text: "How the three play together" },
      { type: "kv", rows: [
        { key: "Soul", value: "Slow-changing. The agent's voice and standards." },
        { key: "Purpose", value: "Mid-changing. What it's doing right now." },
        { key: "Memory", value: "Fast-changing. Things it has learned in passing." },
      ]},
      { type: "p", text: "If something is true forever, put it in Soul. If it's the goal of the next two weeks, put it in Purpose. If it's a fact the agent should remember without you having to retype it, let it append to Memory itself." },

      { type: "h2", text: "Persistence" },
      { type: "p", text: "All three fields live in the workspace database. Restart the app, kill the agent process, swap engines — Soul, Purpose, and Memory all come back exactly as they were. There is no remote sync; everything is on disk under `~/.orbit`." },
    ],
  },

  tasks: {
    slug: "tasks",
    group: "Concepts",
    title: "Tasks and the inbox",
    lede: "How agents create work, how the queue is shared with you, and how the inbox stays focused on what matters.",
    blocks: [
      { type: "h2", text: "What a task is" },
      { type: "p", text: "A task is a unit of work an agent (or you) commits to. Every task has a state, an owner, an optional parent, and a thread of activity attached to it. Agents create them with the `task` tool; you can edit them inline from the canvas." },
      { type: "kv", rows: [
        { key: "Awaiting you", value: "Agent has finished and needs a human decision." },
        { key: "Running", value: "Agent is actively working on it." },
        { key: "Queued", value: "Created but not yet picked up. Often dependent on another task." },
        { key: "Blocked", value: "Agent has flagged a problem it can't resolve." },
        { key: "Done", value: "Closed. Stays in history; doesn't clutter the active queue." },
      ]},

      { type: "h2", text: "The Inbox" },
      { type: "p", text: "The Inbox is a unified view of every task across every agent on the map. Open it from the sidebar (`⌘1`). It defaults to **Awaiting you** because that's almost always what you came to look at." },
      { type: "ul", items: [
        "Click any task to jump to the agent that owns it and the message that produced it.",
        "Multi-select tasks (`Shift+click`) to bulk-close, reassign, or merge.",
        "Filter by agent, by state, by tag. The filter you set persists per workspace.",
      ]},

      { type: "h2", text: "How agents create tasks" },
      { type: "p", text: "Agents have a built-in `task` pseudo-tool. They use it to plan before they act, to break a goal into pieces, and to surface follow-ups they noticed but won't do unprompted." },
      { type: "code", lang: "text", caption: "The task tool, as the agent sees it", body:
`<task action="create" title="Add CSRF middleware" parent="auth-refactor" />
<task action="update" id="auth-3" state="blocked" reason="schema diff needed" />
<task action="done" id="auth-4" />` },

      { type: "h2", text: "Activity feed" },
      { type: "p", text: "The activity feed is the chronological view of everything that happened on the workspace today. Task transitions, remembered facts, sticky notes, agent restarts — all of it, grouped under **Today** and **Yesterday**." },
      { type: "callout", tone: "tip", title: "Tip", body: "Open the activity feed at the start of your day to read what your agents did overnight. It's the closest thing Orbit has to a standup." },

      { type: "h2", text: "Sticky notes" },
      { type: "p", text: "Hold `Shift` and click anywhere on the canvas to drop a sticky note. They're a human-only channel — agents can read them but never write them. Use stickies for the kind of thing you'd write on a whiteboard during a design conversation: caveats, links to drawings, a name to remember." },
    ],
  },

  coordination: {
    slug: "coordination",
    group: "Concepts",
    title: "Coordination model",
    lede: "Why agents talk through the broker, what the loop guard does, and how to read the audit log.",
    blocks: [
      { type: "h2", text: "Agents never talk directly" },
      { type: "p", text: "Every cross-agent message in Orbit goes through a single component: the broker. Agent A's `send_to` call lands in the broker first, where it is logged, rate-limited, and inspected for loops. Only then is it forwarded to agent B." },
      { type: "p", text: "This shape is on purpose. It gives you four properties for free." },
      { type: "kv", rows: [
        { key: "Auditability", value: "Every message is in the activity log. You can replay any thread of work after the fact." },
        { key: "Rate limiting", value: "A noisy agent can't drown the system. The broker enforces per-agent and global ceilings." },
        { key: "Loop guard", value: "The broker tracks message depth and refuses sends past depth 8 by default." },
        { key: "Observability", value: "The animated arcs on the canvas are events the broker emits. Same data, different surface." },
      ]},

      { type: "h2", text: "The send_to tool" },
      { type: "p", text: "Agents use the `send_to` pseudo-tool to hand work to a teammate. It looks like this from the agent's side." },
      { type: "code", lang: "text", body: `<send_to to="keeper">\n  Take a pass on the auth refactor — focus on the session-cookie path.\n  I left a list of open questions in the activity log.\n</send_to>` },
      { type: "p", text: "Recipients are addressed by id, the same id you'd use in the canvas. Sending to a non-existent agent is a soft error — the broker rejects the call and surfaces it to the sender, who can retry or escalate." },

      { type: "h2", text: "Loop guard" },
      { type: "p", text: "Every message carries a depth counter. A user-originated send starts at 0; each subsequent forward increments by one. When a message hits depth 8 the broker refuses to forward it further and logs a `loop-guard-tripped` event." },
      { type: "p", text: "Eight is high enough that real workflows never hit it (most plans involve two or three handoffs at most) and low enough that runaway delegation gets caught fast." },

      { type: "h2", text: "Self-sends and unknown recipients" },
      { type: "p", text: "Both are caught at the broker, not at the receiving agent. The sender gets a structured error back inside its own conversation; the message never reaches the (real or imagined) recipient." },

      { type: "h2", text: "Reading the audit log" },
      { type: "p", text: "Open any agent's **Settings → Inbox**. You'll see every message it has sent and received, with the broker's flight metadata next to each one — depth, latency, rate-limit verdict, and whether the message was forwarded or rejected." },
    ],
  },

  workspaces: {
    slug: "workspaces",
    group: "Workspaces",
    title: "Project workspaces",
    lede: "Per-agent isolated workspaces with their own branches and working directories. The mechanism that keeps multiple agents from stepping on each other.",
    blocks: [
      { type: "h2", text: "One workspace per agent" },
      { type: "p", text: "When you spawn an agent inside a project, Orbit creates a per-agent isolated workspace next to the main tree. The agent reads, writes, and commits inside its own copy of the project. Your main working tree is never touched." },
      { type: "callout", tone: "info", title: "What's on disk", body: "Per-agent workspaces live under `~/.orbit/workspaces/<workspace-id>/<agent-slug>-<id>`. Each one is a real branch, branched from `main` (or whichever base you configured) at the moment of spawn." },

      { type: "h2", text: "Why isolation matters" },
      { type: "p", text: "Without isolation, two agents working on the same project will eventually overwrite each other. Even with careful prompting, parallel work on a single tree is a race condition. Orbit avoids the race by giving each agent a tree of its own." },
      { type: "ul", items: [
        "Atlas can sketch a new feature on its branch while Forge ships the bug fix on its branch.",
        "Keeper can review the diff between an agent's branch and main without ever touching the agent's tree.",
        "When an agent crashes, restarts, or is killed, its branch is preserved exactly as it was.",
      ]},

      { type: "h2", text: "The Diff tab" },
      { type: "p", text: "Every agent has a **Diff** tab on the right rail. It shows the staged changes on the agent's branch, against the workspace base. From there you can:" },
      { type: "ul", items: [
        "Read the diff inline, file by file, with the same formatting as your editor.",
        "Stage or un-stage individual hunks.",
        "Merge the branch back to the workspace base — fast-forward when possible, three-way otherwise.",
        "Discard the agent's branch entirely if the work is wrong.",
      ]},

      { type: "h2", text: "Spawn refuses on a dirty tree" },
      { type: "p", text: "If your main working tree is dirty when you try to spawn, Orbit refuses. Mixing your local edits and an agent's edits is one of the easiest ways to lose work. Stash, commit, or discard, then spawn." },
      { type: "callout", tone: "warn", title: "Outside a project", body: "Orbit still works outside a project — agents run in plain working directories under `~/.orbit/scratch/` and don't get branches. The isolation guarantees only apply inside a real project." },

      { type: "h2", text: "Branch settings" },
      { type: "kv", rows: [
        { key: "Base branch", value: "Defaults to whatever the project considers main. Override per workspace in **Settings → Branches**." },
        { key: "Branch prefix", value: "`orbit/` by default. Branches are named `orbit/<agent-slug>-<id>`." },
        { key: "Auto-prune", value: "Closed agents have their branches kept for 30 days, then garbage-collected. Adjust in **Settings**." },
      ]},
    ],
  },

  "folder-access": {
    slug: "folder-access",
    group: "Workspaces",
    title: "Folder access control",
    lede: "Allowlist what an agent can read. Why we enforce at the workspace boundary instead of trusting the agent.",
    blocks: [
      { type: "h2", text: "How it works" },
      { type: "p", text: "Every agent has a **folder allowlist**: a list of paths inside the project the agent is allowed to read and write. The list is set at spawn time and editable any time from **Settings → Access**." },
      { type: "p", text: "The allowlist is enforced by the workspace, not by the agent. Even if a misbehaving agent tries to read a file outside its allowlist, the workspace refuses the read and surfaces a structured error to the agent. The agent never sees the file." },

      { type: "h2", text: "Defaults" },
      { type: "kv", rows: [
        { key: "New agent", value: "Allowlist is the project root. The agent can see everything in the project." },
        { key: "Forge persona", value: "Same — Forge is meant to ship features end-to-end and needs broad access." },
        { key: "Keeper persona", value: "Same — Keeper reads diffs across the tree." },
        { key: "Compass persona", value: "Same — Compass is a code-base mapper." },
        { key: "Custom personas", value: "Whatever you specify when you create the persona." },
      ]},

      { type: "h2", text: "Locking down" },
      { type: "p", text: "Tighten the allowlist when you want an agent narrowly focused. A docs writer who only needs to touch `docs/` should only have access to `docs/`." },
      { type: "ol", items: [
        "Open the agent's **Settings → Access** panel.",
        "Edit the path list. One path per line; both files and folders are valid.",
        "Save. The new list applies immediately — no restart needed.",
      ]},

      { type: "h2", text: "What's outside the allowlist" },
      { type: "ul", items: [
        "Read attempts fail with a `path-not-allowed` error the agent can see.",
        "Write attempts fail the same way before the file is touched.",
        "`bash` calls run with a working directory inside the allowlist; the shell can `cd` outside it but file operations on those paths still fail.",
      ]},
      { type: "callout", tone: "tip", title: "Why this layout", body: "The allowlist is a *capability*, not a *suggestion*. We picked workspace-level enforcement because it's the only place an agent can't talk its way around — anything inside the agent process can be prompt-injected." },
    ],
  },

  teams: {
    slug: "teams",
    group: "Workspaces",
    title: "Teams",
    lede: "Group agents on the canvas. Share access scopes. Let regions derive their bounds from the agents inside them.",
    blocks: [
      { type: "h2", text: "What a team is" },
      { type: "p", text: "A team is a labeled region on the canvas that contains one or more agents. Teams give you a way to organize agents by purpose — a backend team, a frontend team, a docs team — and apply settings to all of them at once." },

      { type: "h2", text: "Creating a team" },
      { type: "ol", items: [
        "Press `T` on the canvas, or right-click → **New team**.",
        "Drag a rectangle around the agents you want to include.",
        "Name the team. Pick an accent color.",
        "Click **Create**.",
      ]},
      { type: "p", text: "The region you drew becomes the team's bounds. Agents inside are members; agents outside are not." },

      { type: "h2", text: "Bounds are derived" },
      { type: "p", text: "The region doesn't have a fixed shape. As you drag agents in or out, the bounds re-fit around the current members. There's no resize handle to fight with — move the agents and the team follows." },
      { type: "callout", tone: "info", title: "Why derived bounds", body: "An explicit rectangle would mean two sources of truth — where the team is, and which agents are in it. Derived bounds collapse that to one — membership decides the shape. Read more in [note 06](/docs/notes/06-derived-team-bounds)." },

      { type: "h2", text: "Team-wide settings" },
      { type: "ul", items: [
        "**Folder access** — set once on the team, inherited by every member.",
        "**Engine** — pin a specific model provider to every member of the team.",
        "**Tags** — every task created by a member gets the team's tag automatically.",
      ]},

      { type: "h2", text: "Removing an agent" },
      { type: "p", text: "Drag the agent outside the region. The team re-fits without it. Or right-click the agent → **Leave team**. The agent stays alive, with all its identity and history; it just no longer inherits the team's settings." },
    ],
  },

  mcp: {
    slug: "mcp",
    group: "Integrations",
    title: "MCP servers",
    lede: "Register Model Context Protocol servers and expose their tools to specific agents.",
    blocks: [
      { type: "h2", text: "What is MCP?" },
      { type: "p", text: "Model Context Protocol is an open standard for giving language-model clients access to external tools and data. An MCP server is a small process that publishes a set of tools; a client (like Orbit) lets agents call those tools as if they were native." },

      { type: "h2", text: "Register a server" },
      { type: "ol", items: [
        "Open **Settings → MCP servers**.",
        "Click **Add server**.",
        "Pick a transport — `stdio`, `http`, or `sse` — and fill in the connection details.",
        "Test the connection. Orbit lists the tools the server publishes.",
        "Save. The server is now registered globally.",
      ]},

      { type: "h2", text: "Expose tools to an agent" },
      { type: "p", text: "Registration is global; exposure is per agent. Open an agent's **Settings → Tools** and toggle the MCP servers you want this agent to use. Tools materialize on the agent's next turn." },
      { type: "code", lang: "text", caption: "How a tool from an MCP server appears to an agent", body:
`mcp:linear.create_issue
mcp:linear.list_issues
mcp:linear.update_issue` },

      { type: "h2", text: "Useful starter servers" },
      { type: "kv", rows: [
        { key: "Filesystem", value: "Read and write outside the project tree. Useful for cross-project research." },
        { key: "Linear / GitHub Issues", value: "Sync tasks with your real issue tracker." },
        { key: "Slack", value: "Let an agent post a heads-up to a channel when a long task finishes." },
        { key: "Postgres", value: "Read-only schema introspection for an agent that drafts migrations." },
        { key: "Web fetch", value: "Pull text from a URL. Pair with a research persona like Scout." },
      ]},

      { type: "h2", text: "Permissions and prompts" },
      { type: "p", text: "Some MCP tools are inherently destructive (sending a Slack message, closing a Linear issue). For those, Orbit prompts you to approve the first call per agent per session. Approve once and subsequent calls go through without a prompt." },
      { type: "callout", tone: "warn", title: "Trust the server", body: "An MCP server runs as a process on your machine. Treat the binary the same way you'd treat any other CLI you install — only run servers from sources you trust." },
    ],
  },

  terminal: {
    slug: "terminal",
    group: "Integrations",
    title: "Terminal & shells",
    lede: "Each agent has its own terminal tab. Real PTY, real shell, scoped to the agent's working directory.",
    blocks: [
      { type: "h2", text: "Where it lives" },
      { type: "p", text: "Open any agent. The right rail has a **Terminal** tab next to **Diff**, **Inbox**, and **Settings**. Click it to open a fresh shell session pinned to the agent's working directory." },

      { type: "h2", text: "How it works" },
      { type: "ul", items: [
        "Backed by a real pseudo-terminal — same machinery `tmux` and your IDE's terminal use.",
        "Renders with `xterm.js`. Mouse, color, resize, copy/paste, all of it.",
        "Working directory is the agent's branch on disk. The agent and you see the same files.",
        "Sessions persist between switches. Close the rail, come back later, the shell is still there.",
      ]},

      { type: "h2", text: "Useful patterns" },
      { type: "kv", rows: [
        { key: "Watch the agent work", value: "Run `git status` in the terminal while the agent is editing. The diff updates live." },
        { key: "Run tests yourself", value: "Trust but verify — run the test suite in the terminal even when the agent says it passed." },
        { key: "Set up environment", value: "Some setups (devcontainers, custom shells) are easier to start by hand. The agent inherits the environment you set up." },
      ]},

      { type: "h2", text: "Shell selection" },
      { type: "p", text: "Orbit picks a shell based on `$SHELL` (or `cmd.exe` on Windows). Override per agent in **Settings → Terminal** if you need a different one." },
      { type: "callout", tone: "info", title: "Windows", body: "On Windows the terminal uses ConPTY. Windows 10 build 1903 or newer is required, which is the same baseline as the rest of Orbit." },
    ],
  },

  engine: {
    slug: "engine",
    group: "Integrations",
    title: "Engine integration",
    lede: "How Orbit talks to model providers and how to plug in your own.",
    blocks: [
      { type: "h2", text: "The engine layer" },
      { type: "p", text: "Every agent runs through a thin abstraction called the **engine**. The engine is what turns a system prompt and a conversation into a stream of tokens and tool calls. It is the only piece of Orbit that knows how a specific model provider works." },
      { type: "p", text: "Today Orbit ships first-class engines for Anthropic, OpenAI, Ollama, and any OpenAI-compatible endpoint. The default engine is Anthropic's Claude family — that's where the team spends the most time tuning prompts and tool behavior." },

      { type: "h2", text: "Picking an engine per agent" },
      { type: "ul", items: [
        "Workspace default — set once, applies to every agent that doesn't override.",
        "Per-team override — every agent in a team uses a specific engine.",
        "Per-agent override — set on a single agent in **Settings → Engine**.",
      ]},

      { type: "h2", text: "Bring your own model" },
      { type: "p", text: "If you run a local or custom model, expose it through an OpenAI-compatible HTTP endpoint and add it as a custom provider in **Settings → Connections**. Orbit treats it like any other engine." },
      { type: "code", lang: "json", caption: "A custom provider in settings", body:
`{
  "id": "internal-llm",
  "name": "Internal LLM",
  "baseUrl": "https://llm.internal.acme/v1",
  "model": "acme-coder-7b",
  "auth": { "type": "bearer", "envVar": "ACME_LLM_TOKEN" }
}` },

      { type: "h2", text: "Streaming and tool calls" },
      { type: "p", text: "Orbit expects engines to stream tokens as they arrive and surface tool calls as discrete events. Most providers handle this natively. Local engines without streaming support work, but feel sluggish — the canvas can't show progress until the whole response lands." },
      { type: "callout", tone: "tip", title: "If you're picking a model", body: "For day-to-day agent work, prefer a model with strong tool-use, fast streaming, and a long context window. Capability per dollar matters more than absolute capability — your team will run more agents in parallel than you'd think." },
    ],
  },

  architecture: {
    slug: "architecture",
    group: "Reference",
    title: "Architecture",
    lede: "Three layers, two boundaries — the long-form version of the system diagram on the home page.",
    blocks: [
      { type: "h2", text: "The three layers" },
      { type: "kv", rows: [
        { key: "UI", value: "What you see. Canvas, sidebar, right rail, settings. All rendering, no business logic." },
        { key: "Core", value: "The brain. Workspace state, broker, persistence, supervision, agent registry." },
        { key: "Agent workers", value: "Long-running model processes. Each one a separate engine instance with its own conversation state." },
      ]},

      { type: "h2", text: "The two boundaries" },
      { type: "h3", text: "UI ↔ Core" },
      { type: "p", text: "The UI never touches the filesystem, the database, the broker, or an agent process directly. Every state change is a request the core authorizes; every push back to the UI is an event the core emitted. This is the boundary that lets the UI be tested in isolation and the core stay authoritative." },
      { type: "h3", text: "Core ↔ Agent" },
      { type: "p", text: "Every agent process is wrapped in an implementation of the **engine** trait. Today there are engines for several providers; tomorrow there can be engines for new ones without touching anything outside the engine layer." },

      { type: "h2", text: "Inside the core" },
      { type: "kv", rows: [
        { key: "core::supervise", value: "Watches every agent process. Restarts on crash with backoff." },
        { key: "broker::route", value: "Forwards inter-agent messages. Logs, rate-limits, loop-guards." },
        { key: "agents::registry", value: "Spawns agents, pipes their I/O, tracks lifecycle." },
        { key: "ipc::commands", value: "The request/response surface the UI calls into." },
        { key: "db", value: "SQLite per workspace. Schema versioned with idempotent migrations." },
        { key: "fs::workspace", value: "Per-agent branches and folder allowlist enforcement." },
        { key: "tracing", value: "Structured logs piped to disk and the developer console." },
      ]},

      { type: "h2", text: "The most load-bearing path" },
      { type: "p", text: "Inter-agent messaging. It's the part of the system that has to be most correct, because everything else assumes it. The walk-through:" },
      { type: "ol", items: [
        "Agent A emits `<send_to to=\"B\">…</send_to>` on its output stream.",
        "The agent runtime parses the tool call out of A's stream — the message hasn't crossed to B yet.",
        "The broker receives the structured payload, logs it, applies rate limits, and emits a `message-in-flight` event the canvas renders as the animated arc.",
        "The broker checks loop depth. If `depth ≤ 8`, it forwards. Otherwise it rejects, and the rejection lands back on A inside its own conversation.",
        "On B's next turn, the runtime writes the message into B's input. B sees a `from Atlas` bubble in its chat. Reply path is symmetric.",
      ]},

      { type: "h2", text: "Why these seams" },
      { type: "p", text: "Every boundary is a place that takes effort to get right. We chose them because each one buys a property worth the cost." },
      { type: "ul", items: [
        "**UI ↔ Core** — auditability. Every state change is a logged command.",
        "**Core ↔ Engine** — flexibility. New providers don't ripple through the rest of the codebase.",
        "**Agent ↔ Workspace** — safety. Filesystem rules are enforced at the boundary, not by trusting the agent." ,
      ]},
    ],
  },

  shortcuts: {
    slug: "shortcuts",
    group: "Reference",
    title: "Keyboard shortcuts",
    lede: "Every binding in Orbit, grouped by panel. Print-friendly cheat sheet at the bottom.",
    blocks: [
      { type: "h2", text: "Global" },
      { type: "kv", rows: [
        { key: "⌘N / Ctrl+N", value: "New workspace" },
        { key: "⌘O / Ctrl+O", value: "Open workspace" },
        { key: "⌘K / Ctrl+K", value: "Command palette" },
        { key: "⌘, / Ctrl+,", value: "Settings" },
        { key: "⌘/ / Ctrl+/", value: "Search this workspace" },
        { key: "⌘1 … ⌘5", value: "Switch sidebar tab — Inbox, Canvas, Activity, Tasks, Search" },
      ]},

      { type: "h2", text: "Canvas" },
      { type: "kv", rows: [
        { key: "Double-click", value: "Spawn agent at point" },
        { key: "Shift+click", value: "Drop sticky note at point" },
        { key: "Drag", value: "Move agent or selection" },
        { key: "Space + drag", value: "Pan canvas" },
        { key: "⌘+ / ⌘-", value: "Zoom in / out" },
        { key: "T", value: "New team region (drag to define)" },
        { key: "F", value: "Fit canvas to selection" },
        { key: "Esc", value: "Clear selection" },
      ]},

      { type: "h2", text: "Chat" },
      { type: "kv", rows: [
        { key: "⌘Enter", value: "Send message" },
        { key: "Shift+Enter", value: "New line in input" },
        { key: "↑ in empty input", value: "Edit your last message" },
        { key: "⌘Backspace", value: "Cancel current turn" },
        { key: "⌘L", value: "Clear chat scrollback (history is preserved)" },
      ]},

      { type: "h2", text: "Right rail" },
      { type: "kv", rows: [
        { key: "⌘D", value: "Open Diff tab for the focused agent" },
        { key: "⌘I", value: "Open Inbox tab" },
        { key: "⌘T", value: "Open Terminal tab" },
        { key: "⌘.", value: "Open Settings for the focused agent" },
      ]},
    ],
  },

  configuration: {
    slug: "configuration",
    group: "Reference",
    title: "Configuration",
    lede: "Settings file format, environment variables, and per-workspace overrides.",
    blocks: [
      { type: "h2", text: "Where settings live" },
      { type: "kv", rows: [
        { key: "Global settings", value: "`~/.orbit/settings.json` — applies to every workspace" },
        { key: "Workspace settings", value: "`<project>/.orbit/workspace.json` — overrides global for that project" },
        { key: "Secrets", value: "OS keychain — never written to disk in plaintext" },
      ]},
      { type: "p", text: "If a key exists in both global and workspace settings, the workspace value wins. Most teams keep the global file thin and put project-specific tuning in the workspace file." },

      { type: "h2", text: "Settings reference" },
      { type: "code", lang: "json", caption: "A complete workspace.json", body:
`{
  "engine": {
    "default": "anthropic",
    "perAgent": {
      "keeper": "anthropic-strong",
      "scout": "openai"
    }
  },
  "branches": {
    "base": "main",
    "prefix": "orbit/",
    "autoPruneDays": 30
  },
  "access": {
    "defaultAllowlist": ["**/*"],
    "deny": ["**/.env*", "**/secrets/**"]
  },
  "ui": {
    "fontSize": 13.5,
    "compactMode": false,
    "accentColor": "#4ade80"
  },
  "telemetry": false
}` },

      { type: "h2", text: "Environment variables" },
      { type: "kv", rows: [
        { key: "ANTHROPIC_API_KEY", value: "Picked up automatically by the Anthropic engine if present." },
        { key: "OPENAI_API_KEY", value: "Picked up automatically by the OpenAI engine if present." },
        { key: "ORBIT_DATA_DIR", value: "Override the default `~/.orbit` location. Useful for portable installs." },
        { key: "ORBIT_LOG_LEVEL", value: "`error`, `warn`, `info`, `debug`. Default is `info`." },
        { key: "ORBIT_DISABLE_UPDATES", value: "Set to `1` to skip the auto-update check on launch." },
      ]},

      { type: "h2", text: "Telemetry" },
      { type: "p", text: "Off by default. When on, Orbit reports anonymous version, OS, and crash signatures — no prompts, no code, no identifiers tied to you. Toggle in **Settings → Privacy** or set `\"telemetry\": false` in settings." },
    ],
  },

  troubleshooting: {
    slug: "troubleshooting",
    group: "Reference",
    title: "Troubleshooting",
    lede: "Common errors and how to read Orbit's logs when something goes sideways.",
    blocks: [
      { type: "h2", text: "Logs" },
      { type: "p", text: "The first stop for almost any problem is the log file. Orbit writes structured logs to `~/.orbit/logs/orbit-<date>.log` and rotates them daily. Open the latest one in your editor and search for the time the problem happened." },
      { type: "callout", tone: "tip", title: "Tip", body: "Bump the log level for a session: `ORBIT_LOG_LEVEL=debug open -a Orbit` (macOS). Reproduce the issue, then check the log — debug output is much more verbose." },

      { type: "h2", text: "Common errors" },

      { type: "h3", text: "Spawn refused: tree is dirty" },
      { type: "p", text: "Orbit refuses to spawn an agent into a project with uncommitted changes. Stash them, commit them, or discard them. Then spawn." },

      { type: "h3", text: "Connection test failed" },
      { type: "ul", items: [
        "Check the API key is valid by running a curl directly against the provider.",
        "If you're behind a proxy, set `HTTPS_PROXY` in the environment Orbit was launched from.",
        "For self-signed endpoints, add the certificate to the OS trust store.",
      ]},

      { type: "h3", text: "Agent stuck in cooldown" },
      { type: "p", text: "The provider rate-limited it. The agent will resume automatically once the limit clears. If it happens often, check **Settings → Usage** — you may be hitting a per-day cap, in which case raise it or move the agent to a different engine." },

      { type: "h3", text: "Tool call failed: path-not-allowed" },
      { type: "p", text: "The agent tried to read or write a path outside its folder allowlist. Either widen the allowlist in **Settings → Access**, or rephrase the task so the agent doesn't need access to that path." },

      { type: "h3", text: "App won't launch on Linux" },
      { type: "ul", items: [
        "Make sure `webkit2gtk-4.1` is installed.",
        "Run from a terminal to see startup output: `./Orbit-*.AppImage` or `orbit`.",
        "If you see a sandboxing error on Ubuntu 24.04+, try `--no-sandbox` once to confirm; then look at the AppArmor policy for the long-term fix.",
      ]},

      { type: "h2", text: "Reset the workspace" },
      { type: "p", text: "If a workspace gets into a bad state, you can rebuild it without losing your project files." },
      { type: "ol", items: [
        "Quit Orbit.",
        "Move `~/.orbit/maps/<workspace-id>.db` somewhere safe — that's the canvas state.",
        "Move `~/.orbit/workspaces/<workspace-id>/` somewhere safe — that's per-agent branches.",
        "Relaunch Orbit and re-add the project. A fresh workspace database is created.",
      ]},

      { type: "h2", text: "Still stuck" },
      { type: "p", text: "Email [support@orbit.app](mailto:support@orbit.app) with the log file from the day the issue happened. A person reads every message; you'll usually have a reply within a day." },
    ],
  },
};
