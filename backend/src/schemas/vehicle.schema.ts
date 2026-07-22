import { z } from 'zod';
import { VehicleCategory } from '@prisma/client';

export const vehicleCategoryEnum = z.nativeEnum(VehicleCategory);

export const createVehicleSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  category: vehicleCategoryEnum,
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().int().min(0, 'Quantity cannot be negative'),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

export const updateVehicleSchema = createVehicleSchema.partial();

export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;

export const searchVehicleSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  category: vehicleCategoryEnum.optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
});

export type SearchVehicleInput = z.infer<typeof searchVehicleSchema>;

export const restockVehicleSchema = z.object({
  quantity: z.number().int().positive('Restock quantity must be greater than 0'),
});

export type RestockVehicleInput = z.infer<typeof restockVehicleSchema>;
