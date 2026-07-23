import React from 'react';
import type { Vehicle } from '../types';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Edit, Trash2, PlusCircle } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchase: (vehicle: Vehicle) => void;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (id: string) => void;
  onRestock: (vehicle: Vehicle) => void;
  isPurchasing?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onPurchase,
  onEdit,
  onDelete,
  onRestock,
  isPurchasing,
}) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Price formatter in INR currency (DESIGN_SYSTEM.md)
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
    <div className="card-vehicle flex flex-col justify-between h-full group">
      <div>
        {/* 16:10 Aspect Ratio Image Container */}
        <div className="w-full aspect-[16/10] rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] overflow-hidden mb-4 relative flex items-center justify-center">
          {vehicle.imageUrl ? (
            <img
              src={vehicle.imageUrl}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#9CA3AF]">
              <span className="font-heading text-xl font-bold tracking-widest uppercase">
                {vehicle.make}
              </span>
              <span className="text-[10px] font-sans uppercase tracking-wider text-[#9CA3AF] mt-1">
                Showroom Vehicle
              </span>
            </div>
          )}

          {/* Category Badge Top Left */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#E5E7EB] shadow-sm">
            <span className="text-[10px] font-semibold tracking-wider text-[#18181B] uppercase">
              {vehicle.category}
            </span>
          </div>

          {/* Stock Status Badge Top Right */}
          <div className="absolute top-3 right-3">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                isOutOfStock
                  ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FCA5A5]'
                  : isLowStock
                  ? 'bg-[#FFFBEB] text-[#F59E0B] border border-[#FCD34D]'
                  : 'bg-[#F0FDF4] text-[#22C55E] border border-[#86EFAC]'
              }`}
            >
              {isOutOfStock
                ? 'SOLD OUT'
                : isLowStock
                ? `${vehicle.quantity} LEFT`
                : 'IN STOCK'}
            </span>
          </div>
        </div>

        {/* Vehicle Title & Specs */}
        <h3 className="font-heading text-xl font-bold text-[#18181B] tracking-tight group-hover:text-[#111111] transition-colors">
          {vehicle.make} {vehicle.model}
        </h3>

        <div className="flex items-center gap-2 text-xs text-[#6B7280] font-sans mt-1 mb-3">
          <span>2026 Model</span>
          <span>•</span>
          <span>Automatic</span>
          <span>•</span>
          <span>Certified Showroom</span>
        </div>

        {/* Price Display */}
        <div className="my-3">
          <span className="font-heading text-2xl font-extrabold text-[#111111] tracking-tight">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>

      {/* Action Buttons (Primary 48px Pill Button per Section 7) */}
      <div className="mt-4 space-y-2">
        {!isAdmin && (
          <button
            onClick={() => onPurchase(vehicle)}
            disabled={isOutOfStock || isPurchasing || !isAuthenticated}
            className="btn-primary w-full flex items-center justify-center gap-2 shadow-sm"
            title={!isAuthenticated ? 'Please sign in to purchase' : undefined}
          >
            <ShoppingBag className="w-4 h-4" />
            {isPurchasing
              ? 'Processing...'
              : isOutOfStock
              ? 'SOLD OUT'
              : !isAuthenticated
              ? 'Sign In to Purchase'
              : 'Purchase Vehicle'}
          </button>
        )}

        {/* Admin Controls */}
        {isAdmin && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#F3F4F6] mt-2">
            <button
              onClick={() => onEdit(vehicle)}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#E5E7EB] text-[#18181B] hover:bg-[#F5F5F5] flex items-center justify-center gap-1 transition-colors"
              title="Edit Vehicle"
            >
              <Edit className="w-3.5 h-3.5 text-[#3B82F6]" />
              Edit
            </button>

            <button
              onClick={() => onRestock(vehicle)}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#E5E7EB] text-[#18181B] hover:bg-[#F5F5F5] flex items-center justify-center gap-1 transition-colors"
              title="Add Stock"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#22C55E]" />
              Restock
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
                  onDelete(vehicle.id);
                }
              }}
              className="py-2 px-2 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#FCA5A5] text-[#EF4444] bg-[#FEF2F2] hover:bg-[#FEE2E2] flex items-center justify-center gap-1 transition-colors"
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
