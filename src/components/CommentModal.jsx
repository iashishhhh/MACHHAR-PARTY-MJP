import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

export default function CommentModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleClose = useCallback(() => {
    setError('');
    setSending(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose]);

  useEffect(() => {
    if (!open) {
      setSending(false);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!comment.trim()) {
      setError('Please write your comment before posting.');
      return;
    }

    setSending(true);
    try {
      const result = onSubmit(name, comment);
      if (result?.ok) {
        try {
          playMosquitoBuzz(1.2);
        } catch {
          /* ignore audio errors */
        }
        setName('');
        setComment('');
        handleClose();
        setTimeout(() => {
          document.getElementById('testimonials')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 200);
      } else {
        setError(result?.error || 'Could not post. Please try again.');
      }
    } finally {
      setSending(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          key="comment-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="comment-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.2 }}
            className="bg-mjp-black border-2 border-mjp-red/50 rounded-2xl w-full max-w-md p-6 shadow-[0_0_40px_rgba(229,62,62,0.35)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10 p-1"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4 pr-8">
              <MessageSquare className="text-mjp-yellow shrink-0" size={22} />
              <h3
                id="comment-modal-title"
                className="font-bebas text-2xl text-mjp-yellow tracking-wider"
              >
                POST A TESTIMONIAL
              </h3>
            </div>
            <p className="text-xs text-gray-400 font-poppins mb-5">
              Your comment appears instantly in the &quot;Hear The Crying Voices&quot; section.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Your name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh from Kanpur"
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-mjp-red"
                  maxLength={60}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Your comment *
                </label>
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share how MJP changed your sleep, blood, or sanity..."
                  rows={4}
                  className="mt-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-mjp-red resize-none"
                  maxLength={500}
                />
              </div>
              {error && <p className="text-xs text-mjp-red font-mono">{error}</p>}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-lg font-bebas text-lg tracking-widest border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-[2] py-3 rounded-lg font-bebas text-lg tracking-widest bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black border border-white transition-all disabled:opacity-50"
                >
                  {sending ? 'POSTING...' : 'POST'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
