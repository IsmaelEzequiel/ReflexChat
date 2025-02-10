import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";
import { beforeAll, afterAll } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
  execSync("npx prisma db push", { stdio: "inherit" });
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prisma };
