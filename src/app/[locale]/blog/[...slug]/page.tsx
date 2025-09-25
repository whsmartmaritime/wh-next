import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPost, getRelatedPosts } from "@/lib/blog/mdx";
import { mdxComponents } from "@/components/blog/MDXComponents";
import BackgroundGrid from "@/components/BackgroundGrid";

interface BlogPostPageProps {
  params: {
    locale: "en" | "vi";
    slug: string[];
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = params;
  const [category, ...postSlugParts] = slug;
  const postSlug = postSlugParts.join("/");

  // Get post
  const post = await getPost(postSlug);
  if (!post || post.category !== category) return {};

  // Load translations
  const t = await getTranslations({ locale, namespace: "blog" });

  const base = new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  );

  // Create alternate language URLs if translation exists
  const languages = post.hasTranslation
    ? {
        [post.locale]: new URL(
          `/${post.locale}/blog/${post.category}/${post.slug}`,
          base
        ),
        [post.locale === "en" ? "vi" : "en"]: new URL(
          `/${post.locale === "en" ? "vi" : "en"}/blog/${post.category}/${
            post.translationSlug
          }`,
          base
        ),
      }
    : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: new URL(`/${locale}/blog/${post.category}/${post.slug}`, base),
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = params;
  const [category, ...postSlugParts] = slug;
  const postSlug = postSlugParts.join("/");

  // Get post and translations
  const [post, t] = await Promise.all([
    getPost(postSlug),
    getTranslations({ locale, namespace: "blog" }),
  ]);

  // Verify category matches
  if (!post || post.category !== category) notFound();

  if (!post) notFound();

  // Lấy các bài viết liên quan
  const relatedPosts = await getRelatedPosts(post);

  return (
    <article className="relative">
      {/* Hero Section */}
      <section className="relative container-gutter">
        <BackgroundGrid />
        <div className="grid grid-cols-12 py-12 lg:py-16 gap-8">
          {/* Metadata */}
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <div className="flex flex-col gap-4">
              {/* Category & Date */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{t(`categories.${post.category}`)}</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-6xl font-bold">{post.title}</h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>

              {/* Author & Reading Time */}
              <div className="flex items-center gap-4 text-sm">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readingTime?.text}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative container-gutter">
        <div className="grid grid-cols-12 py-8">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 prose dark:prose-invert max-w-none">
            {/* Render MDX content with our custom components */}
            {post.content}
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="relative container-gutter py-16">
          <BackgroundGrid />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12">
              <h2 className="text-2xl font-bold mb-8">
                {t("post.relatedPosts")}
              </h2>
            </div>
            {relatedPosts.map((relatedPost) => (
              // Add your PostCard component here
              <div key={relatedPost.slug} className="col-span-12 md:col-span-4">
                {/* Implement your PostCard component */}
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
