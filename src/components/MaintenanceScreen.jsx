import React from 'react';
import { motion } from 'framer-motion';

export default function MaintenanceScreen({ message }) {
  return (
    <div className="min-h-screen bg-mjp-black flex items-center justify-center p-4 bg-grid-pattern poster-grunge relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-mjp-red/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center z-10 max-w-2xl bg-black/50 p-8 md:p-12 rounded-2xl border-2 border-mjp-red/50 shadow-[0_0_50px_rgba(229,62,62,0.3)] backdrop-blur-sm"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          className="text-6xl md:text-8xl mb-6 inline-block"
        >
          🛑
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-bebas text-mjp-red text-glow-red tracking-wider mb-6">
          SITE UNDER MAINTENANCE
        </h1>
        
        <div className="w-16 h-1 bg-mjp-yellow mx-auto mb-6 rounded-full" />
        
        <p className="text-lg md:text-xl text-gray-300 font-poppins leading-relaxed">
          {message}
        </p>

        <div className="mt-12 text-sm font-mono text-mjp-yellow/60 uppercase tracking-widest border-t border-mjp-red/20 pt-6">
          — Admin Ashish —
        </div>
      </motion.div>
    </div>
  );
}
