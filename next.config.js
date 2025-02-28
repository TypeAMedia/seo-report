/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/seo-report',
  assetPrefix: '/seo-report',
  trailingSlash: true,
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig;
