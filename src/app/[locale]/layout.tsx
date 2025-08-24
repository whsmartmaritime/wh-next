import '../../styles/globals.css';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import {cookies} from 'next/headers';

export default async function LocaleLayout({
  children,
  params
}: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const [activeLocale, messages] = await Promise.all([
    getLocale(),
    getMessages()
  ]);

  // Toggle dark mode theo cookie 'theme' = 'dark' | 'light'
  const theme = cookies().get('theme')?.value;

  return (
    <NextIntlClientProvider locale={activeLocale} messages={messages}>
      <html
        lang={params.locale}
        className={theme === 'dark' ? 'dark' : ''}
        suppressHydrationWarning
      >
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  );
}

