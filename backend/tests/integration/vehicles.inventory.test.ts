import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';
import { hashPassword } from '../../src/utils/password';

describe('Inventory Operations & Concurrency', () => {
  let userToken: string;
  let adminToken: string;

  beforeEach(async () => {
    const userRes = await request(app).post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });
    userToken = userRes.body.token;

    const adminPassword = await hashPassword('adminpassword123');
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const adminLoginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'adminpassword123',
    });
    adminToken = adminLoginRes.body.token;
  });

  it('purchases a vehicle and decrements quantity (POST /api/vehicles/:id/purchase)', async () => {
    const v = await prisma.vehicle.create({
      data: { make: 'Porsche', model: '911', category: 'COUPE', price: 15000000, quantity: 2 },
    });

    const res = await request(app)
      .post(`/api/vehicles/${v.id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(1);
  });

  it('returns 409 Conflict when attempting to purchase a vehicle with 0 stock', async () => {
    const v = await prisma.vehicle.create({
      data: { make: 'Porsche', model: '911', category: 'COUPE', price: 15000000, quantity: 0 },
    });

    const res = await request(app)
      .post(`/api/vehicles/${v.id}/purchase`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(409);
    expect(res.body.error).toBeDefined();
  });

  it('returns 403 when admin attempts to purchase a vehicle', async () => {
    const v = await prisma.vehicle.create({
      data: { make: 'Porsche', model: '911', category: 'COUPE', price: 15000000, quantity: 2 },
    });

    const res = await request(app)
      .post(`/api/vehicles/${v.id}/purchase`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toBeDefined();
  });

  it('restocks a vehicle as admin (POST /api/vehicles/:id/restock)', async () => {
    const v = await prisma.vehicle.create({
      data: { make: 'Porsche', model: '911', category: 'COUPE', price: 15000000, quantity: 1 },
    });

    const res = await request(app)
      .post(`/api/vehicles/${v.id}/restock`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(6);
  });

  it('handles concurrent purchases without overselling (quantity = 1, 5 simultaneous requests)', async () => {
    const v = await prisma.vehicle.create({
      data: { make: 'Limited', model: 'Hypercar', category: 'COUPE', price: 50000000, quantity: 1 },
    });

    // Send 5 concurrent purchase requests
    const requests = Array.from({ length: 5 }).map(() =>
      request(app)
        .post(`/api/vehicles/${v.id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
    );

    const responses = await Promise.all(requests);

    const successCount = responses.filter((r) => r.status === 200).length;
    const conflictCount = responses.filter((r) => r.status === 409).length;

    expect(successCount).toBe(1);
    expect(conflictCount).toBe(4);

    // Verify DB state
    const updated = await prisma.vehicle.findUnique({ where: { id: v.id } });
    expect(updated?.quantity).toBe(0);
  });
});
