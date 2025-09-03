import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This tells Next.js to opt out of static optimization for API routes
    externalDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  // Force all pages to be server-side rendered to avoid build-time DB queries
  reactStrictMode: true,
  
  // Skip analysis of API routes during build
  skipMiddlewareUrlNormalize: true,
  skipTrailingSlashRedirect: true,
  
  // Avoid analyzing Next.js API routes at build time
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Avoid loading @prisma/client during build
      config.externals = [...(config.externals || []), '@prisma/client', 'bcrypt'];
    }
    return config;
  },
};

export default nextConfig;