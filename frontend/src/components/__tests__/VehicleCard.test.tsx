import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VehicleCard } from '../VehicleCard';
import { AuthProvider } from '../../context/AuthContext';
import type { Vehicle } from '../../types';

const mockVehicle: Vehicle = {
  id: 'veh-123',
  make: 'Porsche',
  model: '911 GT3',
  category: 'COUPE',
  price: 20000000,
  quantity: 5,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('VehicleCard Component', () => {
  it('renders vehicle specs, category badge, and formatted INR price', () => {
    render(
      <AuthProvider>
        <VehicleCard
          vehicle={mockVehicle}
          onPurchase={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onRestock={vi.fn()}
        />
      </AuthProvider>
    );

    expect(screen.getByText('Porsche 911 GT3')).toBeInTheDocument();
    expect(screen.getAllByText('COUPE').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/IN STOCK/i)).toBeInTheDocument();
    expect(screen.getByText(/2,00,00,000/)).toBeInTheDocument();
  });

  it('disables purchase button when quantity is zero', () => {
    const zeroStockVehicle: Vehicle = {
      ...mockVehicle,
      quantity: 0,
    };

    localStorage.setItem('token', 'mock-jwt-token');
    localStorage.setItem('user', JSON.stringify({ id: 'u1', email: 'test@example.com', role: 'USER' }));

    render(
      <AuthProvider>
        <VehicleCard
          vehicle={zeroStockVehicle}
          onPurchase={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onRestock={vi.fn()}
        />
      </AuthProvider>
    );

    const purchaseBtn = screen.getByRole('button', { name: /SOLD OUT/i });
    expect(purchaseBtn).toBeDisabled();
    expect(screen.getAllByText('SOLD OUT').length).toBeGreaterThanOrEqual(1);

    localStorage.clear();
  });
});
