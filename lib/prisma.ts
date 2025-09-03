import { PrismaClient } from '@prisma/client';

// Add check for build time
const isPrismaAvailable = () => {
  try {
    // This will throw if Prisma client hasn't been generated
    require.resolve('@prisma/client');
    return true;
  } catch (e) {
    return false;
  }
};

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (isPrismaAvailable()) {
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: ['query'],
  });
  
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
} else {
  // Provide a mock or placeholder during build time
  console.warn('Prisma client not available. Using placeholder.');
  prisma = {} as PrismaClient;
}

export default prisma;