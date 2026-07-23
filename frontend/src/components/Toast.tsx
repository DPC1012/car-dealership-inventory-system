import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none theme-transition" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 2000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styleConfig = {
    success: {
      bg: 'var(--color-card)',
      border: 'var(--color-success)',
      text: 'text-[#6FA787]',
      icon: CheckCircle2,
    },
    error: {
      bg: 'var(--color-card)',
      border: 'var(--color-error)',
      text: 'text-[#C4574A]',
      icon: AlertCircle,
    },
    info: {
      bg: 'var(--color-card)',
      border: 'var(--color-info)',
      text: 'text-[#5B7A99]',
      icon: Info,
    },
  }[toast.type];

  const IconComponent = styleConfig.icon;

  return (
    <div
      className={`pointer-events-auto border rounded-md p-3.5 flex items-start gap-3 shadow-xl transition-all duration-300 animate-slide-up`}
      role={toast.type === 'error' ? 'alert' : 'status'}
      style={{
        backgroundColor: styleConfig.bg,
        borderColor: `${styleConfig.border}66`,
      }}
    >
      <IconComponent className={`w-5 h-5 shrink-0 ${styleConfig.text} mt-0.5`} />
      <div className="flex-1 text-xs font-sans leading-relaxed" style={{ color: 'var(--color-primary-text)' }}>
        {toast.message}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 transition-colors"
        style={{ color: 'var(--color-muted-text)' }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
