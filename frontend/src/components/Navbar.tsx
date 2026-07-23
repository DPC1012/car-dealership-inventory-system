import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Car, Plus, LogOut, ShieldCheck, User as UserIcon, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAddVehicle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 h-20 nav-blur theme-transition" style={{ backgroundColor: 'color-mix(in srgb, var(--color-bg) 85%, transparent)' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between border-b theme-transition" style={{ borderColor: 'var(--color-border)' }}>
        {/* Brand Logo */}
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 theme-transition" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-bg)' }}>
            <Car className="w-5 h-5" />
          </div>
          <div className="flex items-baseline">
            <span className="font-heading text-xl font-extrabold tracking-tight uppercase theme-transition" style={{ color: 'var(--color-primary-text)' }}>
              Roadstead
            </span>
            <span className="font-heading text-xl font-light tracking-wide uppercase ml-1 theme-transition" style={{ color: 'var(--color-secondary-text)' }}>
              Motors
            </span>
          </div>
        </a>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider theme-transition" style={{ color: 'var(--color-primary-text)' }}>
          <a href="#showroom-inventory" className="hover:opacity-60 transition-opacity">Showroom Inventory</a>
          <a href="#categories" className="hover:opacity-60 transition-opacity">Categories</a>
          <a href="#brands" className="hover:opacity-60 transition-opacity">Luxury Brands</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border theme-transition hover:scale-105 active:scale-95 transition-transform"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary-text)' }}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="btn-primary text-xs px-5 py-2.5 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </button>
              )}

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs theme-transition" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)' }}>
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                ) : (
                  <UserIcon className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                )}
                <span className="font-medium hidden sm:inline">{user?.name || user?.email}</span>
                <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-bg)' }}>
                  {user?.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-2.5 rounded-full border theme-transition hover:scale-105 active:scale-95 transition-transform"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary-text)' }}
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button onClick={onOpenAuth} className="btn-primary text-xs px-6 py-2.5">
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
