import { ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px" }}
    >
      {children}
    </div>
  );
}
