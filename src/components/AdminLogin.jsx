import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, KeyRound, AlertCircle, ArrowLeft } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      if (email === 'ashish1862ac@gmail.com' && password === 'chaudhary@12') {
        localStorage.setItem('mjp_admin', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Access Denied.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-mjp-black flex items-center justify-center p-4 bg-grid-pattern poster-grunge relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-mjp-red/10 rounded-full blur-[100px] pointer-events-none" />
      
      <button 
        onClick={onCancel}
        className="absolute top-6 left-6 text-gray-400 hover:text-white flex items-center gap-2 font-mono text-sm uppercase tracking-widest transition-colors z-20"
      >
        <ArrowLeft size={16} /> Return to Site
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-black/80 p-8 rounded-2xl border border-mjp-red/30 shadow-[0_0_50px_rgba(229,62,62,0.15)] backdrop-blur-md z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-mjp-red/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-mjp-red/30">
            <Lock className="text-mjp-red" size={28} />
          </div>
          <h2 className="text-4xl font-bebas text-white tracking-widest">MJP COMMAND CENTER</h2>
          <p className="text-gray-400 font-mono text-xs mt-2 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/50 border border-red-500/50 text-red-400 p-3 rounded flex items-center gap-2 text-sm font-poppins"
            >
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} className="text-mjp-red" /> Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mjp-red focus:bg-white/10 transition-all font-poppins"
              placeholder="admin@mjp.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <KeyRound size={14} className="text-mjp-red" /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-mjp-red focus:bg-white/10 transition-all font-poppins"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-lg font-bebas text-xl tracking-widest transition-all duration-300 ${
              isLoading 
                ? 'bg-mjp-red/50 text-white/50 cursor-not-allowed' 
                : 'bg-mjp-red hover:bg-mjp-red-dark text-white shadow-[0_0_20px_rgba(229,62,62,0.4)] hover:shadow-[0_0_30px_rgba(229,62,62,0.6)]'
            }`}
          >
            {isLoading ? 'AUTHENTICATING...' : 'ACCESS OVERRIDE'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
