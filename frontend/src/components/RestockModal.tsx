import React, { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import { X, PlusCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState<number>(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuantity(5);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
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
    <div
      onClick={isLoading ? undefined : onClose}
      className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-overlay)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-3xl p-6 max-w-sm w-full shadow-2xl relative animate-in theme-transition"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-primary-text)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition-colors p-1"
          style={{ color: 'var(--color-muted-text)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-primary-text)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-muted-text)'; }}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <PlusCircle className="w-5 h-5 text-[#22C55E]" />
          <h2 className="font-heading text-xl font-bold tracking-tight uppercase">
            Restock Inventory
          </h2>
        </div>

        <p className="text-xs font-sans mb-5" style={{ color: 'var(--color-secondary-text)' }}>
          Add stock for <span style={{ color: 'var(--color-primary-text)' }} className="font-semibold">{vehicle.make} {vehicle.model}</span> (Current stock: {vehicle.quantity})
        </p>

        {error && (
          <div className="mb-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-3 flex items-center gap-2 text-xs" style={{ color: 'var(--color-error)' }}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Quantity to Add (Positive Integer)
            </label>
            <input
              type="number"
              required
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="e.g. 5"
              className="w-full rounded-2xl px-4 py-2.5 text-xs outline-none font-sans"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary-text)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary-dark)';
                e.currentTarget.style.backgroundColor = 'var(--color-card)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.backgroundColor = 'var(--color-input-bg)';
              }}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4" style={{ borderTop: '1px solid var(--color-divider)' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold hover:opacity-80"
              style={{ color: 'var(--color-secondary-text)', border: '1px solid var(--color-border)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#111111] text-white hover:bg-[#27272A] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              {isLoading ? 'Restocking...' : 'Confirm Restock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
