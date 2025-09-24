// Bilingual support types
export interface BilingualText {
  en: string;
  vi: string;
}

export interface BilingualArray {
  en: string[];
  vi: string[];
}

export interface BilingualSEO {
  en?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  vi?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

// New bilingual post matter
export interface BilingualPostMatter {
  title: BilingualText;
  excerpt: BilingualText;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: BilingualArray;
  author: string;
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  slug: BilingualText; // Slug riêng cho từng ngôn ngữ
  seo?: BilingualSEO;
}

export interface BilingualPost {
  slugs: BilingualText; // All available slugs
  frontmatter: BilingualPostMatter;
  content: {
    en: string;
    vi: string;
  };
  readingTime: {
    en: {
      text: string;
      minutes: number;
      time: number;
      words: number;
    };
    vi: {
      text: string;
      minutes: number;
      time: number;
      words: number;
    };
  };
  excerpt: BilingualText;
}

// Core blog post types
export interface PostMatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: string;
  coverImage?: string;
  featured?: boolean;
  draft?: boolean;
  locale?: "en" | "vi";
  translations?: {
    // Mapping slug của các ngôn ngữ
    en?: string;
    vi?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
}

export interface Post {
  slug: string;
  frontmatter: PostMatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  excerpt: string;
}

export interface PostCardProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

// Category types
export interface CategoryMatter {
  title: string;
  description: string;
  slug: string;
  coverImage?: string;
  color?: string;
  locale?: "en" | "vi";
}

export interface Category {
  slug: string;
  frontmatter: CategoryMatter;
  content: string;
  postCount: number;
}

// Author types
export interface AuthorMatter {
  name: string;
  bio: string;
  avatar?: string;
  position?: string;
  company?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  locale?: "en" | "vi";
}

export interface Author {
  slug: string;
  frontmatter: AuthorMatter;
  content: string;
  postCount: number;
}

// Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  baseUrl: string;
}

// Search and filter
export interface BlogFilters {
  category?: string;
  tag?: string;
  author?: string;
  year?: string;
  featured?: boolean;
  search?: string;
}

export interface BlogPageProps {
  posts: Post[];
  categories: Category[];
  authors: Author[];
  pagination: PaginationProps;
  filters?: BlogFilters;
}
