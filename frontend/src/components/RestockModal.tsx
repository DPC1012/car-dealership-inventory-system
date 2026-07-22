import React, { useState } from 'react';
import type { Vehicle } from '../types';
import { X, PlusCircle, AlertCircle } from 'lucide-react';

interface RestockModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onRestock: (id: string, quantity: number) => Promise<void>;
  isLoading?: boolean;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  vehicle,
  isOpen,
  onClose,
  onRestock,
  isLoading,
}) => {
  const [quantity, setQuantity] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError('Restock quantity must be at least 1');
      return;
    }

    try {
      await onRestock(vehicle.id, quantity);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Restock failed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-[#1B1E24] border border-[#333846] rounded-md p-6 max-w-sm w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#454C5C] hover:text-[#F3F0E9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <PlusCircle className="w-5 h-5 text-[#6FA787]" />
          <h2 className="font-signage text-xl font-semibold tracking-wide text-[#E3A143] uppercase">
            Restock Inventory
          </h2>
        </div>

        <p className="text-xs text-[#F3F0E9]/70 font-sans mb-4">
          Add stock for <span className="text-[#F3F0E9] font-medium">{vehicle.make} {vehicle.model}</span> (Current stock: {vehicle.quantity})
        </p>

        {error && (
          <div className="mb-4 bg-[#2C1E1C] border border-[#C4574A]/40 rounded-sm p-3 flex items-center gap-2 text-xs text-[#C4574A]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Quantity to Add (Positive Integer)
            </label>
            <input
              type="number"
              required
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="e.g. 5"
              className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] focus:border-[#E3A143] outline-none font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#333846]">
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost px-4 py-2 rounded-sm text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary px-5 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider"
            >
              {isLoading ? 'Restocking...' : 'Confirm Restock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
