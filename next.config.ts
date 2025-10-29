import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	reactCompiler: true,
	htmlLimitedBots: /.*/,
};
export default nextConfig;
