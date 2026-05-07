import { notFound } from "next/navigation";
import { DocLayout } from "../../_components/DocLayout";
import { DocContent } from "../../_components/DocContent";
import { PrevNext } from "../../_components/PrevNext";
import { NOTES } from "../../_content/notes";
import { noteNeighbors } from "../../_content/nav";

export function generateStaticParams() {
  return Object.keys(NOTES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = NOTES[slug];
  if (!note) return {};
  return {
    title: `${note.title} — Orbit docs`,
    description: note.lede,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = NOTES[slug];
  if (!note) notFound();
  const { prev, next } = noteNeighbors(slug);
  return (
    <DocLayout
      group={note.group}
      title={note.title}
      lede={note.lede}
      activeNoteSlug={slug}
      footer={<PrevNext prev={prev} next={next} basePath="/docs/notes" />}
    >
      <DocContent blocks={note.blocks} />
    </DocLayout>
  );
}
