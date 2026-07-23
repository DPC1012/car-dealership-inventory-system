import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';

describe('POST /api/auth/register', () => {
  it('creates a new user and returns 201 with a token and safe user payload', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'New User',
      email: 'newuser@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    expect(res.body.user).toMatchObject({
      name: 'New User',
      email: 'newuser@example.com',
      role: 'USER',
    });
    // The password hash must never be returned to the client.
    expect(res.body.user).not.toHaveProperty('password');

    // The user is persisted with a hashed (not plaintext) password.
    const saved = await prisma.user.findUnique({
      where: { email: 'newuser@example.com' },
    });
    expect(saved).not.toBeNull();
    expect(saved?.password).not.toBe('password123');
    expect(saved?.role).toBe('USER');
  });
});
