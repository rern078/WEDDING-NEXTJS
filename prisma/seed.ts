import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

/** Credentials for local / QA testing only. Change in production. */
export const TEST_USER = {
  email: "test@example.com",
  password: "testpassword123",
  name: "Test Host",
} as const;

/** Primary organizer admin (requested). */
export const ADMIN_CHAMRERN = {
  email: "chamrern@gmail.com",
  password: "1234567890x",
  name: "chamrern",
} as const;

async function upsertAdmin(
  prisma: PrismaClient,
  user: { email: string; password: string; name: string },
  label: string,
) {
  const passwordHash = await bcrypt.hash(user.password, 12);
  await prisma.user.upsert({
    where: { email: user.email },
    create: {
      email: user.email,
      name: user.name,
      passwordHash,
      role: "ADMIN",
    },
    update: {
      passwordHash,
      name: user.name,
      role: "ADMIN",
    },
  });
  console.log(`Seeded ${label}:`);
  console.log(`  Email:    ${user.email}`);
  console.log(`  Password: ${user.password}`);
  console.log("  Role:     ADMIN");
  console.log("");
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  const pool = new Pool({ connectionString: url });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  await upsertAdmin(prisma, TEST_USER, "test user");
  await upsertAdmin(prisma, ADMIN_CHAMRERN, "Chamrern (admin)");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
