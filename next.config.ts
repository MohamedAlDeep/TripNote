import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // This tells Next.js to opt out of static optimization for API routes
   
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  // Force all pages to be server-side rendered to avoid build-time DB queries
  reactStrictMode: true,
};

export default nextConfig;