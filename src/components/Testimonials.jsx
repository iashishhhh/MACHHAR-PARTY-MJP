import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const TESTIMONIALS = [
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
  const handleTestimonialClick = () => {
    playMosquitoBuzz(0.9);
  };

  return (
    <section className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-mjp-yellow uppercase tracking-widest bg-mjp-yellow/15 px-3 py-1 rounded border border-mjp-yellow/30">
            Citizen Grievances & Praise
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas text-glow-red text-mjp-red tracking-wider mt-4">
            HEAR THE CRYING VOICES
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base mt-2 max-w-xl mx-auto">
            Actual public reports from citizens whose lives, skin, and sleep cycles have been permanently revolutionized by our party.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={handleTestimonialClick}
              className="glass-panel p-8 rounded-2xl border border-mjp-red/20 hover:border-mjp-yellow/40 hover:shadow-[0_0_20px_rgba(229,62,62,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between relative group"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-mjp-red/10 group-hover:text-mjp-red/20 transition-colors">
                <Quote size={40} />
              </div>

              <div>
                {/* Rating - Syringes or Mosquitoes! */}
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

                {/* Quote Content */}
                <p className="text-gray-300 font-poppins italic text-sm md:text-base leading-relaxed mb-6 group-hover:text-white transition-colors">
                  “{t.quote}”
                </p>
              </div>

              {/* Author Info */}
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
