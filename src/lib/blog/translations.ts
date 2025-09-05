/**
 * Translation mapping service for blog posts
 * Reads frontmatter from all posts to build translation mapping
 */

import { getAllPosts } from './mdx'

export interface TranslationMapping {
  [key: string]: {
    en?: string
    vi?: string
  }
}

/**
 * Build translation mapping from all posts
 */
export function buildTranslationMapping(): TranslationMapping {
  const mapping: TranslationMapping = {}
  
  // Get posts from both locales
  const enPosts = getAllPosts('en')
  const viPosts = getAllPosts('vi')
  
  // Build mapping from English posts
  enPosts.forEach(post => {
    const { translations } = post.frontmatter
    if (translations) {
      // Sử dụng slug tiếng Anh làm key chính
      const key = post.slug
      mapping[key] = {
        en: translations.en || post.slug,
        vi: translations.vi
      }
    }
  })
  
  // Build mapping from Vietnamese posts  
  viPosts.forEach(post => {
    const { translations } = post.frontmatter
    if (translations && translations.en) {
      // Sử dụng slug tiếng Anh làm key chính
      const key = translations.en
      if (!mapping[key]) {
        mapping[key] = {}
      }
      mapping[key] = {
        ...mapping[key],
        en: translations.en,
        vi: translations.vi || post.slug
      }
    }
  })
  
  return mapping
}

/**
 * Get translation slug for a post
 */
export function getTranslationSlug(
  currentSlug: string, 
  currentLocale: 'en' | 'vi', 
  targetLocale: 'en' | 'vi'
): string | null {
  if (currentLocale === targetLocale) return currentSlug
  
  const mapping = buildTranslationMapping()
  
  // Tìm mapping key dựa trên current slug và locale
  for (const key in mapping) {
    const slugs = mapping[key]
    if (slugs[currentLocale] === currentSlug) {
      return slugs[targetLocale] || null
    }
  }
  
  return null
}

/**
 * Get all available translations for a post
 */
export function getAvailableTranslations(
  currentSlug: string,
  currentLocale: 'en' | 'vi'
): Array<{ locale: 'en' | 'vi', slug: string }> {
  const translations: Array<{ locale: 'en' | 'vi', slug: string }> = []
  const mapping = buildTranslationMapping()
  
  // Tìm mapping key dựa trên current slug và locale
  for (const key in mapping) {
    const slugs = mapping[key]
    if (slugs[currentLocale] === currentSlug) {
      // Add translations for other locales
      Object.entries(slugs).forEach(([locale, slug]) => {
        if (locale !== currentLocale && slug) {
          translations.push({ 
            locale: locale as 'en' | 'vi', 
            slug 
          })
        }
      })
      break
    }
  }
  
  return translations
}
