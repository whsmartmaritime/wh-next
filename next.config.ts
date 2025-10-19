import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      // Parse math first so $$ .. $$ becomes math nodes before other transforms
      remarkMath,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
    ],
    rehypePlugins: [rehypeKatex],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    // Skip CSP in development to avoid conflicts with Next.js built-in CSP
    const isProduction = process.env.NODE_ENV === "production";

    if (!isProduction) {
      return [];
    }

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
                default-src 'self';
                script-src 'self' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://maps.gstatic.com;
                style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
                font-src 'self' https://fonts.gstatic.com;
                img-src 'self' data: https: blob:;
                connect-src 'self' https://www.google-analytics.com https://maps.googleapis.com;
                frame-src 'self' https://www.google.com;
                child-src 'self' https://www.google.com;
                object-src 'none';
                base-uri 'self';
                form-action 'self';
                frame-ancestors 'none';
                upgrade-insecure-requests;
              `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default createNextIntlPlugin()(withMDX(nextConfig));
