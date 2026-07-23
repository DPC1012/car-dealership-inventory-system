import React from 'react';
import { Search, ChevronRight, ShieldCheck, Car, Award, Zap } from 'lucide-react';
import type { VehicleCategory, SearchFilters } from '../types';

interface HeroBannerProps {
  onSearch: (filters: SearchFilters) => void;
  onSelectCategory: (category: VehicleCategory) => void;
  activeCategory?: VehicleCategory | '';
}

const CATEGORIES_SHOWCASE: { category: VehicleCategory; title: string; subtitle: string; image: string }[] = [
  {
    category: 'COUPE',
    title: 'Coupe & Supercars',
    subtitle: 'Pure aerodynamic performance',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'SEDAN',
    title: 'Executive Sedans',
    subtitle: 'Refined comfort & dynamics',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'SUV',
    title: 'Luxury SUVs',
    subtitle: 'All-terrain elegance',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'TRUCK',
    title: 'Performance Trucks',
    subtitle: 'Uncompromising power',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
  },
];

const BRANDS = [
  { name: 'Porsche', count: '12 Models' },
  { name: 'BMW', count: '18 Models' },
  { name: 'Mercedes-Benz', count: '15 Models' },
  { name: 'Audi', count: '10 Models' },
  { name: 'Range Rover', count: '8 Models' },
  { name: 'Tesla', count: '6 Models' },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearch,
  onSelectCategory,
  activeCategory,
}) => {
  const [selectedMake, setSelectedMake] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<VehicleCategory | ''>('');
  const [maxPrice, setMaxPrice] = React.useState('');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      make: selectedMake || undefined,
      category: selectedCategory || undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <div className="space-y-12 mb-12">
      {/* Hero Showcase Container */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#1B1E24] border border-[#333846] min-h-[520px] lg:min-h-[580px] flex items-center shadow-2xl">
        {/* Background Image with Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85"
            alt="Porsche 911 GT3 RS Hero"
            className="w-full h-full object-cover object-center brightness-[0.65]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#13151A] via-[#13151A]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13151A] via-transparent to-transparent" />
        </div>

        {/* Content Grid */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 sm:px-12 py-12 w-full items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3A143]/15 border border-[#E3A143]/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#E3A143] animate-pulse" />
              <span className="font-signage text-xs font-semibold tracking-widest text-[#E3A143] uppercase">
                Showroom Showcase Selection
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-sans text-4xl sm:text-6xl font-extrabold text-[#F3F0E9] tracking-tight leading-none">
                Porsche 911 <br />
                <span className="font-signage text-[#E3A143] uppercase font-bold tracking-wide">
                  GT3 RS Edition
                </span>
              </h1>
              <p className="text-sm sm:text-base text-[#F3F0E9]/70 max-w-lg font-sans leading-relaxed pt-2">
                Engineered for maximum downforce and track agility. Experience the pinnacle of luxury sports engineering with immediate delivery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div>
                <span className="text-[10px] font-signage uppercase tracking-wider text-[#454C5C] block">
                  Showroom Price
                </span>
                <span className="font-signage text-3xl sm:text-4xl font-bold text-[#E3A143]">
                  ₹3,50,00,000
                </span>
              </div>

              <div className="h-10 w-[1px] bg-[#333846] hidden sm:block" />

              <div className="flex items-center gap-4 text-xs font-signage uppercase tracking-wider text-[#F3F0E9]/80">
                <span className="px-2.5 py-1 rounded-sm bg-[#252932]/80 border border-[#333846]">
                  4.0L Flat-6
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-[#252932]/80 border border-[#333846]">
                  PDK 7-Speed
                </span>
                <span className="px-2.5 py-1 rounded-sm bg-[#252932]/80 border border-[#333846]">
                  518 HP
                </span>
              </div>
            </div>
          </div>

          {/* Right Floating Quick Search Panel */}
          <div className="lg:col-span-5">
            <div className="bg-[#1B1E24]/90 border border-[#333846] rounded-xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
              <h2 className="font-signage text-xl font-bold text-[#F3F0E9] uppercase tracking-wide mb-1">
                Find Your Perfect Car
              </h2>
              <p className="text-xs text-[#F3F0E9]/50 mb-5 font-sans">
                Search verified showroom inventory by make, category, or price.
              </p>

              <form onSubmit={handleQuickSearch} className="space-y-4">
                <div>
                  <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                    Select Manufacturer
                  </label>
                  <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="w-full bg-[#252932] border border-[#333846] rounded-lg px-3.5 py-2.5 text-xs font-sans text-[#F3F0E9] focus:border-[#E3A143] outline-none"
                  >
                    <option value="">All Luxury Makes</option>
                    <option value="Porsche">Porsche</option>
                    <option value="BMW">BMW</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Audi">Audi</option>
                    <option value="Range Rover">Range Rover</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Ford">Ford</option>
                  </select>
                </div>

                <div>
                  <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                    Vehicle Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as VehicleCategory | '')}
                    className="w-full bg-[#252932] border border-[#333846] rounded-lg px-3.5 py-2.5 text-xs font-sans text-[#F3F0E9] focus:border-[#E3A143] outline-none"
                  >
                    <option value="">All Categories</option>
                    <option value="SEDAN">SEDAN</option>
                    <option value="SUV">SUV</option>
                    <option value="COUPE">COUPE</option>
                    <option value="TRUCK">TRUCK</option>
                    <option value="HATCHBACK">HATCHBACK</option>
                    <option value="VAN">VAN</option>
                    <option value="MOTORCYCLE">MOTORCYCLE</option>
                  </select>
                </div>

                <div>
                  <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                    Max Price Budget (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="e.g. 20000000"
                    className="w-full bg-[#252932] border border-[#333846] rounded-lg px-3.5 py-2.5 text-xs font-sans text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  Search Showroom Inventory
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Type Grid */}
      <div className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#333846] pb-4">
          <div>
            <h2 className="font-signage text-2xl font-bold tracking-wide text-[#F3F0E9] uppercase">
              Browse by Category
            </h2>
            <p className="text-xs text-[#F3F0E9]/50 font-sans mt-0.5">
              Explore vehicles tailored to your lifestyle and driving performance preferences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES_SHOWCASE.map((item) => (
            <div
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className={`group relative rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                activeCategory === item.category
                  ? 'border-[#E3A143] ring-1 ring-[#E3A143]'
                  : 'border-[#333846] hover:border-[#5B7A99]'
              }`}
            >
              <div className="h-48 w-full overflow-hidden bg-[#1B1E24]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#13151A] via-[#13151A]/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between">
                <div>
                  <h3 className="font-sans text-base font-semibold text-[#F3F0E9] group-hover:text-[#E3A143] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#F3F0E9]/60 font-sans">{item.subtitle}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#252932] border border-[#333846] flex items-center justify-center text-[#F3F0E9] group-hover:bg-[#E3A143] group-hover:text-[#13151A] transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Premium Brands Showcase */}
      <div className="bg-[#1B1E24] border border-[#333846] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#333846] pb-4">
          <div>
            <h2 className="font-signage text-xl font-bold tracking-wide text-[#F3F0E9] uppercase">
              Explore Luxury Brands
            </h2>
            <p className="text-xs text-[#F3F0E9]/50 font-sans mt-0.5">
              Certified flagship inventory from world-leading marques.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSearch({ make: brand.name })}
              className="bg-[#252932] border border-[#333846] rounded-lg p-4 text-center hover:border-[#E3A143] transition-colors group"
            >
              <span className="font-signage text-lg font-bold text-[#F3F0E9] group-hover:text-[#E3A143] block tracking-wide">
                {brand.name}
              </span>
              <span className="text-[10px] font-signage uppercase text-[#454C5C] tracking-wider block mt-1">
                {brand.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1B1E24] border border-[#333846] rounded-xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#E3A143]/10 text-[#E3A143]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-[#F3F0E9]">Certified Inspection</h4>
            <p className="text-xs text-[#F3F0E9]/60 font-sans mt-1">
              Every vehicle undergoes a 200-point multi-point technical verification.
            </p>
          </div>
        </div>

        <div className="bg-[#1B1E24] border border-[#333846] rounded-xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#6FA787]/10 text-[#6FA787]">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-[#F3F0E9]">Instant Purchase</h4>
            <p className="text-xs text-[#F3F0E9]/60 font-sans mt-1">
              Atomic real-time reservation guarantees stock availability immediately.
            </p>
          </div>
        </div>

        <div className="bg-[#1B1E24] border border-[#333846] rounded-xl p-5 flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#5B7A99]/10 text-[#5B7A99]">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans text-sm font-semibold text-[#F3F0E9]">Concierge Handover</h4>
            <p className="text-xs text-[#F3F0E9]/60 font-sans mt-1">
              White-glove doorstep vehicle delivery across major luxury hubs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
