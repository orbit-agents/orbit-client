import { notFound } from "next/navigation";
import { DocLayout } from "../_components/DocLayout";
import { DocContent } from "../_components/DocContent";
import { PrevNext } from "../_components/PrevNext";
import { DOCS } from "../_content/docs";
import { neighbors } from "../_content/nav";

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) return {};
  return {
    title: `${doc.title} — Orbit docs`,
    description: doc.lede,
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();
  const { prev, next } = neighbors(slug);
  return (
    <DocLayout
      group={doc.group}
      title={doc.title}
      lede={doc.lede}
      tag={doc.tag}
      activeSlug={slug}
      footer={<PrevNext prev={prev} next={next} />}
    >
      <DocContent blocks={doc.blocks} />
    </DocLayout>
  );
}
