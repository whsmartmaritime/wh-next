import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  Post,
  PostMatter,
  Category,
  CategoryMatter,
  Author,
  AuthorMatter,
  BilingualPost,
  BilingualPostMatter,
} from "@/types/blog";

const contentDirectory = path.join(process.cwd(), "content");
const postsDirectory = path.join(contentDirectory, "posts");
const categoriesDirectory = path.join(contentDirectory, "categories");
const authorsDirectory = path.join(contentDirectory, "authors");

// Utility functions with locale support
export function getContentSlugs(
  directory: string,
  locale?: "en" | "vi"
): string[] {
  const targetDir = locale ? path.join(directory, locale) : directory;
  if (!fs.existsSync(targetDir)) {
    return [];
  }

  const slugs: string[] = [];
  const stack = [targetDir];

  while (stack.length) {
    const dir = stack.pop()!;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) stack.push(fullPath);
      else if (entry.isFile() && entry.name.endsWith(".mdx")) {
        const rel = path.relative(targetDir, fullPath).replace(/\\/g, "/");
        slugs.push(rel.replace(/\.mdx$/, ""));
      }
    }
  }

  return slugs;
}

export function getPostSlugs(locale?: "en" | "vi"): string[] {
  return getContentSlugs(postsDirectory, locale);
}

export function getCategorySlugs(locale?: "en" | "vi"): string[] {
  return getContentSlugs(categoriesDirectory, locale);
}

export function getAuthorSlugs(locale?: "en" | "vi"): string[] {
  return getContentSlugs(authorsDirectory, locale);
}

// Post functions
export function getPostBySlug(slug: string, locale?: "en" | "vi"): Post | null {
  try {
    const localeDir = locale || "en";
    const fullPath = path.join(postsDirectory, localeDir, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as PostMatter;

    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null;
    }

    // Skip draft posts in production
    if (process.env.NODE_ENV === "production" && frontmatter.draft) {
      return null;
    }

    const stats = readingTime(content);

    // Generate excerpt from content if not provided
    const excerpt =
      frontmatter.excerpt ||
      content
        .replace(/#+\s/g, "") // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1") // Remove italic
        .replace(/`(.*?)`/g, "$1") // Remove code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
        .slice(0, 160) + "...";

    return {
      slug,
      frontmatter,
      content,
      readingTime: stats,
      excerpt,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(locale?: "en" | "vi"): Post[] {
  const slugs = getPostSlugs(locale);

  return slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
}

export function getFeaturedPosts(
  limit: number = 3,
  locale?: "en" | "vi"
): Post[] {
  return getAllPosts(locale)
    .filter((post) => post.frontmatter.featured === true)
    .slice(0, limit);
}

export function getPostsByCategory(
  categorySlug: string,
  locale?: "en" | "vi"
): Post[] {
  return getAllPosts(locale).filter(
    (post) => post.frontmatter.category === categorySlug
  );
}

export function getPostsByTag(tag: string, locale?: "en" | "vi"): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.frontmatter.tags.includes(tag)
  );
}

export function getPostsByAuthor(
  authorSlug: string,
  locale?: "en" | "vi"
): Post[] {
  return getAllPosts(locale).filter(
    (post) => post.frontmatter.author === authorSlug
  );
}

export function getRecentPosts(
  limit: number = 5,
  locale?: "en" | "vi"
): Post[] {
  return getAllPosts(locale).slice(0, limit);
}

export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts(currentPost.frontmatter.locale).filter(
    (post) => post.slug !== currentPost.slug
  );

  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map((post) => {
    let score = 0;

    // Same category gets high score
    if (post.frontmatter.category === currentPost.frontmatter.category) {
      score += 10;
    }

    // Shared tags get score
    const sharedTags = post.frontmatter.tags.filter((tag) =>
      currentPost.frontmatter.tags.includes(tag)
    );
    score += sharedTags.length * 3;

    return { post, score };
  });

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

// Category functions
export function getCategoryBySlug(
  slug: string,
  locale?: "en" | "vi"
): Category | null {
  try {
    const localeDir = locale || "en";
    const fullPath = path.join(categoriesDirectory, localeDir, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as CategoryMatter;

    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null;
    }

    const postCount = getPostsByCategory(slug, locale).length;

    return {
      slug,
      frontmatter,
      content,
      postCount,
    };
  } catch (error) {
    console.error(`Error reading category ${slug}:`, error);
    return null;
  }
}

export function getAllCategories(locale?: "en" | "vi"): Category[] {
  const slugs = getCategorySlugs(locale);

  return slugs
    .map((slug) => getCategoryBySlug(slug, locale))
    .filter((category): category is Category => category !== null)
    .sort((a, b) => b.postCount - a.postCount);
}

// Author functions
export function getAuthorBySlug(
  slug: string,
  locale?: "en" | "vi"
): Author | null {
  try {
    const localeDir = locale || "en";
    const fullPath = path.join(authorsDirectory, localeDir, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as AuthorMatter;

    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null;
    }

    const postCount = getPostsByAuthor(slug, locale).length;

    return {
      slug,
      frontmatter,
      content,
      postCount,
    };
  } catch (error) {
    console.error(`Error reading author ${slug}:`, error);
    return null;
  }
}

export function getAllAuthors(locale?: "en" | "vi"): Author[] {
  const slugs = getAuthorSlugs(locale);

  return slugs
    .map((slug) => getAuthorBySlug(slug, locale))
    .filter((author): author is Author => author !== null)
    .sort((a, b) => b.postCount - a.postCount);
}

// Search and utility functions
export function searchPosts(query: string, locale?: "en" | "vi"): Post[] {
  const allPosts = getAllPosts(locale);
  const searchTerm = query.toLowerCase();

  return allPosts.filter((post) => {
    const searchableContent = [
      post.frontmatter.title,
      post.excerpt,
      post.frontmatter.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return searchableContent.includes(searchTerm);
  });
}

export function getAllTags(
  locale?: "en" | "vi"
): Array<{ tag: string; count: number }> {
  const allPosts = getAllPosts(locale);
  const tagCounts: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByYear(year: string, locale?: "en" | "vi"): Post[] {
  return getAllPosts(locale).filter((post) => {
    const postYear = new Date(post.frontmatter.publishedAt)
      .getFullYear()
      .toString();
    return postYear === year;
  });
}

// Bilingual post functions
export function getBilingualPostByFilename(
  filename: string
): BilingualPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${filename}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const frontmatter = data as BilingualPostMatter;

    // Skip draft posts in production
    if (process.env.NODE_ENV === "production" && frontmatter.draft) {
      return null;
    }

    // Extract content by locale using simple regex
    const enContentMatch = content.match(
      /<ContentByLocale\s+locale=["']en["']>([\s\S]*?)<\/ContentByLocale>/
    );
    const viContentMatch = content.match(
      /<ContentByLocale\s+locale=["']vi["']>([\s\S]*?)<\/ContentByLocale>/
    );

    const enContent = enContentMatch ? enContentMatch[1].trim() : "";
    const viContent = viContentMatch ? viContentMatch[1].trim() : "";

    // Generate reading time for both languages
    const enReadingTime = readingTime(enContent);
    const viReadingTime = readingTime(viContent);

    // Generate excerpts
    const generateExcerpt = (text: string) =>
      text
        .replace(/#+\s/g, "") // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
        .replace(/\*(.*?)\*/g, "$1") // Remove italic
        .replace(/`(.*?)`/g, "$1") // Remove code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links
        .slice(0, 160) + "...";

    const enExcerpt = frontmatter.excerpt?.en || generateExcerpt(enContent);
    const viExcerpt = frontmatter.excerpt?.vi || generateExcerpt(viContent);

    return {
      slugs: frontmatter.slug,
      frontmatter,
      content: {
        en: enContent,
        vi: viContent,
      },
      readingTime: {
        en: enReadingTime,
        vi: viReadingTime,
      },
      excerpt: {
        en: enExcerpt,
        vi: viExcerpt,
      },
    };
  } catch (error) {
    console.error(`Error reading bilingual post ${filename}:`, error);
    return null;
  }
}

export function getBilingualPostBySlug(
  slug: string,
  locale?: "en" | "vi"
): Post | null {
  const slugs = getPostSlugs();

  // Find the file that contains this slug
  for (const filename of slugs) {
    const bilingualPost = getBilingualPostByFilename(filename);
    if (!bilingualPost) continue;

    // Check if this bilingual post contains the requested slug
    if (bilingualPost.slugs.en === slug || bilingualPost.slugs.vi === slug) {
      // Determine which locale this slug belongs to
      const targetLocale = bilingualPost.slugs.en === slug ? "en" : "vi";

      // If locale is specified and doesn't match, return null
      if (locale && locale !== targetLocale) {
        return null;
      }

      // Convert bilingual post to single locale post
      return {
        slug: slug,
        frontmatter: {
          title: bilingualPost.frontmatter.title[targetLocale],
          excerpt: bilingualPost.excerpt[targetLocale],
          publishedAt: bilingualPost.frontmatter.publishedAt,
          updatedAt: bilingualPost.frontmatter.updatedAt,
          category: bilingualPost.frontmatter.category,
          tags: bilingualPost.frontmatter.tags[targetLocale],
          author: bilingualPost.frontmatter.author,
          coverImage: bilingualPost.frontmatter.coverImage,
          featured: bilingualPost.frontmatter.featured,
          draft: bilingualPost.frontmatter.draft,
          locale: targetLocale,
          translations: {
            en: bilingualPost.slugs.en,
            vi: bilingualPost.slugs.vi,
          },
          seo: bilingualPost.frontmatter.seo?.[targetLocale],
        },
        content: bilingualPost.content[targetLocale],
        readingTime: bilingualPost.readingTime[targetLocale],
        excerpt: bilingualPost.excerpt[targetLocale],
      };
    }
  }

  return null;
}

export function getAllBilingualPosts(): BilingualPost[] {
  const slugs = getPostSlugs();

  return slugs
    .map((slug) => getBilingualPostByFilename(slug))
    .filter((post): post is BilingualPost => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt);
      const dateB = new Date(b.frontmatter.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });
}

// Enhanced getPostBySlug that checks both legacy and bilingual formats
export function getPostBySlugEnhanced(
  slug: string,
  locale?: "en" | "vi"
): Post | null {
  // First try bilingual format
  const bilingualPost = getBilingualPostBySlug(slug, locale);
  if (bilingualPost) {
    return bilingualPost;
  }

  // Fall back to legacy format
  return getPostBySlug(slug, locale);
}

// Pagination utility
export function paginatePosts(
  posts: Post[],
  page: number = 1,
  postsPerPage: number = 10
) {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: posts.slice(startIndex, endIndex),
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1,
  };
}
