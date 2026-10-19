import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useDemo();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none no-print">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-sky-600 flex-shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
        };

        const bgBorders = {
          success: 'bg-emerald-50 border-emerald-200 text-emerald-950',
          info: 'bg-sky-50 border-sky-200 text-sky-950',
          warning: 'bg-amber-50 border-amber-200 text-amber-950',
          error: 'bg-rose-50 border-rose-200 text-rose-950'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform duration-300 animate-slide-up ${bgBorders[toast.type]}`}
          >
            {icons[toast.type]}
            <p className="text-sm font-medium flex-1 pt-0.5 leading-snug">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
