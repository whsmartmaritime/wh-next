import '../styles/globals.css';
import {getLocale} from 'next-intl/server';

export default async function RootLayout({children}: LayoutProps<'/'>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}