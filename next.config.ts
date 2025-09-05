import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  // Enable experimental MDX support
  experimental: {
    mdxRs: false,
  },
}

// Use default conventions (i18n.ts & i18n/request.ts)  
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
