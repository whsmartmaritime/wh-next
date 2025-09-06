import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'vi'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Localized pathnames
  pathnames: {
    '/': {
      en: '/',
      vi: '/'
    },
    '/about': {
      en: '/about',
      vi: '/gioi-thieu'
    },
    '/services': {
      en: '/services',
      vi: '/dich-vu'
    },
    '/solutions': {
      en: '/solutions',
      vi: '/giai-phap'
    },
    '/contact': {
      en: '/contact',
      vi: '/lien-he'
    },
    '/blog': {
      en: '/blog',
      vi: '/blog'
    },
    '/blog/[slug]': {
      en: '/blog/[slug]',
      vi: '/blog/[slug]'
    }
  }
});