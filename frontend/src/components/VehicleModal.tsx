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
    if (price === '' || price <= 0) {
      setError('Price must be a positive number');
      return;
    }
    if (quantity === '' || quantity < 0) {
      setError('Quantity cannot be negative');
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
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-[#1B1E24] border border-[#333846] rounded-md p-6 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#454C5C] hover:text-[#F3F0E9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-signage text-2xl font-semibold tracking-wide text-[#E3A143] uppercase mb-6">
          {initialData ? 'Update Vehicle Record' : 'Add New Vehicle to Inventory'}
        </h2>

        {error && (
          <div className="mb-4 bg-[#2C1E1C] border border-[#C4574A]/40 rounded-sm p-3 flex items-center gap-2 text-xs text-[#C4574A]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                Make (Manufacturer)
              </label>
              <input
                type="text"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Porsche"
                className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>

            <div>
              <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                Model Name
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. 911 GT3 RS"
                className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Vehicle Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as VehicleCategory)}
              className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] focus:border-[#E3A143] outline-none font-sans"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#1B1E24] text-[#F3F0E9]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                Price (INR ₹)
              </label>
              <input
                type="number"
                required
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 15000000"
                className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>

            <div>
              <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                Initial Stock Quantity
              </label>
              <input
                type="number"
                required
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
                placeholder="e.g. 5"
                className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          {/* Vehicle Image Upload / URL Field */}
          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Vehicle Image (File Upload or Image URL)
            </label>

            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ik.imagekit.io/... or upload file below"
                className="flex-1 bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />

              <label className="btn-ghost px-3 py-2 rounded-sm text-xs font-signage uppercase tracking-wider cursor-pointer flex items-center gap-1.5 hover:border-[#E3A143] hover:text-[#E3A143]">
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
              <div className="w-full h-32 rounded-sm bg-[#252932] border border-[#333846] overflow-hidden relative mt-2">
                <img src={imageUrl} alt="Vehicle Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-[#C4574A]"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
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
              {isLoading ? 'Saving...' : initialData ? 'Update Vehicle' : 'Add Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
