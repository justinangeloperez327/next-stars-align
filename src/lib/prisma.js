import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/stars_align";

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

export default prisma;
