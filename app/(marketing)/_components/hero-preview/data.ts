import type { AgentId, ChatMessage, FileEntry, Status, Workspace, WorkspaceId } from "./types";

export const WORKSPACES: Record<WorkspaceId, Workspace> = {
  "platform-core": {
    nodes: [
      { id: "keeper",  name: "Keeper",  role: "reviewer", av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", status: "run",   task: "Reviewing PR #2847 — auth refactor", meta: "2m",  bar: 62, x: 72,  y: 72  },
      { id: "forge",   name: "Forge",   role: "builder",  av: "F", avBg: "#2a241c", avFg: "#d4b088", status: "think", task: "Implementing rate-limiter middleware", meta: "11m",         x: 240, y: 172 },
      { id: "ranger",  name: "Ranger",  role: "tester",   av: "R", avBg: "#1f281f", avFg: "#a3c398", status: "run",   task: "e2e suite — 114/320",                  meta: "4m", bar: 36, x: 430, y: 88  },
      { id: "compass", name: "Compass", role: "scout",    av: "C", avBg: "#1e262a", avFg: "#96b9c7", status: "run",   task: "Mapping db schema dependencies",       meta: "1m",          x: 430, y: 268 },
      { id: "scribe",  name: "Scribe",  role: "writer",   av: "S", avBg: "#1f2128", avFg: "#a0a9c8", status: "wait",  task: "Awaiting review on docs/api.md",       meta: "",            x: 72,  y: 268 },
    ],
    edges: [["keeper","forge","live"], ["forge","ranger","idle"], ["forge","compass","live"], ["scribe","forge","idle"]],
  },
  billing: {
    nodes: [
      { id: "mason",  name: "Mason",  role: "integrator", av: "M", avBg: "#2a2420", avFg: "#c9a690", status: "fail", task: "Stripe webhook signature mismatch", meta: "17m",         x: 90,  y: 80  },
      { id: "forge",  name: "Forge",  role: "builder",    av: "F", avBg: "#2a241c", avFg: "#d4b088", status: "run",  task: "Refactoring invoice service",       meta: "6m", bar: 48, x: 280, y: 180 },
      { id: "atlas",  name: "Atlas",  role: "planner",    av: "A", avBg: "#1e262e", avFg: "#96b4c7", status: "think",task: "Drafting migration plan v3",        meta: "22m",         x: 460, y: 100 },
      { id: "keeper", name: "Keeper", role: "reviewer",   av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", status: "wait", task: "Awaiting Mason fix",                meta: "",            x: 460, y: 280 },
    ],
    edges: [["mason","forge","live"], ["atlas","forge","idle"], ["forge","keeper","idle"]],
  },
  "marketing-site": {
    nodes: [
      { id: "scribe",  name: "Scribe",  role: "writer",  av: "S", avBg: "#1f2128", avFg: "#a0a9c8", status: "run",   task: "Drafting Q1 launch copy",          meta: "9m", bar: 71, x: 100, y: 90  },
      { id: "compass", name: "Compass", role: "scout",   av: "C", avBg: "#1e262a", avFg: "#96b9c7", status: "think", task: "Auditing competitor landing pages", meta: "14m",         x: 300, y: 200 },
      { id: "forge",   name: "Forge",   role: "builder", av: "F", avBg: "#2a241c", avFg: "#d4b088", status: "run",   task: "Building /pricing page components", meta: "3m", bar: 28, x: 500, y: 110 },
    ],
    edges: [["scribe","compass","live"], ["compass","forge","live"]],
  },
};

export const AGENT_CHATS: Record<AgentId, ChatMessage[]> = {
  keeper: [
    { who: "YOU", t: "11:42", body: "Take a pass on the auth PR — focus on the session-cookie path." },
    { who: "KEEPER", t: "11:42", body: "On it. Pulling the diff and checking the cookie flags.", tools: [
      { name: "git.diff", sub: "PR #2847 · auth/session.ts +84 −37" },
      { name: "shell.exec", sub: "grep -rn \"Set-Cookie\" src/auth" },
    ]},
    { who: "KEEPER", t: "11:43", body: "Two issues: <span style=\"color:var(--text)\">SameSite</span> isn't set on the refresh cookie, and the session id is logged at info. Want me to push fixes or open a thread?" },
  ],
  forge: [
    { who: "YOU", t: "11:30", body: "Add a token-bucket rate limiter to /api/auth." },
    { who: "FORGE", t: "11:31", body: "Sketching the middleware. Going with redis-backed counters, 60req/min default.", tools: [
      { name: "fs.write", sub: "src/middleware/rateLimit.ts +96" },
    ]},
    { who: "FORGE", t: "11:38", body: "First pass up. Tests are green locally. Mind if I open a PR?" },
  ],
  ranger: [
    { who: "YOU", t: "11:15", body: "Run the full e2e suite against staging." },
    { who: "RANGER", t: "11:15", body: "Started. 320 specs, ETA ~12m.", tools: [
      { name: "shell.exec", sub: "pnpm e2e --env=staging" },
    ]},
    { who: "RANGER", t: "11:38", body: "114/320 passing so far. One flake on checkout — retrying." },
  ],
  compass: [
    { who: "YOU", t: "11:20", body: "Map the schema dependencies between users and orgs." },
    { who: "COMPASS", t: "11:20", body: "Crawling. Pulling FK graph and call sites.", tools: [
      { name: "shell.exec", sub: "rg \"users\\.id\" --type ts" },
    ]},
    { who: "COMPASS", t: "11:42", body: "Found 11 references. Three look load-bearing for billing — dropping a note in the canvas." },
  ],
  scribe: [
    { who: "YOU", t: "10:55", body: "Update the API docs for the new /v2/sessions endpoint." },
    { who: "SCRIBE", t: "10:56", body: "Drafted. Waiting on your review at docs/api.md before I push." },
  ],
  mason: [
    { who: "YOU", t: "11:25", body: "Why are Stripe webhooks failing in staging?" },
    { who: "MASON", t: "11:25", body: "Signature mismatch on the events endpoint. Looks like the secret rotated but the env wasn't updated.", tools: [
      { name: "shell.exec", sub: "curl -X POST /webhooks/stripe" },
    ]},
    { who: "MASON", t: "11:33", body: "Need a human call: rotate the prod secret too, or roll back?" },
  ],
  atlas: [
    { who: "YOU", t: "10:40", body: "Plan the migration to per-org billing." },
    { who: "ATLAS", t: "10:41", body: "Drafting v3. Splitting into four phases with a dual-write window in phase 2." },
  ],
  scout: [],
};

export const TERMINAL_LINES: Record<AgentId, string[]> = {
  keeper:  ["$ git fetch origin pull/2847/head", "$ git diff main..pr-2847 -- src/auth/", "auth/session.ts | +84 −37", "auth/middleware.ts | +12 −4", "$ rg \"SameSite\" src/auth", "no matches", "$ █"],
  forge:   ["$ pnpm tsc --noEmit", "✓ no type errors", "$ pnpm test rateLimit", "PASS  src/middleware/rateLimit.test.ts", "  ✓ allows 60 req/min (4ms)", "  ✓ rejects on burst (2ms)", "$ █"],
  ranger:  ["$ pnpm e2e --env=staging", "spec: auth ............ 23/23 ✓", "spec: dashboard ....... 18/18 ✓", "spec: checkout ........ 8/12 ⚠", "  flake: payment-modal-close — retrying", "$ █"],
  compass: ["$ rg \"users\\.id\" --type ts", "src/billing/invoice.ts:42  load-bearing", "src/orgs/membership.ts:88", "src/api/sessions.ts:11", "... 8 more", "$ █"],
  scribe:  ["$ git diff docs/", "docs/api.md | +147 −12", "$ markdownlint docs/api.md", "✓ clean", "$ █"],
  mason:   ["$ curl -i /webhooks/stripe -d @event.json", "HTTP/1.1 400 Bad Request", "{ \"error\": \"signature_mismatch\" }", "$ stripe events resend evt_1Q...", "sig: whsec_***live*** ≠ env STRIPE_SECRET", "$ █"],
  atlas:   ["$ cat plans/per-org-billing.md", "## Phase 1 — Schema", "## Phase 2 — Dual-write", "## Phase 3 — Cutover", "## Phase 4 — Cleanup", "$ █"],
  scout:   [],
};

export const FILES_BY_AGENT: Record<AgentId, FileEntry[]> = {
  keeper:  [["src/auth/", "dir"], ["  session.ts", "changed"], ["  middleware.ts", "changed"], ["  cookies.ts", ""], ["tests/", "dir"], ["  auth.spec.ts", "added"]],
  forge:   [["src/middleware/", "dir"], ["  rateLimit.ts", "added"], ["  rateLimit.test.ts", "added"], ["package.json", "changed"]],
  ranger:  [["e2e/", "dir"], ["  auth.spec.ts", ""], ["  dashboard.spec.ts", ""], ["  checkout.spec.ts", "changed"]],
  compass: [["notes/", "dir"], ["  schema-graph.md", "added"], ["  call-sites.json", "added"]],
  scribe:  [["docs/", "dir"], ["  api.md", "changed"], ["  CHANGELOG.md", "changed"]],
  mason:   [["src/integrations/", "dir"], ["  stripe.ts", "changed"], [".env.staging", "changed"]],
  atlas:   [["plans/", "dir"], ["  per-org-billing.md", "added"], ["  rfcs/", "dir"]],
  scout:   [],
};

export const NOTES_BY_AGENT: Record<AgentId, string> = {
  keeper:  "<h5>Open questions</h5><ul><li>Should refresh cookies use SameSite=Lax or Strict?</li><li>Strip session id from info-level logs.</li></ul><h5>Decisions</h5><ul><li>Block PR until both fixes land.</li></ul>",
  forge:   "<h5>Plan</h5><ul><li>Token bucket, 60/min default per-route.</li><li>Redis backend, fall through to memory in dev.</li><li>Headers: X-RateLimit-*</li></ul>",
  ranger:  "<h5>Suite status</h5><ul><li>114/320 green</li><li>1 flake on checkout — retrying with longer wait.</li></ul>",
  compass: "<h5>Schema dependencies</h5><ul><li>users.id → invoices.user_id (load-bearing)</li><li>users.id → memberships.user_id</li><li>users.id → sessions.user_id</li></ul>",
  scribe:  "<h5>Draft</h5><ul><li>Added /v2/sessions endpoint reference.</li><li>Migrated examples from v1 to v2.</li></ul>",
  mason:   "<h5>Incident</h5><ul><li>Stripe signature mismatch in staging.</li><li>Cause: secret rotated 4d ago, env not synced.</li><li>Risk: prod likely hot too — needs human call.</li></ul>",
  atlas:   "<h5>Migration phases</h5><ul><li>Schema: add org_id to invoices.</li><li>Dual-write window: 14 days.</li><li>Cutover: dark launch behind flag.</li><li>Cleanup: drop legacy column.</li></ul>",
  scout:   "",
};

export const SIDEBAR_AGENTS: { id: AgentId; name: string; av: string; avBg: string; avFg: string; status: Status }[] = [
  { id: "keeper",  name: "Keeper",  av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", status: "run" },
  { id: "forge",   name: "Forge",   av: "F", avBg: "#2a241c", avFg: "#d4b088", status: "think" },
  { id: "scribe",  name: "Scribe",  av: "S", avBg: "#1f2128", avFg: "#a0a9c8", status: "wait" },
  { id: "compass", name: "Compass", av: "C", avBg: "#1e262a", avFg: "#96b9c7", status: "run" },
  { id: "ranger",  name: "Ranger",  av: "R", avBg: "#1f281f", avFg: "#a3c398", status: "run" },
  { id: "mason",   name: "Mason",   av: "M", avBg: "#2a2420", avFg: "#c9a690", status: "fail" },
  { id: "atlas",   name: "Atlas",   av: "A", avBg: "#1e262e", avFg: "#96b4c7", status: "think" },
];
