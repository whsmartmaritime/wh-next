import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types/blog'

interface BlogPostCardProps {
  post: Post
  priority?: boolean
  className?: string
}

export function BlogPostCard({ post, priority = false, className = '' }: BlogPostCardProps) {
  const { slug, frontmatter, excerpt, readingTime } = post
  
  const publishedDate = new Date(frontmatter.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  
  return (
    <article className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 ${className}`}>
      {/* Cover Image */}
      {frontmatter.coverImage && (
        <Link href={`/blog/${slug}`} className="block relative h-48 overflow-hidden">
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
          />
          {frontmatter.featured && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                Featured
              </span>
            </div>
          )}
        </Link>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between mb-3">
          <Link 
            href={`/blog?category=${frontmatter.category}`}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {frontmatter.category}
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {readingTime.text}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          <Link href={`/blog/${slug}`}>
            {frontmatter.title}
          </Link>
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        {/* Tags */}
        {frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {frontmatter.tags.slice(0, 3).map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="inline-block px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                #{tag}
              </Link>
            ))}
            {frontmatter.tags.length > 3 && (
              <span className="inline-block px-2 py-1 rounded text-xs text-gray-500">
                +{frontmatter.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <Link 
            href={`/blog?author=${frontmatter.author}`}
            className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            {frontmatter.author}
          </Link>
          <time dateTime={frontmatter.publishedAt}>
            {publishedDate}
          </time>
        </div>
      </div>
    </article>
  )
}
