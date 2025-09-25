import fs from "fs/promises";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import type { Locale, Post, PostMeta } from "@/types/blog";
import { generateSlug } from "./utils";
import { getCategoryMetadata, type CategoryMetadata } from "./category";

// Constants
const POSTS_PATH = path.join(process.cwd(), "content/posts");
const MDX_PATTERN = "**/*.mdx";
const META_FOLDER = "_meta";
const DEFAULT_AUTHOR = "Anonymous";

// Types
interface FileInfo {
  locale: Locale;
  category: string;
  filePath: string;
}

interface PostFrontMatter {
  title: string;
  description?: string;
  publishedAt: string;
  author?: string;
  coverImage?: string;
  featured?: boolean;
  tags?: string[];
}

interface TranslationInfo {
  hasTranslation: boolean;
  translationSlug?: string;
}

interface ProcessedPost {
  frontMatter: PostFrontMatter;
  content: string;
  fileInfo: FileInfo;
  slug: string;
  translationInfo: TranslationInfo;
  categoryMeta: CategoryMetadata | null;
  readingTime: ReturnType<typeof readingTime>;
}

// Helper functions
const parseFilePath = (filePath: string): FileInfo | null => {
  try {
    const relativePath = path.relative(POSTS_PATH, filePath);
    const parts = relativePath.split(path.sep);

    // Skip _meta files
    if (parts.includes(META_FOLDER)) {
      return null;
    }

    // Get category from first part of path
    const category = parts[0];
    const fileName = path.basename(filePath);

    // Determine locale from filename
    const locale: Locale = fileName.startsWith("vi.") ? "vi" : "en";

    return {
      locale,
      category,
      filePath: relativePath,
    };
  } catch (error) {
    console.error(`Error parsing file path: ${error}`);
    return null;
  }
};

const getTranslationInfo = async (
  category: string,
  currentLocale: Locale,
  currentSlug: string
): Promise<TranslationInfo> => {
  const otherLocale = currentLocale === "en" ? "vi" : "en";
  try {
    const files = await glob(`${category}/**/${otherLocale}.mdx`, {
      cwd: POSTS_PATH,
      absolute: true,
    });

    for (const file of files) {
      const source = await fs.readFile(file, "utf8");
      const { data } = matter(source);
      const translationSlug = generateSlug(
        {
          title: data.title || path.basename(file, path.extname(file)),
        },
        "",
        file
      );

      if (translationSlug === currentSlug) {
        return { hasTranslation: true, translationSlug };
      }
    }
  } catch (error) {
    console.error(`Error checking translation: ${error}`);
  }

  return { hasTranslation: false };
};

const processPost = async (filePath: string): Promise<ProcessedPost | null> => {
  try {
    const fileInfo = parseFilePath(filePath);
    if (!fileInfo) return null;

    // Read and parse file
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    // Generate slug
    const slug = generateSlug(
      {
        title: data.title || path.basename(filePath, path.extname(filePath)),
      },
      content,
      filePath
    );

    // Get translation info
    const translationInfo = await getTranslationInfo(
      fileInfo.category,
      fileInfo.locale,
      slug
    );

    // Get category metadata
    const categoryMeta = await getCategoryMetadata(
      fileInfo.category,
      fileInfo.locale
    );

    return {
      frontMatter: {
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt || new Date().toISOString(),
        author: data.author,
        coverImage: data.coverImage,
        featured: data.featured,
        tags: data.tags,
      },
      content,
      fileInfo,
      slug,
      translationInfo,
      categoryMeta,
      readingTime: readingTime(content),
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
};

// Main functions
export const getPost = async (slug: string): Promise<Post | null> => {
  try {
    // Find all MDX files
    const files = await glob(MDX_PATTERN, {
      cwd: POSTS_PATH,
      absolute: true,
    });

    // Process files to find matching post
    for (const filePath of files) {
      const processed = await processPost(filePath);
      if (processed && processed.slug === slug) {
        // Compile MDX content
        const { content: mdxContent } = await compileMDX({
          source: processed.content,
          options: { parseFrontmatter: true },
        });

        return {
          title: processed.frontMatter.title,
          description: processed.frontMatter.description || "",
          publishedAt: processed.frontMatter.publishedAt,
          author: processed.frontMatter.author || DEFAULT_AUTHOR,
          coverImage: processed.frontMatter.coverImage,
          featured: processed.frontMatter.featured || false,
          category: processed.fileInfo.category,
          categoryMeta: processed.categoryMeta,
          locale: processed.fileInfo.locale,
          slug: processed.slug,
          content: mdxContent,
          readingTime: processed.readingTime,
          hasTranslation: processed.translationInfo.hasTranslation,
          translationSlug: processed.translationInfo.translationSlug,
          tags: processed.frontMatter.tags || [],
        };
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting post: ${error}`);
    return null;
  }
};

export const getAllPosts = async (): Promise<PostMeta[]> => {
  try {
    const files = await glob(MDX_PATTERN, {
      cwd: POSTS_PATH,
      absolute: true,
    });

    const processedPosts = await Promise.all(files.map(processPost));

    return processedPosts
      .filter((post): post is ProcessedPost => post !== null)
      .map((processed) => ({
        title: processed.frontMatter.title,
        description: processed.frontMatter.description || "",
        publishedAt: processed.frontMatter.publishedAt,
        author: processed.frontMatter.author || DEFAULT_AUTHOR,
        coverImage: processed.frontMatter.coverImage,
        featured: processed.frontMatter.featured || false,
        category: processed.fileInfo.category,
        categoryMeta: processed.categoryMeta,
        locale: processed.fileInfo.locale,
        slug: processed.slug,
        readingTime: processed.readingTime,
        hasTranslation: processed.translationInfo.hasTranslation,
        translationSlug: processed.translationInfo.translationSlug,
        tags: processed.frontMatter.tags || [],
      }))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  } catch (error) {
    console.error(`Error getting all posts: ${error}`);
    return [];
  }
};

export const getPostsByCategory = async (
  category: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const allPosts = await getAllPosts();
  return allPosts
    .filter((post) => post.category === category && post.locale === locale)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
};

export const getRelatedPosts = async (
  post: PostMeta,
  limit = 3
): Promise<PostMeta[]> => {
  const posts = await getAllPosts();
  const candidates = posts.filter(
    (p) => p.locale === post.locale && p.slug !== post.slug
  );

  return candidates
    .map((candidate) => ({
      post: candidate,
      score:
        (candidate.category === post.category ? 5 : 0) +
        candidate.tags.filter((t) => post.tags.includes(t)).length * 2,
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime()
    )
    .slice(0, limit)
    .map((s) => s.post);
};

export const getFeaturedPosts = async (
  locale: Locale,
  limit?: number
): Promise<PostMeta[]> => {
  const posts = await getAllPosts();
  const featured = posts
    .filter((post) => post.featured && post.locale === locale)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return limit ? featured.slice(0, limit) : featured;
};
