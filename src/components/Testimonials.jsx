import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, Trash2 } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';
import { useSocial } from '../context/SocialContext';

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    quote: "This party changed my sleep schedule forever. I no longer sleep at night, which leaves me with 24 hours of pure, uninterrupted stress. Thank you, MJP!",
    author: "Ramesh Srivastava",
    role: "Common Citizen",
    rating: 5,
    ratingType: "🦟"
  },
  {
    id: 2,
    quote: "Now I fear nights. The high-pitched buzzing in my ear is louder than my college professor's lectures. I've perfected the double-hand clap maneuver, but they always dodge it.",
    author: "Ayush Sharma",
    role: "Engineering Student",
    rating: 4,
    ratingType: "💉"
  },
  {
    id: 3,
    quote: "Our defensive cream sales plummeted by 98% because of the 300% Odomos Tax. MJP squads confiscated our warehouse. I am ruined, but the buzzing is admittedly rhythmic.",
    author: "Gupta Ji",
    role: "Odomos Factory Owner",
    rating: 1,
    ratingType: "🦟"
  },
  {
    id: 4,
    quote: "BZZZ! Excellent redistribution of high-quality sugar-spiked sweet O+ juice. I haven't tasted such delicious blood since the 90s. MJP has delivered on all its promises!",
    author: "Comrade Gnat",
    role: "General Secretary, Swarm Committee",
    rating: 5,
    ratingType: "💉"
  }
];

export default function Testimonials() {
  const { comments, deleteComment, clearAllComments } = useSocial();
  const userComments = (comments || [])
    .filter((c) => c && c.quote && String(c.quote).trim())
    .map((c) => ({ ...c, isUser: true }));
  const allTestimonials = [...userComments, ...DEFAULT_TESTIMONIALS];

  const handleTestimonialClick = () => {
    playMosquitoBuzz(0.9);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this testimonial from your device?')) return;
    playMosquitoBuzz(0.7);
    deleteComment(id);
  };

  const handleClearAll = () => {
    if (!userComments.length) return;
    if (!window.confirm('Remove all your posted testimonials from this device?')) return;
    playMosquitoBuzz(1.0);
    clearAllComments();
  };

  return (
    <section
      id="testimonials"
      className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge"
    >
      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <span className="text-xs font-mono text-mjp-yellow uppercase tracking-widest bg-mjp-yellow/15 px-3 py-1 rounded border border-mjp-yellow/30">
            Citizen Grievances & Praise
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas text-glow-red text-mjp-red tracking-wider mt-4">
            HEAR THE CRYING VOICES
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base mt-2 max-w-xl mx-auto">
            Your posts appear here — saved on this device only. You can delete them anytime.
          </p>
          {userComments.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-mjp-red/40 text-mjp-red font-mono text-xs uppercase tracking-widest hover:bg-mjp-red/10 transition-colors"
            >
              <Trash2 size={14} /> Clear all my posts ({userComments.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allTestimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
              onClick={handleTestimonialClick}
              className={`glass-panel p-8 rounded-2xl border hover:shadow-[0_0_20px_rgba(229,62,62,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                t.isUser
                  ? 'border-mjp-yellow/50 hover:border-mjp-yellow/70'
                  : 'border-mjp-red/20 hover:border-mjp-yellow/40'
              }`}
            >
              {t.isUser && (
                <>
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-widest text-mjp-yellow bg-mjp-yellow/10 px-2 py-0.5 rounded border border-mjp-yellow/30">
                    <Sparkles size={10} /> Your Post
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, t.id)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-mjp-red/10 border border-mjp-red/40 flex items-center justify-center text-mjp-red hover:bg-mjp-red hover:text-white transition-colors"
                    title="Delete this post"
                    aria-label="Delete testimonial"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}

              <div className={`absolute ${t.isUser ? 'top-14' : 'top-6'} right-6 text-mjp-red/10 group-hover:text-mjp-red/20 transition-colors pointer-events-none`}>
                <Quote size={40} />
              </div>

              <div className={t.isUser ? 'pt-6' : ''}>
                <div className="flex gap-1 mb-6 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`transition-all duration-300 ${i < t.rating ? 'opacity-100 scale-100' : 'opacity-20 scale-90'}`}
                    >
                      {t.ratingType}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 font-poppins italic text-sm md:text-base leading-relaxed mb-6 group-hover:text-white transition-colors pr-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-mjp-red/10">
                <div className="w-10 h-10 rounded-full bg-mjp-red/10 flex items-center justify-center border border-mjp-red/30">
                  <span className="text-lg font-bebas text-mjp-yellow">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bebas text-lg tracking-wide leading-none mb-1 group-hover:text-mjp-yellow transition-colors">
                    {t.author}
                  </h4>
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider block">
                    {t.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
