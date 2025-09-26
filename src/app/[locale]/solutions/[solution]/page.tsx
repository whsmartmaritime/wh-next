import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import fs from "fs/promises";
import path from "path";

interface Solution {
  meta: {
    title: string;
    description: string;
    ogImage?: string;
    canonical: string;
    slug: string;
  };
  hero: {
    titlePre: string;
    titleMain: string;
    subtitle: string;
    rightImageAlt?: string;
    description: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
  };
}

interface SolutionPageProps {
  params: {
    locale: "en" | "vi";
    solution: string;
  };
}

// Helper to load solution data
async function getSolution(
  locale: "en" | "vi",
  id: string
): Promise<Solution | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/solutions/${id}.json`
    );
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as Solution;
  } catch (error) {
    console.error(`Error loading solution ${id}:`, error);
    return null;
  }
}

// Get all available solution IDs
async function getSolutionIds(locale: "en" | "vi"): Promise<string[]> {
  try {
    const solutionsPath = path.join(
      process.cwd(),
      `messages/${locale}/solutions`
    );
    const files = await fs.readdir(solutionsPath);
    return files
      .filter((file) => file.endsWith(".json"))
      .map((file) => path.basename(file, ".json"));
  } catch (error) {
    console.error("Error loading solution IDs:", error);
    return [];
  }
}

// Generate static params for all solutions
export async function generateStaticParams() {
  const allSolutions = await Promise.all(
    routing.locales.map(async (locale) => {
      const solutions = await getSolutionIds(locale as "en" | "vi");
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

  // Load solution data and translations
  const solutionData = await getSolution(locale as "en" | "vi", solution);

  if (!solutionData) return {};

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  // Create alternate language URLs
  const languages = routing.locales
    .map((l) => ({
      [l]: new URL(`/${l}/solutions/${solution}`, base),
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const canonical = new URL(solutionData.meta.canonical, base);

  return {
    title: solutionData.meta.title,
    description: solutionData.meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: solutionData.meta.title,
      description: solutionData.meta.description,
      url: canonical.toString(),
      images: solutionData.meta.ogImage
        ? [
            {
              url: solutionData.meta.ogImage,
              width: 1200,
              height: 630,
              alt: solutionData.meta.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: solutionData.meta.title,
      description: solutionData.meta.description,
      images: solutionData.meta.ogImage
        ? [solutionData.meta.ogImage]
        : undefined,
    },
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { locale, solution } = params;

  // Load solution data and translations
  const [solutionData, t] = await Promise.all([
    getSolution(locale as "en" | "vi", solution),
    getTranslations({ locale, namespace: "solutions" }),
  ]);

  if (!solutionData) notFound();

  return (
    <>
      <div className="relative">
        <PageHero
          titlePre={solutionData.hero.titlePre}
          titleMain={solutionData.hero.titleMain}
          subtitle={solutionData.hero.subtitle}
          ctaPrimary={solutionData.hero.ctaPrimary}
          ctaSecondary={solutionData.hero.ctaSecondary}
        />
        <BackgroundGrid />
        <BackgroundScanline />
      </div>

      <div className="container mx-auto py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12">
            <p className="text-lg leading-relaxed">
              {solutionData.hero.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
