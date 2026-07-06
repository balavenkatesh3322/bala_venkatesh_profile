import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Volume2, VolumeX, X, MessageSquare, Zap, ArrowRight, Gift } from 'lucide-react';

export default function AIBalaBot() {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [countdown, setCountdown] = useState(4); // Cinematic countdown to dismiss
  const [typedMessage, setTypedMessage] = useState('');
  
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);

  // Elegant, concise welcoming message
  const welcomeText = "Hi! I'm Bala's Assistant. Welcome to Bala's portfolio! Reach out to him on WhatsApp right now to collaborate on your next big AI project.";

  // Cinematic female voice synthesis
  const speakGreeting = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(welcomeText);
    
    // Explicitly search for a premium female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('female') || 
             name.includes('samantha') || 
             name.includes('zira') || 
             name.includes('hazel') || 
             name.includes('karen') || 
             name.includes('moira') || 
             name.includes('tessa') || 
             name.includes('google uk english female') ||
             name.includes('microsoft zira') ||
             name.includes('salli');
    }) || voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 1.05; // Natural speed
    utterance.pitch = 1.15; // Slightly elevated to ensure a clear, friendly feminine tone

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Trigger voices loaded handler to ensure voice profiles are available instantly
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const handleVoicesChanged = () => {
        // Soft preload
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      };
    }
  }, []);

  // Launch bot automatically only once per clean session/mount
  useEffect(() => {
    const launchTimer = setTimeout(() => {
      if (!hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        triggerBotSequence();
      }
    }, 1800);

    return () => {
      clearTimeout(launchTimer);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, []);

  const triggerBotSequence = () => {
    setIsActive(true);
    setCountdown(4);
    setTypedMessage('');
    
    // Clear any active typing intervals first
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);

    // Typewriter emulation
    let index = 0;
    typeIntervalRef.current = setInterval(() => {
      if (index < welcomeText.length) {
        setTypedMessage(() => welcomeText.slice(0, index + 1));
        index++;
      } else {
        if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
      }
    }, 18);

    // Speak voice greeting
    setTimeout(() => {
      speakGreeting();
    }, 300);

    // Auto-dismiss countdown
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          handlePowerDown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePowerDown = () => {
    setIsActive(false);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakWithBala = () => {
    handlePowerDown();
    // Open WhatsApp immediately with the correct target number 9003812808
    const msg = encodeURIComponent("Hi Bala! I just explored your portfolio and met your virtual assistant. I'd love to collaborate on custom Generative AI automation!");
    window.open(`https://wa.me/919003812808?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    if (nextMuteState) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    } else {
      setTimeout(() => speakGreeting(), 50);
    }
  };

  return (
    <>
      {/* Cinematic welcome / departure notification panel */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-x-0 bottom-6 md:bottom-12 md:left-12 z-50 flex justify-center md:justify-start pointer-events-none p-4">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -2 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                rotate: 0 
              }}
              exit={{ 
                opacity: 0, 
                y: 50, 
                scale: 0.9, 
                rotate: 2,
                transition: { duration: 0.35, ease: 'easeInOut' } 
              }}
              transition={{ 
                type: 'spring', 
                damping: 20, 
                stiffness: 140 
              }}
              className="w-full max-w-sm sm:max-w-md rounded-2xl glass-panel border-cyan-500/30 shadow-[0_25px_60px_rgba(6,182,212,0.35)] pointer-events-auto overflow-hidden p-5 relative"
            >
              {/* Futuristic scanline & screen noise matrix */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(6,182,212,0.05),transparent,rgba(244,63,94,0.03))] bg-[size:100%_4px,4px_100%] pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

              {/* Header status bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-4 font-mono text-[9px] tracking-wider text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                  <span className="text-pink-400 font-extrabold uppercase tracking-widest">BALA'S ASSISTANT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">DEPARTING IN: {countdown}s</span>
                  <button 
                    onClick={handlePowerDown}
                    className="hover:text-rose-400 transition-colors p-1 cursor-pointer"
                    aria-label="Dismiss assistant"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Character Details & Content */}
              <div className="flex gap-4 items-start">
                
                {/* Visual robotic cyber capsule avatar */}
                <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 glass-panel border border-pink-500/30 rounded-xl flex items-center justify-center overflow-hidden group">
                  {/* Digital laser scanner */}
                  <div className="absolute left-0 right-0 h-[2px] bg-pink-500 shadow-[0_0_8px_#f43f5e] top-1/2 animate-[bounce_2.2s_infinite_ease-in-out]" />
                  <div className="absolute inset-0 bg-pink-500/5 group-hover:bg-pink-500/10 transition-colors" />

                  <motion.div
                    animate={{ y: [0, -4, 0], rotate: [0, -3, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="z-10 text-pink-400 filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                  >
                    <Bot className="w-10 h-10 sm:w-12 sm:h-12" />
                  </motion.div>

                  {/* Audio visualization bar display */}
                  {isSpeaking && (
                    <span className="absolute bottom-1 flex gap-0.5 items-end justify-center">
                      {[...Array(4)].map((_, i) => (
                        <motion.span
                          key={i}
                          animate={{ height: [3, 12, 3] }}
                          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                          className="w-0.5 bg-pink-400"
                        />
                      ))}
                    </span>
                  )}
                </div>

                {/* Speech space */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-pink-400 flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3 h-3 text-pink-400" /> TRANSMISSION ACTIVE
                    </span>
                    {/* Audio toggler */}
                    <button
                      onClick={handleToggleMute}
                      className="p-1 rounded bg-white/5 hover:bg-white/10 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
                      title={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-pink-400" />}
                    </button>
                  </div>

                  {/* Chat speech balloon */}
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-white/5 shadow-inner">
                    <p className="text-xs text-slate-200 leading-relaxed font-sans select-none min-h-[60px]">
                      {typedMessage}
                      <span className="inline-block w-1 h-3 bg-pink-400 ml-0.5 animate-[pulse_0.8s_infinite]" />
                    </p>
                  </div>
                </div>

              </div>

              {/* Guided actionable triggers */}
              <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                <button
                  onClick={handleSpeakWithBala}
                  className="flex-1 py-3 px-3 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-[10px] font-mono tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(244,63,94,0.35)] cursor-pointer uppercase"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Collaborate Now</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={handlePowerDown}
                  className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/40 rounded-lg text-[10px] font-mono font-bold text-slate-400 hover:text-pink-300 transition-all duration-300 cursor-pointer uppercase"
                >
                  Dismiss
                </button>
              </div>

              {/* Progress timeline bar at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-900">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-pink-500 to-indigo-500"
                />
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
