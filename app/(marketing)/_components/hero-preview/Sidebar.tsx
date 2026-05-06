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
