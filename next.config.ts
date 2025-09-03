import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This tells Next.js to opt out of static optimization for API routes
    externalDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  // Force all pages to be server-side rendered to avoid build-time DB queries
  reactStrictMode: true,
  
  // Add specific Vercel configuration
  output: "standalone",
  
  // Configure webpack for better compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent specific server-side only modules from being bundled
      config.externals = [...(config.externals || []), 'bcrypt'];
    }
    return config;
  },
};

export default nextConfig;