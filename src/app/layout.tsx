import "@/styles/globals.css";
import { getLocale } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Current locale for <html lang>
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
