import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import LiveCounter from './components/LiveCounter';
import Ministers from './components/Ministers';
import Leadership from './components/Leadership';
import MembershipForm from './components/MembershipForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import BuzzButton from './components/BuzzButton';
import GlobalMosquitoes from './components/GlobalMosquitoes';
import { playMosquitoBuzz } from './utils/audio';
import anthemSong from './assets/Khoon-Tax Machhar.mp3';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [visitCount, setVisitCount] = useState(0);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState(false);
  const anthemRef = useRef(null);

  useEffect(() => {
    let visits = localStorage.getItem('mjp_visits') || 0;
    visits = parseInt(visits, 10) + 1;
    localStorage.setItem('mjp_visits', visits);
    setVisitCount(visits);

    anthemRef.current = new Audio(anthemSong);
    anthemRef.current.loop = true;
    return () => {
      if (anthemRef.current) {
        anthemRef.current.pause();
      }
    };
  }, []);

  const toggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemRef.current.pause();
    } else {
      anthemRef.current.play();
    }
    setIsPlayingAnthem(!isPlayingAnthem);
  };

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
              onClick={() => handleNavClick('leadership')}
              className="text-gray-300 hover:text-mjp-yellow hover-shake transition-colors"
            >
              Leadership
            </button>
            <button
              onClick={() => handleNavClick('join-section')}
              className="text-gray-300 hover:text-mjp-red hover-shake transition-colors"
            >
              Join Us
            </button>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button
              onClick={toggleAnthem}
              className={`flex items-center justify-center whitespace-nowrap gap-1.5 px-3 py-2 sm:px-3 md:px-4 md:py-1.5 font-bebas text-sm md:text-base tracking-widest rounded border transition-all duration-300 hover-shake ${isPlayingAnthem
                ? 'bg-white text-mjp-red border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                : 'bg-transparent text-white border-mjp-red hover:bg-mjp-red/20'
                }`}
            >
              {isPlayingAnthem ? (
                <>
                  <div className="flex items-end gap-[2px] h-3 md:h-4">
                    <span className="w-[2px] sm:w-1 bg-mjp-red h-full animate-[bounce_1s_infinite]"></span>
                    <span className="w-[2px] sm:w-1 bg-mjp-red h-2/3 animate-[bounce_0.8s_infinite_0.1s]"></span>
                    <span className="w-[2px] sm:w-1 bg-mjp-red h-4/5 animate-[bounce_1.2s_infinite_0.2s]"></span>
                  </div>
                  <span className="hidden sm:inline">PAUSE</span>
                </>
              ) : (
                <>
                  <span className="text-base sm:text-sm">🎵</span>
                  <span className="hidden sm:inline">ANTHEM</span>
                </>
              )}
            </button>
            <button
              onClick={() => playMosquitoBuzz(1.5)}
              className="flex items-center justify-center whitespace-nowrap gap-1.5 px-3 py-2 sm:px-3 md:px-4 md:py-1.5 bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black font-bebas text-sm md:text-base tracking-widest rounded border border-white hover:border-black transition-all duration-300 hover-shake"
            >
              <span className="hidden sm:inline">QUICK BUZZ</span>
              <span className="text-base sm:text-sm">🔊</span>
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

      {/* Leadership & Founders Section */}
      <Leadership />

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

      {/* Visitor Counter */}
      <div className="fixed bottom-4 left-4 z-50 bg-mjp-black/80 border border-mjp-red/50 text-mjp-yellow px-3 py-1.5 rounded-md font-mono text-xs flex items-center gap-2 shadow-[0_0_10px_rgba(229,62,62,0.3)]">
        <span className="text-mjp-red">👁️</span> Visits: {visitCount}
      </div>
    </div>
  );
}

export default App;
