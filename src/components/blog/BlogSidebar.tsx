import { Category, Author } from '@/types/blog'
import Link from 'next/link'

interface BlogSidebarProps {
  categories: Category[]
  authors: Author[]
  locale: 'en' | 'vi'
  currentFilters?: {
    category?: string
    tag?: string
    author?: string
    search?: string
  }
}

export function BlogSidebar({ categories, authors, locale, currentFilters = {} }: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold mb-4">
          {locale === 'vi' ? 'Tìm kiếm' : 'Search'}
        </h3>
        <form action="/blog" method="GET" className="space-y-3">
          <input
            type="text"
            name="search"
            defaultValue={currentFilters.search}
            placeholder={locale === 'vi' ? 'Tìm kiếm bài viết...' : 'Search posts...'}
            className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {locale === 'vi' ? 'Tìm kiếm' : 'Search'}
          </button>
        </form>
      </div>
      
      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-4">
            {locale === 'vi' ? 'Danh mục' : 'Categories'}
          </h3>
          <div className="space-y-2">
            {categories.map(category => (
              <Link
                key={category.slug}
                href={`/blog?category=${category.slug}`}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                  currentFilters.category === category.slug
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-sm">{category.frontmatter.title}</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                  {category.postCount}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Clear filter */}
          {currentFilters.category && (
            <Link
              href="/blog"
              className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear filter'}
            </Link>
          )}
        </div>
      )}
      
      {/* Authors */}
      {authors.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold mb-4">
            {locale === 'vi' ? 'Tác giả' : 'Authors'}
          </h3>
          <div className="space-y-2">
            {authors.slice(0, 5).map(author => (
              <Link
                key={author.slug}
                href={`/blog?author=${author.slug}`}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                  currentFilters.author === author.slug
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-sm">{author.frontmatter.name}</span>
                <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                  {author.postCount}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Clear filter */}
          {currentFilters.author && (
            <Link
              href="/blog"
              className="block mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {locale === 'vi' ? 'Xóa bộ lọc' : 'Clear filter'}
            </Link>
          )}
        </div>
      )}
      
      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-semibold mb-4">
          {locale === 'vi' ? 'Liên kết nhanh' : 'Quick Links'}
        </h3>
        <div className="space-y-2 text-sm">
          <Link
            href="/blog"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {locale === 'vi' ? 'Tất cả bài viết' : 'All Posts'}
          </Link>
          <Link
            href="/blog?featured=true"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {locale === 'vi' ? 'Bài viết nổi bật' : 'Featured Posts'}
          </Link>
          <Link
            href="/"
            className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {locale === 'vi' ? 'Về trang chủ' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </aside>
  )
}
