import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, TrendingUp } from 'lucide-react';
import { useFakeVisitor } from '../context/FakeVisitorContext';

export default function FakeVisitorBar() {
  const count = useFakeVisitor();
  const [justTicked, setJustTicked] = useState(false);
  const [prevCount, setPrevCount] = useState(count);

  useEffect(() => {
    if (count > prevCount) {
      setJustTicked(true);
      const t = setTimeout(() => setJustTicked(false), 1200);
      setPrevCount(count);
      return () => clearTimeout(t);
    }
    setPrevCount(count);
  }, [count, prevCount]);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-mjp-yellow/30 bg-mjp-black/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(229,62,62,0.2)]"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-center gap-3 sm:gap-5">
        <Eye size={18} className="text-mjp-red shrink-0 hidden sm:block" />
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Live visitors on site
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={count}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="font-bebas text-xl sm:text-2xl md:text-3xl text-mjp-yellow tabular-nums tracking-wide"
            >
              {count.toLocaleString('en-IN')}
            </motion.span>
          </AnimatePresence>
          {justTicked && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="inline-flex items-center gap-0.5 text-[10px] font-mono text-green-400"
            >
              <TrendingUp size={12} /> +new
            </motion.span>
          )}
        </div>
        <span className="flex items-center gap-1.5 text-[9px] font-mono text-mjp-red/80 uppercase shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="hidden sm:inline">syncing</span>
        </span>
      </div>
    </div>
  );
}
