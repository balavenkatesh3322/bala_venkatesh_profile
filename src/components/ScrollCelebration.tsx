import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles, X, MessageSquare, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScrollCelebration() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollListenerRef = useRef<boolean>(false);

  // Trigger high-fidelity multi-stage firework / cracker effects
  const triggerCrackerCelebration = () => {
    // Stage 1: Main Center Burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#6366f1', '#10b981', '#fbbf24', '#ec4899'],
      disableForReducedMotion: true
    });

    // Stage 2: Left Side Rocket
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 60,
        origin: { x: 0.05, y: 0.75 },
        colors: ['#06b6d4', '#6366f1', '#ffffff']
      });
    }, 200);

    // Stage 3: Right Side Rocket
    setTimeout(() => {
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 60,
        origin: { x: 0.95, y: 0.75 },
        colors: ['#06b6d4', '#6366f1', '#ffffff']
      });
    }, 400);

    // Stage 4: High Altitude Gold Sparkler Rain
    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 140,
        origin: { y: 0.35 },
        colors: ['#fbbf24', '#f59e0b', '#34d399', '#f8fafc'],
        gravity: 0.8,
        ticks: 220
      });
    }, 600);
  };

  useEffect(() => {
    if (scrollListenerRef.current) return;

    // Use IntersectionObserver to trigger precisely when entering the Philosophy section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !scrollListenerRef.current) {
            scrollListenerRef.current = true;
            setIsVisible(true);
            setIsMinimized(false);
            triggerCrackerCelebration();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the Philosophy section enters the viewport
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it occupies full view
      }
    );

    const target = document.getElementById('philosophy');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);

  const handleSpeakWithBala = () => {
    setIsVisible(false);
    // Directly redirect to WhatsApp with custom welcome message
    const message = "Hi Bala! I just explored your amazing portfolio and read your core philosophy section. I would love to collaborate on custom Generative AI projects with you!";
    const url = `https://wa.me/919003812808?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsVisible(false);
    setIsMinimized(true);
  };

  const handleReopen = () => {
    setIsMinimized(false);
    setIsVisible(true);
    triggerCrackerCelebration();
  };

  return (
    <>
      {/* Minimized floating button in corner when closed/hidden */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            key="minimized-speak"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleReopen}
            className="fixed bottom-6 left-6 md:left-8 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_8px_32px_rgba(6,182,212,0.4)] border border-cyan-400/30 flex items-center gap-2 group cursor-pointer"
            title="Speak with Bala!"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-xs font-bold font-mono tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap">
              SPEAK WITH BALA
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Celebration Popup */}
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-6 md:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] text-center text-slate-200"
            >
              {/* Top ambient glowing accent lights */}
              <div className="absolute top-0 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,1)]" />
              <div className="absolute top-0 right-1/4 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(99,102,241,1)]" />
              <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/[0.07] to-indigo-500/[0.07] pointer-events-none rounded-3xl" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer"
                aria-label="Dismiss Celebration"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon Badge */}
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-400/30 mb-6 group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-2xl border border-dashed border-cyan-400/40"
                />
                <Trophy className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400 animate-pulse" />
              </div>

              {/* Celebration Title */}
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-cyan-400 uppercase block mb-1">
                You Made It to the End! 🎉
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                Thanks for Visiting! 🙌
              </h3>
              
              <p className="text-sm text-slate-300 max-w-sm mx-auto mb-8 leading-relaxed">
                You've successfully analyzed the entire layout! Since you appreciate quality and didn't bounce, let's bypass the boring forms. Speak directly with <span className="text-cyan-300 font-bold">Bala Venkatesh</span> now to bring your Custom Generative AI projects to life!
              </p>

              {/* Fun / Energetic CTA Button */}
              <button
                onClick={handleSpeakWithBala}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(6,182,212,0.3)] hover:shadow-[0_12px_28px_rgba(6,182,212,0.45)] hover:-translate-y-0.5 cursor-pointer uppercase tracking-widest"
              >
                <span>Let's Speak Now</span>
                <ArrowRight className="w-4 h-4 animate-bounce-horizontal" />
              </button>

              <p className="text-[10px] text-slate-500 block mt-4 font-mono select-none">
                Warning: Might lead to high ROI system automation.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
