import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showAttentionBadge, setShowAttentionBadge] = useState(false);

  // Show a small subtle invitation badge after a short delay to grab CEO attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAttentionBadge(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = '919003812808'; // Bala's phone in international format

  const quickTemplates = [
    {
      label: 'Hire for Freelance AI Project',
      text: 'Hi Bala, I am a Founder/CEO looking to hire you for a freelance AI project. Let\'s connect!',
      icon: Briefcase
    },
    {
      label: 'Request AI Strategy Consult',
      text: 'Hi Bala, I want to schedule a 1-on-1 AI Strategy Consulting session for our business.',
      icon: Sparkles
    },
    {
      label: 'Build Custom RAG/LLM System',
      text: 'Hi Bala, we need a secure, custom RAG/LLM solution built. Would love to speak with you.',
      icon: Zap
    }
  ];

  const handleSelectTemplate = (text: string) => {
    setTypedText(text);
  };

  // Construct WhatsApp API link
  const getWhatsAppLink = (messageText: string) => {
    const encodedText = encodeURIComponent(messageText || 'Hi Bala, I saw your portfolio and would love to discuss a business AI opportunity!');
    return `https://wa.me/${phoneNumber}?text=${encodedText}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      <AnimatePresence>
        {/* Quick Invitation Badge */}
        {showAttentionBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-18 right-2 w-72 p-4 rounded-2xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl text-left backdrop-blur-xl"
          >
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400">
                <Sparkles className="w-4.5 h-4.5 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Instant AI Business Solutions
                </div>
                <p className="text-xs text-slate-200 font-semibold mt-1 leading-snug">
                  Need custom Generative AI solutions or a freelance consultant? Speak directly on WhatsApp.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="mt-2.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors"
                >
                  Start Conversation
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
              <button
                onClick={() => setShowAttentionBadge(false)}
                className="text-slate-500 hover:text-slate-300 p-0.5 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Expanded Chat Box */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="absolute bottom-18 right-0 w-[340px] sm:w-[380px] rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl text-left"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-slate-950 to-slate-900 p-5 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border border-cyan-400/30 overflow-hidden bg-slate-800">
                    <img
                      src="https://balavenkatesh3322.github.io/bala_venkatesh_profile/images/Bala_profile_pic.jpg"
                      alt="Bala Venkatesh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Active online status indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    Bala Venkatesh
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  </h4>
                  <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                    Freelance &amp; Consulting Hub
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content & Templates */}
            <div className="p-5 flex flex-col gap-4 max-h-[360px] overflow-y-auto scrollbar-none">
              <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 text-xs text-slate-300 leading-relaxed">
                👨‍💼 <strong>Instant Solution Response</strong>: Please select an action template below or type your custom inquiry to speak instantly with me.
              </div>

              {/* Quick Template Buttons */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Quick Inquiry Templates:
                </span>
                {quickTemplates.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTemplate(item.text)}
                      className="group flex items-start gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 text-left transition-all duration-200"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 text-slate-400 group-hover:text-cyan-400 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-100 transition-colors pt-0.5">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input & Action Button */}
            <div className="p-5 bg-slate-950/50 border-t border-white/5 flex flex-col gap-3">
              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type custom message to start WhatsApp conversation..."
                rows={2}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-xs text-slate-200 resize-none transition-all placeholder:text-slate-500"
              />
              <a
                href={getWhatsAppLink(typedText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 hover:from-cyan-400 hover:to-indigo-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20"
              >
                <Send className="w-3.5 h-3.5" /> Start Priority Chat
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <button
        id="whatsapp-trigger"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowAttentionBadge(false);
        }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-300 hover:scale-105 group border ${
          isOpen
            ? 'bg-slate-900 border-white/20 text-white'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-emerald-400/20 text-slate-950'
        }`}
        aria-label="Speak with me on WhatsApp"
      >
        {/* Dynamic status pulse glow behind button */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
        )}
        <MessageCircle className="w-6 h-6 transform group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
}
