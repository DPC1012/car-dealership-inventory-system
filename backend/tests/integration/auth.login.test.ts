import request from 'supertest';
import { app } from '../../src/app';

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    // Register a user to test login against
    await request(app).post('/api/auth/register').send({
      email: 'loginuser@example.com',
      password: 'password123',
    });
  });

  it('returns 200 with JWT token and safe user payload on valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'loginuser@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
    expect(res.body.user).toMatchObject({
      email: 'loginuser@example.com',
      role: 'USER',
    });
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('returns 401 on invalid password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'loginuser@example.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it('returns 401 on non-existent user email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });

  it('returns 400 on invalid payload schema (short password or bad email)', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'invalid-email',
      password: 'short',
    });

    expect(res.status).toBe(400);
  });
});
