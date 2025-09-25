import fs from "fs/promises";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactElement } from "react";
import type { Locale, Post, PostMeta } from "@/types/blog";
import { generateSlug } from "./utils";

// Constants
const POSTS_PATH = path.join(process.cwd(), "content/posts");
const MDX_PATTERN = "**/{en,vi}.mdx";
const DEFAULT_AUTHOR = "Anonymous";

// Types
interface FileInfo {
  locale: Locale;
  category: string;
  folderPath: string;
}

interface TranslationInfo {
  hasTranslation: boolean;
  translationSlug?: string;
}

interface ProcessedPost {
  frontmatter: Record<string, unknown>;
  content: string;
  fileInfo: FileInfo;
  slug: string;
  translationInfo: TranslationInfo;
  readingTime: ReturnType<typeof readingTime>;
}

// Helper functions
const getFileInfo = (filePath: string): FileInfo => {
  const relativePath = path.relative(POSTS_PATH, filePath);
  const pathParts = relativePath.split("/");
  return {
    locale: path.basename(filePath, ".mdx") as Locale,
    category: pathParts[0],
    folderPath: path.dirname(filePath),
  };
};

const getTranslationInfo = async (
  locale: Locale,
  folderPath: string
): Promise<TranslationInfo> => {
  const otherLocale = locale === "en" ? "vi" : "en";
  const translationPath = path.join(folderPath, `${otherLocale}.mdx`);

  try {
    const source = await fs.readFile(translationPath, "utf8");
    const { data, content } = matter(source);
    const translationSlug = generateSlug(data, content, translationPath);
    return { hasTranslation: true, translationSlug };
  } catch {
    return { hasTranslation: false };
  }
};

const createPostMeta = (processed: ProcessedPost): PostMeta => ({
  locale: processed.fileInfo.locale,
  slug: processed.slug,
  title: String(processed.frontmatter.title || "Untitled"),
  description: String(
    processed.frontmatter.description || processed.frontmatter.excerpt || ""
  ),
  publishedAt: String(
    processed.frontmatter.publishedAt || new Date().toISOString()
  ),
  author: String(processed.frontmatter.author || DEFAULT_AUTHOR),
  category: processed.fileInfo.category,
  tags: Array.isArray(processed.frontmatter.tags)
    ? processed.frontmatter.tags.map(String)
    : [],
  featured: Boolean(processed.frontmatter.featured),
  draft: Boolean(processed.frontmatter.draft),
  coverImage: processed.frontmatter.coverImage
    ? String(processed.frontmatter.coverImage)
    : undefined,
  hasTranslation: processed.translationInfo.hasTranslation,
  translationSlug: processed.translationInfo.translationSlug,
  readingTime: {
    text: processed.readingTime.text,
    minutes: Math.ceil(processed.readingTime.minutes),
    words: processed.readingTime.words,
  },
});

const sortPostsByDate = (a: PostMeta, b: PostMeta): number =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

const checkDuplicateSlugs = (posts: PostMeta[]): void => {
  const slugs = posts.reduce<Record<string, string[]>>((acc, post) => {
    const key = `${post.locale}-${post.slug}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(post.title);
    return acc;
  }, {});

  const duplicates = Object.entries(slugs)
    .filter(([, titles]) => titles.length > 1)
    .map(([key, titles]) => `${key}: ${titles.join(", ")}`);

  if (duplicates.length > 0) {
    throw new Error(`Duplicate slugs found:\n${duplicates.join("\n")}`);
  }
};

// Main functions
const processFile = async (filePath: string): Promise<ProcessedPost | null> => {
  try {
    // Read and parse file
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const fileInfo = getFileInfo(filePath);

    // Generate slug
    const slug = generateSlug(data, content, filePath);

    // Get translation info
    const translationInfo = await getTranslationInfo(
      fileInfo.locale,
      fileInfo.folderPath
    );

    return {
      frontmatter: data,
      content,
      fileInfo,
      slug,
      translationInfo,
      readingTime: readingTime(content),
    };
  } catch (error) {
    console.warn(`Error processing ${filePath}:`, error);
    return null;
  }
};

export const getPostMeta = async (slug: string): Promise<PostMeta | null> => {
  const allPosts = await getAllPostMeta();
  return allPosts.find((post) => post.slug === slug) || null;
};

export const getAllPostMeta = async (): Promise<PostMeta[]> => {
  const mdxFiles = await glob(MDX_PATTERN, { cwd: POSTS_PATH, absolute: true });
  const processedPosts = await Promise.all(mdxFiles.map(processFile));
  const validPosts = processedPosts
    .filter((post): post is ProcessedPost => post !== null)
    .map(createPostMeta);

  checkDuplicateSlugs(validPosts);
  return validPosts.sort(sortPostsByDate);
};

export const getPostContent = async (
  slug: string
): Promise<ReactElement | null> => {
  const meta = await getPostMeta(slug);
  if (!meta) return null;

  const filePath = path.join(POSTS_PATH, meta.category, `${meta.locale}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf8");
    const { content } = matter(source);
    const { content: compiled } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true },
    });

    return compiled;
  } catch {
    return null;
  }
};

export const getPost = async (slug: string): Promise<Post | null> => {
  const [meta, content] = await Promise.all([
    getPostMeta(slug),
    getPostContent(slug),
  ]);

  if (!meta || !content) return null;
  return { ...meta, content };
};

export const getPostsByCategory = async (
  category: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const allPosts = await getAllPostMeta();
  return allPosts
    .filter((post) => post.category === category && post.locale === locale)
    .sort(sortPostsByDate);
};

export const getFeaturedPosts = async (
  locale: Locale,
  limit?: number
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  const featured = posts
    .filter((post) => post.featured && post.locale === locale)
    .sort(sortPostsByDate);

  return limit ? featured.slice(0, limit) : featured;
};

export const getRelatedPosts = async (
  post: PostMeta,
  limit = 3
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  const candidates = posts.filter(
    (p) => p.locale === post.locale && p.slug !== post.slug
  );

  const scored = candidates.map((p) => ({
    post: p,
    score:
      (p.category === post.category ? 5 : 0) +
      p.tags.filter((t) => post.tags.includes(t)).length * 2,
  }));

  return scored
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.publishedAt).getTime() -
          new Date(a.post.publishedAt).getTime()
    )
    .slice(0, limit)
    .map((s) => s.post);
};

export const searchPosts = async (
  query: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  const searchTerm = query.toLowerCase();

  return posts
    .filter((post) => {
      if (post.locale !== locale) return false;

      const searchableContent = [post.title, post.description, ...post.tags]
        .join(" ")
        .toLowerCase();

      return searchableContent.includes(searchTerm);
    })
    .sort(sortPostsByDate);
};
