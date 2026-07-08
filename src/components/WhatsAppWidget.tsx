import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showAttentionBadge, setShowAttentionBadge] = useState(false);

  // Show a small subtle invitation badge when the user scrolls to the middle of the page
  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (triggered) return;

      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercentage = currentScroll / totalScrollable;

      // Trigger around 35% of page scrolling (middle region of the website)
      if (scrollPercentage >= 0.35) {
        triggered = true;
        setShowAttentionBadge(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phoneNumber = '919003812808'; // Bala's phone in international format

  const quickTemplates = [
    {
      label: 'Hire for Custom AI Project',
      text: 'Hi Bala, I want to hire you as a consultant for a freelance Generative AI project. Let\'s schedule a chat!',
      icon: Briefcase
    },
    {
      label: 'Consult: AI Strategy Session',
      text: 'Hi Bala, I would love to book an AI Strategy consultation to analyze and automate our business bottlenecks.',
      icon: Sparkles
    },
    {
      label: 'Deploy: RAG / Custom Agents',
      text: 'Hi Bala, we need a custom Multi-Agent system or Vector RAG Knowledge Base deployed. Let\'s connect!',
      icon: Zap
    }
  ];

  const handleSelectTemplate = (text: string) => {
    setTypedText(text);
  };

  // Construct WhatsApp API link
  const getWhatsAppLink = (messageText: string) => {
    const encodedText = encodeURIComponent(messageText || 'Hi Bala, I saw your portfolio and would love to discuss an AI Business solution!');
    return `https://wa.me/${phoneNumber}?text=${encodedText}`;
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans select-none">
      <AnimatePresence>
        {/* Quick Invitation Badge (Glassmorphism & Professional Animation) */}
        {showAttentionBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-80 p-4 rounded-2xl glass-panel text-left"
          >
            {/* Gloss shine line overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-white/5 pointer-events-none rounded-2xl" />
            
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-400 border border-cyan-400/20">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Available Now
                </div>
                <p className="text-xs text-slate-200 font-semibold mt-1.5 leading-snug">
                  Don't wait — let's chat now on WhatsApp!
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="mt-2.5 text-[10px] font-black uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  Start Consultation Chat
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
              <button
                onClick={() => setShowAttentionBadge(false)}
                className="text-slate-500 hover:text-slate-300 p-0.5 transition-colors cursor-pointer"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Expanded Glass Chat Box */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[360px] rounded-2.5xl glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden text-left"
          >
            {/* Glass glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

            {/* Header */}
            <div className="relative bg-slate-950/90 p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full border border-cyan-400/30 overflow-hidden bg-slate-800">
                    <img
                      src="images/Bala_profile_pic.jpg"
                      alt="Bala Venkatesh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Active online status indicator */}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-100 flex items-center gap-1">
                    Bala Venkatesh
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  </h4>
                  <div className="text-[9px] text-slate-400 font-mono flex items-center gap-1 uppercase tracking-widest">
                    <span>Active Now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close panel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content & Templates */}
            <div className="p-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto scrollbar-none relative z-10">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200 font-bold tracking-tight">
                ⚡ Ready for Enterprise AI Consulting.
              </div>

              {/* Quick Template Buttons */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Choose an action:
                </span>
                {quickTemplates.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectTemplate(item.text)}
                      className="group flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/20 text-left transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-6.5 h-6.5 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 text-slate-400 group-hover:text-cyan-400 flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-300 group-hover:text-slate-100 transition-colors">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Input & Action Button */}
            <div className="p-4 bg-slate-950/90 border-t border-white/10 flex flex-col gap-2.5 relative z-10">
              <textarea
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type custom message to chat..."
                rows={2}
                className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-[11px] text-slate-200 resize-none transition-all placeholder:text-slate-500 font-sans"
              />
              <a
                href={getWhatsAppLink(typedText)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 hover:from-cyan-400 hover:to-indigo-400 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-cyan-500/15 cursor-pointer"
              >
                <Send className="w-3 h-3" /> Connect on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with elegant glass outline */}
      <button
        id="whatsapp-trigger"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowAttentionBadge(false);
        }}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-300 hover:scale-105 group border cursor-pointer ${
          isOpen
            ? 'bg-slate-900 border-white/20 text-white'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-emerald-400/20 text-slate-950 shadow-[0_8px_24px_rgba(16,185,129,0.3)]'
        }`}
        aria-label="Speak with me on WhatsApp"
      >
        {/* Pulse glow effects */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping -z-10" style={{ animationDuration: '2s' }}></span>
        )}
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
}
