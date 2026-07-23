import React from 'react';
import { ArrowUpRight, Car, Shield, Wrench, DollarSign, Star, Clock, Phone, MapPin, ChevronRight } from 'lucide-react';
import type { Vehicle, VehicleCategory, SearchFilters } from '../types';

interface ShowcaseSectionsProps {
  vehicles: Vehicle[];
  onSelectCategory: (category: VehicleCategory) => void;
  onSearch: (filters: SearchFilters) => void;
  onOpenAuth: () => void;
}

const CATEGORY_CARDS: { category: VehicleCategory; label: string; image: string }[] = [
  {
    category: 'SEDAN',
    label: 'Executive Sedan',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'SUV',
    label: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'COUPE',
    label: 'Sport Coupe',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'HATCHBACK',
    label: 'Hot Hatchback',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'TRUCK',
    label: 'Performance Truck',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=600&q=80',
  },
];

const PREMIUM_BRANDS = [
  { name: 'Audi', mark: 'AUDI', origin: 'Germany' },
  { name: 'BMW', mark: 'BMW', origin: 'Germany' },
  { name: 'Ford', mark: 'FORD', origin: 'USA' },
  { name: 'Mercedes-Benz', mark: 'MERCEDES', origin: 'Germany' },
  { name: 'Porsche', mark: 'PORSCHE', origin: 'Germany' },
  { name: 'Tesla', mark: 'TESLA', origin: 'USA' },
];

const TESTIMONIALS = [
  {
    quote: "Absolutely love my new Porsche GT3! The team made the whole purchase seamless and stress-free. Highly recommend for any luxury buyer.",
    author: "Esther Howard",
    title: "President of Sales",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "From start to finish, my experience with Roadstead Motors was outstanding. They went above and beyond to get me the best deal on my M3.",
    author: "Jacob Jones",
    title: "Marketing Coordinator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote: "Great service and amazing selection of luxury vehicles. They were upfront, friendly, and helped me find exactly what I needed.",
    author: "Kathryn Murphy",
    title: "Web Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

export const ShowcaseSections: React.FC<ShowcaseSectionsProps> = ({
  vehicles,
  onSelectCategory,
  onSearch,
  onOpenAuth,
}) => {
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const v of vehicles) {
      counts[v.category] = (counts[v.category] || 0) + 1;
    }
    return counts;
  }, [vehicles]);

  return (
    <div className="space-y-16 py-4">
      {/* 1. Browse by Category Section (DESIGN_SYSTEM.md Section 12) */}
      <section id="categories" className="space-y-6 theme-transition">
        <div className="flex items-end justify-between border-b pb-4" style={{ borderColor: 'var(--color-divider)' }}>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary-text)' }}>
              Browse by Category
            </h2>
            <p className="text-xs font-sans mt-1" style={{ color: 'var(--color-secondary-text)' }}>
              Select your desired body style to filter our current inventory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORY_CARDS.map((item) => (
            <div
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className="group border rounded-2xl p-4 transition-all duration-300 cursor-pointer text-center space-y-3 shadow-sm hover:shadow-md hover:border-[var(--color-primary-text)] theme-transition"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <div className="h-32 w-full rounded-xl overflow-hidden relative" style={{ backgroundColor: 'var(--color-surface)' }}>
                <img
                  src={item.image}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-left">
                  <span className="font-heading text-sm font-bold block tracking-tight group-hover:text-[var(--color-primary-text)]" style={{ color: 'var(--color-primary-text)' }}>
                    {item.label}
                  </span>
                  <span className="text-[11px] font-sans block mt-0.5" style={{ color: 'var(--color-secondary-text)' }}>
                    {categoryCounts[item.category] || 0} Available
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full border flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-colors theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)' }}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Explore Our Premium Brands Section (DESIGN_SYSTEM.md Section 13) */}
      <section id="brands" className="border rounded-3xl p-6 sm:p-10 space-y-6 theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-divider)' }}>
          <div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-primary-text)' }}>
              Explore Our Premium Brands
            </h2>
            <p className="text-xs font-sans mt-0.5" style={{ color: 'var(--color-secondary-text)' }}>
              Direct access to flagship inventory from world-renowned luxury marques.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PREMIUM_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSearch({ make: brand.name })}
              className="border rounded-2xl p-5 text-center hover:border-[var(--color-primary-text)] transition-all group shadow-sm hover:shadow-md theme-transition"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <span className="font-heading text-xl font-extrabold tracking-widest block uppercase group-hover:text-[var(--color-primary-text)]" style={{ color: 'var(--color-primary-text)' }}>
                {brand.mark}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider block mt-1" style={{ color: 'var(--color-muted-text)' }}>
                {brand.origin}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Services Showcase Section */}
      <section className="border rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm theme-transition" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="lg:col-span-5 rounded-2xl overflow-hidden h-64 sm:h-80 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <img
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80"
            alt="Showroom Services"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase block mb-1" style={{ color: 'var(--color-secondary-text)' }}>
              Excellence in Automotive Retail
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary-text)' }}>
              This Is What We Do And We Do It Perfectly
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="border p-5 rounded-2xl space-y-1.5 theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-primary-text)' }}>
                <Car className="w-5 h-5" />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-text)' }}>
                  Pre-Orders
                </h4>
              </div>
              <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--color-secondary-text)' }}>
                Pre-order custom specifications directly from top manufacturers globally.
              </p>
            </div>

            <div className="border p-5 rounded-2xl space-y-1.5 theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-success)' }}>
                <DollarSign className="w-5 h-5" />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-text)' }}>
                  Sell Your Car
                </h4>
              </div>
              <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--color-secondary-text)' }}>
                Get competitive valuation and immediate payout for your luxury vehicle.
              </p>
            </div>

            <div className="border p-5 rounded-2xl space-y-1.5 theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-info)' }}>
                <Shield className="w-5 h-5" />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-text)' }}>
                  Certified Showroom
                </h4>
              </div>
              <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--color-secondary-text)' }}>
                Official dealership with physical locations and verified warranty coverage.
              </p>
            </div>

            <div className="border p-5 rounded-2xl space-y-1.5 theme-transition" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--color-warning)' }}>
                <Wrench className="w-5 h-5" />
                <h4 className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-text)' }}>
                  Auto Services
                </h4>
              </div>
              <p className="text-xs font-sans leading-relaxed" style={{ color: 'var(--color-secondary-text)' }}>
                Comprehensive maintenance and precision tuning by certified technicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call-to-Action Banner */}
      <section>
        <div className="relative rounded-3xl overflow-hidden bg-[#111111] p-8 sm:p-12 min-h-[220px] flex flex-col justify-between group shadow-md text-white theme-transition">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80"
              alt="Looking for Car"
              loading="lazy"
              className="w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              Are You Looking For a Car?
            </h3>
            <p className="text-xs text-white/80 font-sans max-w-sm">
              Explore our curated showroom collection with instant reservation and immediate delivery options.
            </p>
          </div>
          <div className="relative z-10 pt-4">
            <a
              href="#showroom-inventory"
              className="bg-white/20 hover:bg-white text-white hover:text-[#111111] backdrop-blur-md py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors border border-white/30"
            >
              <span>Explore Inventory</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials Section */}
      <section className="space-y-6 theme-transition">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--color-secondary-text)' }}>
            Client Experiences
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-primary-text)' }}>
            See What Our Clients Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="border rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm theme-transition" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
              <div className="flex gap-1" style={{ color: 'var(--color-warning)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4" style={{ fill: 'var(--color-warning)' }} />
                ))}
              </div>
              <p className="text-xs font-sans leading-relaxed italic" style={{ color: 'var(--color-primary-text)', opacity: 0.8 }}>
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'var(--color-divider)' }}>
                <img src={t.avatar} alt={t.author} loading="lazy" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-heading text-xs font-bold" style={{ color: 'var(--color-primary-text)' }}>{t.author}</h4>
                  <p className="text-[10px] font-sans" style={{ color: 'var(--color-secondary-text)' }}>{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Clean Luxury Footer */}
      <footer className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 space-y-10 theme-transition">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <span className="font-heading text-2xl font-extrabold tracking-wider text-white uppercase block">
              ROADSTEAD MOTORS
            </span>
            <p className="text-xs text-white/70 font-sans leading-relaxed max-w-sm">
              Roadstead Motors offers verified luxury automotive retail, high-performance inventory, and seamless atomic purchasing.
            </p>
            <div className="pt-2 text-xs text-white/80 space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/60" />
                <span>Showroom Floor, Luxury Motor Hub, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/60" />
                <span>+91 (800) 555-ROAD</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><a href="#showroom-inventory" className="hover:text-white">Showroom Inventory</a></li>
              <li><button onClick={onOpenAuth} className="hover:text-white">Customer Sign In</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-white">Register Account</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-3">
              Vehicle Categories
            </h4>
            <ul className="space-y-2 text-xs text-white/70 font-sans">
              <li><button onClick={() => onSelectCategory('SEDAN')} className="hover:text-white">Executive Sedans</button></li>
              <li><button onClick={() => onSelectCategory('SUV')} className="hover:text-white">Luxury SUVs</button></li>
              <li><button onClick={() => onSelectCategory('COUPE')} className="hover:text-white">Sport Coupes</button></li>
              <li><button onClick={() => onSelectCategory('TRUCK')} className="hover:text-white">Performance Trucks</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-3">
              Showroom Hours
            </h4>
            <div className="space-y-1.5 text-xs text-white/70 font-sans">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white/60" />
                <span>Mon – Fri: 09:00 AM – 08:00 PM</span>
              </div>
              <p className="pl-5">Saturday: 10:00 AM – 06:00 PM</p>
              <p className="pl-5 text-red-400">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 font-sans uppercase tracking-wider">
          <p>© 2026 Roadstead Motors. All rights reserved.</p>
          <p>Privacy Policy · Terms & Conditions</p>
        </div>
      </footer>
    </div>
  );
};
