import { SectionContainer } from "../_components/ui/SectionContainer";
import { DashedFrame } from "../_components/ui/DashedFrame";
import { PageHero } from "../_components/sections/PageHero";
import { Button } from "../_components/ui/Button";
import { DOC_NAV, NOTES_NAV } from "./_content/nav";
import { DOCS } from "./_content/docs";

export const metadata = {
  title: "Docs — Orbit",
  description: "Guides, concepts, and reference for the Orbit desktop app.",
};

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Docs"
        title={<>The handbook.</>}
        lede="Everything you need to install Orbit, set up your first workspace, and understand how the system fits together. Written by the team that ships it."
      />

      <section style={{ padding: "64px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
              Browse the docs.
            </h2>
            <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: "0 0 32px", maxWidth: 600 }}>
              Start at the top if you&apos;re new. Jump to Concepts when something in the app
              surprises you. Reference is for when you already know what you&apos;re looking for.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {DOC_NAV.map((g) => (
                <DocGroupTiles key={g.group} group={g.group} links={g.links} />
              ))}
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
              <div>
                <h2 style={{ fontSize: 28, lineHeight: 1.15, letterSpacing: "-0.6px", fontWeight: 600, margin: "0 0 8px" }}>
                  Engineering notes.
                </h2>
                <p style={{ fontSize: 14, color: "var(--textDim)", lineHeight: 1.55, margin: 0, maxWidth: 600 }}>
                  Short reads on the choices behind Orbit. Useful when a decision feels weird six
                  months later.
                </p>
              </div>
              <a
                href="/docs/notes"
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.06em",
                }}
              >
                see all engineering notes →
              </a>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {NOTES_NAV.map((a, i) => (
                <li key={a.n}>
                  <a
                    href={`/docs/notes/${a.slug}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1fr 24px",
                      gap: 18,
                      padding: "14px 12px",
                      borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                      alignItems: "baseline",
                      transition: "background .15s",
                      borderRadius: 2,
                    }}
                    className="adr-row"
                  >
                    <span
                      className="mono"
                      style={{ fontSize: 12, color: "var(--accent)", letterSpacing: "0.06em" }}
                    >
                      No. {a.n}
                    </span>
                    <span style={{ fontSize: 14.5, color: "var(--text)" }}>{a.title}</span>
                    <span
                      className="mono"
                      style={{ color: "var(--textFaint)", fontSize: 14, textAlign: "right" }}
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>

      <section style={{ padding: "32px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={40}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontSize: 14, color: "var(--textDim)", margin: "0 0 6px" }}>
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>
                  Email{" "}
                  <a href="mailto:support@orbit.app" style={{ color: "var(--accent)" }}>
                    support@orbit.app
                  </a>{" "}
                  — a person reads every message.
                </p>
              </div>
              <Button as="a" href="/download" variant="primary">
                Download Orbit →
              </Button>
            </div>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}

function DocGroupTiles({
  group,
  links,
}: {
  group: string;
  links: { slug: string; title: string; tag?: string }[];
}) {
  return (
    <div>
      <div
        className="mono"
        style={{
          fontSize: 10.5,
          color: "var(--accent)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {group}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, border: "1px dashed var(--line3)" }}>
        {links.map((l, i) => (
          <DocTile key={l.slug} link={l} index={i} total={links.length} />
        ))}
      </div>
    </div>
  );
}

function DocTile({
  link,
  index,
  total,
}: {
  link: { slug: string; title: string; tag?: string };
  index: number;
  total: number;
}) {
  const isRight = index % 2 === 1;
  const isLastRow = index >= total - (total % 2 === 0 ? 2 : 1);
  const doc = DOCS[link.slug];
  return (
    <a
      href={`/docs/${link.slug}`}
      style={{
        padding: "22px 24px 20px",
        background: "var(--ink0)",
        borderRight: isRight ? "none" : "1px dashed var(--line3)",
        borderBottom: isLastRow ? "none" : "1px dashed var(--line3)",
        display: "flex",
        flexDirection: "column",
        gridColumn: index === total - 1 && total % 2 === 1 ? "span 2" : undefined,
        cursor: "pointer",
        transition: "background .2s",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h3 style={{ fontSize: 15.5, fontWeight: 500, margin: 0, letterSpacing: "-0.2px", color: "var(--text)" }}>
          {link.title}
        </h3>
        {link.tag && (
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
            {link.tag}
          </span>
        )}
        <span
          className="mono"
          style={{ marginLeft: "auto", color: "var(--textFaint)", fontSize: 13 }}
        >
          →
        </span>
      </div>
      <p style={{ fontSize: 13, color: "var(--textDim)", lineHeight: 1.55, margin: 0 }}>
        {doc?.lede ?? ""}
      </p>
    </a>
  );
}
