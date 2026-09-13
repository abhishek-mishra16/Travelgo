import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const isDbEnabled = () => process.env.DEMO_MODE !== 'true' && Boolean(process.env.DATABASE_URL);

export function getPrisma() {
  if (!isDbEnabled()) return null;
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

// Backwards-compatible lazy proxy: Prisma is created only when DB mode is actually used.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrisma();
    if (!client) throw new Error('Database mode is disabled. Set DEMO_MODE=false and DATABASE_URL to use Prisma.');
    return (client as any)[property];
  },
});
