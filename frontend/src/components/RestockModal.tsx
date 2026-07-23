import React, { useState, useEffect } from 'react';
import type { Vehicle } from '../types';
import { X, PlusCircle, AlertCircle } from 'lucide-react';
import { ModalPortal } from './ModalPortal';

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
    <ModalPortal isOpen={isOpen} onClose={onClose}>
      <div
        onClick={isLoading ? undefined : onClose}
        className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
        style={{ backgroundColor: 'var(--color-overlay)' }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
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
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <PlusCircle className="w-5 h-5" style={{ color: 'var(--color-success)' }} />
          <h2 className="font-heading text-xl font-bold tracking-tight uppercase">
            Restock Inventory
          </h2>
        </div>

        <p className="text-xs font-sans mb-5" style={{ color: 'var(--color-secondary-text)' }}>
          Add stock for <span style={{ color: 'var(--color-primary-text)' }} className="font-semibold">{vehicle.make} {vehicle.model}</span> (Current stock: {vehicle.quantity})
        </p>

        {error && (
          <div className="mb-4 rounded-2xl p-3 flex items-center gap-2 text-xs" style={{ backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)', border: '1px solid color-mix(in srgb, var(--color-error) 30%, transparent)', color: 'var(--color-error)' }}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="rs-quantity" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Quantity to Add (Positive Integer)
            </label>
            <input
              type="number"
              id="rs-quantity"
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
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={isLoading ? { backgroundColor: 'var(--color-border)', color: 'var(--color-muted-text)', cursor: 'not-allowed' } : { backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-bg)' }}
            >
              {isLoading ? 'Restocking...' : 'Confirm Restock'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </ModalPortal>
  );
};
