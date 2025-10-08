import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
    ],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default createNextIntlPlugin()(withMDX(nextConfig));
