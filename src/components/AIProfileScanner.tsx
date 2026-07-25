import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AIProfileScanner() {
  const [isHovered, setIsHovered] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const [showFaceBox, setShowFaceBox] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Update laser wipe animation speed and position periodically
  useEffect(() => {
    let animFrame: number;
    let timeoutId: ReturnType<typeof setTimeout>;
    let hasTriggeredThisScan = false;

    const triggerScan = () => {
      setIsScanning(true);
      setShowFaceBox(false);
      hasTriggeredThisScan = false;

      const startTime = performance.now();
      const duration = 2400; // Duration of laser slide in ms

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = progress * 100;
        setScanProgress(currentVal);

        // Turn on the predicted face box when laser reaches the bottom of the image (75%)
        // Keep it open for 2000ms (2 seconds) from the point of trigger
        if (currentVal >= 75 && !hasTriggeredThisScan) {
          hasTriggeredThisScan = true;
          setShowFaceBox(true);
          
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setShowFaceBox(false);
          }, 2000);
        }

        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          // Keep laser at 100% or reset
          setIsScanning(false);
        }
      };

      animFrame = requestAnimationFrame(animate);
    };

    // Run initial scan
    triggerScan();

    // Repeat the scan cycle every 7 seconds
    const intervalId = setInterval(() => {
      triggerScan();
    }, 7000);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  // Track cursor movement strictly inside his card bounds for 3D card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      id="ai-profile-scanner-root"
      className="relative w-full h-full select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Perspective Wrapper */}
      <div
        className="w-full h-full transition-all duration-500 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${mousePos.x * 18}deg) rotateX(${-mousePos.y * 18}deg) scale(${isHovered ? 1.02 : 1})`,
        }}
      >
        {/* Ambient Outer Halo and Glow orbits */}
        <div className="absolute inset-[-14px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-purple-500/20 rounded-[38px] blur-md -z-10 opacity-70"></div>
        
        {/* Orbital tech-circles circling behind */}
        <div className="absolute inset-[-40px] border border-white/[0.03] rounded-full -z-20 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-dashed border-cyan-500/10 animate-[spin_55s_linear_infinite]"></div>
        </div>
        <div className="absolute inset-[-80px] border border-white/[0.015] rounded-full -z-20 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full rounded-full border border-dashed border-indigo-500/5 animate-[spin_110s_linear_infinite_reverse]"></div>
        </div>

        {/* Outer Tech Corner Markers (HUD aesthetics) */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/50 rounded-br-2xl pointer-events-none"></div>

        {/* Main Glassmorphic Picture Container */}
        <div className="relative w-full h-full rounded-2.5xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-slate-900 flex items-center justify-center">
          
          {/* Base Profile Picture */}
          <img
            src="images/Bala_profile_pic.jpg"
            alt="Bala Venkatesh"
            className="w-full h-full object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x533/0c1129/ffffff?text=BV';
            }}
          />

          {/* Computer Vision Laser Scanning Horizontal Wiping Bar */}
          <div 
            className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#06b6d4] pointer-events-none z-10 flex items-center justify-center transition-opacity duration-300"
            style={{ 
              top: `${scanProgress}%`,
              opacity: isScanning ? 0.8 : 0,
            }}
          >
            {/* Prediction Name Badge Attached directly to the scanning line */}
            <AnimatePresence>
              {showFaceBox && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: -12 }}
                  exit={{ opacity: 0, scale: 0.8, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="bg-emerald-500 text-slate-950 font-black font-sans text-[10px] px-3 py-1 rounded shadow-[0_4px_12px_rgba(16,185,129,0.3)] tracking-wider uppercase flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
                  <span>Bala Venkatesh</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sci-Fi Blueprint Matrix Graticule (Active only on Hover) */}
          <div className={`absolute inset-0 bg-cyan-500/[0.02] bg-[linear-gradient(rgba(18,24,38,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.3)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

        </div>
      </div>
    </div>
  );
}
