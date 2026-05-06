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
                right: 14 + 320 + 14,
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
