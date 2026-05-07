import { SectionContainer } from "../../_components/ui/SectionContainer";
import { DashedFrame } from "../../_components/ui/DashedFrame";
import { PageHero } from "../../_components/sections/PageHero";
import { NOTES_NAV } from "../_content/nav";
import { NOTES } from "../_content/notes";

export const metadata = {
  title: "Engineering notes — Orbit docs",
  description: "Short reads on the choices behind Orbit.",
};

export default function NotesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering notes"
        title={<>The choices behind Orbit.</>}
        lede="Short, opinionated writeups on design decisions we made — what we considered, what we picked, what we gave up. Useful when a decision feels weird six months later."
      />

      <section style={{ padding: "64px 0 120px" }}>
        <SectionContainer>
          <DashedFrame padding={48}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {NOTES_NAV.map((n, i) => {
                const note = NOTES[n.slug];
                return (
                  <li key={n.slug}>
                    <a
                      href={`/docs/notes/${n.slug}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "70px 1fr 24px",
                        gap: 24,
                        padding: "20px 12px",
                        borderTop: i === 0 ? "none" : "1px dashed var(--line3)",
                        alignItems: "start",
                        borderRadius: 2,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: 12,
                          color: "var(--accent)",
                          letterSpacing: "0.06em",
                          paddingTop: 2,
                        }}
                      >
                        No. {n.n}
                      </span>
                      <div>
                        <h3
                          style={{
                            fontSize: 17,
                            fontWeight: 500,
                            margin: "0 0 4px",
                            letterSpacing: "-0.2px",
                            color: "var(--text)",
                          }}
                        >
                          {n.title}
                        </h3>
                        <p
                          style={{
                            fontSize: 13.5,
                            color: "var(--textDim)",
                            lineHeight: 1.55,
                            margin: 0,
                            maxWidth: 720,
                          }}
                        >
                          {note?.lede}
                        </p>
                      </div>
                      <span
                        className="mono"
                        style={{
                          color: "var(--textFaint)",
                          fontSize: 14,
                          textAlign: "right",
                          paddingTop: 2,
                        }}
                      >
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </DashedFrame>
        </SectionContainer>
      </section>
    </>
  );
}
