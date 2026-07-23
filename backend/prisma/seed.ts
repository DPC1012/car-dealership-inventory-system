import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with realistic vehicles and images...');

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

  // Re-seed vehicle inventory
  await prisma.vehicle.deleteMany();

  await prisma.vehicle.createMany({
    data: [
      {
        make: 'Porsche',
        model: '911 GT3 RS',
        category: 'COUPE',
        price: 35000000.0,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'BMW',
        model: 'M3 Competition Sedan',
        category: 'SEDAN',
        price: 13000000.0,
        quantity: 5,
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Mercedes-Benz',
        model: 'AMG GT Coupe',
        category: 'COUPE',
        price: 27000000.0,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Audi',
        model: 'RS e-tron GT',
        category: 'SEDAN',
        price: 20500000.0,
        quantity: 3,
        imageUrl: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Range Rover',
        model: 'SV Autobiography',
        category: 'SUV',
        price: 41000000.0,
        quantity: 4,
        imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Ford',
        model: 'F-150 Raptor',
        category: 'TRUCK',
        price: 9500000.0,
        quantity: 0, // Out of stock example
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Tesla',
        model: 'Model S Plaid',
        category: 'SEDAN',
        price: 15000000.0,
        quantity: 3,
        imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Lamborghini',
        model: 'Huracan EVO',
        category: 'COUPE',
        price: 40000000.0,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Volkswagen',
        model: 'Golf R Hot Hatch',
        category: 'HATCHBACK',
        price: 5200000.0,
        quantity: 6,
        imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Ducati',
        model: 'Panigale V4 S',
        category: 'MOTORCYCLE',
        price: 3300000.0,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Mercedes-Benz',
        model: 'V-Class Luxury Van',
        category: 'VAN',
        price: 14000000.0,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Hyundai',
        model: 'Creta SX Executive',
        category: 'SUV',
        price: 1850000.0,
        quantity: 8,
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      },
    ],
  });

  console.log('✓ Successfully seeded 12 vehicles with high-resolution images!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
