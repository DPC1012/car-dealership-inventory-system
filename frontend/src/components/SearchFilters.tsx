import React from 'react';
import type { SearchFilters as SearchFiltersType, VehicleCategory } from '../types';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onChange: (filters: SearchFiltersType) => void;
  onClear: () => void;
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

export const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onChange, onClear }) => {
  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, make: e.target.value });
  };

  const handleCategorySelect = (category: VehicleCategory) => {
    const nextCategory = filters.category === category ? '' : category;
    onChange({ ...filters, category: nextCategory });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined });
  };

  const hasActiveFilters =
    !!filters.make || !!filters.category || filters.minPrice !== undefined || filters.maxPrice !== undefined;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm mb-8 space-y-5">
      <div className="flex items-center justify-between border-b border-[#F3F4F6] pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#111111]" />
          <h3 className="font-heading text-sm font-bold tracking-wider text-[#18181B] uppercase">
            Filter Showroom Inventory
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="px-3 py-1 text-xs font-medium text-[#6B7280] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#111111] rounded-full flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Search Input & Price Inputs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Make Search */}
        <div>
          <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
            Search Make
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
            <input
              type="text"
              value={filters.make || ''}
              onChange={handleMakeChange}
              placeholder="e.g. Porsche, BMW, Audi..."
              className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans transition-colors"
            />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
            Min Price (₹)
          </label>
          <input
            type="number"
            value={filters.minPrice !== undefined ? filters.minPrice : ''}
            onChange={handleMinPriceChange}
            placeholder="e.g. 1000000"
            className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans transition-colors"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
            Max Price (₹)
          </label>
          <input
            type="number"
            value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
            onChange={handleMaxPriceChange}
            placeholder="e.g. 5000000"
            className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-2.5 text-xs text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Badges */}
      <div>
        <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                    : 'bg-[#FAFAFA] text-[#6B7280] border-[#E5E7EB] hover:border-[#111111] hover:text-[#18181B]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
