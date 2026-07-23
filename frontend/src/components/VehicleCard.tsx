import React, { useState, useEffect, useRef } from 'react';
import type { Vehicle } from '../types';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Edit, Trash2, PlusCircle, Loader2 } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onRestock: (vehicle: Vehicle) => void;
  isPurchasing?: boolean;
  index?: number;
}

const formatPrice = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num);
};

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const confirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
    };
  }, []);

  const isOutOfStock = vehicle.quantity <= 0;
  const isLowStock = vehicle.quantity > 0 && vehicle.quantity <= 2;

  const stockLabel = isOutOfStock
    ? 'SOLD OUT'
    : isLowStock
    ? `${vehicle.quantity} LEFT`
    : 'IN STOCK';

  const stockStyle = isOutOfStock
    ? { backgroundColor: 'color-mix(in srgb, var(--color-error) 12%, transparent)', color: 'var(--color-error)', border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)' }
    : isLowStock
    ? { backgroundColor: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', color: 'var(--color-warning)', border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)' }
    : { backgroundColor: 'color-mix(in srgb, var(--color-success) 12%, transparent)', color: 'var(--color-success)', border: '1px solid color-mix(in srgb, var(--color-success) 30%, transparent)' };

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
          {vehicle.imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin" style={{ color: 'var(--color-muted-text)' }} />
                </div>
              )}
              <img
                src={vehicle.imageUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </>
          ) : null}

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
              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md"
              style={stockStyle}
            >
              {stockLabel}
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
          <span aria-hidden="true">·</span>
          <span>Stock {vehicle.quantity}</span>
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
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-card)', outlineColor: 'var(--color-primary-dark)' }}
              >
                <ShoppingBag className="w-4 h-4" />
                Sign In to Purchase
              </button>
            ) : (
              <button
                onClick={() => onPurchase(vehicle)}
                disabled={isOutOfStock || isPurchasing}
                className="btn-primary w-full flex items-center justify-center gap-2 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-card)', outlineColor: 'var(--color-primary-dark)' }}
              >
                {isPurchasing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
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
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all theme-transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
              title="Edit Vehicle"
            >
              <Edit className="w-3.5 h-3.5" style={{ color: 'var(--color-primary-dark)' }} />
              Edit
            </button>

            <button
              onClick={() => onRestock(vehicle)}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all theme-transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
              title="Add Stock"
            >
              <PlusCircle className="w-3.5 h-3.5" style={{ color: 'var(--color-success)' }} />
              Restock
            </button>

            <button
              onClick={() => {
                if (confirmDelete) {
                  if (confirmTimerRef.current) clearTimeout(confirmTimerRef.current);
                  onDelete(vehicle.id);
                  setConfirmDelete(false);
                } else {
                  setConfirmDelete(true);
                  confirmTimerRef.current = setTimeout(() => setConfirmDelete(false), 3000);
                }
              }}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1 transition-all theme-transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
              style={confirmDelete ? {
                border: '1px solid var(--color-error)',
                color: 'var(--color-bg)',
                backgroundColor: 'var(--color-error)',
              } : {
                border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)',
                color: 'var(--color-error)',
                backgroundColor: 'color-mix(in srgb, var(--color-error) 8%, transparent)',
              }}
              onMouseEnter={(e) => {
                if (!confirmDelete) e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-error) 15%, transparent)';
              }}
              onMouseLeave={(e) => {
                if (!confirmDelete) e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--color-error) 8%, transparent)';
              }}
              title={confirmDelete ? 'Click again to confirm' : 'Delete Vehicle'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              {confirmDelete ? 'Confirm?' : 'Delete'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
