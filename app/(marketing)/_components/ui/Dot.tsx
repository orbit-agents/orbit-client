type Status = "run" | "think" | "wait" | "fail" | "idle";

const COLORS: Record<Status, string> = {
  run: "var(--accent)",
  think: "var(--think)",
  wait: "var(--warn)",
  fail: "var(--err)",
  idle: "#6b7280",
};

export function Dot({
  status,
  size = 6,
  pulse = false,
}: {
  status: Status;
  size?: number;
  pulse?: boolean;
}) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 99,
        flexShrink: 0,
        background: COLORS[status],
        boxShadow:
          status === "run" ? "0 0 6px rgba(74,222,128,0.5)" : undefined,
      }}
    >
      {pulse && status === "run" && (
        <span
          style={{
            content: '""',
            position: "absolute",
            inset: -3,
            borderRadius: 99,
            background: "var(--accent)",
            opacity: 0.4,
            animation: "om-pulse 2.2s ease-in-out infinite",
            zIndex: -1,
          }}
        />
      )}
    </span>
  );
}
