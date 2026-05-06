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
