import { Environments } from '@/constants/enums';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === Environments.DEV
        ? ['error', 'warn']
        : ['error'],
  });

globalForPrisma.prisma = db;
