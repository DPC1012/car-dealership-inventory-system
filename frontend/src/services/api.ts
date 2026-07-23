import { fetchApi } from '../config/api';
import type { Vehicle, SearchFilters, VehicleFormData } from '../types';

export const vehicleApi = {
  getVehicles: async (): Promise<Vehicle[]> => {
    const res = await fetchApi<{ vehicles: Vehicle[] }>('/vehicles');
    return res.vehicles;
  },

  searchVehicles: async (filters: SearchFilters): Promise<Vehicle[]> => {
    const params = new URLSearchParams();
    if (filters.make) params.append('make', filters.make);
    if (filters.model) params.append('model', filters.model);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice) params.append('maxPrice', String(filters.maxPrice));

    const queryString = params.toString();
    const endpoint = queryString ? `/vehicles/search?${queryString}` : '/vehicles';
    const res = await fetchApi<{ vehicles: Vehicle[] }>(endpoint);
    return res.vehicles;
  },

  createVehicle: async (data: VehicleFormData): Promise<Vehicle> => {
    const res = await fetchApi<{ vehicle: Vehicle }>('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return res.vehicle;
  },

  updateVehicle: async (id: string, data: Partial<VehicleFormData>): Promise<Vehicle> => {
    const res = await fetchApi<{ vehicle: Vehicle }>(`/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return res.vehicle;
  },

  deleteVehicle: async (id: string): Promise<void> => {
    await fetchApi<void>(`/vehicles/${id}`, {
      method: 'DELETE',
    });
  },

  purchaseVehicle: async (id: string): Promise<Vehicle> => {
    const res = await fetchApi<{ vehicle: Vehicle }>(`/vehicles/${id}/purchase`, {
      method: 'POST',
    });
    return res.vehicle;
  },

  restockVehicle: async (id: string, quantity: number): Promise<Vehicle> => {
    const res = await fetchApi<{ vehicle: Vehicle }>(`/vehicles/${id}/restock`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
    return res.vehicle;
  },

  uploadVehicleImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetchApi<{ imageUrl: string }>('/vehicles/upload-image', {
      method: 'POST',
      body: formData,
    });
    return res.imageUrl;
  },
};
