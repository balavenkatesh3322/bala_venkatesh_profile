import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Github, ChevronRight, Check, PhoneCall, ArrowRight } from 'lucide-react';

interface SlideToOpenRepoProps {
  url: string;
  label?: string;
  className?: string;
}

export default function SlideToOpenRepo({
  url,
  label = 'slide to open repo',
  className = '',
}: SlideToOpenRepoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const x = useMotionValue(0);
  const handleWidth = 40; // 40px width handle

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Subtract handle width and 8px padding
        setTrackWidth(Math.max(0, containerRef.current.clientWidth - handleWidth - 8));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Text opacity fades as handle slides right
  const textOpacity = useTransform(
    x,
    [0, Math.max(1, trackWidth * 0.65)],
    [1, 0.05]
  );

  // Background trail width behind sliding button
  const trailWidth = useTransform(x, (val) => `${val + handleWidth}px`);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (trackWidth > 0 && currentX >= trackWidth * 0.72) {
      setIsUnlocked(true);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
      setTimeout(() => {
        setIsUnlocked(false);
        x.set(0);
      }, 2000);
    } else {
      x.set(0);
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className={`relative w-full h-11 sm:h-12 bg-slate-900/90 rounded-full border border-cyan-500/25 hover:border-cyan-400/50 p-1 flex items-center overflow-hidden select-none shadow-inner transition-colors ${className}`}
    >
      {/* Dynamic liquid fill trail behind the handle */}
      <motion.div
        className="absolute left-1 top-1 bottom-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/30 to-emerald-500/40 rounded-full pointer-events-none"
        style={{ width: trailWidth }}
      />

      {/* Shimmering iPhone Slide Label */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-300 uppercase px-12"
      >
        <span className="bg-gradient-to-r from-slate-400 via-white to-cyan-300 bg-clip-text text-transparent animate-pulse flex items-center gap-1.5 truncate">
          {isUnlocked ? 'Opening Repository...' : label}
          {!isUnlocked && (
            <span className="flex items-center text-cyan-400">
              <ChevronRight className="w-3.5 h-3.5 -mr-1 animate-pulse" />
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
      </motion.div>

      {/* Draggable Call / Attend Handle Button */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: trackWidth }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-all duration-200 shrink-0 ${
          isUnlocked
            ? 'bg-emerald-400 text-slate-950 shadow-emerald-400/50 scale-105'
            : 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 text-slate-950 shadow-cyan-500/40 hover:scale-105'
        }`}
      >
        {isUnlocked ? (
          <Check className="w-5 h-5 text-slate-950 stroke-[3]" />
        ) : (
          <div className="flex items-center justify-center">
            <PhoneCall className="w-4 h-4 text-slate-950 rotate-90 stroke-[2.5]" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
