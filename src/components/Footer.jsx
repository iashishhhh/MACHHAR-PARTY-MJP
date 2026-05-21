import React from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Heart, AlertTriangle } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

export default function Footer() {
  const handleLogoClick = () => {
    playMosquitoBuzz(1.8);
  };

  return (
    <footer className="bg-mjp-black border-t-2 border-mjp-red pt-16 pb-8 px-4 relative overflow-hidden bg-grid-pattern poster-grunge">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Footer Top Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

          {/* Logo & Brand */}
          <div className="text-center md:text-left cursor-pointer group" onClick={handleLogoClick}>
            <h3 className="text-3xl font-bebas text-glow-red text-mjp-red tracking-wider">
              MACHHAR JANTA <span className="text-mjp-yellow text-glow-yellow">PARTY</span>
            </h3>
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">
              ESTD. 2026 ● BLOOD & BUZZ REVOLUTION
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); playMosquitoBuzz(0.8); }}
              className="w-12 h-12 rounded-full bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center text-white hover:text-mjp-yellow hover:bg-mjp-red/30 transition-all duration-300 hover-shake"
              title="Join Telegram Cell"
            >
              <Send size={20} />
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); playMosquitoBuzz(0.8); }}
              className="w-12 h-12 rounded-full bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center text-white hover:text-mjp-yellow hover:bg-mjp-red/30 transition-all duration-300 hover-shake"
              title="Share sweet blood location on WhatsApp"
            >
              <MessageSquare size={20} />
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); playMosquitoBuzz(0.8); }}
              className="w-12 h-12 rounded-full bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center text-white hover:text-mjp-yellow hover:bg-mjp-red/30 transition-all duration-300 hover-shake"
              title="Show love for mosquitoes"
            >
              <Heart size={20} />
            </a>
          </div>

        </div>

        {/* Big Slogan Closing Banner */}
        <div className="text-center mb-12">
          <motion.h4
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-5xl md:text-8xl font-bebas text-glow-red text-mjp-red tracking-widest font-black uppercase"
          >
            Raat ko milte hain. 🦟🩸
          </motion.h4>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-mjp-red/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

          {/* Political Disclaimer */}
          <div className="flex items-start gap-2.5 max-w-xl text-gray-500 font-poppins text-[10px] md:text-xs leading-relaxed">
            <AlertTriangle size={18} className="text-mjp-yellow flex-shrink-0 mt-0.5" />
            <p>
              <strong>Campaign Disclaimer:</strong> MACHHAR Janta Party (MJP) is a purely fictional political organization created for comedy, satire, and entertainment purposes. MJP is not liable for malaria, dengue, insomnia, sleep disturbances, platelet drops, or sudden midnight clapping urges. Blood extractions and midnight serenade buzzing are subject to sleep market risks. Read all campaign pamphlets carefully before closing your windows.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 font-mono text-[10px] uppercase tracking-wider flex-shrink-0">
            &copy; 2026 MJP IT CELL. ALL BITES RESERVED.
          </div>

        </div>

      </div>
    </footer>
  );
}
