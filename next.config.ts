import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	htmlLimitedBots: /.*/,
};
export default nextConfig;
