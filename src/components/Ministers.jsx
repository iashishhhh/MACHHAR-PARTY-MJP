import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Droplet, Wind, HeartPulse, User } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const MINISTERS = [
  {
    id: 1,
    name: "Dr. Aedes Aegypti",
    title: "Minister of Dengue Affairs",
    alias: "The Platelet Plunderer",
    icon: HeartPulse,
    specialty: "Strategic platelet reduction, joint ache coordination, & sweet juice harvesting.",
    statName: "Joints Ached",
    statValue: "14.2 Million",
    quote: "“Platelets down, popularity up! Make joints ache again.”",
    color: "from-mjp-red to-red-900"
  },
  {
    id: 2,
    name: "Shri Dinesh Drosophila",
    title: "Minister of Night Attacks",
    alias: "Kaano ka Raja (Ear King)",
    icon: Sparkles,
    specialty: "High-pitch frequency modulation, ear proximity buzzing, & midnight alarm replacement.",
    statName: "Sleep Hours Lost",
    statValue: "880 Million",
    quote: "“Jab sab soenge, tab hum dhoom machaenge.”",
    color: "from-mjp-yellow via-yellow-700 to-yellow-900"
  },
  {
    id: 3,
    name: "Kumari Anopheles",
    title: "Minister of Blood Collection",
    alias: "CEO of Sweet Blood Extraction",
    icon: Droplet,
    specialty: "Premium A+ / O+ type identification, painless skin penetration, & malaria operations.",
    statName: "Blood Harvested",
    statValue: "420,000 Liters",
    quote: "“Khoon choosna ek pavitra kala hai, aur hum kalakar hain.”",
    color: "from-red-600 to-mjp-red"
  },
  {
    id: 4,
    name: "Captain Culex Pipiens",
    title: "Minister of Fan Inspection",
    alias: "The Regulator Inspector",
    icon: Wind,
    specialty: "Aerodynamic stability in high-wind zones & regulator tampering (forcing speed <= 2).",
    statName: "Fans Switched Off",
    statValue: "3.5 Million",
    quote: "“Speed 3 aur usse upar direct desh-droh (treason) hai!”",
    color: "from-gray-700 via-gray-900 to-mjp-yellow"
  }
];

export default function Ministers() {
  const handleCardClick = () => {
    playMosquitoBuzz(1.2);
  };

  return (
    <section id="ministers" className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-mjp-yellow/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-mjp-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded bg-mjp-red/20 border border-mjp-red text-mjp-red font-mono text-xs uppercase tracking-widest mb-4"
          >
            Cabinet of Blood Drinkers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bebas text-mjp-red text-glow-red tracking-wider"
          >
            MEET THE MINISTERS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 font-poppins text-lg mt-2 max-w-xl mx-auto"
          >
            Meet the elite wing-commanders driving our party's nationwide blood extraction operations.
          </motion.p>
        </div>

        {/* Ministers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MINISTERS.map((minister, index) => {
            const Icon = minister.icon;
            return (
              <motion.div
                key={minister.id}
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={handleCardClick}
                className="glass-panel rounded-2xl border border-mjp-red/30 overflow-hidden cursor-pointer hover:border-mjp-yellow/60 hover:shadow-[0_0_30px_rgba(229,62,62,0.4)] transition-all duration-300 group flex flex-col md:flex-row"
              >
                {/* Visual Avatar Section */}
                <div className={`w-full md:w-2/5 bg-gradient-to-br ${minister.color} flex flex-col justify-center items-center p-8 relative min-h-[220px] md:min-h-full`}>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15),transparent_70%)] pointer-events-none" />
                  
                  {/* Stylized Mosquito/Minister Graphic */}
                  <div className="relative w-24 h-24 rounded-full bg-mjp-black/60 border-2 border-white/30 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-10 h-10 text-mjp-yellow animate-pulse" />
                    <span className="absolute -bottom-1 -right-1 bg-mjp-red text-[10px] px-2 py-0.5 rounded-full border border-white font-bold font-mono">
                      ELITE
                    </span>
                  </div>
                  
                  <div className="text-center mt-4">
                    <span className="text-[10px] font-mono tracking-widest text-mjp-yellow bg-black/60 px-2 py-0.5 rounded border border-mjp-yellow/30 uppercase">
                      {minister.alias}
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-mjp-yellow text-xs font-mono font-semibold tracking-wider block mb-1">
                      {minister.title}
                    </span>
                    <h3 className="text-3xl font-bebas text-white tracking-wide group-hover:text-mjp-red transition-colors">
                      {minister.name}
                    </h3>
                    <p className="text-gray-400 text-sm font-poppins mt-3 leading-relaxed">
                      {minister.specialty}
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-mjp-red/20">
                    {/* Stat */}
                    <div className="flex justify-between items-center text-xs font-mono mb-4 bg-mjp-black/50 p-2.5 rounded border border-mjp-red/10">
                      <span className="text-gray-400 uppercase">{minister.statName}:</span>
                      <span className="text-mjp-yellow font-bold text-sm tracking-wide">{minister.statValue}</span>
                    </div>

                    {/* Quote */}
                    <p className="text-mjp-red-light font-poppins text-xs italic font-medium">
                      {minister.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mjp-yellow to-transparent opacity-50" />
    </section>
  );
}
