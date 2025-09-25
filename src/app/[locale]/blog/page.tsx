import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { paginatePosts, getFeaturedPosts, getAllPosts } from "@/lib/blog/mdx";
import BackgroundGrid from "@/components/BackgroundGrid";
import { BackgroundScanline } from "@/components/BackgroundScanline";
import Link from "next/link";
import Image from "next/image";
interface BlogPageProps {
  params: {
    locale: "en" | "vi";
  };
  searchParams: {
    page?: string;
    category?: string;
    tag?: string;
    author?: string;
    search?: string;
  };
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  // Parallel translation loading for better performance
  const translations = await Promise.all(
    routing.locales.map((l) =>
      getTranslations({ locale: l, namespace: "blog" })
    )
  );

  const currentIndex = routing.locales.indexOf(locale as "en" | "vi");
  const t = translations[currentIndex];

  const title = t("meta.title");
  const description = t("meta.description");
  const ogImage = t("meta.ogImage");
  const canonical = t("meta.canonical");

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );
  const url = new URL(canonical, base);

  // Create alternate language URLs from pre-defined canonicals
  const languages = Object.fromEntries(
    routing.locales.map((l, index) => [
      l,
      new URL(translations[index]("meta.canonical"), base),
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: { index: false, follow: false }, // Ngăn bot index trang này
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: BlogPageProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const resolvedSearchParams = searchParams || {};
  const currentPage = parseInt(resolvedSearchParams.page || "1");
  const postsPerPage = 12;

  // Get content
  let posts = getAllPosts(locale);

  // Apply filters
  if (resolvedSearchParams.category) {
    posts = posts.filter(
      (p) => p.frontmatter.category === resolvedSearchParams.category
    );
  }
  if (resolvedSearchParams.tag) {
    posts = posts.filter((p) =>
      p.frontmatter.tags.includes(resolvedSearchParams.tag!)
    );
  }
  if (resolvedSearchParams.author) {
    posts = posts.filter(
      (p) => p.frontmatter.author === resolvedSearchParams.author
    );
  }
  if (resolvedSearchParams.search) {
    const term = resolvedSearchParams.search.toLowerCase();
    posts = posts.filter((p) =>
      [p.frontmatter.title, p.excerpt, p.frontmatter.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }
  const featuredPost = getFeaturedPosts(1, locale)[0]; // Lấy phần tử đầu tiên
  paginatePosts(posts, currentPage, postsPerPage); // keep call in case pagination logic is used later

  return (
    <>
      <section className="relative container-gutter">
        <BackgroundGrid />
        <div className="grid grid-cols-12 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-6 ">
            {t("hero.title")}
          </h1>
          <p className="col-span-12 lg:col-span-3 lg:col-start-10 text-lg lg:text-xl text-muted-foreground text-justify whitespace-pre-line  max-w-2xl">
            {t.rich("hero.desc", {
              bold: (chunks) => <strong className="font-bold">{chunks}</strong>,
            })}
          </p>
        </div>
      </section>
      {/* Featured Posts Section */}
      {featuredPost && (
        <section
          className="relative container-gutter"
          aria-label="Blog featured post"
        >
          <BackgroundGrid />
          <Link
            href={`/blog/${featuredPost.slug}`}
            aria-label={`Read ${featuredPost.frontmatter.title}`}
            className="block"
          >
            <div className="relative  grid grid-cols-12">
              <BackgroundScanline
                crosshairs={["top-right", "bottom-left"]}
                className="absolute inset-0 border border-neutral-500/20 bg-background"
                opacity={0.1}
              />
              <div className="relative col-span-12 lg:col-span-6 aspect-[16/10] m-8 lg:m-12">
                <Image
                  src={
                    featuredPost.frontmatter.coverImage ??
                    "/images/blog/default.jpg"
                  }
                  alt={featuredPost.frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="col-span-12 lg:col-span-6 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-4xl font-bold">
                  {featuredPost.frontmatter.title}
                </h2>
                <p className="">
                  {new Date(
                    featuredPost.frontmatter.publishedAt
                  ).toLocaleDateString(locale)}
                </p>
                <p className="mt-4">{featuredPost.frontmatter.author}</p>
              </div>
            </div>
          </Link>
        </section>
      )}
      <section
        className="relative container-gutter"
        aria-label="Blog post list"
      ></section>
    </>
  );
}
