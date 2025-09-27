// Common content types for both JSON and MDX
export interface ContentMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  slug: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

export interface ContentHero {
  titlePre?: string;
  titleMain: string;
  subtitle?: string;
  description: string;
  rightImageAlt?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
}

// Base content structure
export interface BaseContent {
  meta: ContentMeta;
  hero?: ContentHero;
}

// JSON content structure (for main pages)
export interface JSONContent extends BaseContent {
  type: "json";
  sections?: Record<string, unknown>[]; // Additional JSON sections
}

// MDX content structure (for sub-pages)
export interface MDXContent extends BaseContent {
  type: "mdx";
  content: React.ReactElement; // Compiled MDX content
  frontmatter: Record<string, unknown>;
}

// Union type for all content
export type Content = JSONContent | MDXContent;

// Params for content loading
export interface ContentParams {
  locale: string;
  section: "solutions" | "services";
  category: string;
  slug?: string; // Optional for sub-pages
}
