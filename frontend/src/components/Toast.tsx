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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
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
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styleConfig = {
    success: {
      bg: 'bg-[#1E2A24]',
      border: 'border-[#6FA787]/40',
      text: 'text-[#6FA787]',
      icon: CheckCircle2,
    },
    error: {
      bg: 'bg-[#2C1E1C]',
      border: 'border-[#C4574A]/40',
      text: 'text-[#C4574A]',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-[#1E262F]',
      border: 'border-[#5B7A99]/40',
      text: 'text-[#5B7A99]',
      icon: Info,
    },
  }[toast.type];

  const IconComponent = styleConfig.icon;

  return (
    <div
      className={`pointer-events-auto ${styleConfig.bg} border ${styleConfig.border} rounded-md p-3.5 flex items-start gap-3 shadow-xl transition-all duration-300 animate-slide-up`}
    >
      <IconComponent className={`w-5 h-5 shrink-0 ${styleConfig.text} mt-0.5`} />
      <div className="flex-1 text-xs font-sans text-[#F3F0E9] leading-relaxed">
        {toast.message}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-[#8A909C] hover:text-[#F3F0E9] transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
