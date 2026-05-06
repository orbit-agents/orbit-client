import { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  padding?: CSSProperties["padding"];
  style?: CSSProperties;
  className?: string;
  cornerColor?: string;
  borderColor?: string;
};

export function DashedFrame({
  children,
  padding = 32,
  style,
  className,
  cornerColor = "var(--textFaint)",
  borderColor = "var(--line3)",
}: Props) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        border: `1px dashed ${borderColor}`,
        borderRadius: 2,
        padding,
        ...style,
      }}
    >
      <Cross color={cornerColor} pos={{ top: -7, left: -7 }} />
      <Cross color={cornerColor} pos={{ top: -7, right: -7 }} />
      <Cross color={cornerColor} pos={{ bottom: -7, left: -7 }} />
      <Cross color={cornerColor} pos={{ bottom: -7, right: -7 }} />
      {children}
    </div>
  );
}

function Cross({ color, pos }: { color: string; pos: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 13,
        height: 13,
        color,
        pointerEvents: "none",
        ...pos,
      }}
    >
      <svg width={13} height={13} viewBox="0 0 13 13" fill="none">
        <path d="M6.5 0v13M0 6.5h13" stroke="currentColor" strokeWidth={1} />
      </svg>
    </span>
  );
}
