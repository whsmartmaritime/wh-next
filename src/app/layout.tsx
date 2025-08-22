import '../styles/globals.css';
import {NextIntlClientProvider} from 'next-intl';
 
export default async function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}