import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'

interface BlogHeroProps {
  featuredPosts: Post[]
  locale: 'en' | 'vi'
}

export function BlogHero({ featuredPosts, locale }: BlogHeroProps) {
  if (featuredPosts.length === 0) {
    return (
      <div className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-20 relative overflow-hidden">
        {/* Maritime pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/20 to-cyan-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {locale === 'vi' ? 'Blog Wheelhouse Marine' : 'Wheelhouse Marine Blog'}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto text-gray-100">
            {locale === 'vi' 
              ? 'Khám phá những thông tin mới nhất về công nghệ hàng hải, giải pháp kỹ thuật và xu hướng ngành'
              : 'Discover the latest maritime technology insights, technical solutions, and industry trends'
            }
          </p>
          <div className="mt-8">
            <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }
  
  const [mainPost, ...otherPosts] = featuredPosts
  
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
            {locale === 'vi' ? 'Blog Wheelhouse Marine' : 'Wheelhouse Marine Blog'}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {locale === 'vi' 
              ? 'Khám phá những thông tin mới nhất về công nghệ hàng hải và giải pháp kỹ thuật'
              : 'Discover the latest maritime technology insights and technical solutions'
            }
          </p>
          <div className="mt-6">
            <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 mx-auto"></div>
          </div>
        </div>
        
        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Featured Post */}
          <article className="lg:col-span-1">
            <Link href={`/blog/${mainPost.slug}`} className="group block">
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                {mainPost.frontmatter.coverImage ? (
                  <Image
                    src={mainPost.frontmatter.coverImage}
                    alt={mainPost.frontmatter.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-500 text-white">
                    {locale === 'vi' ? 'Nổi bật' : 'Featured'}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 bg-opacity-90">
                      {mainPost.frontmatter.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-blue-200 transition-colors">
                    {mainPost.frontmatter.title}
                  </h2>
                  <p className="text-gray-200 line-clamp-2 mb-3">
                    {mainPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-300">
                    <span>{mainPost.frontmatter.author}</span>
                    <span className="mx-2">•</span>
                    <span>{mainPost.readingTime.text}</span>
                  </div>
                </div>
              </div>
            </Link>
          </article>
          
          {/* Other Featured Posts */}
          <div className="space-y-6">
            {otherPosts.map(post => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    {post.frontmatter.coverImage ? (
                      <Image
                        src={post.frontmatter.coverImage}
                        alt={post.frontmatter.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {post.frontmatter.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {post.frontmatter.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <span>{post.frontmatter.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime.text}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {locale === 'vi' ? 'Xem tất cả bài viết' : 'View All Posts'}
            <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
