import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Users, Moon } from 'lucide-react';

export default function LiveCounter() {
  // Initial starting values
  const [stats, setStats] = useState({
    bites: 4892408,
    blood: 24462,
    disturbed: 894082,
    nights: 1540892
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        // Randomly increment stats
        const bitesAdd = Math.floor(Math.random() * 5) + 1;
        const bloodAdd = Number((bitesAdd * 0.005).toFixed(3)); // 5ml per bite approx
        const disturbedAdd = Math.random() > 0.4 ? 1 : 0;
        const nightsAdd = Math.random() > 0.3 ? 1 : 0;

        return {
          bites: prev.bites + bitesAdd,
          blood: Number((prev.blood + bloodAdd).toFixed(3)),
          disturbed: prev.disturbed + disturbedAdd,
          nights: prev.nights + nightsAdd
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const statsList = [
    {
      id: 1,
      label: "TOTAL BITES TODAY",
      value: stats.bites.toLocaleString(),
      icon: Activity,
      color: "text-mjp-red",
      glow: "rgba(229, 62, 62, 0.4)"
    },
    {
      id: 2,
      label: "BLOOD COLLECTED (L)",
      value: stats.blood.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 }) + " L",
      icon: ShieldAlert,
      color: "text-mjp-yellow",
      glow: "rgba(236, 201, 75, 0.4)"
    },
    {
      id: 3,
      label: "CITIZENS DISTURBED",
      value: stats.disturbed.toLocaleString(),
      icon: Users,
      color: "text-mjp-red",
      glow: "rgba(229, 62, 62, 0.4)"
    },
    {
      id: 4,
      label: "SLEEPLESS NIGHTS CREATED",
      value: stats.nights.toLocaleString(),
      icon: Moon,
      color: "text-mjp-yellow",
      glow: "rgba(236, 201, 75, 0.4)"
    }
  ];

  return (
    <section className="py-20 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge">
      {/* Background neon strip */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mjp-red to-transparent opacity-80" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-mjp-red uppercase tracking-widest bg-mjp-red/10 px-3 py-1 rounded border border-mjp-red/30">
            MJP Operations Dashboard
          </span>
          <h2 className="text-5xl md:text-7xl font-bebas text-white tracking-wider mt-4">
            LIVE MUCCHAR <span className="text-mjp-yellow text-glow-yellow">TRACKER</span>
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base mt-2 max-w-lg mx-auto">
            Real-time satellite feeds displaying nationwide mosquito bite frequency, sugar extraction, and human distress indices.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsList.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-6 rounded-xl border border-mjp-red/20 shadow-md flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Micro-glow dot */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full opacity-10 group-hover:opacity-30 blur-md transition-all" style={{ backgroundColor: stat.glow }} />

                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-semibold">
                    {stat.label}
                  </span>
                  <div className="w-8 h-8 rounded bg-mjp-black flex items-center justify-center border border-mjp-red/25">
                    <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>

                <div className="mt-4">
                  {/* Dynamic Value Ticker */}
                  <span className={`text-3xl md:text-4xl font-bebas font-bold tracking-wide ${stat.color} block`}>
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono text-mjp-red-light mt-1 inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" /> Live Syncing...
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative Operations Border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mjp-yellow to-transparent opacity-80" />
    </section>
  );
}
