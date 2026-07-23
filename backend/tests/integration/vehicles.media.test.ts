import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';
import { hashPassword } from '../../src/utils/password';

describe('POST /api/vehicles/upload-image (Media Upload)', () => {
  let userToken: string;
  let adminToken: string;

  beforeEach(async () => {
    // Create test user
    const userRes = await request(app).post('/api/auth/register').send({
      email: 'mediauser@example.com',
      password: 'password123',
    });
    userToken = userRes.body.token;

    // Create test admin user directly in DB
    const adminPassword = await hashPassword('adminpassword123');
    await prisma.user.create({
      data: {
        email: 'mediaadmin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const adminLoginRes = await request(app).post('/api/auth/login').send({
      email: 'mediaadmin@example.com',
      password: 'adminpassword123',
    });
    adminToken = adminLoginRes.body.token;
  });

  it('returns 401 Unauthorized if no token provided', async () => {
    const res = await request(app).post('/api/vehicles/upload-image');
    expect(res.status).toBe(401);
  });

  it('returns 403 Forbidden if non-admin user attempts upload', async () => {
    const res = await request(app)
      .post('/api/vehicles/upload-image')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('returns 400 Bad Request if no image file is attached', async () => {
    const res = await request(app)
      .post('/api/vehicles/upload-image')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(400);
  });
});
