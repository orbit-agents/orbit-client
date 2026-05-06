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
