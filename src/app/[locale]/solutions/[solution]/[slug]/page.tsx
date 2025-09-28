import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { loadContent, getSlugs, getCategories } from "@/lib/content";
import { generateMetadata as createSeoMetadata } from "@/lib/generate-metadata";

interface Props {
  params: { locale: string; solution: string; slug: string };
}

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (locale) => {
      const categories = await getCategories(locale, "solutions");
      const slugParams = await Promise.all(
        categories.map(async (solution) => {
          const slugs = await getSlugs(locale, "solutions", solution);
          return slugs.map((slug) => ({ locale, solution, slug }));
        })
      );
      return slugParams.flat();
    })
  );
  return allParams.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await loadContent(
    params.locale,
    "solutions",
    params.solution,
    params.slug
  );

  if (!content) {
    return {
      title: "Page not found",
      description: "",
    };
  }

  // Simple SEO generation directly in page - KISS principle
  return createSeoMetadata(
    (content.meta?.title as string) || "Page not found",
    (content.meta?.description as string) || "",
    (content.meta?.ogImage as string) || "/images/default-og.jpg",
    `/${params.locale}/solutions/${params.solution}/${
      content.meta?.slug || params.slug
    }`
  );
}

export default async function SubPage({ params }: Props) {
  const content = await loadContent(
    params.locale,
    "solutions",
    params.solution,
    params.slug
  );

  if (!content || !content.content) return notFound();

  return (
    <>
      <BackgroundGrid />
      <BackgroundScanline />
      <main className="relative z-10">
        <PageHero
          titlePre=""
          titleMain={content.title}
          subtitle={content.description}
        />

        <article className="container mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">{content.content}</div>
        </article>
      </main>
    </>
  );
}
