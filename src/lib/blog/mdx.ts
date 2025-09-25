import fs from "fs/promises";
import * as fsSync from "fs";
import path from "path";
import glob from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import { type ReactElement } from "react";
import type { Locale, Post, PostMeta } from "@/types/blog";

// Đường dẫn tới thư mục chứa bài viết
const POSTS_PATH = path.join(process.cwd(), "content/posts");

/**
 * Lấy metadata của một bài viết
 */
export const getPostMeta = async (slug: string): Promise<PostMeta | null> => {
  const allPosts = await getAllPostMeta();
  return allPosts.find((post) => post.slug === slug) || null;
};

// Hàm helper để sort bài viết theo ngày
const sortPostsByDate = (a: PostMeta, b: PostMeta): number => {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
};

export const getAllPostMeta = async (): Promise<PostMeta[]> => {
  const mdxFiles = await glob("**/[en|vi].mdx", {
    cwd: POSTS_PATH,
    absolute: true,
  });

  // Đọc và parse frontmatter
  const posts = await Promise.all(
    mdxFiles.map(async (filePath) => {
      // Đọc file
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);

      // Lấy thông tin từ đường dẫn
      const relativePath = path.relative(POSTS_PATH, filePath);
      const locale = path.basename(filePath, ".mdx") as Locale;
      const category = relativePath.split("/")[0];
      const folderPath = path.dirname(filePath);

      // Kiểm tra bản dịch
      const otherLocale = locale === "en" ? "vi" : "en";
      const translationPath = path.join(folderPath, `${otherLocale}.mdx`);
      const hasTranslation = await fs
        .stat(translationPath)
        .then(() => true)
        .catch(() => false);

      // Lấy slug của bản dịch nếu có
      let translationSlug: string | undefined;
      if (hasTranslation) {
        const translationSource = await fs.readFile(translationPath, "utf8");
        const { data: translationData } = matter(translationSource);
        translationSlug = translationData.slug;
      }

      // Tính reading time
      const stats = readingTime(content);

      return {
        ...data,
        locale,
        category,
        hasTranslation,
        translationSlug,
        readingTime: {
          text: stats.text,
          minutes: Math.ceil(stats.minutes),
          words: stats.words,
        },
      } as PostMeta;
    })
  );

  // Sort bài viết theo ngày
  return posts.sort(sortPostsByDate);
};

/**
 * Lấy nội dung của một bài viết
 */
export const getPostContent = async (
  slug: string
): Promise<ReactElement | null> => {
  // Lấy metadata để biết locale
  const meta = await getPostMeta(slug);
  if (!meta) return null;

  // Tìm file MDX
  const mdxFiles = await glob(`**/${meta.locale}.mdx`, {
    cwd: POSTS_PATH,
    absolute: true,
  });

  // Tìm file tương ứng
  const filePath = mdxFiles.find((file) => {
    const source = fsSync.readFileSync(file, "utf8");
    const { data } = matter(source);
    return data.slug === slug;
  });

  if (!filePath) return null;

  // Đọc và compile MDX
  const source = await fs.readFile(filePath, "utf8");
  const { content } = matter(source);
  const result = await compileMDX({
    source: content,
    options: { parseFrontmatter: true },
  });

  return result.content;
};

/**
 * Lấy toàn bộ thông tin của một bài viết (metadata + nội dung)
 */
export const getPost = async (slug: string): Promise<Post | null> => {
  // Lấy metadata
  const meta = await getPostMeta(slug);
  if (!meta) return null;

  // Lấy nội dung
  const content = await getPostContent(slug);
  if (!content) return null;

  return {
    ...meta,
    content,
  };
};

/**
 * Lấy danh sách bài viết theo chuyên mục
 */
export const getPostsByCategory = async (
  category: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  return posts
    .filter((post) => post.category === category && post.locale === locale)
    .sort(sortPostsByDate);
};

/**
 * Lấy danh sách bài viết theo tag
 */
export const getPostsByTag = async (
  tag: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  return posts
    .filter((post) => post.tags.includes(tag) && post.locale === locale)
    .sort(sortPostsByDate);
};

/**
 * Lấy danh sách bài viết nổi bật
 */
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

/**
 * Tìm các bài viết liên quan dựa trên chuyên mục và tags
 */
export const getRelatedPosts = async (
  post: PostMeta,
  limit = 3
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();

  // Lọc cùng ngôn ngữ, loại trừ bài hiện tại
  const candidates = posts.filter(
    (p) => p.locale === post.locale && p.slug !== post.slug
  );

  // Tính điểm dựa trên chuyên mục và tags
  const scored = candidates.map((p) => {
    let score = 0;
    // Cùng chuyên mục: +5 điểm
    if (p.category === post.category) score += 5;
    // Mỗi tag trùng: +2 điểm
    score += p.tags.filter((t) => post.tags.includes(t)).length * 2;
    return { post: p, score };
  });

  // Sắp xếp theo điểm, nếu bằng điểm thì sort theo ngày
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

/**
 * Tìm kiếm bài viết
 */
export const searchPosts = async (
  query: string,
  locale: Locale
): Promise<PostMeta[]> => {
  const posts = await getAllPostMeta();
  const searchTerm = query.toLowerCase();

  // Tìm trong tiêu đề, mô tả và tags
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

/**
 * Tạo RSS feed cho blog
 */
export const generateRSSFeed = async (locale: Locale): Promise<string> => {
  const posts = await getAllPostMeta();
  const localeTitle = locale === "en" ? "Wheelhouse Blog" : "Blog Wheelhouse";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${localeTitle}</title>
    <link>https://wheelhouse.com.vn</link>
    <description>Maritime Technology Updates and Insights</description>
    <language>${locale}</language>
    ${posts
      .filter((post) => post.locale === locale && !post.draft)
      .map(
        (post) => `
    <item>
      <title>${post.title}</title>
      <link>https://wheelhouse.com.vn/${locale}/blog/${post.slug}</link>
      <description>${post.description}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;
};

/**
 * Tạo sitemap cho blog với hỗ trợ đa ngôn ngữ
 */
export const generateBlogSitemap = async (): Promise<string> => {
  const posts = await getAllPostMeta();
  const baseUrl = "https://wheelhouse.com.vn";

  // Nhóm các bài viết theo slug để ghép các bản dịch
  const postGroups = posts.reduce<
    Record<string, { en?: PostMeta; vi?: PostMeta }>
  >((groups, post) => {
    // Dùng slug làm key vì nó là duy nhất
    const key = post.slug;
    if (!groups[key]) {
      groups[key] = {};
    }
    groups[key][post.locale] = post;
    return groups;
  }, {});

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${Object.values(postGroups)
    .map((versions) => {
      // Bỏ qua nếu không có bài viết
      if (!versions.en && !versions.vi) return "";

      // Lấy bài viết chính (ưu tiên tiếng Anh)
      const mainPost = versions.en || versions.vi;
      if (!mainPost) return "";

      // Lấy bản dịch nếu có
      const alternatePost = versions.en ? versions.vi : versions.en;

      return `
  <url>
    <loc>${baseUrl}/${mainPost.locale}/blog/${mainPost.slug}</loc>
    <lastmod>${new Date(mainPost.publishedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
      mainPost.coverImage
        ? `
    <image:image>
      <image:loc>${baseUrl}${mainPost.coverImage}</image:loc>
      <image:title>${mainPost.title}</image:title>
    </image:image>`
        : ""
    }
    ${
      alternatePost
        ? `
    <xhtml:link 
       rel="alternate"
       hreflang="${alternatePost.locale}"
       href="${baseUrl}/${alternatePost.locale}/blog/${alternatePost.slug}"/>`
        : ""
    }
  </url>`;
    })
    .filter(Boolean)
    .join("\n")}
</urlset>`;
};
