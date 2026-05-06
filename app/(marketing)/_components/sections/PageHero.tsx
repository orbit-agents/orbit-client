import { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";

export function PageHero({
  eyebrow,
  title,
  lede,
  pill,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  pill?: ReactNode;
}) {
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 0 56px",
        overflow: "hidden",
        borderBottom: "1px solid var(--line0)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.025) 0.8px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 35%, #000 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 640,
          height: 240,
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.05), transparent 60%)",
          pointerEvents: "none",
          animation: "om-glow-pulse 6s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 880,
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        {pill && <div style={{ marginBottom: 22 }}>{pill}</div>}
        <div style={{ display: "inline-flex", marginBottom: 18 }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1
          style={{
            fontSize: 56,
            lineHeight: 1.05,
            letterSpacing: "-1.4px",
            fontWeight: 600,
            margin: "0 0 20px",
            color: "var(--text)",
            textWrap: "balance",
          }}
        >
          {title}
        </h1>
        {lede && (
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--textDim)",
              maxWidth: 640,
              margin: "0 auto",
              textWrap: "pretty",
            }}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}
