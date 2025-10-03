import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Add remark/rehype plugins here if needed later.
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default createNextIntlPlugin()(withMDX(nextConfig));
