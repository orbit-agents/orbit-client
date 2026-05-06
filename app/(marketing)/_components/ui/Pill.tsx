import { CSSProperties, ReactNode } from "react";

export function Pill({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
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
        ...style,
      }}
    >
      {children}
    </span>
  );
}
