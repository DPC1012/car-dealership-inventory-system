import request from 'supertest';
import { app } from '../../src/app';
import { prisma } from '../../src/lib/prisma';
import { hashPassword } from '../../src/utils/password';

describe('Vehicles CRUD & Search Endpoints', () => {
  let userToken: string;
  let adminToken: string;

  beforeEach(async () => {
    // Create test user
    const userRes = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
    });
    userToken = userRes.body.token;

    // Create test admin user directly in DB
    const adminPassword = await hashPassword('adminpassword123');
    await prisma.user.create({
      data: {
        name: 'Test Admin',
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

  describe('Authentication & Authorization Guards', () => {
    it('returns 401 Unauthorized for unauthenticated requests to protected endpoints', async () => {
      const v = await prisma.vehicle.create({
        data: { make: 'Toyota', model: 'Camry', category: 'SEDAN', price: 2500000.0, quantity: 1 },
      });

      const res = await request(app).post(`/api/vehicles/${v.id}/purchase`);
      expect(res.status).toBe(401);
    });

    it('returns 403 Forbidden when a normal user attempts an admin-only endpoint (DELETE /:id)', async () => {
      // Create vehicle first
      const v = await prisma.vehicle.create({
        data: {
          make: 'Toyota',
          model: 'Camry',
          category: 'SEDAN',
          price: 2500000.0,
          quantity: 5,
        },
      });

      const res = await request(app)
        .delete(`/api/vehicles/${v.id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(403);
    });

    it('returns 403 Forbidden when a normal user attempts to create a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          make: 'Honda',
          model: 'Civic',
          category: 'SEDAN',
          price: 2000000,
          quantity: 10,
        });

      expect(res.status).toBe(403);
    });

    it('returns 403 Forbidden when a normal user attempts to update a vehicle', async () => {
      const v = await prisma.vehicle.create({
        data: { make: 'BMW', model: 'M3', category: 'SEDAN', price: 8000000, quantity: 3 },
      });

      const res = await request(app)
        .put(`/api/vehicles/${v.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          make: 'BMW',
          model: 'M3 Competition',
          category: 'SEDAN',
          price: 9000000,
          quantity: 3,
        });

      expect(res.status).toBe(403);
    });
  });

  describe('CRUD Operations', () => {
    it('allows unauthenticated users to browse vehicles (GET /api/vehicles)', async () => {
      await prisma.vehicle.createMany({
        data: [
          { make: 'Tesla', model: 'Model 3', category: 'SEDAN', price: 4500000, quantity: 2 },
          { make: 'Ford', model: 'F-150', category: 'TRUCK', price: 5500000, quantity: 1 },
        ],
      });

      const res = await request(app).get('/api/vehicles');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.vehicles)).toBe(true);
      expect(res.body.vehicles.length).toBe(2);
    });

    it('creates a vehicle as admin (POST /api/vehicles)', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          make: 'Honda',
          model: 'Civic',
          category: 'SEDAN',
          price: 2000000,
          quantity: 10,
        });

      expect(res.status).toBe(201);
      expect(res.body.vehicle).toMatchObject({
        make: 'Honda',
        model: 'Civic',
        category: 'SEDAN',
        quantity: 10,
      });
      expect(res.body.vehicle.id).toBeDefined();
    });

    it('retrieves all vehicles (GET /api/vehicles)', async () => {
      await prisma.vehicle.createMany({
        data: [
          { make: 'Tesla', model: 'Model 3', category: 'SEDAN', price: 4500000, quantity: 2 },
          { make: 'Ford', model: 'F-150', category: 'TRUCK', price: 5500000, quantity: 1 },
        ],
      });

      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.vehicles)).toBe(true);
      expect(res.body.vehicles.length).toBe(2);
    });

    it('updates a vehicle as admin (PUT /api/vehicles/:id)', async () => {
      const v = await prisma.vehicle.create({
        data: { make: 'BMW', model: 'M3', category: 'SEDAN', price: 8000000, quantity: 3 },
      });

      const res = await request(app)
        .put(`/api/vehicles/${v.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          make: 'BMW',
          model: 'M3 Competition',
          category: 'SEDAN',
          price: 9000000,
          quantity: 3,
        });

      expect(res.status).toBe(200);
      expect(res.body.vehicle.model).toBe('M3 Competition');
    });

    it('deletes a vehicle as admin (DELETE /api/vehicles/:id)', async () => {
      const v = await prisma.vehicle.create({
        data: { make: 'Audi', model: 'A4', category: 'SEDAN', price: 4000000, quantity: 1 },
      });

      const res = await request(app)
        .delete(`/api/vehicles/${v.id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(204);

      const check = await prisma.vehicle.findUnique({ where: { id: v.id } });
      expect(check).toBeNull();
    });
  });

  describe('Search & Filtering (GET /api/vehicles/search)', () => {
    beforeEach(async () => {
      await prisma.vehicle.createMany({
        data: [
          { make: 'Hyundai', model: 'Creta', category: 'SUV', price: 1500000, quantity: 5 },
          { make: 'Hyundai', model: 'Verna', category: 'SEDAN', price: 1200000, quantity: 3 },
          { make: 'Mahindra', model: 'Thar', category: 'SUV', price: 1800000, quantity: 4 },
        ],
      });
    });

    it('filters by make (case-insensitive partial match)', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?make=hyun')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.vehicles.length).toBe(2);
    });

    it('filters by category and price range', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?category=SUV&minPrice=1600000&maxPrice=2000000')
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBe(200);
      expect(res.body.vehicles.length).toBe(1);
      expect(res.body.vehicles[0].model).toBe('Thar');
    });
  });
});
