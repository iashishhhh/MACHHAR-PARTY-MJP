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
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Scrollable overlay — full modal visible on small phones */}
          <div
            className="h-full w-full overflow-y-auto overscroll-y-contain"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onClick={handleClose}
          >
            <div className="flex min-h-full items-center justify-center p-3 pt-4 pb-6 sm:p-6 sm:py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg max-h-[min(92dvh,720px)] flex flex-col rounded-2xl border-2 border-mjp-yellow/50 bg-mjp-black shadow-[0_0_60px_rgba(229,62,62,0.35)] my-auto shrink-0"
              >
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none rounded-2xl" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-mjp-red via-mjp-yellow to-mjp-red rounded-t-2xl" />

                {/* Header — fixed, no scroll */}
                <div className="relative z-10 shrink-0 flex items-start justify-between gap-2 px-4 pt-4 pb-2 sm:px-6 sm:pt-5 border-b border-white/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 rounded-full bg-mjp-red/20 border-2 border-mjp-red flex items-center justify-center text-2xl sm:text-3xl">
                      🦟
                    </div>
                    <div className="text-left min-w-0">
                      <span className="inline-block text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-mjp-yellow bg-mjp-yellow/10 px-2 py-0.5 rounded-full border border-mjp-yellow/30">
                        First visit
                      </span>
                      <h2
                        id="welcome-title"
                        className="font-bebas text-2xl sm:text-4xl text-mjp-red tracking-wide leading-tight mt-1"
                      >
                        WELCOME TO THE{' '}
                        <span className="text-mjp-yellow">BUZZ</span>
                      </h2>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="shrink-0 text-gray-400 hover:text-white p-2 -mr-1"
                    aria-label="Close welcome"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Scrollable body */}
                <div
                  className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-4 py-3 sm:px-6 sm:py-4"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  <p className="font-bebas text-lg sm:text-xl text-white tracking-wide text-center sm:text-left">
                    Machhar Janta Party HQ
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-gray-300 font-poppins leading-relaxed text-center sm:text-left">
                    Congratulations — you survived the landing page. The mosquitoes have
                    already voted for you. 🩸
                  </p>

                  <div className="mt-4 space-y-2.5 sm:space-y-3 text-left">
                    <div className="flex gap-2.5 sm:gap-3 items-start p-2.5 sm:p-3 rounded-xl bg-white/5 border border-mjp-red/20">
                      <Heart className="text-mjp-red shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] sm:text-sm text-gray-300 font-poppins leading-relaxed">
                        <strong className="text-white">Support the revolution:</strong> like,
                        share, and spread the word — insomnia is a team sport here.
                      </p>
                    </div>
                    <div className="flex gap-2.5 sm:gap-3 items-start p-2.5 sm:p-3 rounded-xl bg-white/5 border border-mjp-yellow/25">
                      <PartyPopper className="text-mjp-yellow shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] sm:text-sm text-gray-300 font-poppins leading-relaxed">
                        <strong className="text-mjp-yellow">Submit the membership form</strong>{' '}
                        below and officially join the squadron of night operators.
                      </p>
                    </div>
                    <div className="flex gap-2.5 sm:gap-3 items-start p-2.5 sm:p-3 rounded-xl bg-mjp-yellow/10 border border-mjp-yellow/40">
                      <Gift className="text-mjp-yellow shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] sm:text-sm text-gray-300 font-poppins leading-relaxed">
                        <strong className="text-white">Free gift incoming:</strong> after you
                        submit, something special will be sent to your inbox. We are not saying
                        it is malaria — we are saying it is a surprise.
                      </p>
                    </div>
                    <div className="flex gap-2.5 sm:gap-3 items-start p-2.5 sm:p-3 rounded-xl bg-mjp-red/10 border border-mjp-red/40">
                      <Mail className="text-mjp-red shrink-0 mt-0.5" size={16} />
                      <p className="text-[11px] sm:text-sm text-gray-300 font-poppins leading-relaxed">
                        <strong className="text-mjp-red">Use your correct email.</strong> Wrong
                        email = gift delivered to a stranger at 2 AM. We cannot buzz them for a
                        refund.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer buttons — always visible */}
                <div className="relative z-10 shrink-0 px-4 pb-4 pt-2 sm:px-6 sm:pb-5 border-t border-white/10 bg-mjp-black/95 rounded-b-2xl">
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                    <button
                      type="button"
                      onClick={handleJoinForm}
                      className="w-full py-3 sm:py-3.5 rounded-lg font-bebas text-lg sm:text-xl tracking-widest bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black border-2 border-white transition-all"
                    >
                      JOIN & CLAIM GIFT 🎁
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playMosquitoBuzz(0.7);
                        handleClose();
                      }}
                      className="w-full py-3 sm:py-3.5 rounded-lg font-bebas text-lg sm:text-xl tracking-widest border border-white/25 text-gray-300 hover:text-white hover:border-white/50 transition-all"
                    >
                      EXPLORE FIRST
                    </button>
                  </div>
                  <p className="mt-3 text-[9px] sm:text-[10px] font-mono text-gray-500 uppercase tracking-wider text-center">
                    Shows once · Scroll for details · Fan: Speed 1 only
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
