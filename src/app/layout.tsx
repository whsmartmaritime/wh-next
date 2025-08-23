import '../styles/globals.css';
import {getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    htmlLang: locale,
  };
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}