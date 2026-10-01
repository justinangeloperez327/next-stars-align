import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

export const databaseConfigured = Boolean(process.env.DATABASE_URL);

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://unconfigured:unconfigured@127.0.0.1:5432/unconfigured?connect_timeout=1";

const globalForPrisma = globalThis;

const adapter = new PrismaPg({ connectionString });

const prisma =
  globalForPrisma.__starsAlignPrisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__starsAlignPrisma = prisma;
}

export async function withDatabase(operation, fallback) {
  if (!databaseConfigured) {
    return fallback;
  }

  try {
    return await operation(prisma);
  } catch (error) {
    console.error("Database operation failed:", error);
    return fallback;
  }
}

export default prisma;
