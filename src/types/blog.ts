/**
 * Blog Types for Next.js MDX Blog with i18n Support
 */
import { ReactElement } from "react";

// Base Types
export type Locale = "en" | "vi";

export interface ReadingTime {
  text: string;
  minutes: number;
  words: number;
}

// Core Types
export interface PostMeta {
  // Required fields
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  category: string;
  tags: string[];

  // Optional fields
  featured?: boolean;
  draft?: boolean;
  coverImage?: string;
  readingTime?: ReadingTime;
  categoryMeta?: {
    title: string;
    description: string;
    icon?: string;
    order?: number;
  } | null;

  // Auto-generated fields
  hasTranslation?: boolean; // Will be populated by code
  translationSlug?: string; // Will be populated by code
}

// Full Post Content
export interface Post extends PostMeta {
  content: ReactElement | string;
}

// Props Types
export interface PostCardProps {
  post: PostMeta;
  priority?: boolean;
  className?: string;
}

// Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl: string;
}

// Search and Filter
export interface BlogFilters {
  locale: Locale;
  category?: string;
  tag?: string;
  author?: string;
  year?: string;
  featured?: boolean;
  search?: string;
}

// Page Props
export interface BlogPageProps {
  posts: PostMeta[];
  pagination: PaginationProps;
  filters?: BlogFilters;
}
