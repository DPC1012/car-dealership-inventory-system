import React from 'react';
import type { Vehicle } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShoppingBag, Edit, Trash2, PlusCircle } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onRestock: (vehicle: Vehicle) => void;
  isPurchasing?: boolean;
  index?: number;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  isPurchasing,
  index = 0,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const { theme } = useTheme();

  const formatPrice = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const isOutOfStock = vehicle.quantity <= 0;
  const isLowStock = vehicle.quantity > 0 && vehicle.quantity <= 2;

  return (
    <div
      className="card-vehicle animate-card flex flex-col justify-between h-full group theme-transition"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div>
        <div
          className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center theme-transition"
          style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {vehicle.imageUrl ? (
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center" style={{ color: 'var(--color-muted-text)' }}>
              <span className="font-heading text-xl font-bold tracking-widest uppercase">
                {vehicle.make}
              </span>
              <span
                className="text-[10px] font-sans uppercase tracking-wider mt-1"
                style={{ color: 'var(--color-muted-text)' }}
              >
                Showroom Vehicle
              </span>
            </div>
          )}

          <div
            className="absolute top-3 left-3 backdrop-blur-md px-3 py-1 rounded-full shadow-sm theme-transition"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-card) 90%, transparent)', border: '1px solid var(--color-border)' }}
          >
            <span
              className="text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-primary-text)' }}
            >
              {vehicle.category}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                isOutOfStock
                  ? ''
                  : isLowStock
                  ? ''
                  : ''
              }`}
              style={
                isOutOfStock
                  ? { backgroundColor: 'color-mix(in srgb, var(--color-error) 12%, transparent)', color: 'var(--color-error)', border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)' }
                  : isLowStock
                  ? { backgroundColor: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', color: 'var(--color-warning)', border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)' }
                  : { backgroundColor: 'color-mix(in srgb, var(--color-success) 12%, transparent)', color: 'var(--color-success)', border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)' }
              }
            >
              {isOutOfStock
                ? 'SOLD OUT'
                : isLowStock
                ? `${vehicle.quantity} LEFT`
                : 'IN STOCK'}
            </span>
          </div>
        </div>

        <h3
          className="font-heading text-xl font-bold tracking-tight group-hover:opacity-80 transition-colors theme-transition"
          style={{ color: 'var(--color-primary-text)' }}
        >
          {vehicle.make} {vehicle.model}
        </h3>

        <div className="flex items-center gap-2 text-xs font-sans mt-1 mb-3" style={{ color: 'var(--color-secondary-text)' }}>
          <span>{vehicle.category}</span>
          <span>•</span>
          <span>Certified Showroom</span>
        </div>

        <div className="my-3">
          <span
            className="font-heading text-2xl font-extrabold tracking-tight"
            style={{ color: 'var(--color-primary-text)' }}
          >
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {!isAdmin && (
          <>
            {!isAuthenticated ? (
              <button
                onClick={() => onPurchase(vehicle)}
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-card)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Sign In to Purchase
              </button>
            ) : (
              <button
                onClick={() => onPurchase(vehicle)}
                disabled={isOutOfStock || isPurchasing}
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-card)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                {isPurchasing
                  ? 'Processing...'
                  : isOutOfStock
                  ? 'SOLD OUT'
                  : 'Purchase Vehicle'}
              </button>
            )}
          </>
        )}

        {isAdmin && (
          <div
            className="grid grid-cols-3 gap-2 pt-3 mt-2"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <button
              onClick={() => onEdit(vehicle)}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-colors theme-transition"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
              title="Edit Vehicle"
            >
              <Edit className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-dark)' }} />
              Edit
            </button>

            <button
              onClick={() => onRestock(vehicle)}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-colors theme-transition"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
              title="Add Stock"
            >
              <PlusCircle className="w-3.5 h-3.5" style={{ color: 'var(--color-success)' }} />
              Restock
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
                  onDelete(vehicle.id);
                }
              }}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-colors theme-transition"
              style={{
                border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
                color: 'var(--color-error)',
                backgroundColor: 'color-mix(in srgb, var(--color-error) 8%, transparent)',
              }}
              title="Delete Vehicle"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
