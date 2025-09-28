import type { Metadata } from "next";
import { generateMetadata as createSeoMetadata } from "@/lib/generate-metadata";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { loadContent, getCategories } from "@/lib/content";

interface Props {
  params: { locale: string; solution: string };
}

export async function generateStaticParams() {
  const allParams = await Promise.all(
    routing.locales.map(async (locale) => {
      const categories = await getCategories(locale, "solutions");
      return categories.map((solution) => ({ locale, solution }));
    })
  );
  return allParams.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await loadContent(
    params.locale,
    "solutions",
    params.solution
  );

  if (!content) {
    return {
      title: "Solution not found",
      description: "",
    };
  }

  // Simple SEO generation directly in page - KISS principle
  return createSeoMetadata(
    (content.meta?.title as string) || "Solution not found",
    (content.meta?.description as string) || "",
    (content.meta?.ogImage as string) || "/images/default-og.jpg",
    `/${params.locale}/solutions/${content.meta?.slug || params.solution}`
  );
}

export default async function SolutionPage({ params }: Props) {
  const content = await loadContent(
    params.locale,
    "solutions",
    params.solution
  );

  if (!content) return notFound();

  return (
    <>
      <BackgroundGrid />
      <BackgroundScanline />
      <main className="relative z-10">
        <PageHero
          titlePre={
            typeof content.hero?.titlePre === "string"
              ? content.hero.titlePre
              : ""
          }
          titleMain={
            typeof content.hero?.titleMain === "string"
              ? content.hero.titleMain
              : typeof content.title === "string"
              ? content.title
              : ""
          }
          subtitle={
            typeof content.hero?.subtitle === "string"
              ? content.hero.subtitle
              : typeof content.hero?.description === "string"
              ? content.hero.description
              : typeof content.description === "string"
              ? content.description
              : ""
          }
        />

        <div className="container mx-auto px-4 py-16">
          {content.content && (
            <div className="prose max-w-none">{content.content}</div>
          )}
          {!content.content && content.sections && (
            <div>
              {/* Render JSON sections as needed */}
              <pre>{JSON.stringify(content.sections, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
