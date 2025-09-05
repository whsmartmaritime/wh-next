import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories, getAllAuthors, paginatePosts } from '@/lib/blog/mdx'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BlogHero } from '@/components/blog/BlogHero'

interface BlogPageProps {
  params: {
    locale: 'en' | 'vi'
  }
  searchParams: {
    page?: string
    category?: string
    tag?: string
    author?: string
    search?: string
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  return {
    title: params.locale === 'vi' ? 'Bài viết - Wheelhouse Marine' : 'Blog - Wheelhouse Marine',
    description: params.locale === 'vi' 
      ? 'Khám phá các bài viết về hàng hải, công nghệ và giải pháp từ Wheelhouse Marine'
      : 'Discover maritime insights, technology solutions, and industry expertise from Wheelhouse Marine',
  }
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const { locale } = params
  const currentPage = parseInt(searchParams.page || '1')
  const postsPerPage = 12
  
  // Get all content
  let posts = getAllPosts(locale)
  const categories = getAllCategories(locale)
  const authors = getAllAuthors(locale)
  
  // Apply filters
  if (searchParams.category) {
    posts = posts.filter(post => post.frontmatter.category === searchParams.category)
  }
  
  if (searchParams.tag) {
    posts = posts.filter(post => post.frontmatter.tags.includes(searchParams.tag!))
  }
  
  if (searchParams.author) {
    posts = posts.filter(post => post.frontmatter.author === searchParams.author)
  }
  
  if (searchParams.search) {
    const searchTerm = searchParams.search.toLowerCase()
    posts = posts.filter(post => {
      const searchableContent = [
        post.frontmatter.title,
        post.excerpt,
        post.frontmatter.tags.join(' ')
      ].join(' ').toLowerCase()
      
      return searchableContent.includes(searchTerm)
    })
  }
  
  // Paginate results
  const paginatedData = paginatePosts(posts, currentPage, postsPerPage)
  
  // Get featured posts for hero
  const featuredPosts = posts.filter(post => post.frontmatter.featured).slice(0, 3)
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      {currentPage === 1 && !Object.keys(searchParams).length && (
        <BlogHero featuredPosts={featuredPosts} locale={locale} />
      )}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Results Header */}
            {(searchParams.search || searchParams.category || searchParams.tag || searchParams.author) && (
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2">
                  {searchParams.search && (
                    <>
                      {locale === 'vi' ? 'Kết quả tìm kiếm cho' : 'Search results for'}{' '}
                      <span className="text-blue-600">&ldquo;{searchParams.search}&rdquo;</span>
                    </>
                  )}
                  {searchParams.category && (
                    <>
                      {locale === 'vi' ? 'Danh mục' : 'Category'}:{' '}
                      <span className="text-blue-600">{searchParams.category}</span>
                    </>
                  )}
                  {searchParams.tag && (
                    <>
                      {locale === 'vi' ? 'Tag' : 'Tag'}:{' '}
                      <span className="text-blue-600">#{searchParams.tag}</span>
                    </>
                  )}
                  {searchParams.author && (
                    <>
                      {locale === 'vi' ? 'Tác giả' : 'Author'}:{' '}
                      <span className="text-blue-600">{searchParams.author}</span>
                    </>
                  )}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {paginatedData.totalPosts} {locale === 'vi' ? 'bài viết được tìm thấy' : 'posts found'}
                </p>
              </div>
            )}
            
            {/* Posts Grid */}
            {paginatedData.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {paginatedData.posts.map((post, index) => (
                    <BlogPostCard 
                      key={post.slug} 
                      post={post} 
                      priority={currentPage === 1 && index < 3}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {paginatedData.totalPages > 1 && (
                  <BlogPagination
                    currentPage={paginatedData.currentPage}
                    totalPages={paginatedData.totalPages}
                    hasNextPage={paginatedData.hasNextPage}
                    hasPrevPage={paginatedData.hasPrevPage}
                    baseUrl="/blog"
                    searchParams={searchParams}
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4">
                  {locale === 'vi' ? 'Không tìm thấy bài viết' : 'No posts found'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {locale === 'vi' 
                    ? 'Thử điều chỉnh bộ lọc hoặc tìm kiếm từ khóa khác'
                    : 'Try adjusting your filters or search for different keywords'
                  }
                </p>
                <Link 
                  href="/blog" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {locale === 'vi' ? 'Xem tất cả bài viết' : 'View all posts'}
                </Link>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar 
              categories={categories}
              authors={authors}
              locale={locale}
              currentFilters={searchParams}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
