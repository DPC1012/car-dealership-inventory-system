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
      name: 'Admin',
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
      // ── Budget Hatchbacks ──────────────────────────────────
      {
        make: 'Maruti Suzuki',
        model: 'Alto K10',
        category: 'HATCHBACK',
        price: 399000.0,
        quantity: 12,
        imageUrl: 'https://images.pexels.com/photos/30648753/pexels-photo-30648753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Maruti Suzuki',
        model: 'WagonR 1.2',
        category: 'HATCHBACK',
        price: 540000.0,
        quantity: 10,
        imageUrl: 'https://images.pexels.com/photos/18670317/pexels-photo-18670317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Tata',
        model: 'Tiago XZ',
        category: 'HATCHBACK',
        price: 620000.0,
        quantity: 8,
        imageUrl: 'https://images.pexels.com/photos/17720659/pexels-photo-17720659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Hyundai',
        model: 'Grand i10 Nios',
        category: 'HATCHBACK',
        price: 580000.0,
        quantity: 9,
        imageUrl: 'https://images.pexels.com/photos/17183439/pexels-photo-17183439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Tata',
        model: 'Altroz XZ+',
        category: 'HATCHBACK',
        price: 780000.0,
        quantity: 6,
        imageUrl: 'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Maruti Suzuki',
        model: 'Swift ZXi+',
        category: 'HATCHBACK',
        price: 850000.0,
        quantity: 7,
        imageUrl: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Hyundai',
        model: 'i20 Asta',
        category: 'HATCHBACK',
        price: 920000.0,
        quantity: 5,
        imageUrl: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Sedans ─────────────────────────────────────────────
      {
        make: 'Maruti Suzuki',
        model: 'Dzire VDi',
        category: 'SEDAN',
        price: 750000.0,
        quantity: 10,
        imageUrl: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Hyundai',
        model: 'Verna SX(O)',
        category: 'SEDAN',
        price: 1150000.0,
        quantity: 6,
        imageUrl: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Honda',
        model: 'City ZX CVT',
        category: 'SEDAN',
        price: 1350000.0,
        quantity: 5,
        imageUrl: 'https://images.pexels.com/photos/29308132/pexels-photo-29308132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Tata',
        model: 'Tigor EV',
        category: 'SEDAN',
        price: 1200000.0,
        quantity: 4,
        imageUrl: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Skoda',
        model: 'Slavia Style',
        category: 'SEDAN',
        price: 1500000.0,
        quantity: 3,
        imageUrl: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Volkswagen',
        model: 'Virtus GT',
        category: 'SEDAN',
        price: 1600000.0,
        quantity: 3,
        imageUrl: 'https://images.pexels.com/photos/1204611/pexels-photo-1204611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'BMW',
        model: '3 Series 330i',
        category: 'SEDAN',
        price: 5500000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/19892485/pexels-photo-19892485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Mercedes-Benz',
        model: 'C-Class 200',
        category: 'SEDAN',
        price: 5800000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── SUVs ───────────────────────────────────────────────
      {
        make: 'Maruti Suzuki',
        model: 'Brezza ZXi+',
        category: 'SUV',
        price: 1400000.0,
        quantity: 8,
        imageUrl: 'https://images.pexels.com/photos/18240248/pexels-photo-18240248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Hyundai',
        model: 'Creta SX(O)',
        category: 'SUV',
        price: 1850000.0,
        quantity: 7,
        imageUrl: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Kia',
        model: 'Seltos HTX+',
        category: 'SUV',
        price: 1650000.0,
        quantity: 6,
        imageUrl: 'https://images.pexels.com/photos/2684218/pexels-photo-2684218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Tata',
        model: 'Nexon XZ+ Premium',
        category: 'SUV',
        price: 1450000.0,
        quantity: 9,
        imageUrl: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Mahindra',
        model: 'Thar LX 4x4',
        category: 'SUV',
        price: 1600000.0,
        quantity: 4,
        imageUrl: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Mahindra',
        model: 'XUV700 AX7',
        category: 'SUV',
        price: 2200000.0,
        quantity: 5,
        imageUrl: 'https://images.unsplash.com/photo-1617469955236-7f23b3dab897?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'Toyota',
        model: 'Fortuner Legender',
        category: 'SUV',
        price: 4300000.0,
        quantity: 3,
        imageUrl: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Jeep',
        model: 'Meridian Limited',
        category: 'SUV',
        price: 3300000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Range Rover',
        model: 'Sport P400',
        category: 'SUV',
        price: 16500000.0,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/28496683/pexels-photo-28496683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Coupe / Sports ─────────────────────────────────────
      {
        make: 'Porsche',
        model: '911 Carrera S',
        category: 'COUPE',
        price: 19000000.0,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/35715223/pexels-photo-35715223.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'BMW',
        model: 'Z4 M40i',
        category: 'COUPE',
        price: 8500000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Trucks / Pickups ───────────────────────────────────
      {
        make: 'Isuzu',
        model: 'D-Max V-Cross 4x4',
        category: 'TRUCK',
        price: 2000000.0,
        quantity: 3,
        imageUrl: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Toyota',
        model: 'Hilux',
        category: 'TRUCK',
        price: 3000000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Vans / MPV ─────────────────────────────────────────
      {
        make: 'Maruti Suzuki',
        model: 'Ertiga ZDi+',
        category: 'VAN',
        price: 1200000.0,
        quantity: 5,
        imageUrl: 'https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Toyota',
        model: 'Innova Hycross',
        category: 'VAN',
        price: 2100000.0,
        quantity: 4,
        imageUrl: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Electric ───────────────────────────────────────────
      {
        make: 'Tata',
        model: 'Nexon EV Prime',
        category: 'SUV',
        price: 1500000.0,
        quantity: 6,
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1000&q=80',
      },
      {
        make: 'MG',
        model: 'ZS EV',
        category: 'SUV',
        price: 2200000.0,
        quantity: 3,
        imageUrl: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Hyundai',
        model: 'Ioniq 5',
        category: 'SUV',
        price: 4400000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },

      // ── Premium / Luxury ───────────────────────────────────
      {
        make: 'Audi',
        model: 'A4 Premium Plus',
        category: 'SEDAN',
        price: 4600000.0,
        quantity: 2,
        imageUrl: 'https://images.pexels.com/photos/1005633/pexels-photo-1005633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        make: 'Lamborghini',
        model: 'Urus Pearl Capsule',
        category: 'SUV',
        price: 35000000.0,
        quantity: 1,
        imageUrl: 'https://images.pexels.com/photos/8663937/pexels-photo-8663937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  });

  console.log('✓ Successfully seeded 33 vehicles across all categories!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
