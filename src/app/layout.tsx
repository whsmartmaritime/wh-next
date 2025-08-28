import '../styles/globals.css';
import '../styles/animations.css';
import { cookies } from 'next/headers';
import { getLocale } from 'next-intl/server';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Theme from cookie + current locale for <html lang>
  const [cookieStore, locale] = await Promise.all([cookies(), getLocale()]);
  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang={locale} className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}