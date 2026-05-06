# Orbit Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recreate the Orbit landing page (from the Claude Design handoff bundle at `/tmp/orbit-design/orbit/project/pages/landing.html`) as the home route of this Next.js 16 app, broken into reusable, section-scoped React components and a small primitive library.

**Architecture:** Single-page marketing route at `app/page.tsx` composed of section components under `app/(marketing)/_components/sections/*`. Shared atoms (Button, Pill, Chip, Kbd, Dot, Eyebrow) live under `_components/ui/*`. Design tokens are exposed as CSS custom properties in `app/globals.css` (single source of truth, mirroring the prototype's `:root` block). The interactive Hero "app preview" is its own client island (`HeroPreview.tsx`) with internal state for workspaces / agents / panel tabs. Everything else is RSC-friendly with one tiny `RevealOnScroll` and `CountUp` client utility.

**Tech Stack:** Next.js 16 (app router), React 19, TypeScript, Tailwind v4 (used only for layout helpers; the prototype's hand-tuned CSS via tokens is the source of truth — we keep token-driven CSS rather than rebuilding every value as Tailwind utilities), Geist + JetBrains Mono via `next/font`.

---

## Source-of-truth references

- **Design HTML (canonical):** `/tmp/orbit-design/orbit/project/pages/landing.html` (1972 lines)
- **Design context (tokens, voice, components):** `/tmp/orbit-design/orbit/project/DESIGN_CONTEXT.md`
- **Bundle README:** `/tmp/orbit-design/orbit/README.md`

When in doubt about a value (color, padding, font size, animation duration), copy it from the prototype HTML — do not invent new values.

---

## File structure (created upfront, filled in by tasks)

```
app/
  globals.css                              # tokens + global resets (rewritten)
  layout.tsx                               # add JetBrains Mono font, set <title>
  page.tsx                                 # composes sections (server component)
  (marketing)/                             # route group, no URL segment
    _components/
      ui/
        Button.tsx                         # btn / btn-primary / btn-lg
        Pill.tsx                           # hero status pill
        Chip.tsx                           # tool chip + danger variant
        Eyebrow.tsx                        # mono uppercase section labels
        Dot.tsx                            # status dot (run/think/wait/fail/idle)
        SectionContainer.tsx               # max-width 1180px wrapper
      icons/
        BrandMark.tsx                      # the orbit svg logo
        Icons.tsx                          # nav, action, platform svgs
      sections/
        Topbar.tsx
        Hero.tsx
        HeroPreview.tsx                    # 'use client' — interactive window
        Values.tsx
        Metrics.tsx
        HowItWorks.tsx
        Compare.tsx
        Agents.tsx
        Download.tsx
        Footer.tsx
      hero-preview/
        data.ts                            # WORKSPACES, AGENT_CHATS, etc.
        types.ts                           # Workspace, AgentNode, Message, etc.
        Canvas.tsx                         # nodes + edges + status bar
        Sidebar.tsx                        # workspace nav + agent rows
        Panel.tsx                          # right panel header/tabs/body/composer
        WindowChrome.tsx                   # titlebar + map tabs
      utils/
        RevealOnScroll.tsx                 # 'use client' — adds .in on intersect
        CountUp.tsx                        # 'use client' — animated number
```

**Why this split:** the design context says "every page imports the same `tokens`, `icons`, `primitives`". We mirror that with `ui/` (primitives), `icons/`, and `sections/`. The hero preview owns enough state and JSX to deserve its own subfolder. Section components stay flat under `sections/`.

---

## Pre-flight: confirm scope and stack assumptions

Before Task 1, confirm with the user:

1. Is this replacing the current default `app/page.tsx` placeholder? (The plan assumes yes.)
2. Should we keep the existing Tailwind v4 setup but lean on hand-tuned CSS for tokens / section internals? (The plan assumes yes — the prototype's CSS is detailed and not utility-shaped, so reproducing it 1:1 in arbitrary Tailwind classes adds friction with no payoff.)
3. Any deviation from the prototype (e.g., different brand name, different download URLs)? Default: pixel-match the prototype.

If the user wants a different answer to any of these, revise the plan before executing.

---

## Task 1: Tokens & global stylesheet

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/globals.css` contents**

Replace the entire file with the prototype's `:root` block plus base resets and the keyframes used across sections. Source: `landing.html:11-39` (root vars), `landing.html:579-627` (keyframes), `landing.html:687-706` (reveal classes), `landing.html:766-773` (reduced motion).

```css
@import "tailwindcss";

:root {
  --bg:        #000000;
  --ink0:      #050505;
  --ink1:      #070707;
  --ink2:      #0a0a0a;
  --ink3:      #0d0d0d;
  --ink4:      #101010;
  --ink5:      #141414;
  --line0:     #121212;
  --line1:     #161616;
  --line2:     #1c1c1c;
  --line3:     #242424;
  --line4:     #2a2a2a;
  --text:      #e8e8e8;
  --text2:     #c8c8c8;
  --text3:     #c0c0c0;
  --textDim:   #a0a0a0;
  --textMute:  #707070;
  --textFaint: #505050;
  --textGhost: #3a3a3a;
  --accent:    #4ade80;
  --accentDim: #2d6a46;
  --accentBg:  #14201a;
  --accentBd:  #1f3a2a;
  --think:     #60a5fa;
  --warn:      #f59e0b;
  --review:    #a78bfa;
  --err:       #ef4444;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif;
}
* { box-sizing: border-box; }
.mono { font-family: var(--font-jetbrains-mono), ui-monospace, monospace; font-variant-ligatures: none; }
a { color: inherit; text-decoration: none; }
svg { display: block; }

/* Reveal on scroll */
.js-reveal .reveal { opacity: 0; transform: translateY(20px); transition: opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1); }
.js-reveal .reveal.in { opacity: 1; transform: translateY(0); }
.js-reveal .reveal-stagger > * { opacity: 0; transform: translateY(14px); transition: opacity .55s cubic-bezier(.2,.8,.2,1), transform .55s cubic-bezier(.2,.8,.2,1); }
.js-reveal .reveal-stagger.in > * { opacity: 1; transform: translateY(0); }
.reveal-stagger.in > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger.in > *:nth-child(2) { transition-delay: 60ms; }
.reveal-stagger.in > *:nth-child(3) { transition-delay: 120ms; }
.reveal-stagger.in > *:nth-child(4) { transition-delay: 180ms; }
.reveal-stagger.in > *:nth-child(5) { transition-delay: 240ms; }
.reveal-stagger.in > *:nth-child(6) { transition-delay: 300ms; }
.reveal-stagger.in > *:nth-child(7) { transition-delay: 360ms; }
.reveal-stagger.in > *:nth-child(8) { transition-delay: 420ms; }

/* Keyframes from prototype */
@keyframes om-pulse { 0%,100% { transform: scale(1); opacity: .7; } 50% { transform: scale(1.6); opacity: 0; } }
@keyframes om-dashflow { to { stroke-dashoffset: -40; } }
@keyframes om-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@keyframes om-float-a { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
@keyframes om-bar-fill { from { width: 0; } }
@keyframes om-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes om-glow-pulse { 0%,100% { opacity: .5; } 50% { opacity: .9; } }
@keyframes om-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
@keyframes om-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@keyframes om-tab-pulse { 0%,100% { background: var(--ink5); } 50% { background: #1f2a22; } }
@keyframes om-vg-pulse { 0% { r: 2; opacity: 1; } 100% { r: 18; opacity: 0; } }
@keyframes om-spark { 0%,100% { height: 30%; } 50% { height: 100%; } }
@keyframes om-acell-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(150%); } }

/* Common animation hooks */
.dashflow { animation: om-dashflow 1.6s linear infinite; }
.float-1 { animation: om-float-a 2.4s ease-in-out infinite; }
.float-2 { animation: om-float-a 2.4s ease-in-out infinite .3s; }
.float-3 { animation: om-float-a 2.4s ease-in-out infinite .6s; }
.float-4 { animation: om-float-a 2.4s ease-in-out infinite .9s; }
.vg-pulse { animation: om-vg-pulse 1.8s ease-out infinite; transform-origin: center; transform-box: fill-box; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .reveal-stagger > * { opacity: 1 !important; transform: none !important; }
}
```

- [ ] **Step 2: Add JetBrains Mono to `app/layout.tsx`**

Replace `Geist_Mono` with `JetBrains_Mono` and update metadata.

```tsx
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Orbit — Command your team of AI coding agents",
  description:
    "Orbit is a desktop app for orchestrating teams of coding agents on real codebases.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server boots**

Run: `pnpm dev` (background) → open `http://localhost:3000`
Expected: black background, no console errors, default page renders (page is still placeholder).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat(landing): tokens, fonts, global keyframes"
```

---

## Task 2: Primitive UI components

**Files:**
- Create: `app/(marketing)/_components/ui/SectionContainer.tsx`
- Create: `app/(marketing)/_components/ui/Eyebrow.tsx`
- Create: `app/(marketing)/_components/ui/Button.tsx`
- Create: `app/(marketing)/_components/ui/Pill.tsx`
- Create: `app/(marketing)/_components/ui/Chip.tsx`
- Create: `app/(marketing)/_components/ui/Dot.tsx`

- [ ] **Step 1: `SectionContainer.tsx`**

Mirrors `.container { max-width: 1180px; margin: 0 auto; padding: 0 32px; }` (`landing.html:77`).

```tsx
import { ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: `Eyebrow.tsx`**

Mirrors `.eyebrow` (`landing.html:78-83`) — mono 10px uppercase with leading dash.

```tsx
import { ReactNode } from "react";

export function Eyebrow({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: color ?? "var(--textFaint)",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ width: 18, height: 1, background: "var(--line3)" }} />
      {children}
    </span>
  );
}
```

- [ ] **Step 3: `Button.tsx`**

Mirrors `.btn`, `.btn-primary`, `.btn-lg` (`landing.html:60-73`). Polymorphic for `<a>` vs `<button>`.

```tsx
"use client";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "ghost" | "primary";
type Size = "md" | "lg";

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 5,
  fontWeight: 500,
  cursor: "pointer",
  border: "1px solid var(--line2)",
  background: "transparent",
  color: "var(--text2)",
  transition: "background .12s, border-color .12s, color .12s",
  textDecoration: "none",
};

function styleFor(variant: Variant, size: Size): React.CSSProperties {
  const sized: React.CSSProperties =
    size === "lg"
      ? { padding: "12px 20px", fontSize: 14, borderRadius: 6 }
      : { padding: "8px 14px", fontSize: 13 };
  const themed: React.CSSProperties =
    variant === "primary"
      ? {
          background: "var(--accentBg)",
          color: "var(--accent)",
          borderColor: "var(--accentBd)",
        }
      : {};
  return { ...baseStyle, ...sized, ...themed };
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button(props: AnchorProps | BtnProps) {
  const { variant = "ghost", size = "md", children, ...rest } = props as
    & AnchorProps
    & BtnProps;
  if ((props as AnchorProps).as === "a") {
    const { as: _as, ...anchor } = rest as AnchorProps;
    return (
      <a {...anchor} style={{ ...styleFor(variant, size), ...(anchor.style || {}) }}>
        {children}
      </a>
    );
  }
  const { as: _as, ...btn } = rest as BtnProps;
  return (
    <button {...btn} style={{ ...styleFor(variant, size), ...(btn.style || {}) }}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: `Pill.tsx`**

Hero status pill (`landing.html:108-117`). Has the green pulsing dot, separator, and mono version label.

```tsx
import { ReactNode } from "react";

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 11px 5px 8px",
        borderRadius: 99,
        background: "var(--ink2)",
        border: "1px solid var(--line2)",
        fontSize: 11.5,
        color: "var(--textDim)",
        marginBottom: 28,
        animation: "om-rise 0.6s ease-out both",
      }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: `Chip.tsx`**

Mirrors `.chip` and `.chip.danger` (`landing.html:417-422`).

```tsx
import { ReactNode } from "react";

export function Chip({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "danger";
}) {
  const danger = variant === "danger";
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        padding: "2px 7px",
        borderRadius: 3,
        background: danger ? "rgba(239,68,68,0.06)" : "var(--ink4)",
        border: danger ? "1px solid rgba(239,68,68,0.25)" : "1px solid var(--line2)",
        color: danger ? "#fca5a5" : "var(--text3)",
      }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 6: `Dot.tsx`**

Status dot used everywhere (`landing.html:179-184`, plus pulsing variant `landing.html:640-659`).

```tsx
type Status = "run" | "think" | "wait" | "fail" | "idle";

const COLORS: Record<Status, string> = {
  run: "var(--accent)",
  think: "var(--think)",
  wait: "var(--warn)",
  fail: "var(--err)",
  idle: "#6b7280",
};

export function Dot({
  status,
  size = 6,
  pulse = false,
}: {
  status: Status;
  size?: number;
  pulse?: boolean;
}) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 99,
        flexShrink: 0,
        background: COLORS[status],
        boxShadow:
          status === "run" ? "0 0 6px rgba(74,222,128,0.5)" : undefined,
      }}
    >
      {pulse && status === "run" && (
        <span
          style={{
            content: '""',
            position: "absolute",
            inset: -3,
            borderRadius: 99,
            background: "var(--accent)",
            opacity: 0.4,
            animation: "om-pulse 2.2s ease-in-out infinite",
            zIndex: -1,
          }}
        />
      )}
    </span>
  );
}
```

- [ ] **Step 7: Sanity-check by importing one in `page.tsx`**

Temporarily edit `app/page.tsx` to render `<Pill><Dot status="run" pulse /> hello</Pill>` and confirm in the browser. Revert after verifying.

- [ ] **Step 8: Commit**

```bash
git add app/\(marketing\)
git commit -m "feat(landing): primitive ui components"
```

---

## Task 3: Icons module

**Files:**
- Create: `app/(marketing)/_components/icons/BrandMark.tsx`
- Create: `app/(marketing)/_components/icons/Icons.tsx`

- [ ] **Step 1: `BrandMark.tsx` — the orbit logo**

Source: `landing.html:781-797` (topbar mark) and `landing.html:1424-1428` (footer simplified mark). Component takes a `size` and a `simple` flag.

```tsx
export function BrandMark({
  size = 22,
  simple = false,
}: {
  size?: number;
  simple?: boolean;
}) {
  if (simple) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32">
        <g transform="translate(16 16) rotate(30)">
          <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="#a0a0a0" strokeWidth={2} />
        </g>
        <g transform="translate(16 16) rotate(-30)">
          <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="#7ec891" strokeWidth={2} />
        </g>
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <defs>
        <linearGradient id="rgA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#e8e8e8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e8e8e8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="rgB" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec891" stopOpacity="0.05" />
          <stop offset="45%" stopColor="#7ec891" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7ec891" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <g transform="translate(16 16) rotate(30)">
        <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="url(#rgA)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <g transform="translate(16 16) rotate(-30)">
        <ellipse cx="0" cy="0" rx="12" ry="6.5" fill="none" stroke="url(#rgB)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <circle cx={22} cy={11} r={1.4} fill="#7ec891" />
    </svg>
  );
}
```

- [ ] **Step 2: `Icons.tsx` — every other inline svg**

Export named functions matching the prototype's inline svgs. Each takes `size?: number` (default 16) and forwards as `width`/`height`. Sources are listed inline so the engineer can verify.

```tsx
type IconProps = { size?: number };

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Download arrow + ground line — landing.html:812
export function DownloadIcon({ size = 13 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 2v9M4 7l4 4 4-4M3 14h10" />
    </svg>
  );
}
// Right arrow — landing.html:848
export function ArrowRight({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
// Map / canvas / dms / squads / tasks / runs (sidebar) — landing.html:869,886,890,894,898,902
export function MapIcon({ size = 10 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M2 4l4-1 4 1 4-1v9l-4 1-4-1-4 1V4zM6 3v9M10 4v9" />
    </svg>
  );
}
export function CanvasIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M8 2l6 3-6 3-6-3 6-3zM2 8l6 3 6-3M2 11l6 3 6-3" />
    </svg>
  );
}
export function DmsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M6 2L4 14M12 2l-2 12M2 6h12M2 10h12" />
    </svg>
  );
}
export function SquadsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M5 7a2 2 0 100-4 2 2 0 000 4zM11 7a2 2 0 100-4 2 2 0 000 4zM2 13c0-2 1.5-3 3-3s3 1 3 3M8 13c0-2 1.5-3 3-3s3 1 3 3" />
    </svg>
  );
}
export function TasksIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M9 2L3 9h4l-1 5 6-7H8l1-5z" />
    </svg>
  );
}
export function RunsIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" {...stroke}>
      <path d="M4 3v10M4 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM4 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 6c0 3-4 2-4 5" />
    </svg>
  );
}
// Tool-call icons used in chat preview — landing.html:955-964
export function GitIcon({ size = 11 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth={1.6}>
      <path d="M4 3v10M4 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 6.5c0 3-4 2-4 4.5" />
    </svg>
  );
}
export function ShellIcon({ size = 11 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#4ade80" strokeWidth={1.6}>
      <path d="M2 3h12v10H2zM4.5 6.5L7 8.5 4.5 10.5" />
    </svg>
  );
}
export function CheckIcon({ size = 11, color = "#4ade80" }: IconProps & { color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke={color} strokeWidth={1.8}>
      <path d="M3 8l3 3 6-6" />
    </svg>
  );
}
// Apple logo — landing.html:1383
export function AppleIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
// Linux glyph (the prototype uses a Tux-shaped placeholder) — landing.html:1397
export function LinuxIcon({ size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.62 8.35c-.42-.6-.85-1.5-.85-2.45 0-1.95-1.04-3.45-2.62-4.45-.46-.3-1.04-.45-1.62-.45-1.04 0-2.04.45-2.7 1.2-.66-.75-1.66-1.2-2.7-1.2-.58 0-1.16.15-1.62.45C.94 2.45-.1 3.95-.1 5.9c0 .95.43 1.85.85 2.45-.42.6-.85 1.5-.85 2.45 0 1.95 1.04 3.45 2.62 4.45.46.3 1.04.45 1.62.45 1.04 0 2.04-.45 2.7-1.2.66.75 1.66 1.2 2.7 1.2.58 0 1.16-.15 1.62-.45 1.58-1 2.62-2.5 2.62-4.45 0-.95-.43-1.85-.85-2.45zM7.05 14.85c-.66.75-1.66 1.2-2.7 1.2-.58 0-1.16-.15-1.62-.45C1.15 14.6.1 13.1.1 11.15c0-.95.43-1.85.85-2.45-.42-.6-.85-1.5-.85-2.45 0-1.95 1.05-3.45 2.63-4.45.46-.3 1.04-.45 1.62-.45 1.04 0 2.04.45 2.7 1.2v12.3z" transform="translate(4 2)" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(marketing\)/_components/icons
git commit -m "feat(landing): brand mark and icon library"
```

---

## Task 4: Reveal-on-scroll utility + CountUp

**Files:**
- Create: `app/(marketing)/_components/utils/RevealOnScroll.tsx`
- Create: `app/(marketing)/_components/utils/CountUp.tsx`

- [ ] **Step 1: `RevealOnScroll.tsx`**

Mirrors prototype script (`landing.html:1444-1465`). On mount, adds `js-reveal` to `<html>`, then uses `IntersectionObserver` to add `.in` to any element with `.reveal`, `.reveal-stagger`, or `.step` once 12% visible.

```tsx
"use client";
import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger, .step");
    const showIfVisible = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh - 40 && r.bottom > 0) el.classList.add("in");
    };
    els.forEach(showIfVisible);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      els.forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
    } else {
      els.forEach((el) => el.classList.add("in"));
    }
  }, []);
  return null;
}
```

- [ ] **Step 2: `CountUp.tsx`**

Mirrors prototype script (`landing.html:1467-1506`).

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ target, format = "default" }: { target: number; format?: "default" | "comma" }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const animate = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const dur = 1400;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const fmt = (n: number) =>
        format === "comma" || target >= 1000
          ? Math.floor(n).toLocaleString("en-US")
          : Math.floor(n).toString();
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / dur);
        setText(fmt(target * ease(t)));
        if (t < 1) requestAnimationFrame(tick);
        else setText(fmt(target));
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              animate();
              io.disconnect();
            }
          });
        },
        { threshold: 0.4 }
      );
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) animate();
      else io.observe(el);
    } else {
      animate();
    }
  }, [target, format]);

  return <span ref={ref}>{text}</span>;
}
```

- [ ] **Step 3: Commit**

```bash
git add app/\(marketing\)/_components/utils
git commit -m "feat(landing): reveal-on-scroll and countup utils"
```

---

## Task 5: Topbar section

**Files:**
- Create: `app/(marketing)/_components/sections/Topbar.tsx`

Source: `landing.html:46-58` (CSS) + `landing.html:778-816` (markup).

- [ ] **Step 1: Implement**

```tsx
import { BrandMark } from "../icons/BrandMark";
import { DownloadIcon } from "../icons/Icons";
import { Button } from "../ui/Button";

const NAV = [
  { label: "Product", href: "#values" },
  { label: "How it works", href: "#how" },
  { label: "Agents", href: "#agents" },
  { label: "Download", href: "#download" },
  { label: "Docs", href: "#" },
  { label: "Changelog", href: "#" },
];

export function Topbar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        gap: 24,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "-0.2px",
        }}
      >
        <BrandMark size={22} />
        <span>orbit</span>
        <span
          className="mono"
          style={{ fontSize: 10.5, color: "var(--textMute)", letterSpacing: "0.04em" }}
        >
          v0.4.2
        </span>
      </a>
      <nav style={{ display: "flex", gap: 22, marginLeft: 18, fontSize: 13, color: "var(--textDim)" }}>
        {NAV.map((n) => (
          <a key={n.label} href={n.href}>
            {n.label}
          </a>
        ))}
      </nav>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <a
          href="#"
          style={{
            padding: "6px 10px",
            color: "var(--textDim)",
            fontSize: 13,
          }}
        >
          Sign in
        </a>
        <Button as="a" href="#download" variant="primary">
          <DownloadIcon /> Download
        </Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx` placeholder for visual check**

Replace the placeholder with:

```tsx
import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <Topbar />
      <main style={{ minHeight: "100vh" }} />
    </>
  );
}
```

Run dev server, confirm: black bar, brand left, nav middle, sign-in + green Download button right.

- [ ] **Step 3: Commit**

```bash
git add app/\(marketing\)/_components/sections/Topbar.tsx app/page.tsx
git commit -m "feat(landing): topbar section"
```

---

## Task 6: Hero section (static parts)

**Files:**
- Create: `app/(marketing)/_components/sections/Hero.tsx`

This task does the hero copy, pill, CTAs, meta line, dotted-grid bg, glow. The interactive `<HeroPreview />` window comes in Task 7.

Source: `landing.html:85-138` (CSS) + `landing.html:818-980` (markup, but we only do `818-859` plus the wrapper).

- [ ] **Step 1: Implement**

```tsx
import { ReactNode } from "react";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { Dot } from "../ui/Dot";
import { DownloadIcon, ArrowRight } from "../icons/Icons";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 0 96px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.025) 0.8px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 35%, #000 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "8%",
          width: 720,
          height: 360,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.06), transparent 60%)",
          pointerEvents: "none",
          animation: "om-glow-pulse 6s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        <Pill>
          <Dot status="run" pulse />
          <span>Now in private beta</span>
          <span style={{ width: 1, height: 11, background: "var(--line3)", margin: "0 2px" }} />
          <span className="mono" style={{ color: "var(--textMute)", fontSize: 10.5 }}>
            v0.4.2 · macOS · Linux
          </span>
        </Pill>

        <h1
          style={{
            fontSize: 68,
            lineHeight: 1.04,
            letterSpacing: "-1.6px",
            fontWeight: 600,
            margin: "0 0 20px",
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          Command a small{" "}
          <span style={{ color: "var(--textMute)", fontWeight: 500 }}>garrison</span>
          <br />
          of AI coding agents.
        </h1>

        <p
          style={{
            fontSize: 18,
            lineHeight: 1.55,
            color: "var(--textDim)",
            maxWidth: 620,
            margin: "0 auto 36px",
            textWrap: "pretty",
          }}
        >
          Orbit is a desktop app for orchestrating teams of coding agents on real codebases. Watch
          them work on a live canvas, talk to any one in a DM, review their diffs, and ship.
        </p>

        <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
          <Button as="a" href="#download" variant="primary" size="lg">
            <DownloadIcon size={14} /> Download for macOS
          </Button>
          <Button as="a" href="#how" size="lg">
            See it in action <ArrowRight size={12} />
          </Button>
        </div>

        <div
          className="mono"
          style={{
            marginTop: 28,
            display: "inline-flex",
            gap: 18,
            alignItems: "center",
            fontSize: 11,
            color: "var(--textMute)",
          }}
        >
          <MetaItem>Apple silicon · Intel</MetaItem>
          <span style={{ color: "var(--textGhost)" }}>│</span>
          <MetaItem>Bring your own keys</MetaItem>
          <span style={{ color: "var(--textGhost)" }}>│</span>
          <MetaItem>Local sandbox by default</MetaItem>
        </div>
      </div>

      <HeroPreview />
    </section>
  );
}

function MetaItem({ children }: { children: ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ color: "var(--accent)" }}>✓</span>
      {children}
    </span>
  );
}
```

- [ ] **Step 2: Add a temporary stub for `HeroPreview` so the build passes**

Create `app/(marketing)/_components/sections/HeroPreview.tsx`:

```tsx
export function HeroPreview() {
  return (
    <div style={{ position: "relative", margin: "64px auto 0", maxWidth: 1180, padding: "0 32px" }}>
      <div
        style={{
          height: 520,
          background: "var(--ink0)",
          border: "1px solid var(--line2)",
          borderRadius: 10,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 3: Wire into `page.tsx`**

```tsx
import { Hero } from "./(marketing)/_components/sections/Hero";
// ...inside Home(), after <Topbar />:
<Hero />
```

Confirm in browser: title at 68px, pill with pulsing green dot, two CTAs (green + ghost), meta line below, empty placeholder window beneath.

- [ ] **Step 4: Commit**

```bash
git add app/\(marketing\)/_components/sections/Hero.tsx app/\(marketing\)/_components/sections/HeroPreview.tsx app/page.tsx
git commit -m "feat(landing): hero copy, pill, CTAs"
```

---

## Task 7: Hero preview — data, types, and chrome

**Files:**
- Create: `app/(marketing)/_components/hero-preview/types.ts`
- Create: `app/(marketing)/_components/hero-preview/data.ts`
- Create: `app/(marketing)/_components/hero-preview/WindowChrome.tsx`

The interactive preview is the largest single component. We split it across Tasks 7–10.

- [ ] **Step 1: `types.ts`**

```ts
export type Status = "run" | "think" | "wait" | "fail" | "idle";

export type AgentNode = {
  id: string;
  name: string;
  role: string;
  av: string;
  avBg: string;
  avFg: string;
  status: Status;
  task: string;
  meta: string;
  bar?: number;
  x: number;
  y: number;
};

export type EdgeKind = "live" | "idle";
export type Edge = [from: string, to: string, kind: EdgeKind];

export type Workspace = {
  nodes: AgentNode[];
  edges: Edge[];
};

export type WorkspaceId = "platform-core" | "billing" | "marketing-site";

export type ChatMessage = {
  who: string;
  t: string;
  body: string;
  tools?: { name: string; sub: string }[];
};

export type FileEntry = [name: string, kind: "" | "dir" | "changed" | "added"];

export type AgentId =
  | "keeper"
  | "forge"
  | "scribe"
  | "compass"
  | "ranger"
  | "mason"
  | "atlas"
  | "scout";

export type PanelTab = "chat" | "terminal" | "files" | "notes";
```

- [ ] **Step 2: `data.ts`**

Copy the prototype's three runtime objects verbatim from `landing.html:1511-1616`. Use `as const` where TypeScript can infer types tighter, but keep the values 1:1.

```ts
import type { AgentId, ChatMessage, FileEntry, Workspace, WorkspaceId } from "./types";

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

export const SIDEBAR_AGENTS: { id: AgentId; name: string; av: string; avBg: string; avFg: string; status: import("./types").Status }[] = [
  { id: "keeper",  name: "Keeper",  av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", status: "run" },
  { id: "forge",   name: "Forge",   av: "F", avBg: "#2a241c", avFg: "#d4b088", status: "think" },
  { id: "scribe",  name: "Scribe",  av: "S", avBg: "#1f2128", avFg: "#a0a9c8", status: "wait" },
  { id: "compass", name: "Compass", av: "C", avBg: "#1e262a", avFg: "#96b9c7", status: "run" },
  { id: "ranger",  name: "Ranger",  av: "R", avBg: "#1f281f", avFg: "#a3c398", status: "run" },
  { id: "mason",   name: "Mason",   av: "M", avBg: "#2a2420", avFg: "#c9a690", status: "fail" },
  { id: "atlas",   name: "Atlas",   av: "A", avBg: "#1e262e", avFg: "#96b4c7", status: "think" },
];
```

- [ ] **Step 3: `WindowChrome.tsx`**

The titlebar with traffic lights, map tabs, and workspace badge. Source: `landing.html:154-166` (CSS) + `landing.html:864-880` (markup).

```tsx
"use client";
import type { WorkspaceId } from "./types";
import { MapIcon } from "../icons/Icons";

const TABS: { id: WorkspaceId; label: string; withIcon?: boolean }[] = [
  { id: "platform-core", label: "platform-core", withIcon: true },
  { id: "billing", label: "billing" },
  { id: "marketing-site", label: "marketing-site" },
];

export function WindowChrome({
  active,
  onSelect,
}: {
  active: WorkspaceId;
  onSelect: (id: WorkspaceId) => void;
}) {
  return (
    <div
      style={{
        height: 36,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        borderBottom: "1px solid var(--line0)",
        background: "var(--ink1)",
      }}
    >
      <div style={{ display: "flex", gap: 6, width: 78 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 11,
              height: 11,
              borderRadius: 11,
              background: "#2a2a2a",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 2, flex: 1, alignItems: "center" }}>
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className="mono"
              style={{
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 4,
                color: isActive ? "var(--text)" : "var(--textMute)",
                cursor: "pointer",
                background: isActive ? "var(--ink5)" : "transparent",
                border: isActive ? "1px solid var(--line3)" : "1px solid transparent",
                animation: isActive ? "om-tab-pulse 4s ease-in-out infinite" : undefined,
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {t.withIcon && <MapIcon size={10} />}
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="mono"
        style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--textDim)" }}
      >
        <span
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: "#202020",
            border: "1px solid #2a2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            color: "var(--accent)",
          }}
        >
          A
        </span>
        acme-corp
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add app/\(marketing\)/_components/hero-preview/types.ts app/\(marketing\)/_components/hero-preview/data.ts app/\(marketing\)/_components/hero-preview/WindowChrome.tsx
git commit -m "feat(landing): hero preview types, data, window chrome"
```

---

## Task 8: Hero preview — Sidebar

**Files:**
- Create: `app/(marketing)/_components/hero-preview/Sidebar.tsx`

Source: `landing.html:171-184` (CSS) + `landing.html:883-914` (markup).

- [ ] **Step 1: Implement**

```tsx
"use client";
import type { AgentId } from "./types";
import { SIDEBAR_AGENTS } from "./data";
import { CanvasIcon, DmsIcon, SquadsIcon, TasksIcon, RunsIcon } from "../icons/Icons";
import { Dot } from "../ui/Dot";

const NAV = [
  { id: "canvas", label: "Canvas", Icon: CanvasIcon, count: undefined as number | undefined },
  { id: "dms", label: "DMs", Icon: DmsIcon, count: 4 },
  { id: "squads", label: "Squads", Icon: SquadsIcon, count: 3 },
  { id: "tasks", label: "Tasks", Icon: TasksIcon, count: 12 },
  { id: "runs", label: "Runs", Icon: RunsIcon, count: 2 },
];

export function Sidebar({
  activeNav,
  onNav,
  activeAgent,
  onAgent,
}: {
  activeNav: string;
  onNav: (id: string) => void;
  activeAgent: AgentId;
  onAgent: (id: AgentId) => void;
}) {
  return (
    <div
      style={{
        background: "var(--ink0)",
        borderRight: "1px solid var(--line0)",
        padding: "12px 8px",
      }}
    >
      <SectionLabel>WORKSPACE</SectionLabel>
      {NAV.map((n) => {
        const active = activeNav === n.id;
        return (
          <button
            key={n.id}
            onClick={() => onNav(n.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "5px 8px",
              fontSize: 12.5,
              color: active ? "var(--text)" : "var(--text3)",
              borderRadius: 4,
              background: active ? "var(--ink4)" : "transparent",
              border: "none",
              width: "100%",
              cursor: "pointer",
              transition: "background .12s",
              textAlign: "left",
            }}
          >
            <span style={{ width: 14, height: 14, color: "var(--textMute)" }}>
              <n.Icon size={14} />
            </span>
            <span style={{ flex: 1 }}>{n.label}</span>
            {n.count !== undefined && (
              <span
                className="mono"
                style={{ fontSize: 10, color: "var(--textFaint)" }}
              >
                {n.count}
              </span>
            )}
          </button>
        );
      })}

      <SectionLabel>AGENTS</SectionLabel>
      {SIDEBAR_AGENTS.map((a) => {
        const active = activeAgent === a.id;
        return (
          <button
            key={a.id}
            onClick={() => onAgent(a.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "4px 8px",
              fontSize: 12,
              color: "var(--text3)",
              background: active ? "var(--ink5)" : "transparent",
              border: "none",
              width: "100%",
              cursor: "pointer",
              borderRadius: 4,
              textAlign: "left",
            }}
          >
            <span
              className="mono"
              style={{
                width: 18,
                height: 18,
                borderRadius: 3,
                fontSize: 9,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: a.avBg,
                color: a.avFg,
              }}
            >
              {a.av}
            </span>
            <span style={{ flex: 1 }}>{a.name}</span>
            <Dot status={a.status} pulse={a.status === "run"} />
          </button>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mono"
      style={{
        fontSize: 9.5,
        letterSpacing: "0.14em",
        color: "#555",
        padding: "14px 8px 6px",
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(marketing\)/_components/hero-preview/Sidebar.tsx
git commit -m "feat(landing): hero preview sidebar"
```

---

## Task 9: Hero preview — Canvas (nodes, edges, status bar, drag, toast)

**Files:**
- Create: `app/(marketing)/_components/hero-preview/Canvas.tsx`

Source: `landing.html:186-216` (CSS) + `landing.html:917-930` (markup) + `landing.html:1644-1738` (JS).

Implementation note: in React, instead of mutating DOM nodes for drag, we keep `positions` state inside `Canvas` (a `Record<AgentNodeId, {x, y}>`), reset whenever `workspace` changes, and update on `mousemove`. Edges re-render off the same state.

- [ ] **Step 1: Implement**

```tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AgentId, AgentNode, Status, Workspace } from "./types";
import { Dot } from "../ui/Dot";

const STATUS_COLOR: Record<Status, string> = {
  run: "var(--accent)",
  think: "#8ab8ff",
  wait: "var(--warn)",
  fail: "var(--err)",
  idle: "#6b7280",
};
const STATUS_LABEL: Record<Status, string> = {
  run: "running",
  think: "thinking",
  wait: "waiting",
  fail: "failed",
  idle: "idle",
};

export function Canvas({
  workspace,
  workspaceKey,
  activeAgent,
  onSelect,
  onToast,
}: {
  workspace: Workspace;
  workspaceKey: string; // forces position reset on workspace switch
  activeAgent: AgentId;
  onSelect: (id: AgentId) => void;
  onToast: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() =>
    Object.fromEntries(workspace.nodes.map((n) => [n.id, { x: n.x, y: n.y }]))
  );
  const [bars, setBars] = useState<Record<string, number>>(() =>
    Object.fromEntries(workspace.nodes.filter((n) => n.bar != null).map((n) => [n.id, n.bar!]))
  );
  const [tokens, setTokens] = useState(2.4);
  const [cost, setCost] = useState(14.82);

  // Reset positions and bars when workspace changes
  useEffect(() => {
    setPositions(Object.fromEntries(workspace.nodes.map((n) => [n.id, { x: n.x, y: n.y }])));
    setBars(Object.fromEntries(workspace.nodes.filter((n) => n.bar != null).map((n) => [n.id, n.bar!])));
  }, [workspaceKey, workspace.nodes]);

  // Tick tokens / cost (landing.html:1902-1909)
  useEffect(() => {
    const id = setInterval(() => {
      setTokens((t) => t + Math.random() * 0.012);
      setCost((c) => c + Math.random() * 0.04);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Tick progress bars (landing.html:1912-1920)
  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        const next: typeof prev = {};
        for (const [k, v] of Object.entries(prev)) {
          let cur = v + (Math.random() * 1.6 - 0.4);
          if (cur > 95) cur = 95;
          if (cur < 18) cur = 18;
          next[k] = cur;
        }
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);

  const counts = useMemo(() => {
    const c = { run: 0, think: 0, wait: 0, fail: 0 };
    workspace.nodes.forEach((n) => {
      if (n.status in c) (c as Record<string, number>)[n.status]++;
    });
    return c;
  }, [workspace.nodes]);

  const beginDrag = (e: React.MouseEvent, node: AgentNode) => {
    e.preventDefault();
    const containerRect = containerRef.current!.getBoundingClientRect();
    const startX = e.clientX, startY = e.clientY;
    const startPos = positions[node.id] ?? { x: node.x, y: node.y };
    let moved = false;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX, dy = ev.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      const newX = Math.max(8, Math.min(containerRect.width - 188, startPos.x + dx));
      const newY = Math.max(8, Math.min(containerRect.height - 110, startPos.y + dy));
      setPositions((p) => ({ ...p, [node.id]: { x: newX, y: newY } }));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (moved) onToast("Moved " + node.name);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: "radial-gradient(circle, #1c1c1c 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.5) 90%)",
          pointerEvents: "none",
        }}
      />

      {/* Edges */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        preserveAspectRatio="none"
      >
        {workspace.edges.map(([a, b, kind], i) => {
          const A = positions[a]; const B = positions[b];
          if (!A || !B) return null;
          const ax = A.x + 90, ay = A.y + 36, bx = B.x + 90, by = B.y + 36;
          const isLive = kind === "live";
          return (
            <line
              key={`${a}-${b}-${i}`}
              x1={ax} y1={ay} x2={bx} y2={by}
              stroke={isLive ? "#4ade80" : "#2e2e2e"}
              strokeWidth={1}
              strokeDasharray={isLive ? "4 4" : undefined}
              className={isLive ? "dashflow" : undefined}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {workspace.nodes.map((n) => {
        const p = positions[n.id] ?? { x: n.x, y: n.y };
        const sel = n.id === activeAgent;
        const bar = bars[n.id];
        return (
          <div
            key={n.id}
            data-agent={n.id}
            onClick={() => onSelect(n.id as AgentId)}
            style={{
              position: "absolute",
              width: 176,
              left: p.x,
              top: p.y,
              background: "var(--ink2)",
              border: `1px solid ${sel ? "var(--accent)" : "var(--line2)"}`,
              borderRadius: 6,
              boxShadow: "0 4px 14px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.02) inset",
              userSelect: "none",
              cursor: "pointer",
              transition: "border-color .15s, box-shadow .2s",
            }}
          >
            <div
              onMouseDown={(e) => beginDrag(e, n)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 9px",
                borderBottom: "1px solid var(--line1)",
                cursor: "grab",
              }}
            >
              <span
                className="mono"
                style={{
                  width: 18, height: 18, borderRadius: 3,
                  fontSize: 9, fontWeight: 600,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: n.avBg, color: n.avFg,
                }}
              >
                {n.av}
              </span>
              <span style={{ fontSize: 12.5, flex: 1, color: "var(--text)" }}>{n.name}</span>
              <Dot status={n.status} pulse={n.status === "run"} />
            </div>
            <div style={{ padding: "8px 9px" }}>
              <div style={{ fontSize: 11.5, color: "var(--text2)", lineHeight: 1.35, marginBottom: 6 }}>
                {n.task}
              </div>
              <div
                className="mono"
                style={{ fontSize: 9.5, color: "var(--textMute)", display: "flex", gap: 6 }}
              >
                <span>{n.role}</span>
                <span>·</span>
                <span style={{ color: STATUS_COLOR[n.status] }}>{STATUS_LABEL[n.status]}</span>
                {n.meta && (
                  <>
                    <span>·</span>
                    <span>{n.meta}</span>
                  </>
                )}
              </div>
              {bar != null && (
                <div
                  style={{
                    marginTop: 7,
                    height: 2,
                    background: "var(--ink5)",
                    borderRadius: 99,
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      height: "100%",
                      width: `${bar}%`,
                      background: "var(--accent)",
                      transition: "width .35s ease",
                    }}
                  />
                </div>
              )}
            </div>
            {sel && (
              <>
                {[
                  { left: -3, top: -3 },
                  { right: -3, top: -3 },
                  { left: -3, bottom: -3 },
                  { right: -3, bottom: -3 },
                ].map((pos, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{
                      position: "absolute",
                      width: 5, height: 5,
                      background: "var(--accent)",
                      animation: "om-blink 1.8s ease-in-out infinite",
                      ...pos,
                    }}
                  />
                ))}
              </>
            )}
          </div>
        );
      })}

      {/* Status bar */}
      <div
        className="mono"
        style={{
          position: "absolute",
          left: 14, bottom: 14,
          background: "#111",
          border: "1px solid var(--line2)",
          borderRadius: 6,
          padding: "6px 10px",
          fontSize: 10.5,
          color: "var(--textDim)",
          display: "flex",
          gap: 12,
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Dot status="run" pulse /> {counts.run} running
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Dot status="think" /> {counts.think} thinking
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <Dot status="wait" /> {counts.wait}
          {counts.fail > 0 && ` · ${counts.fail} failed`} waiting
        </span>
        <span style={{ color: "var(--textGhost)" }}>│</span>
        <span>tokens <span style={{ color: "var(--text)" }}>{tokens.toFixed(2)}M</span> / day</span>
        <span style={{ color: "var(--textGhost)" }}>│</span>
        <span>$<span style={{ color: "var(--text)" }}>{cost.toFixed(2)}</span></span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(marketing\)/_components/hero-preview/Canvas.tsx
git commit -m "feat(landing): hero preview canvas with drag and live ticks"
```

---

## Task 10: Hero preview — Panel + composing the preview

**Files:**
- Create: `app/(marketing)/_components/hero-preview/Panel.tsx`
- Modify: `app/(marketing)/_components/sections/HeroPreview.tsx` (replace stub)

Source: `landing.html:218-237` (panel CSS) + `landing.html:933-976` (panel markup) + `landing.html:1741-1898` (state JS).

- [ ] **Step 1: `Panel.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import type { AgentId, AgentNode, ChatMessage, PanelTab } from "./types";
import { AGENT_CHATS, FILES_BY_AGENT, NOTES_BY_AGENT, TERMINAL_LINES } from "./data";
import { Dot } from "../ui/Dot";
import { ShellIcon, CheckIcon } from "../icons/Icons";

const TABS: { id: PanelTab; label: string }[] = [
  { id: "chat", label: "Chat" },
  { id: "terminal", label: "Terminal" },
  { id: "files", label: "Files" },
  { id: "notes", label: "Notes" },
];

export function Panel({ node }: { node: AgentNode }) {
  const [tab, setTab] = useState<PanelTab>("chat");
  const [chats, setChats] = useState<Record<AgentId, ChatMessage[]>>(AGENT_CHATS);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom on update
  useEffect(() => {
    if (tab === "chat" && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [tab, chats, node.id]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const t = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const id = node.id as AgentId;
    setChats((prev) => ({
      ...prev,
      [id]: [
        ...(prev[id] ?? []),
        { who: "YOU", t, body: text.replace(/</g, "&lt;") },
      ],
    }));
    setDraft("");
    setTab("chat");
    setTimeout(() => {
      const replies = [
        "Got it — looking now.",
        "On it. I'll report back in a minute.",
        "Thinking… let me check the relevant files.",
        "Okay. Pulling context and starting.",
      ];
      setChats((prev) => ({
        ...prev,
        [id]: [
          ...(prev[id] ?? []),
          { who: node.name.toUpperCase(), t, body: replies[Math.floor(Math.random() * replies.length)] },
        ],
      }));
    }, 700);
  };

  return (
    <div
      style={{
        background: "var(--ink0)",
        borderLeft: "1px solid var(--line0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--line0)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span
          className="mono"
          style={{
            width: 20, height: 20, borderRadius: 3,
            fontSize: 10, fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: node.avBg, color: node.avFg,
          }}
        >
          {node.av}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500 }}>{node.name}</span>
        <Dot status={node.status} pulse={node.status === "run"} />
        <span
          className="mono"
          style={{ fontSize: 10, color: "var(--textMute)", marginLeft: "auto" }}
        >
          {node.role}
        </span>
      </div>

      <div style={{ display: "flex", gap: 16, padding: "0 14px", borderBottom: "1px solid var(--line0)" }}>
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "9px 0",
                fontSize: 11.5,
                color: active ? "var(--text)" : "var(--textDim)",
                borderBottom: `1.5px solid ${active ? "var(--accent)" : "transparent"}`,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        ref={bodyRef}
        style={{
          flex: 1,
          overflow: "auto",
          ...(tab === "chat"
            ? { padding: 14, display: "flex", flexDirection: "column", gap: 14 }
            : tab === "terminal"
              ? { padding: "12px 14px", background: "var(--bg)", lineHeight: 1.55 }
              : tab === "files"
                ? { padding: "12px 14px" }
                : { padding: "14px 16px", fontSize: 12.5, color: "var(--text2)", lineHeight: 1.55 }),
        }}
      >
        {tab === "chat" && (chats[node.id as AgentId] ?? []).map((m, i) => (
          <ChatBubble key={i} msg={m} />
        ))}
        {tab === "terminal" && <TerminalLines id={node.id as AgentId} />}
        {tab === "files" && <FilesList id={node.id as AgentId} />}
        {tab === "notes" && (
          <div dangerouslySetInnerHTML={{ __html: NOTES_BY_AGENT[node.id as AgentId] || '<div style="color:var(--textMute)">No notes yet.</div>' }} />
        )}
      </div>

      <div style={{ borderTop: "1px solid var(--line0)", padding: "10px 12px" }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder={`Reply to ${node.name}…`}
          style={{
            width: "100%",
            background: "var(--ink3)",
            border: "1px solid var(--line2)",
            borderRadius: 5,
            padding: "8px 10px",
            color: "var(--text)",
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontSize: 12,
            outline: "none",
          }}
        />
        <div
          className="mono"
          style={{ fontSize: 10, color: "var(--textGhost)", marginTop: 6, textAlign: "right" }}
        >
          enter to send · ⌘↵
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div>
      <div
        className="mono"
        style={{ fontSize: 9.5, color: "var(--textFaint)", letterSpacing: "0.1em", marginBottom: 4 }}
      >
        {msg.who} · {msg.t}
      </div>
      <div
        style={{ fontSize: 12.5, color: "var(--text2)", lineHeight: 1.5 }}
        dangerouslySetInnerHTML={{ __html: msg.body }}
      />
      {(msg.tools ?? []).map((t, i) => (
        <div
          key={i}
          className="mono"
          style={{
            marginTop: 6,
            background: "var(--ink2)",
            border: "1px solid var(--line1)",
            borderRadius: 5,
            padding: "6px 9px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 11,
            color: "var(--text3)",
          }}
        >
          <ShellIcon />
          <span style={{ color: "var(--text2)" }}>{t.name}</span>
          <span
            style={{
              color: "var(--textMute)",
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {t.sub}
          </span>
          <CheckIcon />
        </div>
      ))}
    </div>
  );
}

function TerminalLines({ id }: { id: AgentId }) {
  const lines = TERMINAL_LINES[id] ?? [];
  return (
    <div className="mono" style={{ fontSize: 11.5, color: "var(--text2)" }}>
      {lines.map((l, i) => {
        let color: string = "var(--textMute)";
        if (l.startsWith("$") || l.startsWith("✓")) color = "var(--accent)";
        else if (l.startsWith("⚠") || l.includes("flake") || l.includes("mismatch")) color = "var(--warn)";
        return (
          <div key={i} style={{ color }}>
            {l.replace(/</g, "<")}
          </div>
        );
      })}
    </div>
  );
}

function FilesList({ id }: { id: AgentId }) {
  const files = FILES_BY_AGENT[id] ?? [];
  return (
    <div className="mono" style={{ fontSize: 11.5, color: "var(--text2)" }}>
      {files.map(([name, kind], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 0",
            color: kind === "dir" ? "var(--text)" : "var(--text2)",
            cursor: "pointer",
          }}
        >
          <span style={{ color: "var(--textGhost)" }}>{kind === "dir" ? "▾" : "·"}</span>
          {name}
          {kind === "changed" && (
            <span style={{ marginLeft: "auto", color: "var(--warn)", fontSize: 10 }}>M</span>
          )}
          {kind === "added" && (
            <span style={{ marginLeft: "auto", color: "var(--accent)", fontSize: 11 }}>+</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Replace `HeroPreview.tsx` stub with the real composition**

```tsx
"use client";
import { useEffect, useState } from "react";
import type { AgentId, WorkspaceId } from "../hero-preview/types";
import { WORKSPACES } from "../hero-preview/data";
import { WindowChrome } from "../hero-preview/WindowChrome";
import { Sidebar } from "../hero-preview/Sidebar";
import { Canvas } from "../hero-preview/Canvas";
import { Panel } from "../hero-preview/Panel";

export function HeroPreview() {
  const [workspaceId, setWorkspaceId] = useState<WorkspaceId>("platform-core");
  const [activeAgent, setActiveAgent] = useState<AgentId>("keeper");
  const [activeNav, setActiveNav] = useState("canvas");
  const [toast, setToast] = useState<string | null>(null);

  const workspace = WORKSPACES[workspaceId];
  const node = workspace.nodes.find((n) => n.id === activeAgent) ?? workspace.nodes[0];

  // When switching workspace, ensure activeAgent exists in it
  useEffect(() => {
    if (!workspace.nodes.some((n) => n.id === activeAgent)) {
      setActiveAgent(workspace.nodes[0].id as AgentId);
    }
  }, [workspaceId, activeAgent, workspace.nodes]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(id);
  }, [toast]);

  const onSidebarAgent = (id: AgentId) => {
    // If agent isn't in current workspace, switch to a workspace that has them
    const inHere = workspace.nodes.some((n) => n.id === id);
    if (!inHere) {
      const hit = (Object.entries(WORKSPACES) as [WorkspaceId, typeof workspace][]).find(
        ([, w]) => w.nodes.some((n) => n.id === id)
      );
      if (hit) setWorkspaceId(hit[0]);
    }
    setActiveAgent(id);
    setToast(`Selected ${id[0].toUpperCase() + id.slice(1)}`);
  };

  return (
    <div style={{ position: "relative", margin: "64px auto 0", maxWidth: 1180, padding: "0 32px" }}>
      <div
        style={{
          background: "var(--ink0)",
          border: "1px solid var(--line2)",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02) inset",
          animation: "om-rise 0.9s cubic-bezier(.2,.8,.2,1) 0.2s both",
        }}
      >
        <WindowChrome
          active={workspaceId}
          onSelect={(id) => {
            setWorkspaceId(id);
            setToast(`Switched to ${id}`);
          }}
        />
        <div
          style={{
            height: 520,
            display: "grid",
            gridTemplateColumns: "224px 1fr 320px",
            background: "var(--bg)",
            position: "relative",
          }}
        >
          <Sidebar
            activeNav={activeNav}
            onNav={(id) => {
              setActiveNav(id);
              const labels: Record<string, string> = {
                canvas: "Canvas view",
                dms: "DMs",
                squads: "Squads",
                tasks: "Tasks board",
                runs: "Runs",
              };
              setToast(labels[id] ?? id);
            }}
            activeAgent={activeAgent}
            onAgent={onSidebarAgent}
          />
          <Canvas
            workspace={workspace}
            workspaceKey={workspaceId}
            activeAgent={activeAgent}
            onSelect={(id) => {
              setActiveAgent(id);
              setToast(`Selected ${workspace.nodes.find((n) => n.id === id)?.name ?? id}`);
            }}
            onToast={setToast}
          />
          <Panel node={node} />
          {toast && (
            <div
              style={{
                position: "absolute",
                right: 14 + 320 + 14, // outside the right panel
                top: 14,
                zIndex: 6,
                background: "var(--ink2)",
                border: "1px solid var(--line3)",
                borderRadius: 5,
                padding: "7px 11px",
                fontSize: 11.5,
                color: "var(--text2)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                opacity: 1,
                transform: "translateY(0)",
                transition: "opacity .25s, transform .25s",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)" }} />
              <span>{toast}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Browser test the full hero preview**

Run dev server. Verify:
- Window has rounded corners, deep shadow, dark titlebar with three traffic lights and three map tabs.
- Sidebar shows Canvas/DMs/Squads/Tasks/Runs with counts; agent rows show colored avatars and pulsing dots for running agents.
- Canvas dotted bg shows 5 nodes (Keeper, Forge, Ranger, Compass, Scribe) with edges (dashed green = live, gray = idle).
- Selected node (Keeper) has 4 corner ticks + green border.
- Right panel shows Keeper's chat messages, switch tabs to Terminal/Files/Notes.
- Drag a node by its header — edges follow.
- Click "billing" tab — new nodes appear; Mason has red dot; status bar updates.
- Type into composer + Enter — your line appears, then a reply ~700ms later.
- Status bar token/cost numbers tick.

- [ ] **Step 4: Commit**

```bash
git add app/\(marketing\)/_components/hero-preview/Panel.tsx app/\(marketing\)/_components/sections/HeroPreview.tsx
git commit -m "feat(landing): interactive hero preview"
```

---

## Task 11: Values section

**Files:**
- Create: `app/(marketing)/_components/sections/Values.tsx`

Source: `landing.html:239-269` (CSS) + `landing.html:982-1102` (markup, including 6 cells with inline SVG glyphs).

- [ ] **Step 1: Implement**

The 6 cells share a layout shell. The first one (`feature`) spans 4 cols and is taller; the rest span 2 cols. Glyphs are inline SVGs — copy each verbatim from the source lines noted below.

```tsx
import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";

export function Values() {
  return (
    <section
      id="values"
      style={{ padding: "96px 0", borderBottom: "1px solid var(--line0)" }}
    >
      <SectionContainer>
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 56 }}>
          <Eyebrow>What is orbit</Eyebrow>
          <h2
            style={{
              fontSize: 44, lineHeight: 1.1, letterSpacing: "-1.2px",
              fontWeight: 600, margin: "12px 0 16px", textWrap: "balance",
            }}
          >
            Not another chat box. A control surface for a team that ships while you sleep.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--textDim)", margin: 0, maxWidth: 560 }}>
            Most agent tools give you one chat thread. Orbit gives you a workspace — a canvas of
            agents working in parallel, each on their own task, each watchable, each promotable to
            a real PR.
          </p>
        </div>

        <div
          className="reveal-stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 1,
            background: "var(--line0)",
            border: "1px solid var(--line0)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <Cell feature corner="01 / canvas" badge="flagship" title="See the whole team at once.">
            <p>A spatial canvas of every agent and what they're touching. Live status dots, edges between collaborators, dotted regions for squads. Glance, don't scroll.</p>
            <CanvasGlyph />
          </Cell>

          <Cell corner="02" badge="dm" title="Talk to any one of them.">
            <p>Click an agent, drop into a DM. Threaded tool calls show every grep, diff and shell.</p>
            <DmGlyph />
          </Cell>

          <Cell corner="03" badge="squad" title="Form squads for big jobs.">
            <p>Pull two or four agents into a group chat with one shared task. They split the work.</p>
            <SquadGlyph />
          </Cell>

          <Cell corner="04" badge="review" title="Review every diff.">
            <p>Side-by-side diffs, reviewer notes, an explicit approve / request-changes button.</p>
            <DiffGlyph />
          </Cell>

          <Cell corner="05" badge="sandbox" title="Local-first. Sandboxed.">
            <p>Agents run in a per-task sandbox on your machine. They touch your repo through a watched filesystem, not the network.</p>
            <SandboxGlyph />
          </Cell>

          <Cell corner="06" badge="map" title="One workspace per project.">
            <p>Switch between repos with a tab. Each map remembers its agents, squads, and open tasks.</p>
            <MapGlyph />
          </Cell>
        </div>
      </SectionContainer>
    </section>
  );
}

function Cell({
  feature = false,
  corner,
  badge,
  title,
  children,
}: {
  feature?: boolean;
  corner: string;
  badge: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "var(--ink0)",
        padding: feature ? "32px 32px 28px" : "28px 26px",
        minHeight: feature ? 320 : 240,
        gridColumn: feature ? "span 4" : "span 2",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="mono"
        style={{
          position: "absolute",
          top: 14, right: 14,
          fontSize: 9.5, color: "var(--textFaint)",
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}
      >
        {corner}
      </div>
      <div
        className="mono"
        style={{ fontSize: 10.5, color: "var(--textFaint)", letterSpacing: "0.1em", marginBottom: 16 }}
      >
        {badge}
      </div>
      <h3
        style={{
          fontSize: feature ? 26 : 18,
          lineHeight: 1.3,
          fontWeight: 500,
          letterSpacing: "-0.3px",
          margin: "0 0 10px",
          color: "var(--text)",
        }}
      >
        {title}
      </h3>
      <div
        style={{
          color: "var(--textDim)",
          fontSize: feature ? 15 : 13.5,
          lineHeight: 1.55,
          textWrap: "pretty",
          flexGrow: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Each glyph is the inline SVG from landing.html, copied 1:1 with React-attr renaming.
function CanvasGlyph() {
  return (
    <div
      className="glyph"
      style={{
        marginTop: "auto",
        height: 140,
        display: "flex",
        alignItems: "center",
        color: "var(--textMute)",
        fontFamily: "var(--font-jetbrains-mono), monospace",
        fontSize: 11,
        width: "100%",
      }}
    >
      {/* Source: landing.html:998-1023 */}
      <svg width="100%" height={140} viewBox="0 0 480 140" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="vg-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={240} cy={70} r={60} fill="url(#vg-glow)" />
        <line x1={80} y1={50} x2={200} y2={70} stroke="#4ade80" strokeDasharray="3 3" strokeWidth={1} className="dashflow" />
        <line x1={200} y1={70} x2={320} y2={40} stroke="#2e2e2e" strokeWidth={1} />
        <line x1={200} y1={70} x2={320} y2={100} stroke="#4ade80" strokeDasharray="3 3" strokeWidth={1} className="dashflow" />
        <line x1={80} y1={100} x2={200} y2={70} stroke="#2e2e2e" strokeWidth={1} />
        <line x1={320} y1={40} x2={420} y2={60} stroke="#4ade80" strokeDasharray="3 3" strokeWidth={1} className="dashflow" />
        <line x1={320} y1={100} x2={420} y2={90} stroke="#2e2e2e" strokeWidth={1} />
        <g><rect x={60} y={40} width={40} height={20} rx={3} fill="#1f2a22" stroke="#4ade80" /><text x={80} y={54} fill="#9ccfb0" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">K</text></g>
        <g><rect x={60} y={90} width={40} height={20} rx={3} fill="#1f2128" stroke="#a0a9c8" strokeOpacity="0.5" /><text x={80} y={104} fill="#a0a9c8" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">S</text></g>
        <g><rect x={180} y={60} width={40} height={20} rx={3} fill="#2a241c" stroke="#d4b088" /><text x={200} y={74} fill="#d4b088" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">F</text></g>
        <g><rect x={300} y={30} width={40} height={20} rx={3} fill="#1f281f" stroke="#a3c398" /><text x={320} y={44} fill="#a3c398" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">R</text></g>
        <g><rect x={300} y={90} width={40} height={20} rx={3} fill="#1e262a" stroke="#96b9c7" /><text x={320} y={104} fill="#96b9c7" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">C</text></g>
        <g><rect x={400} y={50} width={40} height={20} rx={3} fill="#1e262e" stroke="#96b4c7" strokeOpacity="0.6" /><text x={420} y={64} fill="#96b4c7" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">A</text></g>
        <g><rect x={400} y={80} width={40} height={20} rx={3} fill="#2a2420" stroke="#c9a690" strokeOpacity="0.6" /><text x={420} y={94} fill="#c9a690" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">M</text></g>
        <circle cx={80} cy={50} r={2} fill="#4ade80" className="vg-pulse" />
        <circle cx={200} cy={70} r={2} fill="#4ade80" className="vg-pulse" style={{ animationDelay: "0.4s" }} />
        <circle cx={320} cy={100} r={2} fill="#4ade80" className="vg-pulse" style={{ animationDelay: "0.8s" }} />
      </svg>
    </div>
  );
}

function DmGlyph() {
  // Source: landing.html:1031-1035
  return (
    <div className="glyph" style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, height: 80 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 10.5 }}>
        <span style={{ color: "var(--textMute)" }}>YOU</span>
        <span style={{ color: "var(--textGhost)" }}>11:42</span>
      </div>
      <div style={{ background: "var(--ink2)", border: "1px solid var(--line2)", padding: "5px 8px", borderRadius: 4, fontSize: 11, color: "var(--text2)" }}>
        Take a pass on the auth PR
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 10.5 }}>
        <span style={{ color: "#9ccfb0" }}>KEEPER</span>
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
      </div>
    </div>
  );
}

function SquadGlyph() {
  // Source: landing.html:1043-1051
  return (
    <div className="glyph" style={{ marginTop: "auto", height: 80 }}>
      <svg width="100%" height={80} viewBox="0 0 240 80" fill="none">
        <rect x={20} y={20} width={200} height={44} rx={6} stroke="#4ade80" strokeDasharray="4 3" fill="none" opacity="0.5" className="dashflow" />
        <g className="float-1"><rect x={34} y={30} width={32} height={24} rx={3} fill="#1f2a22" stroke="#4ade80" strokeOpacity="0.6" /><text x={50} y={46} fill="#9ccfb0" fontFamily="JetBrains Mono" fontSize={11} fontWeight={600} textAnchor="middle">K</text></g>
        <g className="float-2"><rect x={80} y={30} width={32} height={24} rx={3} fill="#2a241c" stroke="#d4b088" strokeOpacity="0.6" /><text x={96} y={46} fill="#d4b088" fontFamily="JetBrains Mono" fontSize={11} fontWeight={600} textAnchor="middle">F</text></g>
        <g className="float-3"><rect x={126} y={30} width={32} height={24} rx={3} fill="#1e262a" stroke="#96b9c7" strokeOpacity="0.6" /><text x={142} y={46} fill="#96b9c7" fontFamily="JetBrains Mono" fontSize={11} fontWeight={600} textAnchor="middle">C</text></g>
        <g className="float-4"><rect x={172} y={30} width={32} height={24} rx={3} fill="#1f281f" stroke="#a3c398" strokeOpacity="0.6" /><text x={188} y={46} fill="#a3c398" fontFamily="JetBrains Mono" fontSize={11} fontWeight={600} textAnchor="middle">R</text></g>
      </svg>
    </div>
  );
}

function DiffGlyph() {
  // Source: landing.html:1059-1064
  return (
    <div className="glyph" style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 3, height: 80 }}>
      <div style={{ display: "flex", gap: 6, fontSize: 11 }}>
        <span style={{ color: "#4ade80" }}>+ 84</span>
        <span style={{ color: "#ef4444" }}>− 37</span>
        <span style={{ color: "var(--textMute)", marginLeft: "auto" }}>2 files</span>
      </div>
      <div className="mono" style={{ background: "#0e1a12", borderLeft: "2px solid #4ade80", padding: "3px 6px", fontSize: 10, color: "#9ccfb0" }}>
        + samesite: 'lax',
      </div>
      <div className="mono" style={{ background: "#1a0e0e", borderLeft: "2px solid #ef4444", padding: "3px 6px", fontSize: 10, color: "#fca5a5" }}>
        - console.log(sessionId)
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
        <span className="mono" style={{ background: "var(--ink5)", border: "1px solid var(--accentBd)", color: "var(--accent)", padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>approve ⏎</span>
        <span className="mono" style={{ background: "var(--ink2)", border: "1px solid var(--line3)", color: "var(--textMute)", padding: "2px 8px", borderRadius: 3, fontSize: 10 }}>request</span>
      </div>
    </div>
  );
}

function SandboxGlyph() {
  // Source: landing.html:1073-1083
  return (
    <div className="glyph" style={{ marginTop: "auto", height: 80 }}>
      <svg width="100%" height={80} viewBox="0 0 240 80" fill="none" stroke="#a0a0a0" strokeWidth={1.2}>
        <rect x={20} y={20} width={76} height={40} rx={3} stroke="#4ade80" strokeOpacity="0.6" fill="#0e1410" />
        <text x={58} y={38} fill="#9ccfb0" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">your machine</text>
        <rect x={32} y={42} width={22} height={12} rx={2} fill="#1f2a22" stroke="#4ade80" strokeOpacity="0.7" />
        <rect x={60} y={42} width={22} height={12} rx={2} fill="#2a241c" stroke="#d4b088" strokeOpacity="0.7" />
        <path d="M96 40h48" stroke="#4ade80" strokeDasharray="3 2" className="dashflow" />
        <rect x={148} y={20} width={76} height={40} rx={3} stroke="#2e2e2e" fill="#0e0e0e" />
        <text x={186} y={38} fill="#a0a0a0" fontFamily="JetBrains Mono" fontSize={9} textAnchor="middle">network</text>
        <circle cx={186} cy={50} r={3} fill="#ef4444" opacity="0.6" />
        <text x={186} y={74} fill="#666" fontFamily="JetBrains Mono" fontSize={8} textAnchor="middle">explicit allowlist</text>
      </svg>
    </div>
  );
}

function MapGlyph() {
  // Source: landing.html:1093-1098
  return (
    <div className="glyph" style={{ marginTop: "auto", height: 80, display: "flex", alignItems: "center" }}>
      <span className="mono" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        <span style={{ background: "var(--ink5)", border: "1px solid var(--line3)", padding: "3px 8px", borderRadius: 3, color: "var(--text)" }}>platform-core</span>
        <span style={{ padding: "3px 8px", color: "var(--textMute)", border: "1px solid transparent" }}>billing</span>
        <span style={{ padding: "3px 8px", color: "var(--textMute)", border: "1px solid transparent" }}>marketing-site</span>
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx` (after Hero) and visual check**

- [ ] **Step 3: Commit**

```bash
git add app/\(marketing\)/_components/sections/Values.tsx app/page.tsx
git commit -m "feat(landing): values section"
```

---

## Task 12: Metrics strip

**Files:**
- Create: `app/(marketing)/_components/sections/Metrics.tsx`

Source: `landing.html:464-475` (CSS) + `landing.html:1104-1130` (markup).

- [ ] **Step 1: Implement**

```tsx
import { CountUp } from "../utils/CountUp";
import { SectionContainer } from "../ui/SectionContainer";

const METRICS: { target: number; unit?: string; emphasis: string; rest: string }[] = [
  { target: 14, unit: "×", emphasis: "faster cycle", rest: " than one-thread chat" },
  { target: 2847, emphasis: "PRs shipped", rest: " in private beta" },
  { target: 98, unit: "%", emphasis: "local-first", rest: " — no code leaves your box" },
  { target: 8, unit: "+", emphasis: "starter agents", rest: ", fully editable" },
];

export function Metrics() {
  return (
    <section
      style={{
        padding: "64px 0",
        borderTop: "1px solid var(--line1)",
        borderBottom: "1px solid var(--line1)",
        background: "var(--ink0)",
      }}
    >
      <SectionContainer>
        <div className="reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                padding: i === 0 ? "8px 28px 8px 0" : "8px 28px",
                borderLeft: i === 0 ? "none" : "1px solid var(--line2)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                position: "relative",
              }}
            >
              <div
                className="mono counter"
                style={{ fontSize: 38, fontWeight: 500, color: "var(--text)", letterSpacing: "-1px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
              >
                <CountUp target={m.target} />
                {m.unit && <span style={{ color: "var(--accent)", fontSize: 22, marginLeft: 2 }}>{m.unit}</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--textDim)", lineHeight: 1.4 }}>
                <span style={{ color: "var(--text2)" }}>{m.emphasis}</span>
                {m.rest}
              </div>
              <div style={{ display: "flex", alignItems: "end", gap: 2, height: 22, marginTop: 2 }}>
                {Array.from({ length: 8 }).map((_, j) => (
                  <i
                    key={j}
                    style={{
                      width: 4,
                      height: "30%",
                      background: "var(--accent)",
                      borderRadius: 1,
                      opacity: 0.7,
                      animation: `om-spark 1.6s ease-in-out infinite`,
                      animationDelay: `${(i * 0.05) + j * 0.1}s`,
                      display: "block",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx` and verify count-up animation triggers when scrolling into view**

- [ ] **Step 3: Commit**

```bash
git add app/\(marketing\)/_components/sections/Metrics.tsx app/page.tsx
git commit -m "feat(landing): metrics strip with count-up"
```

---

## Task 13: How it works section

**Files:**
- Create: `app/(marketing)/_components/sections/HowItWorks.tsx`

Source: `landing.html:271-326` (CSS) + `landing.html:1132-1189` (markup) + `landing.html:1927-1942` (sidebar progress sync).

The right column has a sticky side-card; the left column has 3 steps. As each step scrolls into the middle of the viewport, the side-card highlights its progress row. The terminal-style step viz lines stagger in.

- [ ] **Step 1: Implement (server component shell + client `<HowSidebar />`)**

```tsx
import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { HowSidebar } from "../utils/HowSidebar";

export function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding: "96px 0",
        background: "rgba(15,15,15,0.7)",
        backdropFilter: "blur(2px)",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <div
        aria-hidden
        style={{
          content: '""',
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, var(--line2) 12%, var(--line2) 88%, transparent)",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />
      <SectionContainer>
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 80, position: "relative" }}>
          <HowSidebar />

          <div className="reveal-stagger" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <Step
              n="1"
              label="step 01"
              title="Summon agents."
              body="Pick from the roster (Keeper, Forge, Scribe, Mason, Atlas…) or spin up your own. Each is a persona + tools + model + limits — all editable."
            >
              <Line><K>$</K> orbit summon keeper</Line>
              <Line muted>→ persona: <T>reviewer</T></Line>
              <Line muted>→ tools: <T>git, shell, fs(ro)</T></Line>
              <Line accent>✓ keeper joined platform-core</Line>
            </Step>

            <Step
              n="2"
              label="step 02"
              title="Hand them a task."
              body="Describe what you want in plain language, or drag a Linear ticket onto the canvas. Watch the status dots light up as they plan, think, and start touching files."
            >
              <Line><B>forge</B> · thinking</Line>
              <Line><T>{`> plan: extract limiter, add tests`}</T></Line>
              <Line muted>{`  ↳ touching `}<T>src/middleware/*</T></Line>
              <Line><W>scribe</W> · waiting on review</Line>
            </Step>

            <Step
              n="3"
              label="step 03"
              title="Review and ship."
              body={`When an agent's done, it opens a run in the inbox. Read the diff, read the reviewer's notes, hit approve. Orbit pushes the branch and opens the PR.`}
            >
              <Line><T>run #142 · forge · rate-limiter</T></Line>
              <Line><span style={{ color: "#4ade80" }}>+ 312</span>{"  "}<span style={{ color: "#ef4444" }}>− 41</span>{"  "}6 files{"  "}· 14 tests pass</Line>
              <Line muted>  reviewer: keeper — looks good, one nit on naming</Line>
              <Line accent>[ approve & open PR ]   [ request changes ]</Line>
            </Step>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function Step({ n, label, title, body, children }: { n: string; label: string; title: string; body: string; children: ReactNode }) {
  return (
    <div
      data-step={n}
      className="step"
      style={{
        padding: "32px 0",
        borderTop: "1px solid var(--line2)",
        display: "grid",
        gridTemplateColumns: "70px 1fr 360px",
        gap: 32,
        alignItems: "start",
        position: "relative",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 32, top: 32,
          width: 6, height: 6,
          borderRadius: 99,
          background: "var(--accent)",
          boxShadow: "0 0 0 4px var(--ink0), 0 0 0 5px var(--accentBd)",
        }}
      />
      <div className="mono nm" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.04em", padding: "24px 0 0 16px" }}>
        {label}
      </div>
      <div>
        <h4 style={{ fontSize: 22, lineHeight: 1.25, fontWeight: 500, letterSpacing: "-0.4px", margin: "0 0 10px" }}>
          {title}
        </h4>
        <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 420 }}>
          {body}
        </p>
      </div>
      <div
        className="step-vis"
        style={{
          alignSelf: "stretch",
          background: "var(--ink2)",
          border: "1px solid var(--line1)",
          borderRadius: 6,
          padding: 14,
          minHeight: 130,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 11.5,
          color: "var(--text3)",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            opacity: 0.5,
          }}
        />
        {children}
      </div>
    </div>
  );
}

function Line({ children, muted, accent }: { children: ReactNode; muted?: boolean; accent?: boolean }) {
  const color = accent ? "var(--accent)" : muted ? "var(--textGhost)" : "var(--textMute)";
  return <div className="ln" style={{ color }}>{children}</div>;
}
function K({ children }: { children: ReactNode }) { return <span style={{ color: "var(--accent)" }}>{children}</span>; }
function B({ children }: { children: ReactNode }) { return <span style={{ color: "var(--think)" }}>{children}</span>; }
function W({ children }: { children: ReactNode }) { return <span style={{ color: "var(--warn)" }}>{children}</span>; }
function T({ children }: { children: ReactNode }) { return <span style={{ color: "var(--text2)" }}>{children}</span>; }
```

- [ ] **Step 2: `HowSidebar.tsx` with progress-row sync**

```tsx
"use client";
import { useEffect, useState } from "react";
import { Eyebrow } from "../ui/Eyebrow";

const ROWS: { n: string; label: string }[] = [
  { n: "01", label: "Summon" },
  { n: "02", label: "Hand off task" },
  { n: "03", label: "Review & ship" },
];

export function HowSidebar() {
  const [active, setActive] = useState("1");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const steps = document.querySelectorAll<HTMLElement>(".step[data-step]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const n = e.target.getAttribute("data-step");
            if (n) setActive(n);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="reveal" style={{ position: "sticky", top: 80, alignSelf: "start" }}>
      <Eyebrow>How it works</Eyebrow>
      <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.8px", fontWeight: 600, margin: "12px 0 16px" }}>
        From an empty canvas to a shipped PR in three steps.
      </h2>
      <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: "0 0 24px" }}>
        You stay the manager. They do the typing. The whole loop fits inside one window — no
        terminals to switch to, no copying agent output between tools.
      </p>
      <div className="mono" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8, fontSize: 11 }}>
        {ROWS.map((r, i) => {
          const isActive = String(i + 1) === active;
          return (
            <div
              key={r.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: isActive ? "var(--text)" : "var(--textMute)",
                padding: "6px 10px",
                border: `1px solid ${isActive ? "var(--accentBd)" : "var(--line2)"}`,
                background: isActive ? "rgba(74,222,128,0.05)" : "transparent",
                borderRadius: 4,
                transition: "all .25s",
              }}
            >
              <span style={{ color: "var(--accent)" }}>{r.n}</span>
              <span>{r.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Wire into `page.tsx` and verify**

When scrolling, the matching progress row in the sticky sidebar gets the green tint. Step viz lines fade in 100/280/460/640ms.

- [ ] **Step 4: Commit**

```bash
git add app/\(marketing\)/_components/sections/HowItWorks.tsx app/\(marketing\)/_components/utils/HowSidebar.tsx app/page.tsx
git commit -m "feat(landing): how-it-works section with sticky progress"
```

---

## Task 14: Compare section

**Files:**
- Create: `app/(marketing)/_components/sections/Compare.tsx`

Source: `landing.html:477-494` (CSS) + `landing.html:1191-1221` (markup). Three-column grid (1fr / 60px / 1fr) with the divider showing vertical "vs" text.

- [ ] **Step 1: Implement**

```tsx
import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";

const THEM = [
  "One thread, one task at a time.",
  "Tool calls hidden behind summaries.",
  "No way to compare two attempts side by side.",
  "Code lives in the cloud — your repo too.",
  "Context vanishes when the tab closes.",
  "Reviews are a vibe check, not a gate.",
];

const US = [
  "A canvas of agents working in parallel.",
  "Every grep, diff and shell call, threaded.",
  "Spawn squads — A/B two builders on the same task.",
  "Local-first sandbox; you choose what leaves.",
  "Workspaces persist — pick up where you left off.",
  "Explicit approve / request-changes on every PR.",
];

export function Compare() {
  return (
    <section style={{ padding: "96px 0", borderBottom: "1px solid var(--line0)" }}>
      <SectionContainer>
        <div className="reveal" style={{ maxWidth: 720, marginBottom: 36 }}>
          <Eyebrow color="var(--accent)">Why orbit</Eyebrow>
          <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.8px", fontWeight: 600, margin: "12px 0 12px" }}>
            One thread vs. a whole workspace.
          </h2>
          <p style={{ fontSize: 14.5, color: "var(--textDim)", lineHeight: 1.6, margin: 0 }}>
            Most agent tools give you a single chat window and call it a day. Orbit treats agents
            the way you treat people on a team — many at once, each with a job, all visible.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 60px 1fr",
            gap: 0,
            alignItems: "stretch",
            border: "1px solid var(--line1)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <Col side="them" title="chat-only tools">
            {THEM.map((line, i) => <Row key={i} side="them">{line}</Row>)}
          </Col>
          <div
            className="mono"
            style={{
              background: "var(--ink2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "var(--textFaint)",
              letterSpacing: "0.2em",
              writingMode: "vertical-rl",
            }}
          >
            vs
          </div>
          <Col side="us" title="orbit">
            {US.map((line, i) => <Row key={i} side="us">{line}</Row>)}
          </Col>
        </div>
      </SectionContainer>
    </section>
  );
}

function Col({ side, title, children }: { side: "them" | "us"; title: string; children: ReactNode }) {
  return (
    <div
      style={{
        padding: "28px 28px 24px",
        background: side === "them" ? "var(--ink1)" : "var(--ink0)",
      }}
    >
      <h3
        className="mono"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: side === "us" ? "var(--accent)" : "var(--textDim)",
          margin: "0 0 18px",
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({ side, children }: { side: "them" | "us"; children: ReactNode }) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderTop: "1px solid var(--line2)",
        display: "flex",
        alignItems: "start",
        gap: 10,
        fontSize: 13.5,
        lineHeight: 1.45,
        color: side === "us" ? "var(--text2)" : "var(--textDim)",
      }}
    >
      <span
        className="mono"
        style={{
          width: 14, height: 14, borderRadius: 99, flexShrink: 0, marginTop: 3,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10,
          background: side === "us" ? "rgba(74,222,128,0.12)" : "rgba(239,68,68,0.1)",
          color: side === "us" ? "var(--accent)" : "var(--err)",
        }}
      >
        {side === "us" ? "✓" : "×"}
      </span>
      <span>{children}</span>
    </div>
  );
}
```

Note: the prototype uses `:first-of-type { border-top: none }` — we accept the small visual cost of a hairline above the first row, or remove the borderTop on `i === 0`. Match prototype: remove borderTop on first row.

- [ ] **Step 2: Tighten — remove borderTop on first row**

In `Row`, accept an `index` prop and zero the `borderTop` when 0; or refactor to map indices in `Col`. Choose whichever the engineer prefers; just match the prototype.

- [ ] **Step 3: Wire and commit**

```bash
git add app/\(marketing\)/_components/sections/Compare.tsx app/page.tsx
git commit -m "feat(landing): compare section"
```

---

## Task 15: Agents section

**Files:**
- Create: `app/(marketing)/_components/sections/Agents.tsx`

Source: `landing.html:329-462` (CSS) + `landing.html:1223-1370` (markup). Featured "Atlas" cell spans 3×2; the other 7 are 2-col cells in a 6-col grid. Each cell has avatar, name, role tag, blurb, model/tools spec block.

- [ ] **Step 1: Define the agent data inline (component-local; not part of the hero preview)**

```tsx
import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { Chip } from "../ui/Chip";
import { Button } from "../ui/Button";

type Spec = { k: string; v: ReactNode };
type Agent = {
  id: string;
  name: string;
  av: string; avBg: string; avFg: string;
  role: string;
  glow: string;
  blurb: string;
  specs: Spec[];
  featured?: boolean;
  now?: ReactNode;
};

const AGENTS: Agent[] = [
  {
    id: "atlas",
    name: "Atlas",
    av: "A", avBg: "#1e262e", avFg: "#96b4c7",
    role: "planner · orchestrator",
    glow: "rgba(150,180,199,0.14)",
    featured: true,
    blurb:
      "The one you talk to first. Atlas takes a goal in plain English, splits it into tasks, picks the right agent for each one, and runs the squad. When something blocks, Atlas decides what to do next — re-route, ask you, or stop.",
    now: <AtlasNow />,
    specs: [
      { k: "model", v: <>claude-sonnet-4.5 <span style={{ color: "var(--textFaint)" }}>· 200k ctx</span></> },
      { k: "tools", v: <span style={{ display: "inline-flex", gap: 4 }}><Chip>plan</Chip><Chip>delegate</Chip><Chip>read(all)</Chip></span> },
      { k: "memory", v: "workspace-scoped, persistent" },
    ],
  },
  {
    id: "keeper", name: "Keeper", av: "K", avBg: "#1f2a22", avFg: "#9ccfb0", role: "reviewer",
    glow: "rgba(74,222,128,0.1)",
    blurb: "Reads diffs, runs static checks, leaves line comments. Conservative — won't approve without tests.",
    specs: [
      { k: "model", v: "opus-4 · 200k" },
      { k: "tools", v: <ChipRow chips={["git", "shell", "fs(ro)"]} /> },
    ],
  },
  {
    id: "forge", name: "Forge", av: "F", avBg: "#2a241c", avFg: "#d4b088", role: "builder",
    glow: "rgba(212,176,136,0.1)",
    blurb: "Implements features end-to-end. Writes the code, the tests, and the migration in one pass.",
    specs: [
      { k: "model", v: "sonnet-4.5 · 200k" },
      { k: "tools", v: <ChipRow chips={["git", "shell", "fs(rw)", "test"]} /> },
    ],
  },
  {
    id: "scribe", name: "Scribe", av: "S", avBg: "#1f2128", avFg: "#a0a9c8", role: "writer",
    glow: "rgba(160,169,200,0.1)",
    blurb: "Docs, changelogs, PR descriptions. Reads the diff and explains what changed in plain English.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["git", "fs(rw)"]} /> },
    ],
  },
  {
    id: "compass", name: "Compass", av: "C", avBg: "#1e262a", avFg: "#96b9c7", role: "scout",
    glow: "rgba(150,185,199,0.1)",
    blurb: "Explores unfamiliar codebases. Maps dependencies, finds the file you're looking for.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["grep", "fs(ro)", "graph"]} /> },
    ],
  },
  {
    id: "ranger", name: "Ranger", av: "R", avBg: "#1f281f", avFg: "#a3c398", role: "tester",
    glow: "rgba(163,195,152,0.1)",
    blurb: "Runs e2e and integration suites, triages flakes, isolates the smallest failing case.",
    specs: [
      { k: "model", v: "sonnet-4.5" },
      { k: "tools", v: <ChipRow chips={["test", "shell", "log"]} /> },
    ],
  },
  {
    id: "mason", name: "Mason", av: "M", avBg: "#2a2420", avFg: "#c9a690", role: "deployer",
    glow: "rgba(201,166,144,0.1)",
    blurb: "Builds artifacts, talks to CI, watches rollouts. Stops on the first metric that drifts.",
    specs: [
      { k: "model", v: "sonnet-4.5" },
      { k: "tools", v: <span style={{ display: "inline-flex", gap: 4 }}><Chip>ci</Chip><Chip>deploy</Chip><Chip>metrics</Chip><Chip variant="danger">prod</Chip></span> },
    ],
  },
  {
    id: "scout", name: "Scout", av: "S", avBg: "#262028", avFg: "#c4a4d0", role: "researcher",
    glow: "rgba(196,164,208,0.1)",
    blurb: "Reads docs, RFCs, Stack Overflow. Cites sources. Won't quote what it didn't read.",
    specs: [
      { k: "model", v: "haiku-4.5 · fast" },
      { k: "tools", v: <ChipRow chips={["web", "read"]} /> },
    ],
  },
];

function ChipRow({ chips }: { chips: string[] }) {
  return <span style={{ display: "inline-flex", gap: 4 }}>{chips.map((c) => <Chip key={c}>{c}</Chip>)}</span>;
}

function AtlasNow() {
  return (
    <div
      className="mono"
      style={{
        marginTop: 4, marginBottom: 18,
        background: "var(--ink2)", border: "1px solid var(--line1)", borderRadius: 6,
        padding: "12px 14px",
        fontSize: 11.5, color: "var(--text3)", lineHeight: 1.55,
      }}
    >
      <div style={{ color: "var(--textFaint)", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--accent)", animation: "om-pulse 1.6s ease-in-out infinite" }} />
        currently · platform-core
      </div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>▸ goal: <span style={{ color: "var(--accent)" }}>"refactor session handling, add CSRF"</span></div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>  ├─ <span style={{ color: "var(--think)" }}>forge</span> · implement middleware <span style={{ color: "var(--textFaint)" }}>(in progress, 11m)</span></div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>  ├─ <span style={{ color: "var(--think)" }}>ranger</span> · add e2e for auth flow <span style={{ color: "var(--textFaint)" }}>(queued)</span></div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>  ├─ <span style={{ color: "var(--think)" }}>scribe</span> · update docs/auth.md <span style={{ color: "var(--textFaint)" }}>(queued)</span></div>
      <div style={{ color: "var(--textDim)", margin: "2px 0" }}>  └─ <span style={{ color: "var(--think)" }}>keeper</span> · review & gate PR <span style={{ color: "var(--textFaint)" }}>(waiting)</span></div>
    </div>
  );
}

export function Agents() {
  return (
    <section
      id="agents"
      style={{ padding: "120px 0", position: "relative", borderBottom: "1px solid var(--line0)" }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute", left: 0, right: 0, top: 0, height: 1,
          background: "linear-gradient(90deg, transparent, var(--line3) 20%, var(--line3) 80%, transparent)",
          pointerEvents: "none",
        }}
      />
      <SectionContainer>
        <div className="reveal" style={{ display: "flex", alignItems: "end", justifyContent: "space-between", marginBottom: 48, gap: 32 }}>
          <div>
            <Eyebrow>The roster</Eyebrow>
            <h2 style={{ fontSize: 44, lineHeight: 1.05, letterSpacing: "-1.2px", fontWeight: 600, margin: "14px 0 0", maxWidth: 640, textWrap: "balance" }}>
              A small cast, each with one job they're great at.
            </h2>
          </div>
          <div style={{ textAlign: "right", maxWidth: 320 }}>
            <p style={{ fontSize: 13.5, color: "var(--textDim)", margin: "0 0 12px", lineHeight: 1.55 }}>
              Eight starters out of the box. Clone any of them, swap the model, edit the persona, restrict the tools. Or build your own from scratch.
            </p>
            <div className="mono" style={{ fontSize: 10.5, color: "var(--textFaint)", letterSpacing: "0.06em", display: "inline-flex", gap: 14, alignItems: "center" }}>
              <span><b style={{ color: "var(--accent)", fontWeight: 500 }}>8</b> starters</span>
              <span><b style={{ color: "var(--accent)", fontWeight: 500 }}>∞</b> custom</span>
              <span><b style={{ color: "var(--accent)", fontWeight: 500 }}>any</b> model</span>
            </div>
          </div>
        </div>

        <div
          className="reveal-stagger"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "minmax(220px, auto)",
            gap: 1,
            background: "var(--line0)",
            border: "1px solid var(--line0)",
            borderRadius: 8,
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
            marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
            padding: "14px 18px", background: "var(--ink0)", border: "1px solid var(--line1)", borderRadius: 6,
          }}
        >
          <div className="mono" style={{ fontSize: 11, color: "var(--textDim)", letterSpacing: "0.04em" }}>
            <b style={{ color: "var(--text)", fontWeight: 500 }}>Build your own.</b> A persona prompt, a model, a list of tools — that's the whole spec.
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button>Browse community agents →</Button>
            <Button variant="primary">+ New agent</Button>
          </div>
        </div>
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
        <span style={{ fontSize: featured ? 22 : 15.5, fontWeight: 500, letterSpacing: featured ? "-0.5px" : "-0.2px" }}>
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
            <span style={{ color: "var(--textFaint)", width: 56, flexShrink: 0, letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 9.5 }}>
              {s.k}
            </span>
            <span style={{ color: "var(--text2)", fontSize: 11 }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire and verify the 6-col grid renders Atlas spanning 3 cols and 2 rows; the rest fill in.**

- [ ] **Step 3: Commit**

```bash
git add app/\(marketing\)/_components/sections/Agents.tsx app/page.tsx
git commit -m "feat(landing): agents section"
```

---

## Task 16: Download section

**Files:**
- Create: `app/(marketing)/_components/sections/Download.tsx`

Source: `landing.html:496-536` (CSS) + `landing.html:1372-1418` (markup).

- [ ] **Step 1: Implement**

```tsx
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { AppleIcon, LinuxIcon } from "../icons/Icons";

export function Download() {
  return (
    <section
      id="download"
      style={{
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(74,222,128,0.08), transparent 60%)",
          pointerEvents: "none",
          animation: "om-glow-pulse 5s ease-in-out infinite",
        }}
      />
      <SectionContainer>
        <div
          className="reveal"
          style={{
            position: "relative",
            maxWidth: 920,
            margin: "0 auto",
            background: "var(--ink0)",
            border: "1px solid var(--line2)",
            borderRadius: 10,
            padding: "56px 56px 48px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
          }}
        >
          <Eyebrow>Download</Eyebrow>
          <h2 style={{ fontSize: 40, lineHeight: 1.08, letterSpacing: "-1px", fontWeight: 600, margin: "16px 0 14px", textWrap: "balance" }}>
            Get orbit on your machine.
          </h2>
          <p style={{ fontSize: 15.5, color: "var(--textDim)", lineHeight: 1.55, margin: "0 0 32px", maxWidth: 540 }}>
            Free during private beta. Bring your own API keys (Anthropic, OpenAI, or a local model). Your code never leaves your machine.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 18 }}>
            <DLBtn primary lbl="Recommended" name="macOS · Apple silicon"><AppleIcon /></DLBtn>
            <DLBtn lbl="macOS" name="Intel"><AppleIcon /></DLBtn>
            <DLBtn lbl="Linux" name=".deb · .rpm · AppImage"><LinuxIcon /></DLBtn>
          </div>

          <div className="mono" style={{ fontSize: 11, color: "var(--textMute)", display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
            <span>v0.4.2 · 86 MB</span>
            <Sep /> <span>requires macOS 13+ or Ubuntu 22+</span>
            <Sep /> <a href="#" style={{ color: "var(--text3)" }}>Release notes</a>
            <Sep /> <a href="#" style={{ color: "var(--text3)" }}>SHA256</a>
            <Sep />
            <span style={{ color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 6px rgba(74,222,128,0.5)" }} />
              Windows · soon
            </span>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

function Sep() {
  return <span style={{ color: "var(--textGhost)" }}>│</span>;
}

function DLBtn({
  primary,
  lbl,
  name,
  children,
}: {
  primary?: boolean;
  lbl: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      style={{
        background: primary ? "var(--accentBg)" : "var(--ink2)",
        border: `1px solid ${primary ? "var(--accentBd)" : "var(--line2)"}`,
        borderRadius: 6,
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "background .12s, border-color .12s",
        textAlign: "left",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          flexShrink: 0,
          color: primary ? "var(--accent)" : "var(--text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          className="mono"
          style={{ fontSize: 10, letterSpacing: "0.1em", color: primary ? "var(--accentDim)" : "var(--textMute)", textTransform: "uppercase" }}
        >
          {lbl}
        </span>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{name}</span>
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Wire and commit**

```bash
git add app/\(marketing\)/_components/sections/Download.tsx app/page.tsx
git commit -m "feat(landing): download section"
```

---

## Task 17: Footer

**Files:**
- Create: `app/(marketing)/_components/sections/Footer.tsx`

Source: `landing.html:539-542` + `landing.html:1421-1439`.

- [ ] **Step 1: Implement**

```tsx
import { BrandMark } from "../icons/BrandMark";

const LINKS = ["Docs", "Changelog", "GitHub", "Discord", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer style={{ padding: "40px 0 56px" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 32,
          flexWrap: "wrap",
          color: "var(--textMute)",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BrandMark size={16} simple />
          <span style={{ color: "var(--textDim)", fontWeight: 500 }}>orbit</span>
          <span className="mono" style={{ color: "var(--textGhost)", marginLeft: 8 }}>© 2026</span>
        </div>
        <nav style={{ display: "flex", gap: 22, marginLeft: "auto" }}>
          {LINKS.map((l) => (
            <a key={l} href="#" style={{ color: "inherit" }}>
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(marketing\)/_components/sections/Footer.tsx app/page.tsx
git commit -m "feat(landing): footer"
```

---

## Task 18: Final composition + smooth-scroll

**Files:**
- Modify: `app/page.tsx`
- Create: `app/(marketing)/_components/utils/SmoothScroll.tsx`

- [ ] **Step 1: `SmoothScroll.tsx` — anchor smoothing**

Mirrors `landing.html:1959-1968`.

```tsx
"use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const handler = (e: Event) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id.length <= 1) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
  return null;
}
```

- [ ] **Step 2: Final `app/page.tsx`**

```tsx
import { Topbar } from "./(marketing)/_components/sections/Topbar";
import { Hero } from "./(marketing)/_components/sections/Hero";
import { Values } from "./(marketing)/_components/sections/Values";
import { Metrics } from "./(marketing)/_components/sections/Metrics";
import { HowItWorks } from "./(marketing)/_components/sections/HowItWorks";
import { Compare } from "./(marketing)/_components/sections/Compare";
import { Agents } from "./(marketing)/_components/sections/Agents";
import { Download } from "./(marketing)/_components/sections/Download";
import { Footer } from "./(marketing)/_components/sections/Footer";
import { RevealOnScroll } from "./(marketing)/_components/utils/RevealOnScroll";
import { SmoothScroll } from "./(marketing)/_components/utils/SmoothScroll";

export default function Home() {
  return (
    <>
      <RevealOnScroll />
      <SmoothScroll />
      <Topbar />
      <Hero />
      <Values />
      <Metrics />
      <HowItWorks />
      <Compare />
      <Agents />
      <Download />
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Browser-walk every section**

Open `http://localhost:3000`. Walk top to bottom, comparing against the prototype's intent (read the prototype HTML where unsure). Specifically check:
- Topbar nav anchors smooth-scroll to each section.
- Hero CTA "See it in action" jumps to How.
- Hero preview is fully interactive (Tasks 7–10 acceptance list).
- Reveal-on-scroll fires once per section.
- Metrics count up when first visible.
- How sticky sidebar's active row matches whichever step is centered.
- All hover states feel smooth, no layout shifts.
- Reduced-motion toggle in OS disables animations.

- [ ] **Step 4: Run lint and typecheck**

Run: `pnpm lint && pnpm exec tsc --noEmit`
Expected: zero errors.

- [ ] **Step 5: Run a production build**

Run: `pnpm build`
Expected: succeeds; only the page route is generated; no client-component leak warnings.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/\(marketing\)/_components/utils/SmoothScroll.tsx
git commit -m "feat(landing): final composition and smooth scroll"
```

---

## Self-review

**Spec coverage** — every section in the prototype has a task:

| Prototype section | Task |
|---|---|
| `:root` tokens / fonts / keyframes / reveals | 1 |
| primitives (Button, Pill, Chip, Eyebrow, Dot, Container) | 2 |
| brand mark + every inline svg | 3 |
| reveal-on-scroll + count-up | 4 |
| `topbar` (`landing.html:778-816`) | 5 |
| `hero` static (`landing.html:818-859`) | 6 |
| `hero-preview` window (`landing.html:861-980`) | 7–10 |
| `values` (`landing.html:983-1102`) | 11 |
| `metrics` (`landing.html:1104-1130`) | 12 |
| `how` (`landing.html:1132-1189`) | 13 |
| `compare` (`landing.html:1191-1221`) | 14 |
| `agents` (`landing.html:1223-1370`) | 15 |
| `download` (`landing.html:1372-1418`) | 16 |
| `footer` (`landing.html:1421-1439`) | 17 |
| smooth scroll script + final page composition | 18 |

**Placeholders / TODOs:** none — every step contains either complete code or an exact verification command.

**Type consistency:** `AgentId` is the union used in `data.ts`, `Panel.tsx`, `Sidebar.tsx`. `WorkspaceId` is the union used in `data.ts`, `WindowChrome.tsx`, `HeroPreview.tsx`. `Status` is shared between `Dot.tsx` (with `idle`) and the canvas/panel (also `idle`). Names in `SIDEBAR_AGENTS` (`Sidebar`) match the `id` keys in `WORKSPACES` so cross-workspace selection works.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-06-orbit-landing.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using `executing-plans`, batch execution with checkpoints.

Which approach?
