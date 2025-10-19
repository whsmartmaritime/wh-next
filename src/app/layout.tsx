import "@/styles/globals.css";
import "katex/dist/katex.min.css";
import { getLocale } from "next-intl/server";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
      /\/$/,
      ""
    )
  ),
  title: {
    default: "Wheelhouse",
    template: "%s | Wheelhouse",
  },
  description: "Wheelhouse - Maritime Electronic Services and Solutions.",
  openGraph: {
    siteName: "Wheelhouse",
    type: "website",
    images: [
      {
        url: "/images/og/og-home-en.png",

        width: 1200,
        height: 630,
        alt: "Wheelhouse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@wheelhouse",
  },
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Current locale for <html lang>
  const locale = await getLocale();

  return (
    <html
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      lang={locale}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
