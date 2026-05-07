import { ReactNode } from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Eyebrow } from "../ui/Eyebrow";
import { DashedFrame } from "../ui/DashedFrame";
import DotField from "../ui/DotField";

export function Values() {
  return (
    <section
      id="values"
      style={{
        padding: "96px 0",
        borderBottom: "1px solid var(--line0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <DotField
          dotRadius={2.5}
          dotSpacing={14}
          bulgeStrength={67}
          glowRadius={160}
          sparkle={false}
          waveAmplitude={0}
          cursorRadius={500}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="#3a3a3a"
          gradientTo="#242424"
          glowColor="#1a1a1a"
        />
      </div>
      <SectionContainer style={{ position: "relative", zIndex: 1 }}>
        <DashedFrame padding={48}>
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
            }}
          >
            <Cell feature corner="01 / canvas" badge="flagship" title="See the whole team at once.">
              <p style={{ margin: 0 }}>A spatial canvas of every agent and what they&apos;re touching. Live status dots, edges between collaborators, dotted regions for squads. Glance, don&apos;t scroll.</p>
              <CanvasGlyph />
            </Cell>

            <Cell corner="02" badge="dm" title="Talk to any one of them." dropRight>
              <p style={{ margin: 0 }}>Click an agent, drop into a DM. Threaded tool calls show every grep, diff and shell.</p>
              <DmGlyph />
            </Cell>

            <Cell corner="03" badge="squad" title="Form squads for big jobs.">
              <p style={{ margin: 0 }}>Pull two or four agents into a group chat with one shared task. They split the work.</p>
              <SquadGlyph />
            </Cell>

            <Cell corner="04" badge="review" title="Review every diff.">
              <p style={{ margin: 0 }}>Side-by-side diffs, reviewer notes, an explicit approve / request-changes button.</p>
              <DiffGlyph />
            </Cell>

            <Cell corner="05" badge="sandbox" title="Local-first. Sandboxed." dropRight>
              <p style={{ margin: 0 }}>Agents run in a per-task sandbox on your machine. They touch your repo through a watched filesystem, not the network.</p>
              <SandboxGlyph />
            </Cell>

            <Cell corner="06" badge="map" title="One workspace per project." dropBottom>
              <p style={{ margin: 0 }}>Switch between repos with a tab. Each map remembers its agents, squads, and open tasks.</p>
              <MapGlyph />
            </Cell>
          </div>
        </DashedFrame>
      </SectionContainer>
    </section>
  );
}

function Cell({
  feature = false,
  corner,
  badge,
  title,
  dropRight = false,
  dropBottom = false,
  children,
}: {
  feature?: boolean;
  corner: string;
  badge: string;
  title: string;
  dropRight?: boolean;
  dropBottom?: boolean;
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
        borderRight: dropRight ? "none" : "1px dashed var(--line3)",
        borderBottom: dropBottom ? "none" : "1px dashed var(--line3)",
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
  return (
    <div className="glyph" style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 3, height: 80 }}>
      <div style={{ display: "flex", gap: 6, fontSize: 11 }}>
        <span style={{ color: "#4ade80" }}>+ 84</span>
        <span style={{ color: "#ef4444" }}>− 37</span>
        <span style={{ color: "var(--textMute)", marginLeft: "auto" }}>2 files</span>
      </div>
      <div className="mono" style={{ background: "#0e1a12", borderLeft: "2px solid #4ade80", padding: "3px 6px", fontSize: 10, color: "#9ccfb0" }}>
        + samesite: &apos;lax&apos;,
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
