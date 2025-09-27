import type { Metadata } from "next";
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
      const categories = await getCategories(locale, 'solutions');
      return categories.map((solution) => ({ locale, solution }));
    })
  );
  return allParams.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await loadContent(params.locale, 'solutions', params.solution);
  
  return {
    title: content?.title || 'Solution not found',
    description: content?.description || '',
    openGraph: {
      title: content?.title || 'Solution not found',
      description: content?.description || '',
    },
  };
}

export default async function SolutionPage({ params }: Props) {
  const content = await loadContent(params.locale, 'solutions', params.solution);
  
  if (!content) return notFound();

  return (
    <>
      <BackgroundGrid />
      <BackgroundScanline />
      <main className="relative z-10">
        <PageHero
          titlePre={content.hero?.titlePre || ""}
          titleMain={content.hero?.titleMain || content.title}
          subtitle={content.hero?.subtitle || content.hero?.description || content.description}
        />
        
        <div className="container mx-auto px-4 py-16">
          {content.content && <div className="prose max-w-none">{content.content}</div>}
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