// Single shared PrismaClient instance for the app.
// Tests inject their own DATABASE_URL (Testcontainers) via the environment
// before this module is imported.
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
