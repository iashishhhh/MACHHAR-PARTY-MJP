import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import LiveCounter from './components/LiveCounter';
import Ministers from './components/Ministers';
import MembershipForm from './components/MembershipForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BuzzButton from './components/BuzzButton';
import GlobalMosquitoes from './components/GlobalMosquitoes';
import { playMosquitoBuzz } from './utils/audio';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    playMosquitoBuzz(0.8);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-mjp-black text-white selection:bg-mjp-red selection:text-white overflow-hidden">
      {/* Sticky Premium Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
          ? 'bg-mjp-black/90 backdrop-blur-md border-b border-mjp-red/30 py-3 shadow-[0_4px_20px_rgba(229,62,62,0.15)]'
          : 'bg-transparent py-5'
        }`}>
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Brand/Logo */}
          <div
            onClick={() => handleNavClick('root')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform duration-300">🦟</span>
            <span className="font-bebas text-2xl md:text-3xl tracking-wider text-mjp-red group-hover:text-mjp-yellow transition-colors duration-300">
              MACHHAR JANTA <span className="text-mjp-yellow group-hover:text-mjp-red transition-colors duration-300">PARTY</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
            <button
              onClick={() => handleNavClick('manifesto')}
              className="text-gray-300 hover:text-mjp-yellow hover-shake transition-colors"
            >
              Manifesto
            </button>
            <button
              onClick={() => handleNavClick('ministers')}
              className="text-gray-300 hover:text-mjp-red hover-shake transition-colors"
            >
              Ministers
            </button>
            <button
              onClick={() => handleNavClick('join-section')}
              className="text-gray-300 hover:text-mjp-yellow hover-shake transition-colors"
            >
              Join Us
            </button>
          </div>

          {/* Quick Sound Buzz Trigger */}
          <div>
            <button
              onClick={() => playMosquitoBuzz(1.5)}
              className="px-4 py-1.5 bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black font-bebas text-sm md:text-base tracking-widest rounded border border-white hover:border-black transition-all duration-300 hover-shake"
            >
              QUICK BUZZ 🔊
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Manifesto Section */}
      <Manifesto />

      {/* Live Operations Counter Dashboard */}
      <LiveCounter />

      {/* Ministers Cabinet Profile Cards */}
      <Ministers />

      {/* Membership Registration Form & Modal */}
      <MembershipForm />

      {/* Testimonials Grievances Reviews */}
      <Testimonials />

      {/* Footer Disclaimer & Social Links */}
      <Footer />

      {/* On-demand Buzzing Sound & Custom Toast System */}
      <BuzzButton />

      {/* Viewport-flying Interactive Mosquitoes */}
      <GlobalMosquitoes />
    </div>
  );
}

export default App;
