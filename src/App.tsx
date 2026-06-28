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
import Projects from './components/Projects';
import AIDemoSandbox from './components/AIDemoSandbox';
import OpenSource from './components/OpenSource';
import Skills from './components/Skills';
import Education from './components/Education';
import Recognition from './components/Recognition';
import Testimonials from './components/Testimonials';
import Book from './components/Book';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

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
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden antialiased">
      {/* Custom follower cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Header />

      {/* Main Sections */}
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Experience />
        <Projects />
        <AIDemoSandbox />
        <OpenSource />
        <Skills />
        <Education />
        <Recognition />
        <Testimonials />
        <Book />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Chat Widget for CEOs & Founders */}
      <WhatsAppWidget />
    </div>
  );
}
