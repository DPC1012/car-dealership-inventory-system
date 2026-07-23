import React, { useState, useEffect } from 'react';
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
    const payload = isLoginTab ? { email, password } : { name, email, password };

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
    <div
      onClick={loading ? undefined : onClose}
      className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 theme-transition"
      style={{ backgroundColor: 'var(--color-overlay)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in theme-transition"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', color: 'var(--color-primary-text)', border: '1px solid var(--color-border)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 transition-colors p-1"
          style={{ color: 'var(--color-muted-text)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-primary-text)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted-text)'; }}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-heading text-2xl font-bold tracking-tight mb-1" style={{ color: 'var(--color-primary-text)' }}>
          {isLoginTab ? 'Welcome Back' : 'Join Roadstead Motors'}
        </h2>
        <p className="text-xs mb-6 font-sans" style={{ color: 'var(--color-secondary-text)' }}>
          {isLoginTab
            ? 'Sign in to access your saved inventory and purchase vehicles.'
            : 'Register your account to start buying luxury vehicles today.'}
        </p>

        <div className="flex mb-6" style={{ borderBottom: '1px solid var(--color-divider)' }}>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError(null);
              setName('');
            }}
            className="font-heading text-xs tracking-wider uppercase pb-2.5 px-4 font-bold transition-colors"
            style={{
              borderBottom: isLoginTab ? '2px solid var(--color-primary-dark)' : '2px solid transparent',
              color: isLoginTab ? 'var(--color-primary-text)' : 'var(--color-muted-text)',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setError(null);
            }}
            className="font-heading text-xs tracking-wider uppercase pb-2.5 px-4 font-bold transition-colors"
            style={{
              borderBottom: !isLoginTab ? '2px solid var(--color-primary-dark)' : '2px solid transparent',
              color: !isLoginTab ? 'var(--color-primary-text)' : 'var(--color-muted-text)',
            }}
          >
            Register Account
          </button>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs" style={{ backgroundColor: 'var(--color-error-bg)', border: '1px solid var(--color-error-border)', color: 'var(--color-error)' }}>
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginTab && (
            <div>
              <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
                Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--color-muted-text)' }} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none font-sans"
                  style={{ backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
                  onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-dark)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-card)'; }}
                  onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-input-bg)'; }}
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Email Address <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--color-muted-text)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none font-sans"
                style={{ backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-dark)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-card)'; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-input-bg)'; }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-wider uppercase block mb-1.5" style={{ color: 'var(--color-secondary-text)' }}>
              Password (Min 8 Characters) <span style={{ color: 'var(--color-error)' }}>*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3" style={{ color: 'var(--color-muted-text)' }} />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none font-sans"
                style={{ backgroundColor: 'var(--color-input-bg)', border: '1px solid var(--color-border)', color: 'var(--color-primary-text)' }}
                onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-dark)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-card)'; }}
                onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-input-bg)'; }}
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-white rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-md"
              style={{ backgroundColor: 'var(--color-primary-dark)' }}
            >
              {loading ? 'Processing...' : isLoginTab ? 'Sign In to Showroom' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
