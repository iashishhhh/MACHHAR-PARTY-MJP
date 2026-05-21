import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageSquare, Heart, AlertTriangle } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';
import { useSocial } from '../context/SocialContext';
import CommentModal from './CommentModal';

export default function Footer({ onAdminTrigger }) {
  const [clickCount, setClickCount] = useState(0);
  const [commentOpen, setCommentOpen] = useState(false);
  const clickTimeoutRef = React.useRef(null);
  const { hasLiked, addComment, toggleLike, shareOnWhatsApp } = useSocial();

  const handleLogoClick = () => {
    playMosquitoBuzz(1.8);
  };

  const handleShare = (e) => {
    e.preventDefault();
    playMosquitoBuzz(0.8);
    shareOnWhatsApp();
  };

  const handleCommentClose = useCallback(() => {
    setCommentOpen(false);
  }, []);

  const handleCommentOpen = (e) => {
    e.preventDefault();
    playMosquitoBuzz(0.8);
    setCommentOpen(true);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    playMosquitoBuzz(hasLiked ? 0.6 : 1.0);
    await toggleLike();
  };

  return (
    <>
      <footer className="bg-mjp-black border-t-2 border-mjp-red pt-16 pb-8 px-4 relative overflow-hidden bg-grid-pattern poster-grunge">
        <div className="max-w-6xl mx-auto relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">

            <div className="text-center md:text-left cursor-pointer group" onClick={handleLogoClick}>
              <h3 className="text-3xl font-bebas text-glow-red text-mjp-red tracking-wider">
                MACHHAR JANTA <span className="text-mjp-yellow text-glow-yellow">PARTY</span>
              </h3>
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">
                ESTD. 2026 ● BLOOD & BUZZ REVOLUTION
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <button
                type="button"
                onClick={handleShare}
                className="w-12 h-12 rounded-full bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center text-white hover:text-mjp-yellow hover:bg-mjp-red/30 transition-all duration-300 hover-shake"
                title="WhatsApp par site share karo"
                aria-label="Share on WhatsApp"
              >
                <Share2 size={20} />
              </button>
              <button
                type="button"
                onClick={handleCommentOpen}
                className="w-12 h-12 rounded-full bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center text-white hover:text-mjp-yellow hover:bg-mjp-red/30 transition-all duration-300 hover-shake"
                title="Comment add karo — testimonials mein dikhega"
                aria-label="Add comment"
              >
                <MessageSquare size={20} />
              </button>
              <button
                type="button"
                onClick={handleLike}
                className={`relative w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover-shake ${
                  hasLiked
                    ? 'bg-mjp-red/30 border-mjp-red text-mjp-red scale-110'
                    : 'bg-mjp-red/10 border-mjp-red/30 text-white hover:text-mjp-red hover:bg-mjp-red/20'
                }`}
                title={hasLiked ? 'Unlike (tap again)' : 'Like MJP'}
                aria-label={hasLiked ? 'Unlike' : 'Like'}
                aria-pressed={hasLiked}
              >
                <Heart size={20} className={hasLiked ? 'fill-current' : ''} />
              </button>
            </div>
          </div>

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

          <div className="border-t border-mjp-red/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">

            <div className="flex items-start gap-2.5 max-w-xl text-gray-500 font-poppins text-[10px] md:text-xs leading-relaxed">
              <AlertTriangle size={18} className="text-mjp-yellow flex-shrink-0 mt-0.5" />
              <p>
                <strong>Campaign Disclaimer:</strong> MACHHAR Janta Party (MJP) is a purely fictional political organization created for comedy, satire, and entertainment purposes. MJP is not liable for malaria, dengue, insomnia, sleep disturbances, platelet drops, or sudden midnight clapping urges. Blood extractions and midnight serenade buzzing are subject to sleep market risks. Read all campaign pamphlets carefully before closing your windows.
              </p>
            </div>

            <div
              className="text-gray-600 font-mono text-[10px] uppercase tracking-wider flex-shrink-0 cursor-default select-none"
              onClick={() => {
                const newCount = clickCount + 1;
                setClickCount(newCount);

                if (newCount >= 5) {
                  onAdminTrigger();
                  setClickCount(0);
                }

                clearTimeout(clickTimeoutRef.current);
                clickTimeoutRef.current = setTimeout(() => setClickCount(0), 2000);
              }}
              title="MJP Operations"
            >
              &copy; 2026 MJP IT CELL. ALL BITES RESERVED.
            </div>

          </div>

        </div>
      </footer>

      <CommentModal
        open={commentOpen}
        onClose={handleCommentClose}
        onSubmit={addComment}
      />
    </>
  );
}
