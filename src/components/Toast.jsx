import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500" />,
    info: <Info className="w-4 h-4 text-blue-500" />
  };

  const borderStyles = {
    success: 'border-emerald-200 dark:border-emerald-800',
    error: 'border-rose-200 dark:border-rose-800',
    info: 'border-blue-200 dark:border-blue-800'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border ${borderStyles[toast.type || 'info']} shadow-xl text-sm text-slate-800 dark:text-slate-100 max-w-sm`}>
        {icons[toast.type || 'info']}
        <span className="font-medium text-xs sm:text-sm">{toast.message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
