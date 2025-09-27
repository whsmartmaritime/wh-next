import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PageHero } from "@/components/PageHero";
import { BackgroundGrid } from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import { loadContent, getMDXSlugs, type MDXContent } from "@/i18n";

interface SubPageProps {
  params: {
    locale: string;
    solution: string;
    slug: string;
  };
}

// Generate static params for all MDX sub-pages
export async function generateStaticParams() {
  const allSubPages = await Promise.all(
    routing.locales.map(async (locale) => {
      // Common solution categories - you may want to make this dynamic
      const categories = ["navigation", "gmdss"]; // Add more as needed

      const subPages = await Promise.all(
        categories.map(async (solution) => {
          const slugs = await getMDXSlugs(locale, "solutions", solution);
          return slugs.map((slug) => ({
            locale,
            solution,
            slug,
          }));
        })
      );

      return subPages.flat();
    })
  );

  return allSubPages.flat();
}

export async function generateMetadata({
  params,
}: SubPageProps): Promise<Metadata> {
  const { locale, solution, slug } = params;

  const content = await loadContent({
    locale,
    section: "solutions",
    category: solution,
    slug,
  });

  if (!content || content.type !== "mdx") {
    return {
      title: "Page not found",
    };
  }

  const mdxContent = content as MDXContent;

  return {
    title: mdxContent.meta.title,
    description: mdxContent.meta.description,
    openGraph: {
      title: mdxContent.meta.title,
      description: mdxContent.meta.description,
      images: mdxContent.meta.ogImage ? [mdxContent.meta.ogImage] : [],
    },
  };
}

export default async function SubPage({ params }: SubPageProps) {
  const { locale, solution, slug } = params;

  const content = await loadContent({
    locale,
    section: "solutions",
    category: solution,
    slug,
  });

  if (!content || content.type !== "mdx") {
    return notFound();
  }

  const mdxContent = content as MDXContent;
  const t = await getTranslations("solutions");

  return (
    <>
      <BackgroundGrid />
      <BackgroundScanline />

      <main className="relative z-10">
        <PageHero
          titlePre=""
          titleMain={mdxContent.meta.title}
          subtitle={mdxContent.meta.description}
        />

        <article className="container mx-auto px-4 py-16">
          <div className="prose prose-lg max-w-none">{mdxContent.content}</div>

          {/* Additional metadata */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {mdxContent.meta.publishedAt && (
                <span>
                  Published:{" "}
                  {new Date(mdxContent.meta.publishedAt).toLocaleDateString(
                    locale
                  )}
                </span>
              )}
              {mdxContent.meta.author && (
                <span>By: {mdxContent.meta.author}</span>
              )}
              {mdxContent.meta.category && (
                <span>Category: {mdxContent.meta.category}</span>
              )}
            </div>

            {mdxContent.meta.tags && mdxContent.meta.tags.length > 0 && (
              <div className="mt-4">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Tags:
                </span>
                {mdxContent.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
