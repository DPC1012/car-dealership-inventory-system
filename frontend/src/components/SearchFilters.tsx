import React from 'react';
import type { SearchFilters as SearchFiltersType, VehicleCategory } from '../types';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

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
    <div
      className="animate-panel rounded-3xl p-6 shadow-sm mb-8 space-y-5"
      style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
    >
      <div className="flex items-center justify-between pb-3 theme-transition" style={{ borderBottom: '1px solid var(--color-divider)' }}>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 theme-transition" style={{ color: 'var(--color-primary-text)' }} />
          <h3 className="font-heading text-sm font-bold tracking-wider uppercase theme-transition" style={{ color: 'var(--color-primary-text)' }}>
            Filter Showroom Inventory
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 transition-colors"
            style={{ color: 'var(--color-secondary-text)', border: '1px solid var(--color-border)' }}
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
          <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
            Search Make
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 theme-transition" style={{ color: 'var(--color-muted-text)' }} />
            <input
              type="text"
              value={filters.make || ''}
              onChange={handleMakeChange}
              placeholder="e.g. Porsche, BMW, Audi..."
              className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-xs outline-none font-sans transition-colors theme-transition"
              style={{
                backgroundColor: 'var(--color-input-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-primary-text)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-dark)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            />
          </div>
        </div>

        {/* Min Price */}
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
            Min Price (₹)
          </label>
          <input
            type="number"
            value={filters.minPrice !== undefined ? filters.minPrice : ''}
            onChange={handleMinPriceChange}
            placeholder="e.g. 1000000"
            className="w-full rounded-2xl px-4 py-2.5 text-xs outline-none font-sans transition-colors theme-transition"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-primary-text)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-dark)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
            Max Price (₹)
          </label>
          <input
            type="number"
            value={filters.maxPrice !== undefined ? filters.maxPrice : ''}
            onChange={handleMaxPriceChange}
            placeholder="e.g. 5000000"
            className="w-full rounded-2xl px-4 py-2.5 text-xs outline-none font-sans transition-colors theme-transition"
            style={{
              backgroundColor: 'var(--color-input-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-primary-text)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-dark)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          />
        </div>
      </div>

      {/* Category Filter Badges */}
      <div>
        <label className="text-xs font-semibold tracking-wider uppercase block mb-2 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
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
                className={`text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full border transition-all theme-transition ${
                  isSelected ? 'shadow-sm' : ''
                }`}
                style={
                  isSelected
                    ? { backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-bg)', borderColor: 'var(--color-primary-dark)' }
                    : { backgroundColor: 'var(--color-surface)', color: 'var(--color-secondary-text)', borderColor: 'var(--color-border)' }
                }
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
