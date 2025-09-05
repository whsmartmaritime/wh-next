import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Post, PostMatter, Category, CategoryMatter, Author, AuthorMatter } from '@/types/blog'

const contentDirectory = path.join(process.cwd(), 'content')
const postsDirectory = path.join(contentDirectory, 'posts')
const categoriesDirectory = path.join(contentDirectory, 'categories')
const authorsDirectory = path.join(contentDirectory, 'authors')

// Utility functions
export function getContentSlugs(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return []
  }
  return fs.readdirSync(directory)
    .filter(filename => filename.endsWith('.mdx'))
    .map(filename => filename.replace(/\.mdx$/, ''))
}

export function getPostSlugs(): string[] {
  return getContentSlugs(postsDirectory)
}

export function getCategorySlugs(): string[] {
  return getContentSlugs(categoriesDirectory)
}

export function getAuthorSlugs(): string[] {
  return getContentSlugs(authorsDirectory)
}

// Post functions
export function getPostBySlug(slug: string, locale?: 'en' | 'vi'): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const frontmatter = data as PostMatter
    
    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null
    }

    // Skip draft posts in production
    if (process.env.NODE_ENV === 'production' && frontmatter.draft) {
      return null
    }

    const stats = readingTime(content)
    
    // Generate excerpt from content if not provided
    const excerpt = frontmatter.excerpt || 
      content
        .replace(/#+\s/g, '') // Remove markdown headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/`(.*?)`/g, '$1') // Remove code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
        .slice(0, 160) + '...'

    return {
      slug,
      frontmatter,
      content,
      readingTime: stats,
      excerpt
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(locale?: 'en' | 'vi'): Post[] {
  const slugs = getPostSlugs()
  
  return slugs
    .map(slug => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.publishedAt)
      const dateB = new Date(b.frontmatter.publishedAt)
      return dateB.getTime() - dateA.getTime()
    })
}

export function getFeaturedPosts(limit: number = 3, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale)
    .filter(post => post.frontmatter.featured === true)
    .slice(0, limit)
}

export function getPostsByCategory(categorySlug: string, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale)
    .filter(post => post.frontmatter.category === categorySlug)
}

export function getPostsByTag(tag: string, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale)
    .filter(post => post.frontmatter.tags.includes(tag))
}

export function getPostsByAuthor(authorSlug: string, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale)
    .filter(post => post.frontmatter.author === authorSlug)
}

export function getRecentPosts(limit: number = 5, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale).slice(0, limit)
}

export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts(currentPost.frontmatter.locale)
    .filter(post => post.slug !== currentPost.slug)
  
  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map(post => {
    let score = 0
    
    // Same category gets high score
    if (post.frontmatter.category === currentPost.frontmatter.category) {
      score += 10
    }
    
    // Shared tags get score
    const sharedTags = post.frontmatter.tags.filter(tag => 
      currentPost.frontmatter.tags.includes(tag)
    )
    score += sharedTags.length * 3
    
    return { post, score }
  })
  
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

// Category functions
export function getCategoryBySlug(slug: string, locale?: 'en' | 'vi'): Category | null {
  try {
    const fullPath = path.join(categoriesDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const frontmatter = data as CategoryMatter
    
    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null
    }

    const postCount = getPostsByCategory(slug, locale).length

    return {
      slug,
      frontmatter,
      content,
      postCount
    }
  } catch (error) {
    console.error(`Error reading category ${slug}:`, error)
    return null
  }
}

export function getAllCategories(locale?: 'en' | 'vi'): Category[] {
  const slugs = getCategorySlugs()
  
  return slugs
    .map(slug => getCategoryBySlug(slug, locale))
    .filter((category): category is Category => category !== null)
    .sort((a, b) => b.postCount - a.postCount)
}

// Author functions
export function getAuthorBySlug(slug: string, locale?: 'en' | 'vi'): Author | null {
  try {
    const fullPath = path.join(authorsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const frontmatter = data as AuthorMatter
    
    // Filter by locale if specified
    if (locale && frontmatter.locale && frontmatter.locale !== locale) {
      return null
    }

    const postCount = getPostsByAuthor(slug, locale).length

    return {
      slug,
      frontmatter,
      content,
      postCount
    }
  } catch (error) {
    console.error(`Error reading author ${slug}:`, error)
    return null
  }
}

export function getAllAuthors(locale?: 'en' | 'vi'): Author[] {
  const slugs = getAuthorSlugs()
  
  return slugs
    .map(slug => getAuthorBySlug(slug, locale))
    .filter((author): author is Author => author !== null)
    .sort((a, b) => b.postCount - a.postCount)
}

// Search and utility functions
export function searchPosts(query: string, locale?: 'en' | 'vi'): Post[] {
  const allPosts = getAllPosts(locale)
  const searchTerm = query.toLowerCase()
  
  return allPosts.filter(post => {
    const searchableContent = [
      post.frontmatter.title,
      post.excerpt,
      post.frontmatter.tags.join(' ')
    ].join(' ').toLowerCase()
    
    return searchableContent.includes(searchTerm)
  })
}

export function getAllTags(locale?: 'en' | 'vi'): Array<{ tag: string; count: number }> {
  const allPosts = getAllPosts(locale)
  const tagCounts: Record<string, number> = {}
  
  allPosts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByYear(year: string, locale?: 'en' | 'vi'): Post[] {
  return getAllPosts(locale)
    .filter(post => {
      const postYear = new Date(post.frontmatter.publishedAt).getFullYear().toString()
      return postYear === year
    })
}

// Pagination utility
export function paginatePosts(posts: Post[], page: number = 1, postsPerPage: number = 10) {
  const startIndex = (page - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPosts: posts.length,
    totalPages: Math.ceil(posts.length / postsPerPage),
    currentPage: page,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1
  }
}
