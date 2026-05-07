import { ReactNode } from "react";
import type { DocBlock } from "../_content/types";

export function DocContent({ blocks }: { blocks: DocBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </>
  );
}

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p style={{ margin: "0 0 18px", color: "var(--textDim)", maxWidth: 760 }}>
          <Inline text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.4px",
            margin: "40px 0 14px",
            color: "var(--text)",
          }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          style={{
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "-0.2px",
            margin: "28px 0 10px",
            color: "var(--text)",
          }}
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", maxWidth: 760 }}>
          {block.items.map((it, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr",
                gap: 8,
                padding: "5px 0",
                color: "var(--textDim)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>·</span>
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol style={{ listStyle: "none", padding: 0, margin: "0 0 22px", maxWidth: 760, counterReset: "doc" }}>
          {block.items.map((it, i) => (
            <li
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "26px 1fr",
                gap: 8,
                padding: "6px 0",
                color: "var(--textDim)",
              }}
            >
              <span className="mono" style={{ color: "var(--accent)", fontSize: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <Inline text={it} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "kv":
      return (
        <dl
          style={{
            margin: "0 0 22px",
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 0,
            border: "1px dashed var(--line3)",
            borderRadius: 4,
            maxWidth: 760,
          }}
        >
          {block.rows.map((r, i) => (
            <KvRow key={i} k={r.key} v={r.value} first={i === 0} />
          ))}
        </dl>
      );
    case "code":
      return (
        <div style={{ margin: "0 0 22px", maxWidth: 760 }}>
          {block.caption && (
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: "var(--textFaint)",
                letterSpacing: "0.06em",
                marginBottom: 6,
              }}
            >
              {block.caption}
            </div>
          )}
          <pre
            className="mono"
            style={{
              margin: 0,
              padding: "16px 20px",
              background: "var(--ink2)",
              border: "1px dashed var(--line3)",
              borderRadius: 4,
              fontSize: 12.5,
              color: "var(--text2)",
              lineHeight: 1.6,
              overflowX: "auto",
              whiteSpace: "pre",
            }}
          >
            {block.body}
          </pre>
        </div>
      );
    case "callout": {
      const tones = {
        info: { color: "var(--accent)", bg: "var(--accentBg)", border: "var(--accentBd)" },
        warn: { color: "var(--warn)", bg: "rgba(245,158,11,0.06)", border: "var(--warn)" },
        tip: { color: "#9ccfb0", bg: "rgba(74,222,128,0.04)", border: "rgba(74,222,128,0.4)" },
      } as const;
      const t = tones[block.tone];
      return (
        <div
          style={{
            margin: "0 0 22px",
            padding: "14px 18px",
            background: t.bg,
            border: `1px dashed ${t.border}`,
            borderRadius: 4,
            maxWidth: 760,
          }}
        >
          {block.title && (
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: t.color,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {block.title}
            </div>
          )}
          <div style={{ fontSize: 13.5, color: "var(--textDim)", lineHeight: 1.6 }}>
            <Inline text={block.body} />
          </div>
        </div>
      );
    }
    case "divider":
      return (
        <div
          style={{
            margin: "32px 0",
            height: 1,
            borderTop: "1px dashed var(--line3)",
          }}
        />
      );
  }
}

function KvRow({ k, v, first }: { k: string; v: string; first: boolean }) {
  return (
    <>
      <dt
        className="mono"
        style={{
          padding: "10px 14px",
          fontSize: 12,
          color: "var(--accent)",
          background: "var(--ink2)",
          borderTop: first ? "none" : "1px dashed var(--line3)",
          borderRight: "1px dashed var(--line3)",
        }}
      >
        {k}
      </dt>
      <dd
        style={{
          margin: 0,
          padding: "10px 14px",
          fontSize: 13,
          color: "var(--textDim)",
          borderTop: first ? "none" : "1px dashed var(--line3)",
        }}
      >
        <Inline text={v} />
      </dd>
    </>
  );
}

// Minimal inline parser: supports `code`, **bold**, [text](href)
function Inline({ text }: { text: string }): ReactNode {
  const tokens: ReactNode[] = [];
  let i = 0;
  let buffer = "";
  const flush = () => {
    if (buffer) {
      tokens.push(buffer);
      buffer = "";
    }
  };
  while (i < text.length) {
    const ch = text[i];
    if (ch === "`") {
      const end = text.indexOf("`", i + 1);
      if (end === -1) {
        buffer += ch;
        i++;
        continue;
      }
      flush();
      tokens.push(
        <code key={tokens.length} className="mono" style={{ color: "var(--accent)", fontSize: "0.92em" }}>
          {text.slice(i + 1, end)}
        </code>,
      );
      i = end + 1;
      continue;
    }
    if (ch === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end === -1) {
        buffer += ch;
        i++;
        continue;
      }
      flush();
      tokens.push(
        <strong key={tokens.length} style={{ color: "var(--text)", fontWeight: 600 }}>
          {text.slice(i + 2, end)}
        </strong>,
      );
      i = end + 2;
      continue;
    }
    if (ch === "[") {
      const closeBracket = text.indexOf("]", i + 1);
      if (closeBracket === -1 || text[closeBracket + 1] !== "(") {
        buffer += ch;
        i++;
        continue;
      }
      const closeParen = text.indexOf(")", closeBracket + 2);
      if (closeParen === -1) {
        buffer += ch;
        i++;
        continue;
      }
      flush();
      const label = text.slice(i + 1, closeBracket);
      const href = text.slice(closeBracket + 2, closeParen);
      tokens.push(
        <a key={tokens.length} href={href} style={{ color: "var(--accent)" }}>
          {label}
        </a>,
      );
      i = closeParen + 1;
      continue;
    }
    buffer += ch;
    i++;
  }
  flush();
  return <>{tokens}</>;
}
