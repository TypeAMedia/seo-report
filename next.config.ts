import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/seo-report',
  assetPrefix: '/seo-report',
  trailingSlash: true,
};

export default nextConfig;
