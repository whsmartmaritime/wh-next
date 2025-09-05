/**
 * Translation mapping service for blog posts
 * Reads frontmatter from all posts to build translation mapping
 */

import { getAllPosts } from './mdx'

export interface TranslationMapping {
  [translationKey: string]: {
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
    const { translationKey, translations } = post.frontmatter
    if (translationKey && translations) {
      mapping[translationKey] = {
        ...mapping[translationKey],
        en: post.slug,
        vi: translations.vi
      }
    }
  })
  
  // Build mapping from Vietnamese posts  
  viPosts.forEach(post => {
    const { translationKey, translations } = post.frontmatter
    if (translationKey && translations) {
      mapping[translationKey] = {
        ...mapping[translationKey],
        vi: post.slug,
        en: translations.en
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
  
  // Find the translation key for current post
  for (const translationKey in mapping) {
    const slugs = mapping[translationKey]
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
  
  // Find the translation key for current post
  for (const translationKey in mapping) {
    const slugs = mapping[translationKey]
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
