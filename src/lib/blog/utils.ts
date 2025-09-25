import slugify from "slugify";

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const;

/**
 * Trích xuất text để tạo slug từ một đoạn văn bản
 */
const extractSlugText = (text: string): string => {
  return text
    .replace(/[#*_`~]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 10)
    .join(" ");
};

/**
 * Tạo slug từ frontmatter và nội dung
 */
export const generateSlug = (
  frontmatter: {
    slug?: string;
    title?: string;
    description?: string;
    excerpt?: string;
  },
  content: string,
  filePath: string
): string => {
  // Thử các nguồn theo thứ tự ưu tiên
  const sources = [
    frontmatter.slug,
    frontmatter.title,
    frontmatter.description,
    frontmatter.excerpt,
    content,
  ];

  const validText = sources.find(
    (text) => typeof text === "string" && text.trim()
  );

  if (!validText) {
    throw new Error(`Unable to generate slug for empty file: ${filePath}`);
  }

  return slugify(extractSlugText(validText), slugifyOptions);
};
