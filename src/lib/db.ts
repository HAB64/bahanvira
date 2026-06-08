import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Only create PrismaClient if DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;

export const db =
  globalForPrisma.prisma ??
  (databaseUrl
    ? new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query'] : [],
      })
    : (null as unknown as PrismaClient))

if (process.env.NODE_ENV !== 'production' && databaseUrl) globalForPrisma.prisma = db
