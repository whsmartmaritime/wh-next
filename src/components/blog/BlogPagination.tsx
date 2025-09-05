import Link from 'next/link'

interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  baseUrl: string
  searchParams?: Record<string, string | undefined>
}

export function BlogPagination({ 
  currentPage, 
  totalPages, 
  hasNextPage, 
  hasPrevPage, 
  baseUrl, 
  searchParams = {} 
}: BlogPaginationProps) {
  // Build query string for maintaining filters
  const buildUrl = (page: number) => {
    const params = new URLSearchParams()
    
    // Add page parameter
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    // Add other search parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value)
      }
    })
    
    const queryString = params.toString()
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }
  
  // Generate page numbers to show
  const getPageNumbers = () => {
    const delta = 2 // Number of pages to show before and after current page
    const pages: (number | string)[] = []
    
    // Always show first page
    if (currentPage > delta + 2) {
      pages.push(1)
      if (currentPage > delta + 3) {
        pages.push('...')
      }
    }
    
    // Show pages around current page
    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i)
    }
    
    // Always show last page
    if (currentPage < totalPages - delta - 1) {
      if (currentPage < totalPages - delta - 2) {
        pages.push('...')
      }
      pages.push(totalPages)
    }
    
    return pages
  }
  
  if (totalPages <= 1) return null
  
  const pageNumbers = getPageNumbers()
  
  return (
    <nav className="flex items-center justify-center space-x-2" aria-label="Pagination">
      {/* Previous Button */}
      {hasPrevPage ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-l-md cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Previous
        </span>
      )}
      
      {/* Page Numbers */}
      <div className="hidden sm:flex space-x-1">
        {pageNumbers.map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">...</span>
            ) : (
              <Link
                href={buildUrl(page as number)}
                className={`px-3 py-2 text-sm font-medium border transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </Link>
            )}
          </span>
        ))}
      </div>
      
      {/* Mobile: Current page info */}
      <div className="sm:hidden px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
        {currentPage} of {totalPages}
      </div>
      
      {/* Next Button */}
      {hasNextPage ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-100 border border-gray-200 rounded-r-md cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500">
          Next
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </nav>
  )
}
