import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Car, Plus, LogOut, ShieldCheck, User as UserIcon, Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: () => void;
  onOpenAddVehicle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenAddVehicle }) => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [spinning, setSpinning] = useState(false);
  const cooldownRef = useRef(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    setSpinning(true);
    toggleTheme();
    setTimeout(() => {
      cooldownRef.current = false;
      setSpinning(false);
    }, 300);
  }, [toggleTheme]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

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
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2.5 rounded-full border md:hidden theme-transition"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary-text)' }}
            title="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={handleToggle}
            className="p-2.5 rounded-full border theme-transition hover:scale-105 active:scale-95 transition-transform"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary-text)' }}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            <span className={spinning ? 'theme-spin inline-flex' : 'inline-flex'}>
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </span>
          </button>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <button
                  onClick={onOpenAddVehicle}
                  className="btn-primary text-xs px-5 py-2.5 hidden sm:flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs theme-transition" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)' }}>
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                ) : (
                  <UserIcon className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                )}
                <span className="font-medium">{user?.name || user?.email}</span>
                <span className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-bg)' }}>
                  {user?.role}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-2.5 rounded-full border theme-transition hover:scale-105 active:scale-95 transition-transform hidden sm:block"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-secondary-text)' }}
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button onClick={onOpenAuth} className="btn-primary text-xs px-6 py-2.5 hidden sm:block">
              Sign In / Register
            </button>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden" style={{ top: '80px' }}>
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--color-overlay)' }}
            onClick={closeMobile}
          />

          {/* Drawer */}
          <div
            className="absolute top-0 right-0 w-72 h-full shadow-2xl animate-in theme-transition flex flex-col"
            style={{ backgroundColor: 'var(--color-card)', borderLeft: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center justify-between p-5 border-b theme-transition" style={{ borderColor: 'var(--color-border)' }}>
              <span className="font-heading text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary-text)' }}>Menu</span>
              <button
                onClick={closeMobile}
                className="p-2 rounded-full theme-transition"
                style={{ color: 'var(--color-secondary-text)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col p-5 gap-1">
              <a
                href="#showroom-inventory"
                onClick={closeMobile}
                className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{ color: 'var(--color-primary-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-input-bg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
              >
                Showroom Inventory
              </a>
              <a
                href="#categories"
                onClick={closeMobile}
                className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{ color: 'var(--color-primary-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-input-bg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
              >
                Categories
              </a>
              <a
                href="#brands"
                onClick={closeMobile}
                className="px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors"
                style={{ color: 'var(--color-primary-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-input-bg)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; }}
              >
                Luxury Brands
              </a>
            </nav>

            <div className="mt-auto p-5 border-t theme-transition" style={{ borderColor: 'var(--color-border)' }}>
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-primary-text)' }}>
                    {isAdmin ? (
                      <ShieldCheck className="w-4 h-4" style={{ color: 'var(--color-info)' }} />
                    ) : (
                      <UserIcon className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
                    )}
                    <span className="font-medium">{user?.name || user?.email}</span>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => { closeMobile(); onOpenAddVehicle(); }}
                      className="btn-primary text-xs w-full py-3 flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Add Vehicle
                    </button>
                  )}
                  <button
                    onClick={() => { closeMobile(); logout(); }}
                    className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    style={{ color: 'var(--color-secondary-text)', border: '1px solid var(--color-border)' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { closeMobile(); onOpenAuth(); }}
                  className="btn-primary text-xs w-full py-3"
                >
                  Sign In / Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
