import slugify from "slugify";

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
} as const;

/**
 * Extract text to create slug from content
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
 * Generate a URL-friendly slug from text
 */
export const generateSlug = (text: string): string => {
  const slugText = extractSlugText(text);
  return slugify(slugText, slugifyOptions);
};

/**
 * Format a date string to locale-specific format
 */
export const formatDate = (date: string, locale: string): string => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
