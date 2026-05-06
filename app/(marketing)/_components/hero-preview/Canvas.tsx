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
  workspaceKey: string;
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

  // Tick tokens / cost
  useEffect(() => {
    const id = setInterval(() => {
      setTokens((t) => t + Math.random() * 0.012);
      setCost((c) => c + Math.random() * 0.04);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Tick progress bars
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
