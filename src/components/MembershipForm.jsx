import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Heart, User, Briefcase, HelpCircle, MessageSquare, X, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMosquitoBuzz } from '../utils/audio';

const BLOOD_GROUPS = [
  "A+ (Highly Sweet & Nutritious)",
  "B+ (Medium Spicy & Energizing)",
  "O+ (Universal Buffet Option)",
  "O- (Rare Nectar Premium)",
  "AB+ (Luxury High-Sugar Cocktail)",
  "Tea-Spiked (100% Desi Chai Flavored)",
  "Alcohol-Infused (Friday Night Special)",
  "Odomos-Tainted (Strictly Prohibited!)"
];

const PROFESSIONS = [
  "Sweet-Blooded Victim",
  "Ceiling Fan Speed-3 Lover",
  "Professional Mosquito Slapper (Ex-Convict)",
  "Odomos Sales Executive (Spy)",
  "Mid-Night Ear-Clapper",
  "Engineering Student (Sleepless)",
  "Good Knight Fast-Card Addict",
  "True Supporter of Buzzing"
];

export default function MembershipForm({ membership = {} }) {
  const isOpen = membership.open !== false;
  const closedMessage =
    membership.closedMessage ||
    'Membership registrations are paused. Try again later!';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bloodGroup: BLOOD_GROUPS[0],
    bitesCount: '',
    profession: PROFESSIONS[0],
    thoughts: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!emailOk) {
      alert('Please enter a valid email address so we can send your gift.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyzjrPef0l3S9VAXb0mF8IvFF28p3PGm_3dnXJKe8Aawzk3dJ0nPKXqnKbc9DOLLx-QrA/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      console.log(result);

      // Play synthesis sound
      playMosquitoBuzz(2.5);

      // Fire confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E53E3E', '#ECC94B', '#000000', '#ffffff']
      });

      setShowModal(true);

    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      bloodGroup: BLOOD_GROUPS[0],
      bitesCount: '',
      profession: PROFESSIONS[0],
      thoughts: ''
    });
  };

  return (
    <section id="join-section" className="py-24 px-4 bg-mjp-black relative overflow-hidden bg-grid-pattern poster-grunge">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-mjp-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bebas text-mjp-yellow text-glow-yellow tracking-wider">
            BECOME A TRUE MACHHAR
          </h2>
          <p className="text-gray-400 font-poppins text-sm md:text-base mt-2">
            Surrender your platelets. Give up your sleep. Join the revolution.
          </p>
        </div>

        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-14 rounded-2xl border-2 border-mjp-yellow/30 text-center"
          >
            <ShieldCheck size={48} className="mx-auto text-mjp-yellow mb-4 opacity-80" />
            <p className="text-lg md:text-xl text-gray-300 font-poppins leading-relaxed">
              {closedMessage}
            </p>
          </motion.div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-2xl border-2 border-mjp-red/40 shadow-[0_0_30px_rgba(229,62,62,0.2)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                <User size={14} className="text-mjp-red" /> Citizen Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name (e.g. Ramesh Kumar)"
                className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                <Mail size={14} className="text-mjp-red" /> Email (for your gift)
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                autoComplete="email"
                className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200"
              />
              <p className="text-[10px] text-gray-500 font-mono mt-1.5">
                Use your correct email — your welcome gift will be sent here.
              </p>
            </div>

            {/* Grid for Blood Group & Bites Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <div>
                <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Heart size={14} className="text-mjp-red" /> Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white focus:outline-none transition-colors duration-200"
                >
                  {BLOOD_GROUPS.map((group, idx) => (
                    <option key={idx} value={group} className="bg-mjp-black text-white">
                      {group}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                  <HelpCircle size={14} className="text-mjp-red" /> Bite Count
                </label>
                <input
                  type="number"
                  name="bitesCount"
                  required
                  min="0"
                  value={formData.bitesCount}
                  onChange={handleChange}
                  placeholder="e.g. 9999"
                  className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200"
                />
              </div>
            </div>

            {/* Profession */}
            <div>
              <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase size={14} className="text-mjp-red" /> Profession / Blood Category
              </label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white focus:outline-none transition-colors duration-200"
              >
                {PROFESSIONS.map((prof, idx) => (
                  <option key={idx} value={prof} className="bg-mjp-black text-white">
                    {prof}
                  </option>
                ))}
              </select>
            </div>

            {/* Thoughts */}
            <div>
              <label className="block text-xs md:text-sm font-mono text-mjp-yellow uppercase tracking-wider mb-2 flex items-center gap-2">
                <MessageSquare size={14} className="text-mjp-red" />Message
              </label>
              <textarea
                name="thoughts"
                rows={4}
                value={formData.thoughts}
                onChange={handleChange}
                placeholder="write your thoughts here..."
                className="w-full bg-mjp-black/90 border border-mjp-red/30 focus:border-mjp-yellow rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors duration-200 resize-y min-h-[100px]"
              />
            </div>

            {/* Terms Disclaimer */}
            <p className="text-[10px] text-gray-500 font-poppins leading-relaxed">
              * By clicking "Become a True MACHHAR", you authorize all MJP members, mosquitoes, larvae, and local gnats to draw up to 50ml of sweet juice per night. Fans must be kept at speed 2 or below.
            </p>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bebas text-3xl tracking-widest py-4 rounded border-2 transition-all duration-300 ${
                  isSubmitting 
                  ? 'bg-gray-600 text-gray-300 border-gray-500 cursor-not-allowed' 
                  : 'bg-mjp-red hover:bg-mjp-yellow text-white hover:text-black border-white hover:border-black shadow-[0_0_20px_rgba(229,62,62,0.5)] transform hover:scale-[1.02] active:scale-[0.98] hover-shake'
                }`}
              >
                {isSubmitting ? 'PROCESSING...' : 'BECOME A TRUE MACHHAR 🦟'}
              </button>
            </div>
          </form>
        </motion.div>
        )}
      </div>

      {/* Fake Success Popup Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-mjp-black border-2 border-mjp-yellow rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-[0_0_50px_rgba(236,201,75,0.4)] relative"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Alert Header Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-mjp-yellow/15 border-2 border-mjp-yellow flex items-center justify-center animate-bounce-slow">
                  <span className="text-3xl">🦟</span>
                </div>
              </div>

              {/* Modal Text Content */}
              <div className="text-center">
                <h3 className="text-3xl font-bebas text-mjp-yellow text-glow-yellow tracking-wider mb-2">
                  ADMISSION STATUS: UNDER REVIEW 🩸
                </h3>
                <h4 className="text-lg font-poppins font-semibold text-white mb-4">
                  “Congratulations, your blood donation request is under review.”
                </h4>
                <div className="bg-mjp-red/10 border border-mjp-red/30 p-4 rounded-lg text-left text-xs md:text-sm text-gray-300 font-poppins space-y-2 leading-relaxed">
                  <p>
                    <strong>Hi {formData.name},</strong> your profile has been successfully cataloged!
                  </p>
                  <p>
                    🎁 Your welcome gift will be sent to <strong>{formData.email}</strong> — keep an eye on your inbox (and spam, mosquitoes love hiding there).
                  </p>
                  <p>
                    Our elite squadron of night-fighter mosquitoes (headed by Dr. Aedes Aegypti) will visit your bedside tonight around <strong>2:00 AM</strong> to extract your initial membership dues (approximately <strong>30ml</strong> of <em>{formData.bloodGroup}</em> juice).
                  </p>
                  <p className="text-mjp-yellow font-bold uppercase tracking-wider text-[11px] animate-pulse">
                    ⚠️ CRITICAL INSTRUCTION: Keep all windows open and fan regulator set strictly to speed 1.
                  </p>
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-8 py-3 bg-mjp-yellow hover:bg-mjp-red text-black hover:text-white font-bebas text-xl tracking-widest rounded border border-black hover:border-white transition-all duration-300 hover-shake"
                >
                  BZZZZZ! I AM READY 🩸
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
