import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Mail, Heart, PartyPopper, X } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const WELCOME_KEY = 'mjp_welcome_seen';

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(WELCOME_KEY) !== 'true') {
      const t = setTimeout(() => setOpen(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = useCallback(() => {
    localStorage.setItem(WELCOME_KEY, 'true');
    setOpen(false);
  }, []);

  const handleJoinForm = () => {
    playMosquitoBuzz(1.1);
    handleClose();
    setTimeout(() => {
      document.getElementById('join-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 250);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, handleClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="welcome-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border-2 border-mjp-yellow/50 bg-mjp-black shadow-[0_0_60px_rgba(229,62,62,0.35),0_0_40px_rgba(236,201,75,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mjp-red via-mjp-yellow to-mjp-red" />

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white p-1"
              aria-label="Close welcome"
            >
              <X size={22} />
            </button>

            <div className="relative z-10 p-6 sm:p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring' }}
                className="mx-auto w-16 h-16 rounded-full bg-mjp-red/20 border-2 border-mjp-red flex items-center justify-center mb-4 text-3xl"
              >
                🦟
              </motion.div>

              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-mjp-yellow bg-mjp-yellow/10 px-3 py-1 rounded-full border border-mjp-yellow/30 mb-3">
                First visit detected
              </span>

              <h2
                id="welcome-title"
                className="font-bebas text-4xl sm:text-5xl text-mjp-red tracking-wider leading-tight"
              >
                WELCOME TO THE{' '}
                <span className="text-mjp-yellow text-glow-yellow">BUZZ</span>
              </h2>
              <p className="font-bebas text-xl text-white tracking-wide mt-1">
                Machhar Janta Party HQ
              </p>

              <p className="mt-5 text-sm text-gray-300 font-poppins leading-relaxed">
                Congratulations — you survived the landing page. The mosquitoes have
                already voted for you. 🩸
              </p>

              <div className="mt-6 space-y-3 text-left">
                <div className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-mjp-red/20">
                  <Heart className="text-mjp-red shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed">
                    <strong className="text-white">Support the revolution:</strong> like,
                    share, and spread the word — insomnia is a team sport here.
                  </p>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-xl bg-white/5 border border-mjp-yellow/25">
                  <PartyPopper className="text-mjp-yellow shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed">
                    <strong className="text-mjp-yellow">Submit the membership form</strong>{' '}
                    below and officially join the squadron of night operators.
                  </p>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-xl bg-mjp-yellow/10 border border-mjp-yellow/40">
                  <Gift className="text-mjp-yellow shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed">
                    <strong className="text-white">Free gift incoming:</strong> after you
                    submit, something special will be sent to your inbox. We are not saying
                    it is malaria — we are saying it is a surprise.
                  </p>
                </div>
                <div className="flex gap-3 items-start p-3 rounded-xl bg-mjp-red/10 border border-mjp-red/40">
                  <Mail className="text-mjp-red shrink-0 mt-0.5" size={18} />
                  <p className="text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed">
                    <strong className="text-mjp-red">Use your correct email.</strong>{' '}
                    Wrong email = gift delivered to a stranger at 2 AM. We cannot buzz
                    them for a refund.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleJoinForm}
                  className="flex-1 py-3.5 rounded-lg font-bebas text-xl tracking-widest bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black border-2 border-white transition-all hover-shake"
                >
                  JOIN & CLAIM GIFT 🎁
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playMosquitoBuzz(0.7);
                    handleClose();
                  }}
                  className="flex-1 py-3.5 rounded-lg font-bebas text-xl tracking-widest border border-white/25 text-gray-300 hover:text-white hover:border-white/50 transition-all"
                >
                  EXPLORE FIRST
                </button>
              </div>

              <p className="mt-4 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                This message shows once. Fan regulator: Speed 1 only.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
