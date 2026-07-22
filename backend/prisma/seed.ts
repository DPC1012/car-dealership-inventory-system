import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@dealership.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword123!';
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Upsert Admin User
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log(`✓ Admin user ready: ${admin.email}`);

  // Create initial vehicles
  const count = await prisma.vehicle.count();
  if (count === 0) {
    await prisma.vehicle.createMany({
      data: [
        {
          make: 'Porsche',
          model: '911 GT3 RS',
          category: 'COUPE',
          price: 35000000.0,
          quantity: 2,
        },
        {
          make: 'BMW',
          model: 'M3 Competition',
          category: 'SEDAN',
          price: 13000000.0,
          quantity: 5,
        },
        {
          make: 'Mercedes-Benz',
          model: 'AMG GT Coupe',
          category: 'COUPE',
          price: 27000000.0,
          quantity: 1,
        },
        {
          make: 'Hyundai',
          model: 'Creta SX',
          category: 'SUV',
          price: 1800000.0,
          quantity: 8,
        },
        {
          make: 'Ford',
          model: 'F-150 Raptor',
          category: 'TRUCK',
          price: 9500000.0,
          quantity: 0, // Out of stock example
        },
        {
          make: 'Tesla',
          model: 'Model S Plaid',
          category: 'SEDAN',
          price: 15000000.0,
          quantity: 3,
        },
      ],
    });
    console.log('✓ Initial vehicle inventory seeded (6 vehicles)');
  }
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
