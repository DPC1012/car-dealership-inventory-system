import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Car, Plus, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAddVehicle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-20 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
        {/* Brand Logo Aligned Left */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Car className="w-5 h-5" />
          </div>
          <div className="flex items-baseline">
            <span className="font-heading text-xl font-extrabold tracking-tight uppercase text-[#18181B]">
              Roadstead
            </span>
            <span className="font-heading text-xl font-light tracking-wide uppercase text-[#6B7280] ml-1">
              Motors
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#18181B]">
          <a
            href="#showroom-inventory"
            className="hover:text-[#6B7280] transition-colors"
          >
            Showroom Inventory
          </a>
          <a
            href="#categories"
            className="hover:text-[#6B7280] transition-colors"
          >
            Categories
          </a>
          <a
            href="#brands"
            className="hover:text-[#6B7280] transition-colors"
          >
            Luxury Brands
          </a>
        </nav>

        {/* User Actions Aligned Right */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="bg-[#111111] text-white hover:bg-[#27272A] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </button>
              )}

              {/* User / Admin Badge */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5E7EB] bg-[#FAFAFA] text-[#18181B] text-xs">
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#22C55E]" />
                )}
                <span className="font-medium hidden sm:inline">{user?.email}</span>
                <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#111111] text-white">
                  {user?.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-2.5 rounded-full border border-[#E5E7EB] text-[#6B7280] hover:text-[#EF4444] hover:border-[#EF4444] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-[#111111] text-white hover:bg-[#27272A] px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-sm"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
