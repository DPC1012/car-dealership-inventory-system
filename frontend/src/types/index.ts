export type Role = 'USER' | 'ADMIN';

export type VehicleCategory =
  | 'SEDAN'
  | 'SUV'
  | 'TRUCK'
  | 'COUPE'
  | 'HATCHBACK'
  | 'VAN'
  | 'MOTORCYCLE';

export interface User {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  category: VehicleCategory;
  price: string | number;
  quantity: number;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  make?: string;
  model?: string;
  category?: VehicleCategory | '';
  minPrice?: string | number;
  maxPrice?: string | number;
}

export interface VehicleFormData {
  make: string;
  model: string;
  category: VehicleCategory;
  price: number;
  quantity: number;
  imageUrl?: string | null;
}
