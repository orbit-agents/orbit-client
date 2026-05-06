import { CountUp } from "../utils/CountUp";
import { SectionContainer } from "../ui/SectionContainer";
import { DashedFrame } from "../ui/DashedFrame";

const METRICS: { target: number; unit?: string; emphasis: string; rest: string }[] = [
  { target: 14, unit: "×", emphasis: "faster cycle", rest: " than one-thread chat" },
  { target: 2847, emphasis: "PRs shipped", rest: " in private beta" },
  { target: 98, unit: "%", emphasis: "local-first", rest: " — no code leaves your box" },
  { target: 8, unit: "+", emphasis: "starter agents", rest: ", fully editable" },
];

export function Metrics() {
  return (
    <section
      style={{
        padding: "64px 0",
        borderTop: "1px solid var(--line1)",
        borderBottom: "1px solid var(--line1)",
        background: "var(--ink0)",
      }}
    >
      <SectionContainer>
        <DashedFrame padding="32px 40px">
          <div className="reveal-stagger" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {METRICS.map((m, i) => (
              <div
                key={i}
                style={{
                  padding: i === 0 ? "8px 28px 8px 0" : "8px 28px",
                  borderLeft: i === 0 ? "none" : "1px dashed var(--line3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  position: "relative",
                }}
              >
                <div
                  className="mono counter"
                  style={{ fontSize: 38, fontWeight: 500, color: "var(--text)", letterSpacing: "-1px", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
                >
                  <CountUp target={m.target} />
                  {m.unit && <span style={{ color: "var(--accent)", fontSize: 22, marginLeft: 2 }}>{m.unit}</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--textDim)", lineHeight: 1.4 }}>
                  <span style={{ color: "var(--text2)" }}>{m.emphasis}</span>
                  {m.rest}
                </div>
                <div style={{ display: "flex", alignItems: "end", gap: 2, height: 22, marginTop: 2 }}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <i
                      key={j}
                      style={{
                        width: 4,
                        height: "30%",
                        background: "var(--accent)",
                        borderRadius: 1,
                        opacity: 0.7,
                        animation: `om-spark 1.6s ease-in-out infinite`,
                        animationDelay: `${(i * 0.05) + j * 0.1}s`,
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DashedFrame>
      </SectionContainer>
    </section>
  );
}
