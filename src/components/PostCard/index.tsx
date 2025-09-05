import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/blog'

interface PostCardProps {
  post: Post
  locale: 'en' | 'vi'
  variant?: 'featured' | 'regular' | 'compact'
  className?: string
}

export default function PostCard({ post, locale, variant = 'regular', className = '' }: PostCardProps) {
  const formatDate = (dateString: string, format: 'full' | 'short' = 'full') => {
    const options: Intl.DateTimeFormatOptions = format === 'full' 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { month: 'short', day: 'numeric' }
    
    return new Date(dateString).toLocaleDateString(
      locale === 'vi' ? 'vi-VN' : 'en-US', 
      options
    )
  }

  // Variant-specific styles
  const styles = {
    featured: {
      container: 'group h-full',
      image: 'relative aspect-[4/3] mb-6 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
      imageSize: '(max-width: 768px) 100vw, 50vw',
      content: 'space-y-4',
      meta: 'flex items-center justify-between text-sm text-gray-500 dark:text-gray-400',
      title: 'font-bold text-2xl leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2',
      excerpt: 'text-gray-600 dark:text-gray-300 line-clamp-3',
      readingTime: 'text-sm text-gray-500 dark:text-gray-400',
      badgeSize: 'normal' as const,
      dateFormat: 'full' as const
    },
    regular: {
      container: 'group',
      image: 'relative aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
      imageSize: '(max-width: 768px) 50vw, 33vw',
      content: 'space-y-3',
      meta: 'flex items-center justify-between text-sm text-gray-500 dark:text-gray-400',
      title: 'font-semibold text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2',
      excerpt: 'text-sm text-gray-600 dark:text-gray-300 line-clamp-2',
      readingTime: 'text-xs text-gray-500 dark:text-gray-400',
      badgeSize: 'small' as const,
      dateFormat: 'full' as const
    },
    compact: {
      container: 'group',
      image: 'relative aspect-[3/2] mb-3 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800',
      imageSize: '(max-width: 768px) 50vw, 25vw',
      content: 'space-y-2',
      meta: 'flex items-center justify-between text-xs text-gray-500 dark:text-gray-400',
      title: 'font-semibold text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2',
      excerpt: null, // No excerpt for compact
      readingTime: 'text-xs text-gray-500 dark:text-gray-400',
      badgeSize: 'tiny' as const,
      dateFormat: 'short' as const
    }
  }

  const currentStyle = styles[variant]

  return (
    <article className={`${currentStyle.container} ${className}`}>
      <Link href={`/blog/${post.slug}`} className="block h-full">
        {/* Image */}
        <div className={currentStyle.image}>
          {post.frontmatter.coverImage ? (
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={currentStyle.imageSize}
            />
          ) : (
            <PlaceholderImage size={variant === 'featured' ? 'large' : variant === 'regular' ? 'medium' : 'small'} />
          )}
        </div>

        {/* Content */}
        <div className={currentStyle.content}>
          {/* Meta */}
          <div className={currentStyle.meta}>
            <CategoryBadge category={post.frontmatter.category} size={currentStyle.badgeSize} />
            <time dateTime={post.frontmatter.publishedAt}>
              {formatDate(post.frontmatter.publishedAt, currentStyle.dateFormat)}
            </time>
          </div>

          {/* Title */}
          <h3 className={currentStyle.title}>
            {post.frontmatter.title}
          </h3>

          {/* Excerpt (only for featured and regular) */}
          {currentStyle.excerpt && (
            <p className={currentStyle.excerpt}>
              {post.frontmatter.excerpt}
            </p>
          )}

          {/* Reading time */}
          <p className={currentStyle.readingTime}>
            {post.readingTime.text}
          </p>
        </div>
      </Link>
    </article>
  )
}

// Utility Components
function CategoryBadge({ category, size = 'normal' }: { category: string; size?: 'tiny' | 'small' | 'normal' }) {
  const sizeClasses = {
    tiny: 'px-1.5 py-0.5 text-xs',
    small: 'px-2 py-0.5 text-xs',
    normal: 'px-2.5 py-1 text-xs'
  }

  return (
    <span className={`inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full font-medium ${sizeClasses[size]}`}>
      {category}
    </span>
  )
}

function PlaceholderImage({ size }: { size: 'small' | 'medium' | 'large' }) {
  const iconSizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16'
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
      <svg className={iconSizes[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}
