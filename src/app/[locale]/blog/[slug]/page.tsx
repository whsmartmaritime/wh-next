import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/blog/mdx'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { BackToTop } from '@/components/blog/BackToTop'

interface BlogPostPageProps {
  params: {
    locale: 'en' | 'vi'
    slug: string
  }
}

export async function generateStaticParams({ params }: { params: { locale: 'en' | 'vi' } }) {
  const { locale } = await params
  const posts = getAllPosts(locale)
  
  return posts.map(post => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params
  const post = getPostBySlug(slug, locale)
  
  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: `${post.frontmatter.title} - Wheelhouse Marine`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
      type: 'article',
      publishedTime: post.frontmatter.publishedAt,
      modifiedTime: post.frontmatter.updatedAt,
      authors: [post.frontmatter.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: post.frontmatter.coverImage ? [post.frontmatter.coverImage] : [],
    },
    authors: [{ name: post.frontmatter.author }],
    keywords: post.frontmatter.tags,
    alternates: {
      canonical: `/blog/${post.slug}`
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params
  const post = getPostBySlug(slug, locale)
  
  if (!post) {
    notFound()
  }
  
  const relatedPosts = getRelatedPosts(post, 3)
  const { frontmatter, content, readingTime } = post
  
  const publishedDate = new Date(frontmatter.publishedAt).toLocaleDateString(
    params.locale === 'vi' ? 'vi-VN' : 'en-US',
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  )
  
  const updatedDate = frontmatter.updatedAt ? new Date(frontmatter.updatedAt).toLocaleDateString(
    params.locale === 'vi' ? 'vi-VN' : 'en-US',
    { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
  ) : null
  
  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative">
        {frontmatter.coverImage && (
          <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
            <Image
              src={frontmatter.coverImage}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        )}
        
        {/* Article Header */}
        <div className={`${frontmatter.coverImage ? 'absolute bottom-0 left-0 right-0 text-white' : 'relative bg-gray-50 dark:bg-gray-800'} p-8`}>
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm">
              <Link 
                href={`/${params.locale}`}
                className="hover:underline opacity-80"
              >
                {params.locale === 'vi' ? 'Trang chủ' : 'Home'}
              </Link>
              <span className="mx-2">/</span>
              <Link 
                href={`/${params.locale}/blog`}
                className="hover:underline opacity-80"
              >
                Blog
              </Link>
              <span className="mx-2">/</span>
              <span>{frontmatter.title}</span>
            </nav>
            
            {/* Category */}
            <Link 
              href={`/${params.locale}/blog?category=${frontmatter.category}`}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors mb-4"
            >
              {frontmatter.category}
            </Link>
            
            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {frontmatter.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-3xl">
              {frontmatter.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <span>{params.locale === 'vi' ? 'Bởi' : 'By'}</span>
                <Link 
                  href={`/${params.locale}/blog?author=${frontmatter.author}`}
                  className="font-semibold hover:underline"
                >
                  {frontmatter.author}
                </Link>
              </div>
              
              <span>•</span>
              <time dateTime={frontmatter.publishedAt}>
                {publishedDate}
              </time>
              
              {updatedDate && (
                <>
                  <span>•</span>
                  <span>
                    {params.locale === 'vi' ? 'Cập nhật' : 'Updated'} {updatedDate}
                  </span>
                </>
              )}
              
              <span>•</span>
              <span>{readingTime.text}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Article Content */}
      <div className="container mx-auto max-w-4xl px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            </div>
            
            {/* Tags */}
            {frontmatter.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4">
                  {params.locale === 'vi' ? 'Thẻ' : 'Tags'}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/${params.locale}/blog?tag=${tag}`}
                      className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Share Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <ShareButtons 
                title={frontmatter.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/${params.locale}/blog/${params.slug}`}
                locale={params.locale}
              />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Table of Contents */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">
                  {params.locale === 'vi' ? 'Mục lục' : 'Table of Contents'}
                </h3>
                {/* TODO: Extract headings from content */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {params.locale === 'vi' ? 'Đang phát triển' : 'Coming soon'}
                </p>
              </div>
              
              {/* Author Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="font-semibold mb-4">
                  {params.locale === 'vi' ? 'Về tác giả' : 'About the Author'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {frontmatter.author}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-8">
              {params.locale === 'vi' ? 'Bài viết liên quan' : 'Related Posts'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <BlogPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </div>
      
      {/* Back to Top */}
      <BackToTop />
    </article>
  )
}
