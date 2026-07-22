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
    <div className="bg-[#1B1E24] border border-[#333846] rounded-md p-4 sm:p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#E3A143]" />
          <h3 className="font-signage text-sm font-semibold tracking-wider text-[#F3F0E9] uppercase">
            Filter Inventory
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="btn-ghost px-2.5 py-1 text-[11px] font-signage uppercase tracking-wider rounded-sm flex items-center gap-1.5 text-[#F3F0E9]/70 hover:text-[#E3A143]"
          >
            <RotateCcw className="w-3 h-3" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Search Input & Price Inputs Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Make Search */}
        <div>
          <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
            Search Make / Model
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-[#454C5C] absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.make || ''}
              onChange={handleMakeChange}
              placeholder="e.g. Porsche, BMW, Honda..."
              className="w-full bg-[#252932] border border-[#333846] rounded-sm pl-9 pr-3 py-2 text-xs text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
            />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
            Min Price (₹)
          </label>
          <input
            type="number"
            value={filters.minPrice !== undefined ? filters.minPrice : ''}
            onChange={handleMinPriceChange}
            placeholder="e.g. 1000000"
            className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-xs text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
            Max Price (₹)
          </label>
          <input
            type="number"
            value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
            onChange={handleMaxPriceChange}
            placeholder="e.g. 5000000"
            className="w-full bg-[#252932] border border-[#333846] rounded-sm px-3 py-2 text-xs text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
          />
        </div>
      </div>

      {/* Category Filter Badges */}
      <div>
        <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1.5">
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
                className={`font-signage text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm border transition-colors ${
                  isSelected
                    ? 'bg-[#252932] text-[#E3A143] border-[#E3A143]'
                    : 'bg-[#252932] text-[#454C5C] border-[#333846] hover:border-[#454C5C] hover:text-[#F3F0E9]'
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
