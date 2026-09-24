import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useHostelo } from '../../context/HosteloContext';

export const Toast: React.FC = () => {
  const { toast } = useHostelo();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
  };

  const bgStyles = {
    success: 'border-emerald-200 bg-white text-slate-800',
    error: 'border-rose-200 bg-white text-slate-800',
    info: 'border-blue-200 bg-white text-slate-800',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-none">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgStyles[toast.type]} min-w-[280px] max-w-md pointer-events-auto`}
      >
        {icons[toast.type]}
        <p className="text-sm font-medium text-slate-800">{toast.message}</p>
      </div>
    </div>
  );
};
