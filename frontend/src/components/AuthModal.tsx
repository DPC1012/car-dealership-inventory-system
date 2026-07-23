import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);

    const endpoint = isLoginTab ? '/auth/login' : '/auth/register';
    const payload = { email, password };

    try {
      const res = await fetchApi<{ token: string; user: User }>(endpoint, {
        method: 'POST',
        body: JSON.stringify(payload),
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
    <div
      onClick={loading ? undefined : onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-[#18181B] animate-in fade-in zoom-in duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#9CA3AF] hover:text-[#18181B] transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Headline */}
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[#18181B] mb-1">
          {isLoginTab ? 'Welcome Back' : 'Join Roadstead Motors'}
        </h2>
        <p className="text-xs text-[#6B7280] mb-6 font-sans">
          {isLoginTab
            ? 'Sign in to access your saved inventory and purchase vehicles.'
            : 'Register your account to start buying luxury vehicles today.'}
        </p>

        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError(null);
            }}
            className={`font-heading text-xs tracking-wider uppercase pb-2.5 px-4 border-b-2 font-bold transition-colors ${
              isLoginTab
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#9CA3AF] hover:text-[#18181B]'
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
            className={`font-heading text-xs tracking-wider uppercase pb-2.5 px-4 border-b-2 font-bold transition-colors ${
              !isLoginTab
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#9CA3AF] hover:text-[#18181B]'
            }`}
          >
            Register Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 bg-[#FEF2F2] border border-[#FCA5A5] rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-[#EF4444]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
              Email Address <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wider text-[#6B7280] uppercase block mb-1.5">
              Password (Min 8 Characters) <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#18181B] placeholder-[#9CA3AF] focus:border-[#111111] focus:bg-white outline-none font-sans"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-[#111111] text-white hover:bg-[#27272A] rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md"
            >
              {loading ? 'Processing...' : isLoginTab ? 'Sign In to Showroom' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
