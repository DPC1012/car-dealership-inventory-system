import React, { useState, useEffect } from 'react';
import type { Vehicle, VehicleCategory, VehicleFormData } from '../types';
import { vehicleApi } from '../services/api';
import { X, AlertCircle, Upload } from 'lucide-react';

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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

  if (!isOpen) return null;

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

  return (
    <div
      onClick={isLoading ? undefined : onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative text-[#18181B] animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#9CA3AF] hover:text-[#18181B] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-heading text-2xl font-bold tracking-tight text-[#18181B] mb-1">
          {initialData ? 'Update Vehicle Record' : 'Add New Vehicle to Inventory'}
        </h2>
        <p className="text-xs text-[#6B7280] mb-6 font-sans">
          Manage show-floor inventory attributes, pricing specifications, and photography CDN.
        </p>

        {error && (
          <div className="mb-5 bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                Make (Manufacturer)
              </label>
              <input
                type="text"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Porsche"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                Model Name
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. 911 GT3 RS"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
              Vehicle Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VehicleCategory)}
              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] focus:border-[#111111] focus:bg-white outline-none font-sans"
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
              <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                Price (INR ₹)
              </label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 15000000"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                Initial Stock Quantity
              </label>
              <input
                type="number"
                required
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 5"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>
          </div>

          {/* Vehicle Image Upload / URL Field */}
          <div>
            <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
              Vehicle Image (File Upload or Image URL)
            </label>

            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ik.imagekit.io/... or upload file below"
                className="flex-1 bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />

              <label className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#18181B] border border-[#E5E7EB] hover:bg-[#FAFAFA] cursor-pointer flex items-center gap-1.5 transition-colors">
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
              <div className="w-full h-36 rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] overflow-hidden relative mt-2">
                <img src={imageUrl} alt="Vehicle Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-[#EF4444]"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F3F4F6]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#6B7280] border border-[#E5E7EB] hover:bg-[#FAFAFA]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                isLoading
                  ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  : 'bg-[#111111] text-white hover:bg-[#27272A]'
              }`}
            >
              {isLoading ? 'Saving...' : initialData ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
