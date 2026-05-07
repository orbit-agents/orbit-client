"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandMark } from "../icons/BrandMark";
import { DownloadIcon } from "../icons/Icons";
import { Button } from "../ui/Button";

const NAV = [
  { label: "Product", href: "/product" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Agents", href: "/agents" },
  { label: "Download", href: "/download" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
];

type Rect = { left: number; width: number };

export function Topbar() {
  const pathname = usePathname() || "/";
  const navRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pill, setPill] = useState<Rect | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const activeIdx = NAV.findIndex(
    (n) => pathname === n.href || pathname.startsWith(n.href + "/"),
  );
  const targetIdx = hoverIdx ?? (activeIdx >= 0 ? activeIdx : null);

  useLayoutEffect(() => {
    if (targetIdx == null) {
      setPill(null);
      return;
    }
    const nav = navRef.current;
    const link = linkRefs.current[targetIdx];
    if (!nav || !link) return;
    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    setPill({ left: linkRect.left - navRect.left, width: linkRect.width });
  }, [targetIdx, pathname]);

  useEffect(() => {
    const onResize = () => {
      if (targetIdx == null) return;
      const nav = navRef.current;
      const link = linkRefs.current[targetIdx];
      if (!nav || !link) return;
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setPill({ left: linkRect.left - navRect.left, width: linkRect.width });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [targetIdx]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="om-topbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: 56,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 32px",
        background: scrolled ? "rgba(0,0,0,0.78)" : "rgba(0,0,0,0.55)",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(8px)",
        WebkitBackdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(8px)",
        borderBottom: `1px solid ${scrolled ? "var(--line2)" : "var(--line0)"}`,
        boxShadow: scrolled ? "0 6px 30px -16px rgba(0,0,0,0.7)" : "none",
        transition:
          "background .25s ease, border-color .25s ease, box-shadow .25s ease, backdrop-filter .25s ease",
      }}
    >
      <span className="om-topbar-sheen" aria-hidden />

      <a
        href="/"
        className="om-brand"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: "-0.2px",
          width: "fit-content",
        }}
      >
        <span className="om-brand-mark" style={{ display: "inline-flex" }}>
          <BrandMark size={22} />
        </span>
        <span>orbit</span>
        <span
          className="mono"
          style={{ fontSize: 10.5, color: "var(--textMute)", letterSpacing: "0.04em" }}
        >
          v0.4.2
        </span>
      </a>

      <nav
        ref={navRef}
        className="om-nav-center"
        onMouseLeave={() => setHoverIdx(null)}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 4,
          borderRadius: 10,
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--line0)",
        }}
      >
        <span
          className="om-nav-pill"
          data-visible={pill != null}
          style={{
            top: 4,
            left: 0,
            transform: pill ? `translateX(${pill.left - 4}px)` : "translateX(0)",
            width: pill ? pill.width : 0,
          }}
          aria-hidden
        />
        {NAV.map((n, i) => (
          <a
            key={n.label}
            href={n.href}
            ref={(el) => {
              linkRefs.current[i] = el;
            }}
            className="om-nav-link"
            data-active={i === activeIdx}
            onMouseEnter={() => setHoverIdx(i)}
            onFocus={() => setHoverIdx(i)}
            onBlur={() => setHoverIdx(null)}
          >
            {n.label}
          </a>
        ))}
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          justifyContent: "flex-end",
        }}
      >
        <a
          href="/sign-in"
          className="om-signin"
          style={{
            padding: "6px 10px",
            color: "var(--textDim)",
            fontSize: 13,
          }}
        >
          Sign in
        </a>
        <Button as="a" href="/download" variant="primary" className="om-cta">
          <DownloadIcon /> Download
        </Button>
      </div>
    </div>
  );
}
