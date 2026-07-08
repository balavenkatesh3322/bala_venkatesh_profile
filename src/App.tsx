/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
// import Projects from './components/Projects';
import AIWorkflowAcademy from './components/AIWorkflowAcademy';
import BusinessImprover from './components/BusinessImprover';
// import AIDemoSandbox from './components/AIDemoSandbox';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Testimonials from './components/Testimonials';
import Book from './components/Book';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollCelebration from './components/ScrollCelebration';
import AIBalaBot from './components/AIBalaBot';
import BalaLessons from './components/BalaLessons';
import Analytics from './components/Analytics';

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices or smaller screens to prevent lags
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 1024px)').matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const handleMouseEnterInteractable = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '48px';
        ringRef.current.style.height = '48px';
        ringRef.current.style.marginTop = '-24px';
        ringRef.current.style.marginLeft = '-24px';
        ringRef.current.style.borderColor = '#22d3ee'; // cyan-400
        ringRef.current.style.backgroundColor = 'rgba(34, 211, 238, 0.05)';
      }
    };

    const handleMouseLeaveInteractable = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '32px';
        ringRef.current.style.height = '32px';
        ringRef.current.style.marginTop = '-16px';
        ringRef.current.style.marginLeft = '-16px';
        ringRef.current.style.borderColor = 'rgba(34, 211, 238, 0.4)';
        ringRef.current.style.backgroundColor = 'transparent';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Setup interactive events for smooth scale on hoverable items
    const setupListeners = () => {
      const interactables = document.querySelectorAll('a, button, select, input, textarea, [role="button"]');
      interactables.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractable);
        el.addEventListener('mouseleave', handleMouseLeaveInteractable);
      });
    };

    // Delay a bit to wait for DOM to fully render
    const timer = setTimeout(setupListeners, 1000);

    const animateRing = () => {
      // Smooth lerp (linear interpolation)
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      requestAnimationFrame(animateRing);
    };

    const animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      const interactables = document.querySelectorAll('a, button, select, input, textarea, [role="button"]');
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractable);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractable);
      });
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Small focal dot */}
      <div
        ref={cursorRef}
        className="hidden lg:block fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -mt-1 -ml-1 mix-blend-difference"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      {/* Outer tracking ring */}
      <div
        ref={ringRef}
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 border border-cyan-400/40 rounded-full pointer-events-none z-[9998] -mt-4 -ml-4 mix-blend-difference transition-all duration-300 ease-out"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
    </>
  );
}

export default function App() {
  const [currentPath, setCurrentPath] = React.useState<string>(window.location.hash || '#home');

  useEffect(() => {
    document.title = "Bala Venkatesh | Lead AI Engineer & Data Scientist";

    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isLessonsView = currentPath.startsWith('#lessons');

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden antialiased">
      {/* Floating Glassmorphic Ambient Background Orbs */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[3%] left-[10%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full ambient-glow-cyan animate-pulse-glow" />
        <div className="absolute top-[18%] right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full ambient-glow-purple animate-pulse-glow-delayed" />
        <div className="absolute top-[38%] left-[2%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full ambient-glow-cyan animate-pulse-glow" />
        <div className="absolute top-[58%] right-[8%] w-[35vw] h-[35vw] max-w-[480px] max-h-[480px] rounded-full ambient-glow-pink animate-pulse-glow-delayed" />
        <div className="absolute top-[78%] left-[8%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full ambient-glow-purple animate-pulse-glow animate-pulse-glow-delayed" />
        <div className="absolute top-[92%] right-[12%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full ambient-glow-cyan animate-pulse-glow-delayed animate-pulse-glow" />
      </div>

      {/* Custom follower cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Header />

      {/* Main Sections */}
      <main>
        {isLessonsView ? (
          <BalaLessons />
        ) : (
          <>
            <Hero />
            <Marquee />
            <About />
            <Services />
            <AIWorkflowAcademy />
            <Experience />
            <BusinessImprover />
            {/* <AIDemoSandbox /> */}
            <OpenSource />
            <Skills />
            <Education />
            <Recognition />
            <Testimonials />
            <Book />
            <Philosophy />
            <Contact />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Chat Widget for CEOs & Founders */}
      <WhatsAppWidget />

      {/* Interactive Dopamine celebration triggered at page-bottom */}
      <ScrollCelebration />

      {/* AI Bot Welcome Assistant representing Bala */}
      <AIBalaBot />

      {/* Dynamic Free Web Analytics Tracker (Tracks pages, hashes & session timing) */}
      <Analytics />
    </div>
  );
}
