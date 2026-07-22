import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../config/api';
import type { User } from '../types';
import { X, Lock, Mail, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const endpoint = isLoginTab ? '/auth/login' : '/auth/register';

    try {
      const res = await fetchApi<{ token: string; user: User }>(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      login(res.token, res.user);
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <div className="bg-[#1B1E24] border border-[#333846] rounded-md p-6 max-w-md w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#454C5C] hover:text-[#F3F0E9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Headline */}
        <h2 className="font-signage text-2xl font-semibold tracking-wide text-[#E3A143] uppercase mb-4">
          {isLoginTab ? 'Sign In to Account' : 'Register New Account'}
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-[#333846] mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError(null);
            }}
            className={`font-signage text-xs tracking-wider uppercase pb-2 px-4 border-b-2 font-semibold transition-colors ${
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
            className={`font-signage text-xs tracking-wider uppercase pb-2 px-4 border-b-2 font-semibold transition-colors ${
              !isLoginTab
                ? 'border-[#E3A143] text-[#E3A143]'
                : 'border-transparent text-[#454C5C] hover:text-[#F3F0E9]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-[#2C1E1C] border border-[#C4574A]/40 rounded-sm p-3 flex items-start gap-2 text-xs text-[#C4574A]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#454C5C] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-[#252932] border border-[#333846] rounded-sm pl-9 pr-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="font-signage text-[11px] font-semibold tracking-wider text-[#454C5C] uppercase block mb-1">
              Password (Min 8 Characters)
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
                className="w-full bg-[#252932] border border-[#333846] rounded-sm pl-9 pr-3 py-2 text-sm text-[#F3F0E9] placeholder-[#454C5C] focus:border-[#E3A143] outline-none font-sans"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-2.5 rounded-sm text-xs font-semibold tracking-wider uppercase"
            >
              {loading ? 'Processing...' : isLoginTab ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
