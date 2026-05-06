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
            {l}
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
