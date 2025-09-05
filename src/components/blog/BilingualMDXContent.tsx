import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from './MDXComponents'

interface BilingualMDXContentProps {
  content: string
  locale: 'en' | 'vi'
}

export function BilingualMDXContent({ content, locale }: BilingualMDXContentProps) {
  // Add locale as a global context for ContentByLocale components
  const enhancedComponents = {
    ...mdxComponents,
    ContentByLocale: ({ locale: componentLocale, children }: { 
      locale: 'en' | 'vi', 
      children: React.ReactNode 
    }) => {
      // Only render if the component locale matches the current page locale
      if (componentLocale === locale) {
        return <>{children}</>
      }
      return null
    }
  }

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote source={content} components={enhancedComponents} />
    </div>
  )
}
