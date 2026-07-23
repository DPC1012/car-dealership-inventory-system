import React, { useState, useEffect } from 'react';
import type { Vehicle, VehicleCategory, VehicleFormData } from '../types';
import { vehicleApi } from '../services/api';
import { X, AlertCircle, Upload } from 'lucide-react';
import { ModalPortal } from './ModalPortal';

interface VehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VehicleFormData) => Promise<void>;
  initialData?: Vehicle | null;
  isLoading?: boolean;
}

const CATEGORIES: VehicleCategory[] = [
  'SEDAN',
  'SUV',
  'TRUCK',
  'COUPE',
  'HATCHBACK',
  'VAN',
  'MOTORCYCLE',
];

export const VehicleModal: React.FC<VehicleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState<VehicleCategory>('SEDAN');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setMake(initialData.make);
      setModel(initialData.model);
      setCategory(initialData.category);
      setPrice(typeof initialData.price === 'string' ? parseFloat(initialData.price) : initialData.price);
      setQuantity(initialData.quantity);
      setImageUrl(initialData.imageUrl || '');
    } else {
      setMake('');
      setModel('');
      setCategory('SEDAN');
      setPrice('');
      setQuantity(1);
      setImageUrl('');
    }
    setError(null);
  }, [initialData, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const uploadedUrl = await vehicleApi.uploadVehicleImage(file);
      setImageUrl(uploadedUrl);
    } catch (err: any) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!make.trim()) {
      setError('Make is required');
      return;
    }
    if (!model.trim()) {
      setError('Model is required');
      return;
    }
    if (price === '' || price <= 0) {
      setError('Price must be a positive number');
      return;
    }
    if (quantity === '' || quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }

    try {
      await onSubmit({
        make,
        model,
        category,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl: imageUrl || null,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save vehicle details');
    }
  };

  const inputClasses = "w-full rounded-2xl px-4 py-2.5 text-xs outline-none font-sans";

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
          className="rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in theme-transition"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)' }}
        >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition-colors p-1"
          style={{ color: 'var(--color-muted-text)' }}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-heading text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--color-primary-text)' }}>
          {initialData ? 'Update Vehicle Record' : 'Add New Vehicle to Inventory'}
        </h2>
        <p className="text-xs mb-6 font-sans" style={{ color: 'var(--color-secondary-text)' }}>
          Manage show-floor inventory attributes, pricing specifications, and photography CDN.
        </p>

        {error && (
          <div className="mb-5 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs" style={{ backgroundColor: 'var(--color-error-bg)', borderColor: 'var(--color-error-border)', color: 'var(--color-error)', borderWidth: '1px', borderStyle: 'solid' }}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vm-make" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
                Make (Manufacturer)
              </label>
              <input
                type="text"
                id="vm-make"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Porsche"
                className={inputClasses}
                style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
              />
            </div>

            <div>
              <label htmlFor="vm-model" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
                Model Name
              </label>
              <input
                type="text"
                id="vm-model"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. 911 GT3 RS"
                className={inputClasses}
                style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="vm-category" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Vehicle Category
            </label>
            <select
              id="vm-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as VehicleCategory)}
              className={inputClasses}
              style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="vm-price" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
                Price (INR ₹)
              </label>
              <input
                type="number"
                id="vm-price"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 15000000"
                className={inputClasses}
                style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
              />
            </div>

            <div>
              <label htmlFor="vm-quantity" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
                Initial Stock Quantity
              </label>
              <input
                type="number"
                id="vm-quantity"
                required
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 5"
                className={inputClasses}
                style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
              />
            </div>
          </div>

          {/* Vehicle Image Upload / URL Field */}
          <div>
            <label htmlFor="vm-imageurl" className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Vehicle Image (File Upload or Image URL)
            </label>

            <div className="flex gap-2 mb-2">
              <input
                type="url"
                id="vm-imageurl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ik.imagekit.io/... or upload file below"
                className={`${inputClasses} flex-1`}
                style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', borderWidth: '1px', borderStyle: 'solid' }}
              />

              <label className="px-4 py-2.5 rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors" style={{ color: 'var(--color-primary-text)', borderColor: 'var(--color-border)', borderWidth: '1px', borderStyle: 'solid' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-input-bg)')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Upload className="w-3.5 h-3.5" />
                {uploading ? 'Uploading...' : 'Browse'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {imageUrl && (
              <div className="w-full h-36 rounded-2xl overflow-hidden relative mt-2" style={{ backgroundColor: 'var(--color-input-bg)', borderColor: 'var(--color-border)', borderWidth: '1px', borderStyle: 'solid' }}>
                <img src={imageUrl} alt="Vehicle Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 rounded-full p-1.5"
                  style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-error)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4" style={{ borderTop: '1px solid var(--color-divider)' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold transition-colors"
              style={{ color: 'var(--color-secondary-text)', borderColor: 'var(--color-border)', borderWidth: '1px', borderStyle: 'solid' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-input-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              style={isLoading ? { backgroundColor: 'var(--color-border)', color: 'var(--color-muted-text)', cursor: 'not-allowed' } : { backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-button-text)' }}
            >
              {isLoading ? 'Saving...' : initialData ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </ModalPortal>
  );
};