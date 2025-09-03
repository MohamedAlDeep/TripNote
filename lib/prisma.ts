import { PrismaClient } from '@prisma/client';

// Check if we're in build time
const isBuildTime = () => {
  return process.env.NEXT_PHASE === 'phase-production-build';
};

// Only create PrismaClient if not in build time
let prisma: any;

// Don't even try to initialize Prisma during build
if (!isBuildTime()) {
  try {
    // PrismaClient is attached to the `global` object in development to prevent
    // exhausting your database connection limit.
    const globalForPrisma = global as unknown as { prisma: PrismaClient };
    
    prisma = globalForPrisma.prisma || new PrismaClient({
      log: ['query'],
    });
    
    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
  } catch (e) {
    console.warn('Failed to initialize Prisma client:', e);
    // Provide a mock client
    prisma = {
      note: {
        findMany: async () => [],
        create: async () => ({}),
        delete: async () => ({}),
        // Add more methods as needed
      }
    };
  }
} else {
  // Mock client during build time
  console.warn('Using mock Prisma client during build');
  prisma = {
    note: {
      findMany: async () => [],
      create: async () => ({}),
      delete: async () => ({}),
      // Add more methods as needed
    }
  };
}

export default prisma;