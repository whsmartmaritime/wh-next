import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	reactCompiler: false,
	htmlLimitedBots: /.*/,
};
export default nextConfig;
