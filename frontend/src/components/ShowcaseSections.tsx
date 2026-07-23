import React from 'react';
import { ArrowUpRight, Car, Shield, Wrench, DollarSign, Star, Clock, Phone, MapPin } from 'lucide-react';
import type { VehicleCategory, SearchFilters } from '../types';

interface ShowcaseSectionsProps {
  onSelectCategory: (category: VehicleCategory) => void;
  onSearch: (filters: SearchFilters) => void;
  onOpenAuth: () => void;
}

const CATEGORY_CARDS: { category: VehicleCategory; label: string; count: string; image: string }[] = [
  {
    category: 'SEDAN',
    label: 'Luxury Sedan',
    count: '18 Available',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'SUV',
    label: 'Premium SUV',
    count: '24 Available',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'COUPE',
    label: 'Sport Coupe',
    count: '12 Available',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'HATCHBACK',
    label: 'Hot Hatchback',
    count: '8 Available',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'TRUCK',
    label: 'Performance Truck',
    count: '6 Available',
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
  onSelectCategory,
  onSearch,
  onOpenAuth,
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* 1. Browse by Type Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-[#333846] pb-4">
          <div>
            <h2 className="font-signage text-2xl sm:text-3xl font-bold tracking-wide text-[#F3F0E9] uppercase">
              Browse by Category
            </h2>
            <p className="text-xs text-[#F3F0E9]/60 font-sans mt-1">
              Select your desired body style to filter our current inventory.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORY_CARDS.map((item) => (
            <div
              key={item.category}
              onClick={() => onSelectCategory(item.category)}
              className="group bg-[#1B1E24] border border-[#333846] hover:border-[#E3A143] rounded-xl p-3.5 transition-all duration-300 cursor-pointer text-center space-y-3"
            >
              <div className="h-28 w-full rounded-lg overflow-hidden bg-[#252932] relative">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="font-signage text-sm font-bold text-[#F3F0E9] group-hover:text-[#E3A143] block uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-[10px] font-signage uppercase text-[#454C5C] tracking-wider block mt-0.5">
                  {item.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Explore Our Premium Brands Section */}
      <section className="bg-[#1B1E24] border border-[#333846] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#333846] pb-4">
          <div>
            <h2 className="font-signage text-xl sm:text-2xl font-bold tracking-wide text-[#F3F0E9] uppercase">
              Explore Our Premium Brands
            </h2>
            <p className="text-xs text-[#F3F0E9]/50 font-sans mt-0.5">
              Direct access to flagship inventory from world-renowned luxury marques.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PREMIUM_BRANDS.map((brand) => (
            <button
              key={brand.name}
              onClick={() => onSearch({ make: brand.name })}
              className="bg-[#252932] border border-[#333846] rounded-xl p-5 text-center hover:border-[#E3A143] transition-all group hover:bg-[#2A2E39]"
            >
              <span className="font-signage text-xl font-bold tracking-widest text-[#F3F0E9] group-hover:text-[#E3A143] block uppercase">
                {brand.mark}
              </span>
              <span className="text-[10px] font-signage uppercase text-[#454C5C] tracking-wider block mt-1">
                {brand.origin}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Services Showcase Section */}
      <section className="bg-[#1B1E24] border border-[#333846] rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 rounded-xl overflow-hidden bg-[#252932] h-64 sm:h-80 border border-[#333846]">
          <img
            src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80"
            alt="Showroom Services"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="font-signage text-xs font-semibold tracking-widest text-[#E3A143] uppercase block mb-1">
              Excellence in Automotive Retail
            </span>
            <h2 className="font-signage text-2xl sm:text-3xl font-bold tracking-wide text-[#F3F0E9] uppercase">
              This Is What We Do And We Do It Perfectly
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-[#252932] border border-[#333846] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#E3A143]">
                <Car className="w-5 h-5" />
                <h4 className="font-signage text-sm font-bold uppercase tracking-wider text-[#F3F0E9]">
                  Pre-Orders
                </h4>
              </div>
              <p className="text-xs text-[#F3F0E9]/60 font-sans leading-relaxed">
                Pre-order custom specifications directly from top manufacturers globally.
              </p>
            </div>

            <div className="bg-[#252932] border border-[#333846] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#6FA787]">
                <DollarSign className="w-5 h-5" />
                <h4 className="font-signage text-sm font-bold uppercase tracking-wider text-[#F3F0E9]">
                  Sell Your Car
                </h4>
              </div>
              <p className="text-xs text-[#F3F0E9]/60 font-sans leading-relaxed">
                Get competitive valuation and immediate payout for your luxury vehicle.
              </p>
            </div>

            <div className="bg-[#252932] border border-[#333846] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#5B7A99]">
                <Shield className="w-5 h-5" />
                <h4 className="font-signage text-sm font-bold uppercase tracking-wider text-[#F3F0E9]">
                  Certified Showroom
                </h4>
              </div>
              <p className="text-xs text-[#F3F0E9]/60 font-sans leading-relaxed">
                Official dealership with physical locations and verified warranty coverage.
              </p>
            </div>

            <div className="bg-[#252932] border border-[#333846] p-4 rounded-xl space-y-1.5">
              <div className="flex items-center gap-2 text-[#F0B65C]">
                <Wrench className="w-5 h-5" />
                <h4 className="font-signage text-sm font-bold uppercase tracking-wider text-[#F3F0E9]">
                  Auto Services
                </h4>
              </div>
              <p className="text-xs text-[#F3F0E9]/60 font-sans leading-relaxed">
                Comprehensive maintenance and precision tuning by certified technicians.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dual Call-to-Action Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#1B1E24] border border-[#333846] p-8 min-h-[220px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80"
              alt="Sell Car"
              className="w-full h-full object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="font-signage text-2xl font-bold uppercase tracking-wide text-[#F3F0E9]">
              Do You Want to Sell a Car?
            </h3>
            <p className="text-xs text-[#F3F0E9]/70 font-sans max-w-sm">
              We are committed to providing our customers with exceptional service and top-tier valuations.
            </p>
          </div>
          <div className="relative z-10 pt-4">
            <button
              onClick={onOpenAuth}
              className="btn-primary py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-[#1B1E24] border border-[#333846] p-8 min-h-[220px] flex flex-col justify-between group">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1000&q=80"
              alt="Looking for Car"
              className="w-full h-full object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative z-10 space-y-2">
            <h3 className="font-signage text-2xl font-bold uppercase tracking-wide text-[#F3F0E9]">
              Are You Looking For a Car?
            </h3>
            <p className="text-xs text-[#F3F0E9]/70 font-sans max-w-sm">
              Explore our curated showroom collection with instant reservation and immediate delivery options.
            </p>
          </div>
          <div className="relative z-10 pt-4">
            <a
              href="#showroom-inventory"
              className="btn-ghost py-2.5 px-5 rounded-lg text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 border-[#E3A143] text-[#E3A143] hover:bg-[#E3A143] hover:text-[#13151A]"
            >
              <span>Explore Inventory</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials Section */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="font-signage text-xs font-semibold tracking-widest text-[#E3A143] uppercase">
            Client Experiences
          </span>
          <h2 className="font-signage text-2xl sm:text-3xl font-bold tracking-wide text-[#F3F0E9] uppercase">
            See What Our Clients Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-[#1B1E24] border border-[#333846] rounded-xl p-6 flex flex-col justify-between space-y-4">
              <div className="flex gap-1 text-[#E3A143]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E3A143]" />
                ))}
              </div>
              <p className="text-xs text-[#F3F0E9]/80 font-sans leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-[#333846]">
                <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-sans text-xs font-semibold text-[#F3F0E9]">{t.author}</h4>
                  <p className="text-[10px] text-[#F3F0E9]/50 font-sans">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Comprehensive Luxury Footer */}
      <footer className="bg-[#1B1E24] border-t border-[#333846] rounded-2xl p-8 sm:p-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <span className="font-signage text-2xl font-bold tracking-wider text-[#E3A143] uppercase block">
              ROADSTEAD MOTORS
            </span>
            <p className="text-xs text-[#F3F0E9]/60 font-sans leading-relaxed max-w-sm">
              DriveLine & Roadstead Motors offer verified luxury automotive retail, high-performance inventory, and seamless atomic purchasing.
            </p>
            <div className="pt-2 text-xs text-[#F3F0E9]/70 space-y-1 font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E3A143]" />
                <span>Showroom Floor, Luxury Motor Hub, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E3A143]" />
                <span>+91 (800) 555-ROAD</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-signage text-xs font-bold text-[#F3F0E9] uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#F3F0E9]/60 font-sans">
              <li><a href="#showroom-inventory" className="hover:text-[#E3A143]">Showroom Inventory</a></li>
              <li><button onClick={onOpenAuth} className="hover:text-[#E3A143]">Customer Sign In</button></li>
              <li><button onClick={onOpenAuth} className="hover:text-[#E3A143]">Register Account</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-signage text-xs font-bold text-[#F3F0E9] uppercase tracking-wider mb-3">
              Vehicle Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#F3F0E9]/60 font-sans">
              <li><button onClick={() => onSelectCategory('SEDAN')} className="hover:text-[#E3A143]">Executive Sedans</button></li>
              <li><button onClick={() => onSelectCategory('SUV')} className="hover:text-[#E3A143]">Luxury SUVs</button></li>
              <li><button onClick={() => onSelectCategory('COUPE')} className="hover:text-[#E3A143]">Sport Coupes</button></li>
              <li><button onClick={() => onSelectCategory('TRUCK')} className="hover:text-[#E3A143]">Performance Trucks</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-signage text-xs font-bold text-[#F3F0E9] uppercase tracking-wider mb-3">
              Showroom Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#F3F0E9]/60 font-sans">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E3A143]" />
                <span>Mon – Fri: 09:00 AM – 08:00 PM</span>
              </div>
              <p className="pl-5">Saturday: 10:00 AM – 06:00 PM</p>
              <p className="pl-5 text-[#C4574A]">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#333846] flex flex-col sm:flex-row items-center justify-between text-xs text-[#454C5C] font-signage uppercase tracking-wider">
          <p>© 2026 Roadstead Motors. All rights reserved.</p>
          <p>Privacy Policy · Terms & Conditions</p>
        </div>
      </footer>
    </div>
  );
};
