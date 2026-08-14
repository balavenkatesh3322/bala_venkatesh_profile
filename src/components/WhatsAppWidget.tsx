import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [showAttentionBadge, setShowAttentionBadge] = useState(false);
  const autoDismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Delay the WhatsApp invitation popup and soften persistence
  useEffect(() => {
    // Check if user already dismissed or interacted in this session
    const isDismissed = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('wa_badge_dismissed') === 'true';
    if (isDismissed) return;

    let hasTriggered = false;
    let scrollPassed = false;
    let timerPassed = false;

    // Minimum delay of 7.5 seconds before badge can ever appear
    const minDelayTimer = setTimeout(() => {
      timerPassed = true;
      if (scrollPassed && !hasTriggered) {
        triggerBadge();
      }
    }, 7500);

    const triggerBadge = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setShowAttentionBadge(true);

      // Soft auto-dismiss after 9 seconds if reader does not interact
      autoDismissTimerRef.current = setTimeout(() => {
        setShowAttentionBadge(false);
      }, 9000);
    };

    const handleScroll = () => {
      if (hasTriggered) return;

      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = window.scrollY;
      const scrollPercentage = currentScroll / totalScrollable;

      // Soft trigger only after substantial engagement (at least 45% depth)
      if (scrollPercentage >= 0.45) {
        scrollPassed = true;
        if (timerPassed) {
          triggerBadge();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(minDelayTimer);
      if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDismissBadge = () => {
    setShowAttentionBadge(false);
    if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('wa_badge_dismissed', 'true');
    }
  };

  const handleOpenWidget = () => {
    setIsOpen(true);
    setShowAttentionBadge(false);
    if (autoDismissTimerRef.current) clearTimeout(autoDismissTimerRef.current);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('wa_badge_dismissed', 'true');
    }
  };

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
        {/* Soft, Polite Invitation Badge */}
        {showAttentionBadge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96, transition: { duration: 0.2 } }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-80 p-3.5 sm:p-4 rounded-2xl glass-panel text-left shadow-xl border border-emerald-500/20 backdrop-blur-xl"
          >
            {/* Soft ambient tint */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none rounded-2xl" />
            
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 border border-emerald-400/20">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Direct Consultation
                </div>
                <p className="text-xs text-slate-200 font-semibold mt-1 leading-snug">
                  Have an AI idea or architecture question? Let's connect on WhatsApp.
                </p>
                <button
                  onClick={handleOpenWidget}
                  className="mt-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  Open WhatsApp Chat
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>
              <button
                onClick={handleDismissBadge}
                className="text-slate-500 hover:text-slate-300 p-1 transition-colors cursor-pointer rounded-md hover:bg-white/5"
                aria-label="Dismiss invitation"
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
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 w-[calc(100vw-32px)] sm:w-[360px] rounded-2.5xl glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden text-left border border-white/10"
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
                    <span>AI Solutions & Consulting</span>
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
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-200 font-semibold tracking-tight leading-relaxed">
                👋 Send a quick note to discuss multi-agent pipelines, RAG systems, or enterprise advisory.
              </div>

              {/* Quick Template Buttons */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  Choose a topic:
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
                className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-3 h-3" /> Connect on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with soft, elegant styling */}
      <button
        id="whatsapp-trigger"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            handleOpenWidget();
          }
        }}
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl relative transition-all duration-300 hover:scale-105 group border cursor-pointer ${
          isOpen
            ? 'bg-slate-900 border-white/20 text-white'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-emerald-400/30 text-slate-950 shadow-[0_6px_20px_rgba(16,185,129,0.25)]'
        }`}
        aria-label="Speak with me on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:rotate-6 transition-transform" />
      </button>
    </div>
  );
}
