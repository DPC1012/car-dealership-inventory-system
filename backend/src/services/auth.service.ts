// Auth business logic. Register hashes the password, enforces unique email,
// and returns a safe user (no password hash).
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { hashPassword, verifyPassword } from '../utils/password';
import { ConflictError, UnauthorizedError } from '../errors';
import { toSafeUser, type SafeUser } from '../utils/serialize';
import type { RegisterInput, LoginInput } from '../schemas/auth.schema';

export async function registerUser(input: RegisterInput): Promise<SafeUser> {
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (existing) {
    throw new ConflictError('Email is already registered');
  }

  const password = await hashPassword(input.password);

  try {
    const user = await prisma.user.create({
      data: { name: input.name, email: input.email, password },
    });
    return toSafeUser(user);
  } catch (err) {
    // Guard against the race where a duplicate slips past the check above.
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      throw new ConflictError('Email is already registered');
    }
    throw err;
  }
}

export async function loginUser(input: LoginInput): Promise<SafeUser> {
  const user = await prisma.user.findUnique({
    where: { email: input.email },
  });
  if (!user) {
    throw new UnauthorizedError('No account found with this email. Please register first.');
  }

  const isValid = await verifyPassword(input.password, user.password);
  if (!isValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  return toSafeUser(user);
}

