import { PrismaClient } from '@prisma/client';

// Check if we're in build time
const isBuildTime = () => {
  return process.env.NEXT_PHASE === 'phase-production-build';
};

// Create a mock handler that returns empty results for all Prisma methods
const createMockPrismaModel = () => ({
  findUnique: async () => ({}),
  findFirst: async () => ({}),
  findMany: async () => [],
  create: async () => ({}),
  update: async () => ({}),
  delete: async () => ({}),
  upsert: async () => ({}),
  count: async () => 0,
});

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
    // Provide a comprehensive mock client
    prisma = {
      note: createMockPrismaModel(),
      user: createMockPrismaModel(),
      // Add any other models your app uses
    };
  }
} else {
  // Mock client during build time
  console.warn('Using mock Prisma client during build');
  prisma = {
    note: createMockPrismaModel(),
    user: createMockPrismaModel(),
    // Add any other models your app uses
  };
}

export default prisma;