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
