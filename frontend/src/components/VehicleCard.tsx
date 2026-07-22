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

  // Price formatter in INR currency
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
    <div className="card-showroom p-5 flex flex-col justify-between h-full">
      <div>
        {/* Top Header: Category Badge + Stock Status */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase bg-[#252932] border border-[#333846] rounded-sm px-2.5 py-0.5">
            {vehicle.category}
          </span>

          <span
            className={`font-signage text-xs font-semibold tracking-wider uppercase ${
              isOutOfStock
                ? 'text-[#C4574A]'
                : isLowStock
                ? 'text-[#F0B65C]'
                : 'text-[#6FA787]'
            }`}
          >
            {isOutOfStock
              ? 'SOLD OUT'
              : isLowStock
              ? `LOW STOCK (${vehicle.quantity} LEFT)`
              : `IN STOCK (${vehicle.quantity})`}
          </span>
        </div>

        {/* Vehicle Title */}
        <h3 className="font-sans text-xl font-semibold text-[#F3F0E9] tracking-tight mb-1">
          {vehicle.make} {vehicle.model}
        </h3>

        {/* Visually Dominant Amber Price */}
        <div className="my-4">
          <span className="font-signage text-3xl font-bold tracking-wide text-[#E3A143]">
            {formatPrice(vehicle.price)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        {/* Purchase Button */}
        <button
          onClick={() => onPurchase(vehicle)}
          disabled={isOutOfStock || isPurchasing || !isAuthenticated}
          className="btn-primary w-full py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
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

        {/* Admin Control Row */}
        {isAdmin && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#333846]">
            <button
              onClick={() => onEdit(vehicle)}
              className="btn-ghost py-1.5 px-2 text-[11px] font-signage uppercase tracking-wider rounded-sm flex items-center justify-center gap-1 hover:border-[#5B7A99] hover:text-[#5B7A99]"
              title="Edit Details"
            >
              <Edit className="w-3 h-3" />
              Edit
            </button>

            <button
              onClick={() => onRestock(vehicle)}
              className="btn-ghost py-1.5 px-2 text-[11px] font-signage uppercase tracking-wider rounded-sm flex items-center justify-center gap-1 hover:border-[#6FA787] hover:text-[#6FA787]"
              title="Add Stock"
            >
              <PlusCircle className="w-3 h-3" />
              Restock
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${vehicle.make} ${vehicle.model}?`)) {
                  onDelete(vehicle.id);
                }
              }}
              className="btn-ghost py-1.5 px-2 text-[11px] font-signage uppercase tracking-wider rounded-sm border-[#C4574A]/30 text-[#C4574A] hover:bg-[#2C1E1C] flex items-center justify-center gap-1"
              title="Delete Vehicle"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
