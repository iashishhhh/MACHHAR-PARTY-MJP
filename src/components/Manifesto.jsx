import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ShieldCheck, SunDim, Ban, Wind, Scale } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const PROMISES = [
  {
    id: 1,
    title: "Free Buzzing at Night",
    description: "Every household is guaranteed a personal night-choir mosquito near the ear. High-fidelity high-frequency buzzing, fully free of cost. Sleep is overrated anyway!",
    icon: SunDim,
    badge: "BZZZZ SERENADE",
    color: "rgba(229, 62, 62, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(229,62,62,0.6)]"
  },
  {
    id: 2,
    title: "3 Bites Daily for All",
    description: "Equal distribution of bites across all classes. Sweet-blooded or spice-lovers, everyone will receive 3 organic, fresh bites daily. Itchiness is a fundamental right!",
    icon: ShieldCheck,
    badge: "ORGANIC BLOOD TAX",
    color: "rgba(236, 201, 75, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(236,201,75,0.5)]"
  },
  {
    id: 3,
    title: "Odomos Tax Removed",
    description: "Anti-mosquito defensive creams will be heavily taxed at 300% to discourage biological warfare. Keep it natural! Let your skin be an open buffet.",
    icon: Ban,
    badge: "ANTI-DEFENSE REFORM",
    color: "rgba(229, 62, 62, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(229,62,62,0.6)]"
  },
  {
    id: 4,
    title: "Fan Speed Limit: Max 2",
    description: "Strict fan speed limit after 11 PM. Flying against Speed 5 is a direct violation of mosquito aviation laws. MJP patrolling squads will inspect your regulator!",
    icon: Wind,
    badge: "AVIATION SECURITY",
    color: "rgba(236, 201, 75, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(236,201,75,0.55)]"
  },
  {
    id: 5,
    title: "Mosquito Rights Protection Act",
    description: "Clapping hands to kill a mosquito is strictly banned. Violators will be sentenced to sleeping without a net in a swamp for 7 consecutive nights.",
    icon: Scale,
    badge: "HUMANITARIAN JUSTICE",
    color: "rgba(229, 62, 62, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(229,62,62,0.6)]"
  },
  {
    id: 6,
    title: "No-Net Wildlife Sanctuaries",
    description: "Every bedroom must declare 20% of its area as a net-free mosquito wildlife sanctuary. Cooperate with native hunters or face administrative penalties!",
    icon: Ban,
    badge: "HABITAT PROTECTION",
    color: "rgba(236, 201, 75, 0.4)",
    hoverGlow: "shadow-[0_0_25px_rgba(236,201,75,0.5)]"
  }
];

export default function Manifesto() {
  const handleCardInteraction = () => {
    playMosquitoBuzz(1.0);
  };

  return (
    <section id="manifesto" className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mjp-red to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bebas text-mjp-yellow text-glow-yellow tracking-wider"
          >
            OUR 6 BZZZZY PROMISES
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 font-poppins text-lg mt-2 max-w-xl mx-auto"
          >
            Real manifesto. Real bite. No false claims. Only direct sweet blood extraction.
          </motion.p>
        </div>

        {/* Promises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROMISES.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <motion.div
                key={promise.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={handleCardInteraction}
                onMouseEnter={handleCardInteraction}
                className={`glass-panel p-8 rounded-xl border border-mjp-red/30 cursor-pointer hover:border-mjp-yellow/60 transition-all duration-300 flex flex-col justify-between h-full relative group ${promise.hoverGlow}`}
              >
                {/* Background Card Vignette */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${promise.color}, transparent 60%)` }}
                />

                <div>
                  {/* Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-semibold tracking-widest text-mjp-yellow uppercase bg-mjp-yellow/10 border border-mjp-yellow/30 px-2 py-0.5 rounded">
                      {promise.badge}
                    </span>
                    <span className="text-gray-600 font-bebas text-2xl group-hover:text-mjp-red transition-colors duration-300">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-mjp-red/10 border border-mjp-red/30 flex items-center justify-center mb-6 group-hover:bg-mjp-red/20 group-hover:border-mjp-red/80 transition-all duration-300">
                    <Icon className="text-mjp-red w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bebas text-white tracking-wider mb-3 group-hover:text-mjp-yellow transition-colors duration-300">
                    {promise.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 font-poppins text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {promise.description}
                  </p>
                </div>

                {/* Card Footer Micro-interactive cue */}
                <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-mjp-red/60 group-hover:text-mjp-red tracking-wider uppercase transition-colors duration-300">
                  <span>Hovered? Play Buzz</span>
                  <span className="animate-ping text-[10px]">🦟</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
