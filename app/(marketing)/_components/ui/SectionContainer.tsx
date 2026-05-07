import { CSSProperties, ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px", ...style }}
    >
      {children}
    </div>
  );
}
