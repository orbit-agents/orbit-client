"use client";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "ghost" | "primary";
type Size = "md" | "lg";

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  borderRadius: 5,
  fontWeight: 500,
  cursor: "pointer",
  border: "1px solid var(--line2)",
  background: "transparent",
  color: "var(--text2)",
  transition: "background .12s, border-color .12s, color .12s",
  textDecoration: "none",
};

function styleFor(variant: Variant, size: Size): React.CSSProperties {
  const sized: React.CSSProperties =
    size === "lg"
      ? { padding: "12px 20px", fontSize: 14, borderRadius: 6 }
      : { padding: "8px 14px", fontSize: 13 };
  const themed: React.CSSProperties =
    variant === "primary"
      ? {
          background: "var(--accentBg)",
          color: "var(--accent)",
          borderColor: "var(--accentBd)",
        }
      : {};
  return { ...baseStyle, ...sized, ...themed };
}

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button(props: AnchorProps | BtnProps) {
  const {
    variant = "ghost",
    size = "md",
    children,
    as: _as,
    ...rest
  } = props as unknown as Record<string, unknown> & {
    variant?: Variant;
    size?: Size;
    children: ReactNode;
    as?: "a" | "button";
  };
  if ((props as AnchorProps).as === "a") {
    const anchor = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchor} style={{ ...styleFor(variant, size), ...(anchor.style || {}) }}>
        {children}
      </a>
    );
  }
  const btn = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...btn} style={{ ...styleFor(variant, size), ...(btn.style || {}) }}>
      {children}
    </button>
  );
}
