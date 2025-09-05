'use client'

import { useLocale } from 'next-intl'

interface ContentByLocaleProps {
  locale: 'en' | 'vi'
  children: React.ReactNode
}

export function ContentByLocale({ locale, children }: ContentByLocaleProps) {
  const currentLocale = useLocale() as 'en' | 'vi'
  
  // Only render content if current locale matches
  if (currentLocale === locale) {
    return <>{children}</>
  }
  
  return null
}

// Alternative server-side version
export function ContentByLocaleServer({ locale, currentLocale, children }: {
  locale: 'en' | 'vi'
  currentLocale: 'en' | 'vi'
  children: React.ReactNode
}) {
  if (currentLocale === locale) {
    return <>{children}</>
  }
  
  return null
}
