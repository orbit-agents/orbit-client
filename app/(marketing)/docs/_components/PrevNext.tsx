type Item = { slug: string; title: string } | null;

export function PrevNext({
  prev,
  next,
  basePath = "/docs",
}: {
  prev: Item;
  next: Item;
  basePath?: string;
}) {
  return (
    <div
      style={{
        marginTop: 56,
        paddingTop: 28,
        borderTop: "1px dashed var(--line3)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        maxWidth: 760,
      }}
    >
      <Cell item={prev} side="prev" basePath={basePath} />
      <Cell item={next} side="next" basePath={basePath} />
    </div>
  );
}

function Cell({
  item,
  side,
  basePath,
}: {
  item: Item;
  side: "prev" | "next";
  basePath: string;
}) {
  if (!item) {
    return <div />;
  }
  const isPrev = side === "prev";
  return (
    <a
      href={`${basePath}/${item.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "16px 18px",
        border: "1px dashed var(--line3)",
        borderRadius: 4,
        textAlign: isPrev ? "left" : "right",
        background: "var(--ink0)",
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--textFaint)",
        }}
      >
        {isPrev ? "← previous" : "next →"}
      </span>
      <span style={{ fontSize: 14.5, color: "var(--text)", fontWeight: 500 }}>{item.title}</span>
    </a>
  );
}
