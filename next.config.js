/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/seo-report',
  assetPrefix: '/seo-report',
  trailingSlash: true,
}

module.exports = nextConfig;
