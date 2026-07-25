import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-xl text-sm font-medium border border-stone-800 backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-stone-900 text-white border-stone-700'
                : toast.type === 'error'
                ? 'bg-red-900/90 text-white border-red-700'
                : 'bg-stone-800 text-stone-100 border-stone-600'
            }`}
          >
            <div className="shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-amber-400" />}
            </div>
            <div className="flex-1 text-stone-100 leading-snug">{toast.message}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
