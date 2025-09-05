import Image from 'next/image'
import Link from 'next/link'
import { MDXComponents } from 'mdx/types'

// Custom MDX Components with modern styling
export const mdxComponents: MDXComponents = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl md:text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-white" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg md:text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-white" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-base md:text-lg font-semibold mb-2 mt-4 text-gray-900 dark:text-white" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-sm md:text-base font-semibold mb-2 mt-4 text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs and text
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),
  
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </em>
  ),

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="mb-4 pl-6 space-y-2 list-disc text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 pl-6 space-y-2 list-decimal text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isInternal = href?.startsWith('/') || href?.startsWith('#')
    
    if (isInternal) {
      return (
        <Link 
          href={href || '#'}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
          {...props}
        >
          {children}
        </Link>
      )
    }
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
        {...props}
      >
        {children}
      </a>
    )
  },

  // Images
  img: ({ src, alt, ...props }) => (
    <div className="my-6">
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={600}
        className="rounded-lg shadow-md w-full h-auto"
        {...props}
      />
      {alt && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  ),

  // Code
  code: ({ children, ...props }) => (
    <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>
      {children}
    </code>
  ),

  pre: ({ children, ...props }) => (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <pre className="overflow-x-auto p-4 bg-gray-50 dark:bg-gray-800 text-sm leading-relaxed" {...props}>
        {children}
      </pre>
    </div>
  ),

  // Blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-6 border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </blockquote>
  ),

  // Tables
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </thead>
  ),
  
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props}>
      {children}
    </tbody>
  ),
  
  tr: ({ children, ...props }) => (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  
  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }) => (
    <hr className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" {...props} />
  ),

  // Custom components for enhanced blog experience
  Callout: ({ children, type = 'info', ...props }) => {
    const styles = {
      info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
      warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
      error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
      success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
    }
    
    return (
      <div className={`my-6 p-4 border-l-4 rounded-r-lg ${styles[type as keyof typeof styles]}`} {...props}>
        {children}
      </div>
    )
  },
  
  Details: ({ children, summary, ...props }) => (
    <details className="my-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" {...props}>
      <summary className="px-4 py-3 bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold">
        {summary}
      </summary>
      <div className="p-4 bg-white dark:bg-gray-900">
        {children}
      </div>
    </details>
  )
}
