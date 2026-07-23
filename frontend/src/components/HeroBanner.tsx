import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import type { VehicleCategory, SearchFilters } from '../types';

const CustomSelect: React.FC<{
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}> = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-3 text-sm font-sans text-left flex items-center justify-between focus:border-[#111111] focus:bg-white outline-none transition-all"
      >
        <span className={selectedOption ? 'text-[#18181B]' : 'text-[#9CA3AF]'}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#9CA3AF] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div role="listbox" className="absolute z-50 w-full mt-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden animate-dropdown">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-sm text-left transition-colors ${
                  value === option.value
                    ? 'bg-[#F5F5F5] font-semibold text-[#111111]'
                    : 'text-[#18181B] hover:bg-[#FAFAFA]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface HeroBannerProps {
  onSearch: (filters: SearchFilters) => void;
  activeCategory?: VehicleCategory | '';
  manufacturers: string[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSearch, activeCategory, manufacturers }) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | ''>('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setSelectedCategory(activeCategory || '');
  }, [activeCategory]);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      make: selectedMake || undefined,
      category: selectedCategory || undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden min-h-[640px] sm:min-h-[720px] flex items-center justify-center bg-[#111111] mb-12 shadow-xl">
      {/* Hero Vehicle Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2200&q=85"
          alt="Porsche 911 GT3 RS Hero"
          className="w-full h-full object-cover object-center brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1280px] w-full mx-auto px-6 sm:px-12 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        {/* Left Headline & Specs */}
        <div className="lg:col-span-7 space-y-6 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-white/90">
              Featured Flagship Inventory
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-white">
              Porsche 911 <br />
              <span className="font-light text-white/90">GT3 RS Edition</span>
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-lg font-sans leading-relaxed pt-2">
              Aerodynamic precision meets track-tested performance. Available for instant showroom delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-white/60 block">
                Showroom Price
              </span>
              <span className="font-heading text-3xl sm:text-4xl font-bold text-white">
                ₹3,50,00,000
              </span>
            </div>

            <div className="h-10 w-[1px] bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-white/90">
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                4.0L Flat-6
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                518 HP
              </span>
            </div>
          </div>
        </div>

        {/* Right Floating Search Panel (DESIGN_SYSTEM.md Section 10) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E5E7EB] text-[#18181B]">
            <h2 className="font-heading text-2xl font-bold tracking-tight mb-1">
              Find Your Perfect Car
            </h2>
            <p className="text-xs text-[#6B7280] mb-6 font-sans">
              Filter current luxury stock by make, body style, or budget.
            </p>

            <form onSubmit={handleQuickSearch} className="space-y-4">
              <div>
                <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                  Select Manufacturer
                </label>
                <CustomSelect
                  value={selectedMake}
                  onChange={setSelectedMake}
                  options={[
                    { value: '', label: 'All Luxury Brands' },
                    ...manufacturers.sort().map((make) => ({ value: make, label: make })),
                  ]}
                  placeholder="All Luxury Brands"
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                  Body Style Category
                </label>
                <CustomSelect
                  value={selectedCategory}
                  onChange={(val) => setSelectedCategory(val as VehicleCategory | '')}
                  options={[
                    { value: '', label: 'All Categories' },
                    { value: 'SEDAN', label: 'Sedan' },
                    { value: 'SUV', label: 'SUV' },
                    { value: 'COUPE', label: 'Coupe' },
                    { value: 'TRUCK', label: 'Truck' },
                    { value: 'HATCHBACK', label: 'Hatchback' },
                    { value: 'VAN', label: 'Van' },
                    { value: 'MOTORCYCLE', label: 'Motorcycle' },
                  ]}
                  placeholder="All Categories"
                />
              </div>

              <div>
                <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
                  Max Budget (INR ₹)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 20000000"
                  className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl px-4 py-3 text-sm font-sans text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-[#111111] text-white hover:bg-[#27272A] rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md mt-2"
              >
                <Search className="w-4 h-4" />
                Search Inventory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
