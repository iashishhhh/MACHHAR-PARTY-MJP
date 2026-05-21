import React from 'react';
import { motion } from 'framer-motion';
import { playMosquitoBuzz } from '../utils/audio';
import logoImg from '../assets/machhar.png';

export default function Hero({ hero = {} }) {
  const badge = hero.badge ?? 'Official Campaign Page 2026';
  const slogan = hero.slogan ?? '"Khoon sabka piyenge." 🩸';
  const showJoin = hero.showJoinButton !== false;
  const showDonate = hero.showDonateButton !== false;
  const handleJoinClick = (e) => {
    e.preventDefault();
    playMosquitoBuzz(1.2);
    const formSection = document.getElementById('join-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDonateClick = () => {
    playMosquitoBuzz(2.0);
    alert("🩸 MJP is highly thankful! Your blood will be equally distributed among our elite night-fighter battalions.");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 bg-grid-pattern poster-grunge">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-mjp-red/20 rounded-full blur-[80px] md:blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[150px] h-[150px] bg-mjp-yellow/10 rounded-full blur-[60px] md:blur-[100px] -z-10 pointer-events-none" />

      {/* Floating Mosquito Particles (Framer Motion) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl select-none cursor-pointer z-0"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800) - 400,
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600) - 300,
            opacity: 0.3 + Math.random() * 0.5,
          }}
          animate={{
            x: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            y: [
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
              Math.random() * 200 - 100,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          onClick={() => playMosquitoBuzz(0.8)}
        >
          🦟
        </motion.div>
      ))}

      {/* Campaign Badge / Poster Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-mjp-yellow bg-mjp-yellow/10 text-mjp-yellow text-xs md:text-sm font-semibold tracking-widest uppercase"
      >
        <span className="animate-pulse">●</span> {badge}
      </motion.div>

      {/* Huge Mascot Logo */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        className="z-10 relative mb-6 md:mb-8 group cursor-pointer"
        onClick={() => playMosquitoBuzz(1.5)}
      >
        {/* Glow behind logo */}
        <div className="absolute inset-0 bg-mjp-red/35 rounded-full blur-[40px] group-hover:bg-mjp-red/60 transition-all duration-500 scale-90" />

        <img
          src={logoImg}
          alt="MACHHAR Janta Party Logo"
          className="relative w-44 h-44 md:w-64 md:h-64 object-contain mx-auto rounded-full border-4 border-mjp-red p-2 bg-mjp-black/90 shadow-[0_0_30px_rgba(229,62,62,0.5)] group-hover:scale-105 group-hover:rotate-6 transition-all duration-300 animate-float-slow"
        />

        {/* Play indicator */}
        <div className="absolute bottom-2 right-1/2 translate-x-1/2 bg-mjp-black/80 border border-mjp-red px-2 py-0.5 rounded text-[10px] text-mjp-red font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to Buzz
        </div>
      </motion.div>

      {/* Main Party Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="z-10"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas text-glow-red text-mjp-red font-black tracking-tight leading-none">
          MACHHAR JANTA <br className="hidden md:block" />
          <span className="text-mjp-yellow text-glow-yellow">PARTY</span>
        </h1>
      </motion.div>

      {/* Slogan */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="z-10 mt-4 md:mt-6 text-xl md:text-3xl font-poppins italic text-gray-300 font-medium tracking-wide flex items-center justify-center gap-2"
      >
        {slogan}
      </motion.p>

      {/* CTA Buttons */}
      {(showJoin || showDonate) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="z-10 mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
        >
          {showJoin && (
            <button
              onClick={handleJoinClick}
              className="w-full sm:w-auto px-8 py-4 bg-mjp-red hover:bg-mjp-red-dark text-white font-bebas text-2xl tracking-wider rounded border-2 border-white hover:border-mjp-yellow shadow-[0_0_20px_rgba(229,62,62,0.6)] transition-all duration-300 transform hover:scale-105 active:scale-95 hover-shake"
            >
              JOIN THE PARTY
            </button>
          )}
          {showDonate && (
            <button
              onClick={handleDonateClick}
              className="w-full sm:w-auto px-8 py-4 bg-mjp-black border-2 border-mjp-yellow text-mjp-yellow hover:text-black hover:bg-mjp-yellow font-bebas text-2xl tracking-wider rounded shadow-[0_0_15px_rgba(236,201,75,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 hover-shake"
            >
              DONATE BLOOD
            </button>
          )}
        </motion.div>
      )}

      {/* Vintage Campaign Badge overlay style lines */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mjp-red via-mjp-yellow to-mjp-red shadow-[0_0_10px_rgba(229,62,62,0.8)]" />
    </section>
  );
}
