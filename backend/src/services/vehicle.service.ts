import { Prisma, type Vehicle } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { NotFoundError, ConflictError } from '../errors';
import type {
  CreateVehicleInput,
  UpdateVehicleInput,
  SearchVehicleInput,
} from '../schemas/vehicle.schema';

export async function getAllVehicles(): Promise<Vehicle[]> {
  return prisma.vehicle.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function searchVehicles(query: SearchVehicleInput): Promise<Vehicle[]> {
  const where: Prisma.VehicleWhereInput = {};

  if (query.make) {
    where.make = { contains: query.make, mode: 'insensitive' };
  }
  if (query.model) {
    where.model = { contains: query.model, mode: 'insensitive' };
  }
  if (query.category) {
    where.category = query.category;
  }
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    where.price = {};
    if (query.minPrice !== undefined) {
      where.price.gte = query.minPrice;
    }
    if (query.maxPrice !== undefined) {
      where.price.lte = query.maxPrice;
    }
  }

  return prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getVehicleById(id: string): Promise<Vehicle> {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    throw new NotFoundError('Vehicle not found');
  }
  return vehicle;
}

export async function createVehicle(input: CreateVehicleInput): Promise<Vehicle> {
  return prisma.vehicle.create({
    data: input,
  });
}

export async function updateVehicle(id: string, input: UpdateVehicleInput): Promise<Vehicle> {
  await getVehicleById(id);
  return prisma.vehicle.update({
    where: { id },
    data: input,
  });
}

export async function deleteVehicle(id: string): Promise<void> {
  await getVehicleById(id);
  await prisma.vehicle.delete({
    where: { id },
  });
}

export async function purchaseVehicle(id: string): Promise<Vehicle> {
  // Single atomic UPDATE ... RETURNING to prevent overselling and return the
  // exact row state after this purchase (no separate read that could race).
  const [updated] = await prisma.$queryRaw<Vehicle[]>`
    UPDATE "Vehicle"
    SET "quantity" = "quantity" - 1, "updatedAt" = NOW()
    WHERE "id" = ${id} AND "quantity" > 0
    RETURNING *
  `;

  if (!updated) {
    const existing = await prisma.vehicle.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Vehicle not found');
    }
    throw new ConflictError('Vehicle is out of stock');
  }

  return updated;
}

export async function restockVehicle(id: string, quantity: number): Promise<Vehicle> {
  await getVehicleById(id);
  return prisma.vehicle.update({
    where: { id },
    data: {
      quantity: { increment: quantity },
    },
  });
}

export async function uploadVehicleImage(
  fileBuffer: Buffer,
  originalName: string,
  vehicleId?: string,
): Promise<string> {
  const { uploadImageToImageKit } = await import('../lib/imagekit');
  const fileName = `vehicle-${Date.now()}-${originalName.replace(/\s+/g, '_')}`;
  const url = await uploadImageToImageKit(fileBuffer, fileName);

  if (vehicleId) {
    await getVehicleById(vehicleId);
    await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { imageUrl: url },
    });
  }

  return url;
}

