import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import { getFeaturedPosts, getRecentPosts } from '@/lib/blog/mdx'
import PostCard from '@/components/PostCard'

export default async function LatestNews() {
  const t = await getTranslations('LatestNews')
  const locale = await getLocale() as 'en' | 'vi'
  
  // Hardcode config giống như các blocks khác
  const featuredCount = 1
  const regularCount = 4
  
  // Lấy posts
  const featuredPosts = getFeaturedPosts(featuredCount, locale)
  const recentPosts = getRecentPosts(featuredCount + regularCount, locale)
  
  const featuredPost = featuredPosts[0]
  const regularPosts = recentPosts
    .filter(post => post.slug !== featuredPost?.slug)
    .slice(0, regularCount)

  if (!featuredPost && regularPosts.length === 0) {
    return null // Không có posts nào
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container-gutter">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            {t('description')}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-8 gap-6 lg:gap-8">
          {/* Featured Post - Left 4 columns */}
          {featuredPost && (
            <div className="col-span-8 md:col-span-4">
              <PostCard 
                post={featuredPost} 
                locale={locale} 
                variant="featured" 
              />
            </div>
          )}

          {/* Regular Posts - Right 4 columns, 2x2 grid */}
          <div className="col-span-8 md:col-span-4 grid grid-cols-2 gap-4 lg:gap-6">
            {regularPosts.slice(0, 4).map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                locale={locale}
                variant="compact"
              />
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            {t('viewAll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
