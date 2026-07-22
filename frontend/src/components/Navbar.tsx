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
    <header className="sticky top-0 z-40 bg-[#1B1E24] border-b border-[#333846]">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark in Display condensed caps */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#252932] border border-[#333846] flex items-center justify-center">
            <Car className="w-5 h-5 text-[#E3A143]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-signage text-2xl font-bold tracking-wider text-[#E3A143] uppercase">
              ROADSTEAD
            </span>
            <span className="font-signage text-2xl font-bold tracking-wider text-[#F3F0E9]/50 uppercase ml-1.5">
              MOTORS
            </span>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="btn-primary px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </button>
              )}

              {/* User / Admin Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#252932] border border-[#333846]">
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4 text-[#5B7A99]" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#6FA787]" />
                )}
                <span className="text-[#F3F0E9] text-sm font-sans hidden sm:inline">{user?.email}</span>
                <span
                  className={`font-signage text-[11px] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded-sm ${
                    isAdmin
                      ? 'bg-[#1E262F] text-[#5B7A99] border border-[#5B7A99]/40'
                      : 'bg-[#1E2A24] text-[#6FA787] border border-[#6FA787]/40'
                  }`}
                >
                  {user?.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="btn-ghost p-2 rounded-sm text-xs text-[#F3F0E9]/70 hover:text-[#C4574A] hover:border-[#C4574A]/40"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-primary px-5 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
