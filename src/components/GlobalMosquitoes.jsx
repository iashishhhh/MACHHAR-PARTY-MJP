import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMosquitoBuzz } from '../utils/audio';

const RESPONSES = ["SMACK!", "DODGED!", "OUCH!", "FATALITY!", "🩸 SWEET!"];

export default function GlobalMosquitoes() {
  const [mosquitoes, setMosquitoes] = useState([]);
  const [smacks, setSmacks] = useState([]);

  // Initialize 8 mosquitoes with random starting parameters
  useEffect(() => {
    const initial = Array.from({ length: 7 }).map((_, idx) => ({
      id: idx,
      size: 20 + Math.random() * 15, // Random sizes
      // Random starting coordinates on screen
      left: Math.random() * 90 + "%",
      top: Math.random() * 90 + "%",
      // Random flight durations for variety
      duration: 12 + Math.random() * 8,
      delay: Math.random() * 5
    }));
    setMosquitoes(initial);
  }, []);

  const handleSmack = (e, id, index) => {
    e.stopPropagation();
    playMosquitoBuzz(0.8);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    const randomMsg = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];

    // Trigger Smack Visual Indicator
    const newSmack = {
      id: Date.now(),
      x: clickX,
      y: clickY,
      msg: randomMsg
    };
    setSmacks(prev => [...prev, newSmack]);

    // Temporarily hide the smacked mosquito and respawn it elsewhere after 3 seconds
    setMosquitoes(prev => 
      prev.map(m => m.id === id ? {
        ...m,
        left: Math.random() * 95 + "%",
        top: Math.random() * 95 + "%",
        duration: 10 + Math.random() * 10,
        // Hide it by adding a temp hidden state
        hidden: true
      } : m)
    );

    // Bring the mosquito back in its new location after 2.5s
    setTimeout(() => {
      setMosquitoes(prev => 
        prev.map(m => m.id === id ? { ...m, hidden: false } : m)
      );
    }, 2500);

    // Remove smack text after 1s
    setTimeout(() => {
      setSmacks(prev => prev.filter(s => s.id !== newSmack.id));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      
      {/* Floating Interactive Mosquito Emojis */}
      {mosquitoes.map((m, idx) => (
        !m.hidden && (
          <motion.div
            key={m.id}
            className="absolute pointer-events-auto cursor-crosshair text-2xl flex items-center justify-center p-2 group"
            style={{
              left: m.left,
              top: m.top,
              fontSize: `${m.size}px`
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.6, 0.95, 0.6],
              // Smooth sweeping circular/zigzag path using coordinates offsets
              x: [
                0,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                Math.random() * 300 - 150,
                0
              ],
              y: [
                0,
                Math.random() * 250 - 125,
                Math.random() * 250 - 125,
                Math.random() * 250 - 125,
                0
              ],
              rotate: [0, 45, -45, 180, 0]
            }}
            transition={{
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
            onClick={(e) => handleSmack(e, m.id, idx)}
            title="Smack the mosquito!"
          >
            {/* Mosquito Emoji */}
            <span className="inline-block transform transition-transform group-hover:scale-125">
              🦟
            </span>
          </motion.div>
        )
      ))}

      {/* Smack visual feedback texts (💥 SMACK!) */}
      <AnimatePresence>
        {smacks.map(s => (
          <motion.div
            key={s.id}
            className="absolute font-bebas font-black tracking-widest text-mjp-yellow text-glow-yellow text-2xl"
            style={{
              left: s.x,
              top: s.y,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 1, scale: 0.5, y: 0 }}
            animate={{ opacity: 0, scale: 1.5, y: -40, rotate: Math.random() * 20 - 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            💥 {s.msg}
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
}
