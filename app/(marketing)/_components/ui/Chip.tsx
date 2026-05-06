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
