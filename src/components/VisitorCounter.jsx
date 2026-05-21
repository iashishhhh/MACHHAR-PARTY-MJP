import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

/**
 * Displays live Firebase visitor count.
 * Pass `count` from useVisitorCount() in App — do not mount the hook here (avoids duplicate listeners).
 */
export default function VisitorCounter({ count = 0, compact = false }) {
  if (compact) {
    return (
      <span
        className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-mjp-yellow"
        title="Live visitor count from Firebase"
      >
        <Eye size={12} className="text-mjp-red shrink-0" />
        <span className="tabular-nums">{Number(count).toLocaleString()}</span>
        <span className="hidden sm:inline text-gray-500">visitors</span>
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-mjp-yellow/30 bg-mjp-yellow/10 backdrop-blur-sm"
    >
      <Eye size={22} className="text-mjp-red shrink-0" />
      <div className="text-left">
        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
          Live Site Visitors
        </p>
        <p className="text-2xl md:text-3xl font-bebas text-mjp-yellow tabular-nums leading-none">
          {Number(count).toLocaleString()}
        </p>
      </div>
      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" title="Realtime sync" />
    </motion.div>
  );
}
