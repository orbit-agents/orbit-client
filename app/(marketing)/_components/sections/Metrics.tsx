type Metric = { value: string; unit?: string; emphasis: string; rest: string };

const METRICS: Metric[] = [
  { value: "14", unit: "×", emphasis: "faster cycle", rest: " than one-thread chat" },
  { value: "2,847", emphasis: "PRs shipped", rest: " in private beta" },
  { value: "98", unit: "%", emphasis: "local-first", rest: " — no code leaves your box" },
  { value: "8", unit: "+", emphasis: "starter agents", rest: ", fully editable" },
  { value: "10", emphasis: "agents", rest: " per workspace, soft cap" },
  { value: "50", emphasis: "facts", rest: " in memory per agent" },
  { value: "0", emphasis: "cloud servers", rest: " — local-first by intent" },
  { value: "3", unit: "+", emphasis: "model providers", rest: " supported on day one" },
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
      <div
        className="metrics-marquee reveal"
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          maskImage:
            "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        <div
          className="metrics-marquee-track"
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            width: "max-content",
            animation: "om-marquee 40s linear infinite",
            willChange: "transform",
          }}
        >
          {[...METRICS, ...METRICS].map((m, i) => (
            <MetricCard key={i} metric={m} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div
      style={{
        flex: "0 0 auto",
        width: 280,
        padding: "8px 32px",
        borderLeft: "1px dashed var(--line3)",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        boxSizing: "border-box",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 38,
          fontWeight: 500,
          color: "var(--text)",
          letterSpacing: "-1px",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {metric.value}
        {metric.unit && (
          <span style={{ color: "var(--accent)", fontSize: 22, marginLeft: 2 }}>
            {metric.unit}
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: "var(--textDim)", lineHeight: 1.4 }}>
        <span style={{ color: "var(--text2)" }}>{metric.emphasis}</span>
        {metric.rest}
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
              animationDelay: `${j * 0.1}s`,
              display: "block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
