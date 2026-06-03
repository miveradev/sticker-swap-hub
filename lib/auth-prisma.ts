import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

// Dedicated PrismaClient for Better Auth, isolated from the main app client.
const globalForAuthPrisma = globalThis as unknown as {
  authPrisma: PrismaClient | undefined
}

function createAuthPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

export const authPrisma =
  globalForAuthPrisma.authPrisma ?? createAuthPrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForAuthPrisma.authPrisma = authPrisma
}
