import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { loadContent, getJSONCategories, type JSONContent } from "@/i18n";

interface SolutionPageProps {
  params: {
    locale: "en" | "vi";
    solution: string;
  };
}

// Generate static params for all solutions
export async function generateStaticParams() {
  const allSolutions = await Promise.all(
    routing.locales.map(async (locale) => {
      const solutions = await getJSONCategories(locale, "solutions");
      return solutions.map((solution) => ({
        locale,
        solution,
      }));
    })
  );
  return allSolutions.flat();
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { locale, solution } = params;

  const content = await loadContent({
    locale,
    section: "solutions",
    category: solution,
  });

  if (!content || content.type !== "json") {
    return {
      title: "Solution not found",
    };
  }

  const jsonContent = content as JSONContent;

  return {
    title: jsonContent.meta.title,
    description: jsonContent.meta.description,
    openGraph: {
      title: jsonContent.meta.title,
      description: jsonContent.meta.description,
      images: jsonContent.meta.ogImage ? [jsonContent.meta.ogImage] : [],
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { locale, solution } = params;

  const content = await loadContent({
    locale,
    section: "solutions",
    category: solution,
  });

  if (!content || content.type !== "json") {
    return notFound();
  }

  const jsonContent = content as JSONContent;
  const t = await getTranslations("solutions");

  return (
    <>
      <BackgroundGrid />
      <BackgroundScanline />

      <main className="relative z-10">
        <PageHero
          titlePre={jsonContent.hero?.titlePre || ""}
          titleMain={jsonContent.hero?.titleMain || jsonContent.meta.title}
          subtitle={
            jsonContent.hero?.subtitle ||
            jsonContent.hero?.description ||
            jsonContent.meta.description
          }
          rightImageAlt={jsonContent.hero?.rightImageAlt}
          ctaPrimary={jsonContent.hero?.ctaPrimary}
          ctaSecondary={jsonContent.hero?.ctaSecondary}
        />

        <div className="container mx-auto px-4 py-16">
          {/* Render additional JSON sections if available */}
          {jsonContent.sections && jsonContent.sections.length > 0 && (
            <div className="prose max-w-none">
              {jsonContent.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  {/* Add custom rendering logic for different section types */}
                  <pre>{JSON.stringify(section, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
