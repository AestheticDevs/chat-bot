import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // biar keliatan query dan error
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
