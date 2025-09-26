import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import path from "path";
import fs from "fs/promises";
import { compileMDX } from "next-mdx-remote/rsc";
import { components } from "@/components/mdx";

interface SubPageProps {
  params: {
    locale: string;
    solution: string;
    slug: string;
  };
}

async function getSubPageContent(
  locale: string,
  solution: string,
  slug: string
) {
  try {
    const filePath = path.join(
      process.cwd(),
      `messages/${locale}/solutions/${solution}/${slug}.mdx`
    );
    const source = await fs.readFile(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX({
      source,
      components,
      options: {
        parseFrontmatter: true,
      },
    });

    return {
      content,
      frontmatter: frontmatter as {
        title: string;
        description: string;
        date?: string;
        image?: string;
      },
    };
  } catch (error) {
    console.error("Error loading sub-page content:", error);
    return null;
  }
}

async function getAllSlugs(locale: string, solution: string) {
  try {
    const solutionPath = path.join(
      process.cwd(),
      `messages/${locale}/solutions/${solution}`
    );
    const files = await fs.readdir(solutionPath);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error loading slugs:", error);
    return [];
  }
}

export async function generateStaticParams({
  params: { solution },
}: {
  params: { solution: string };
}) {
  const allSlugs = await Promise.all(
    routing.locales.map(async (locale) => {
      const slugs = await getAllSlugs(locale, solution);
      return slugs.map((slug) => ({
        locale,
        solution,
        slug,
      }));
    })
  );
  return allSlugs.flat();
}

export async function generateMetadata({
  params,
}: SubPageProps): Promise<Metadata> {
  const { locale, solution, slug } = params;
  const pageData = await getSubPageContent(locale, solution, slug);

  if (!pageData) return {};

  const { frontmatter } = pageData;
  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );
  const url = new URL(`/${locale}/solutions/${solution}/${slug}`, base);

  // Create alternate language URLs
  const languages = routing.locales
    .map((l) => ({
      [l]: new URL(`/${l}/solutions/${solution}/${slug}`, base),
    }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: url.toString(),
      images: frontmatter.image
        ? [
            {
              url: frontmatter.image,
              width: 1200,
              height: 630,
              alt: frontmatter.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.image ? [frontmatter.image] : undefined,
    },
  };
}

export default async function SubPage({ params }: SubPageProps) {
  const { locale, solution, slug } = params;
  const pageData = await getSubPageContent(locale, solution, slug);

  if (!pageData) notFound();

  const { content, frontmatter } = pageData;

  return (
    <>
      <div className="relative">
        <PageHero
          titlePre={solution.toUpperCase()}
          titleMain={frontmatter.title}
          subtitle={frontmatter.description}
        />
        <BackgroundGrid />
        <BackgroundScanline />
      </div>

      <div className="container mx-auto py-8">
        <article className="prose dark:prose-invert max-w-none">
          {content}
        </article>
      </div>
    </>
  );
}
