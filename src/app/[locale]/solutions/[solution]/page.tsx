import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import PostCard from "@/components/PostCard/PostCard";
import {
  featureByCategory,
  entriesByCategory,
  type Locales,
  type PostEntry,
} from "@/lib/postIndex.generated";

export function generateStaticParams() {
  // Lấy tất cả solution keys từ pathnames
  const solutionPaths = Object.keys(routing.pathnames).filter(
    (key) => key.startsWith("/solutions/") && key.split("/").length === 3
  );
  return routing.locales.flatMap((locale) =>
    solutionPaths.map((pathKey) => {
      const solution = pathKey.split("/")[2]; // lấy slug
      return { locale, solution };
    })
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; solution: string }>;
}): Promise<Metadata> {
  const { locale, solution } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: `solutions/${solution}`,
  });
  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");

  const base = new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  );

  const url = new URL(`${locale}/solutions/${solution}`, base);
  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      (routing.pathnames as Record<string, { [key: string]: string }>)[
        `/solutions/${solution}`
      ]?.[l],
    ])
  );
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function SolutionPage(props: {
  params: Promise<{ locale: string; solution: string }>;
}) {
  const { locale, solution } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: `solutions/${solution}`,
  });

  const l = locale as Locales;
  // Cho phép index bằng string mà không dùng any
  const featureMap = featureByCategory as unknown as Record<
    Locales,
    Record<string, PostEntry | null>
  >;
  const entriesMap = entriesByCategory as unknown as Record<
    Locales,
    Record<string, ReadonlyArray<PostEntry>>
  >;

  const feature = featureMap[l]?.[solution] ?? null;
  const items = entriesMap[l]?.[solution] ?? [];

  return (
    <>
      <header className="container-gutter py-10">
        <h1 className="text-3xl font-bold text-neutral-100">
          {t("hero.titleMain")}
        </h1>
        <p className="mt-3 text-neutral-300">{t("hero.description")}</p>
      </header>

      {feature || items.length > 0 ? (
        <section className="container-gutter py-8" aria-label="Category posts">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {feature ? (
              <PostCard
                entry={feature}
                variant="featured"
                className="lg:col-span-3"
              />
            ) : null}
            {items.map((p: PostEntry) => (
              <PostCard key={p.route} entry={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
