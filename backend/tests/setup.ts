// Runs once per test file (setupFilesAfterEnv). Ensures DATABASE_URL points at
// the ephemeral test container before the app's Prisma client is imported, then
// truncates tables between tests and disconnects at the end.
import { readFileSync } from 'node:fs';
import { tmpUrlFile } from './helpers/testDbUrl';

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = readFileSync(tmpUrlFile, 'utf8').trim();
}

// Require (not import) so PrismaClient is instantiated *after* DATABASE_URL is set.
const { prisma } = require('../src/lib/prisma') as typeof import('../src/lib/prisma');

afterEach(async () => {
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "User", "Vehicle" RESTART IDENTITY CASCADE',
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});
