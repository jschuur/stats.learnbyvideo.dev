import { PrismaClient } from '@prisma/client';

let cachedPrisma: PrismaClient | undefined;

export const prisma =
  cachedPrisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') cachedPrisma = prisma;
