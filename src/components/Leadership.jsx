import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Users, Cpu, Flame, Target, Star } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const LEADERS = [
  {
    id: 1,
    name: "Ashish",
    role: "Supreme Swarm Founder & Site Architect",
    desc: "The mastermind behind the MJP digital headquarters. Handcrafted the buzzing servers and blood extraction portals.",
    icon: Flame,
    color: "border-mjp-yellow shadow-[0_0_20px_rgba(236,201,75,0.4)]",
    badge: "FOUNDER & CO-FOUNDER",
    special: "Sweet Blood Extractor v4.0 Developer",
    stats: "100% Blood Intake Guaranteed"
  },
  {
    id: 2,
    name: "Shadan",
    role: "Partner & Director of Wing Aerodynamics",
    desc: "Specialist in steering mosquito wings against high-velocity table fans. Absolute defense strategist.",
    icon: Target,
    color: "border-mjp-red/50 hover:border-mjp-yellow/60",
    badge: "PARTNER",
    special: "Fan Speed-2 Override Expert",
    stats: "99% Wind Resistance"
  },
  {
    id: 3,
    name: "Harshit",
    role: "Partner & Chief Platelet Depletion Inspector",
    desc: "Monitors human platelet levels in real-time. Directs Dengue strikes on non-supporters.",
    icon: Award,
    color: "border-mjp-red/50 hover:border-mjp-yellow/60",
    badge: "PARTNER",
    special: "Platelet Drop Specialist",
    stats: "1.5M Platelets Plundered"
  },
  {
    id: 4,
    name: "Tushar",
    role: "Partner & Head of Midnight Buzzer Operations",
    desc: "Audio engineer for high-frequency ear buzzing. Optimizes decibels for peak annoyance at 3 AM.",
    icon: Cpu,
    color: "border-mjp-red/50 hover:border-mjp-yellow/60",
    badge: "PARTNER",
    special: "Ear Proximity Sound Director",
    stats: "850Hz Buzz Frequency Tuning"
  },
  {
    id: 5,
    name: "Vishal",
    role: "Partner & Commander of Dengue Battalions",
    desc: "Oversees local swamp deployments and coordinates swarm migrations during monsoon season.",
    icon: Shield,
    color: "border-mjp-red/50 hover:border-mjp-yellow/60",
    badge: "PARTNER",
    special: "Swamp Deployment General",
    stats: "4.2M Larvae Under Control"
  },
  {
    id: 6,
    name: "Aditya",
    role: "Partner & Chief IT Cell Minister",
    desc: "Manages the digital swarm cells, spreading sweet blood rumors and coordinates online campaigns.",
    icon: Users,
    color: "border-mjp-red/50 hover:border-mjp-yellow/60",
    badge: "PARTNER",
    special: "Fake Blood Donation Campaigns",
    stats: "99% Sugar Sugar Rumors Spread"
  }
];

export default function Leadership() {
  const handleCardClick = () => {
    playMosquitoBuzz(1.1);
  };

  return (
    <section id="leadership" className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge border-t border-mjp-red/20">
      <div className="absolute top-10 left-10 w-72 h-72 bg-mjp-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-mjp-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-mjp-yellow uppercase tracking-widest bg-mjp-yellow/15 px-3 py-1 rounded border border-mjp-yellow/30">
            Supreme Council of Blood Suckers
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas text-glow-yellow text-mjp-yellow tracking-wider mt-4">
            MJP PARTY ARCHITECTS
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base mt-2 max-w-xl mx-auto">
            Meet the human brains who sold their souls to the mosquito swarm to construct the world's most irritating political campaign.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LEADERS.map((leader, index) => {
            const Icon = leader.icon;
            return (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={handleCardClick}
                className={`glass-panel p-6 rounded-xl border flex flex-col justify-between h-full relative cursor-pointer group transition-all duration-300 ${leader.color}`}
              >
                <div>
                  {/* Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-[9px] font-mono font-semibold tracking-widest px-2 py-0.5 rounded border ${
                      leader.id === 1 
                        ? 'text-mjp-yellow bg-mjp-yellow/10 border-mjp-yellow/40' 
                        : 'text-mjp-red bg-mjp-red/10 border-mjp-red/30'
                    }`}>
                      {leader.badge}
                    </span>
                    {leader.id === 1 && (
                      <Star size={16} className="text-mjp-yellow animate-spin-slow" />
                    )}
                  </div>

                  {/* Leader Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                      leader.id === 1 
                        ? 'bg-mjp-yellow/10 border-mjp-yellow/50 text-mjp-yellow group-hover:bg-mjp-yellow/20' 
                        : 'bg-mjp-red/10 border-mjp-red/30 text-mjp-red group-hover:bg-mjp-red/20'
                    }`}>
                      <Icon size={24} className="group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bebas text-white tracking-wide group-hover:text-mjp-yellow transition-colors leading-none">
                        {leader.name}
                      </h3>
                      <span className="text-xs text-gray-500 font-poppins mt-1 block">
                        {leader.role}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 font-poppins text-xs leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                    {leader.desc}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-4 pt-4 border-t border-mjp-red/10 text-[10px] font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-500">SPECIALTY:</span>
                    <span className="text-white font-bold">{leader.special}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">COMBAT STAT:</span>
                    <span className="text-mjp-yellow font-bold">{leader.stats}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
