import React, { useState } from 'react';
import { Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { playMosquitoBuzz } from '../utils/audio';

const BUZZ_ALERTS = [
  "BZZZZZZ! Kan ke paas aake kaat liya!",
  "BZZZZZZ! Odomos lagao jaldi, chacha!",
  "BZZZZZZ! Speed 5 pe fan chalao abhi!",
  "BZZZZZZ! Sweet blood group spotted!",
  "BZZZZZZ! Clap kiya? Par main toh bach gaya!",
  "BZZZZZZ! Good Knight fast card jalaya kya?",
  "BZZZZZZ! Dengue season is coming, be ready!",
  "BZZZZZZ! Ek boond khoon ki keemat tum kya jaano Ramesh babu?"
];

export default function BuzzButton() {
  const [activeAlert, setActiveAlert] = useState(null);
  const [alertTimeout, setAlertTimeout] = useState(null);

  const handleBuzz = () => {
    // Play synthesis buzz
    playMosquitoBuzz(1.8);

    // Pick a funny random alert
    const randomMsg = BUZZ_ALERTS[Math.floor(Math.random() * BUZZ_ALERTS.length)];
    setActiveAlert(randomMsg);

    // Clear existing timeout if any
    if (alertTimeout) {
      clearTimeout(alertTimeout);
    }

    // Hide message after 3 seconds
    const timeout = setTimeout(() => {
      setActiveAlert(null);
    }, 3000);
    setAlertTimeout(timeout);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      {activeAlert && (
        <div className="bg-mjp-red border-2 border-mjp-yellow text-white font-poppins text-xs md:text-sm px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(229,62,62,0.8)] flex items-center gap-2 animate-bounce-slow max-w-xs md:max-w-md pointer-events-auto">
          <ShieldAlert size={16} className="text-mjp-yellow animate-pulse" />
          <span>{activeAlert}</span>
        </div>
      )}
      <button
        onClick={handleBuzz}
        title="Play mosquito buzz sound"
        className="pointer-events-auto w-14 h-14 bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(229,62,62,0.6)] border-2 border-white hover:border-black transition-all duration-300 transform hover:scale-110 active:scale-95 hover-shake group"
      >
        <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🦟</span>
      </button>
    </div>
  );
}
