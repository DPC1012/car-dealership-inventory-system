import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../config/api';
import type { User } from '../types';
import { X, Lock, Mail, User as UserIcon, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLoginTab && !name.trim()) {
      setError('Name is required for registration');
      return;
    }

    setLoading(true);

    const endpoint = isLoginTab ? '/auth/login' : '/auth/register';
    const payload = isLoginTab
      ? { email, password }
      : { email, password };

    try {
      const res = await fetchApi<{ token: string; user: User }>(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      login(res.token, res.user);
      onClose();
      setName('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1B1E24] border border-[#333846] rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#454C5C] hover:text-[#F3F0E9] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Headline */}
        <h2 className="font-signage text-2xl font-bold tracking-wide text-[#E3A143] uppercase mb-1">
          {isLoginTab ? 'Welcome Back' : 'Join DriveLine'}
        </h2>
        <p className="text-xs text-[#F3F0E9]/60 mb-5 font-sans">
          {isLoginTab
            ? 'Sign in to access your saved inventory and purchase vehicles.'
            : 'Register your account to start buying luxury vehicles today.'}
        </p>

        {/* Tabs */}
        <div className="flex border-b border-[#333846] mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError(null);
            }}
            className={`font-signage text-xs tracking-wider uppercase pb-2.5 px-4 border-b-2 font-semibold transition-colors ${
              isLoginTab
                ? 'border-[#E3A143] text-[#E3A143]'
                : 'border-transparent text-[#454C5C] hover:text-[#F3F0E9]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setError(null);
            }}
            className={`font-signage text-xs tracking-wider uppercase pb-2.5 px-4 border-b-2 font-semibold transition-colors ${
              !isLoginTab
                ? 'border-[#E3A143] text-[#E3A143]'
                : 'border-transparent text-[#454C5C] hover:text-[#F3F0E9]'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 bg-[#2C1E1C] border border-[#C4574A]/40 rounded-lg p-3.5 flex items-start gap-2.5 text-xs text-[#C4574A]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
                Full Name <span className="text-[#C4574A]">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#454C5C] absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full bg-[#252932] border border-[#333846] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Email Address <span className="text-[#C4574A]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#454C5C] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-[#252932] border border-[#333846] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Password (Min 8 Characters) <span className="text-[#C4574A]">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#454C5C] absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#252932] border border-[#333846] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 rounded-lg text-xs font-bold tracking-wider uppercase shadow-lg hover:shadow-amber-500/10"
            >
              {loading ? 'Processing...' : isLoginTab ? 'Sign In to Showroom' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
