import { ReactNode } from "react";
import { SectionContainer } from "../../_components/ui/SectionContainer";
import { DOC_NAV, NOTES_NAV } from "../_content/nav";

export function DocLayout({
  group,
  title,
  lede,
  tag,
  activeSlug,
  activeNoteSlug,
  children,
  footer,
}: {
  group: string;
  title: string;
  lede: string;
  tag?: string;
  activeSlug?: string;
  activeNoteSlug?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div style={{ padding: "32px 0 96px", borderTop: "1px solid var(--line0)" }}>
      <SectionContainer>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <Sidebar activeSlug={activeSlug} activeNoteSlug={activeNoteSlug} />
          <main style={{ minWidth: 0 }}>
            <Header group={group} title={title} lede={lede} tag={tag} />
            <article
              style={{
                fontSize: 14.5,
                lineHeight: 1.7,
                color: "var(--text2)",
              }}
            >
              {children}
            </article>
            {footer}
          </main>
        </div>
      </SectionContainer>
    </div>
  );
}

function Header({
  group,
  title,
  lede,
  tag,
}: {
  group: string;
  title: string;
  lede: string;
  tag?: string;
}) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          {group}
        </span>
        {tag && (
          <span
            className="mono"
            style={{
              fontSize: 9.5,
              color: "var(--textFaint)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 7px",
              border: "1px solid var(--line3)",
              borderRadius: 99,
            }}
          >
            {tag}
          </span>
        )}
      </div>
      <h1
        style={{
          fontSize: 38,
          lineHeight: 1.1,
          letterSpacing: "-1px",
          fontWeight: 600,
          margin: "0 0 16px",
          color: "var(--text)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--textDim)",
          margin: 0,
          maxWidth: 720,
        }}
      >
        {lede}
      </p>
    </div>
  );
}

function Sidebar({
  activeSlug,
  activeNoteSlug,
}: {
  activeSlug?: string;
  activeNoteSlug?: string;
}) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 88,
        alignSelf: "start",
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
        paddingRight: 16,
        borderRight: "1px dashed var(--line2)",
      }}
    >
      <a
        href="/docs"
        className="mono"
        style={{
          display: "block",
          fontSize: 11,
          color: "var(--textFaint)",
          letterSpacing: "0.08em",
          marginBottom: 24,
        }}
      >
        ← all docs
      </a>
      {DOC_NAV.map((g) => (
        <div key={g.group} style={{ marginBottom: 22 }}>
          <div
            className="mono"
            style={{
              fontSize: 10,
              color: "var(--textFaint)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            {g.group}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {g.links.map((l) => {
              const active = l.slug === activeSlug;
              return (
                <li key={l.slug}>
                  <a
                    href={`/docs/${l.slug}`}
                    style={{
                      display: "block",
                      fontSize: 13,
                      padding: "5px 8px",
                      marginLeft: -8,
                      color: active ? "var(--accent)" : "var(--text3)",
                      borderLeft: active ? "1px solid var(--accent)" : "1px solid transparent",
                      paddingLeft: 10,
                      lineHeight: 1.45,
                    }}
                  >
                    {l.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px dashed var(--line2)" }}>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: "var(--textFaint)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Engineering notes
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {NOTES_NAV.map((n) => {
            const active = n.slug === activeNoteSlug;
            return (
              <li key={n.slug}>
                <a
                  href={`/docs/notes/${n.slug}`}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontSize: 12.5,
                    padding: "4px 8px",
                    marginLeft: -8,
                    color: active ? "var(--accent)" : "var(--text3)",
                    borderLeft: active ? "1px solid var(--accent)" : "1px solid transparent",
                    paddingLeft: 10,
                    lineHeight: 1.45,
                  }}
                >
                  <span className="mono" style={{ color: "var(--textFaint)", fontSize: 11 }}>
                    {n.n}
                  </span>
                  <span>{n.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
