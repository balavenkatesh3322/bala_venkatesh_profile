import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.location.hash === '#lessons') {
        setActiveSection('lessons');
        return;
      }

      // Smooth navigation link tracking based on current viewport
      const sections = ['about', 'services', 'workflow-academy', 'experience', 'skills', 'education'];
      let currentActive = 'about';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Detect when section is currently occupying a significant portion of the screen
          if (rect.top <= 240) {
            currentActive = sectionId;
          }
        }
      }
      setActiveSection(currentActive);
    };

    const handleHashChange = () => {
      if (window.location.hash === '#lessons') {
        setActiveSection('lessons');
      } else {
        handleScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'AI Playbook', href: '#workflow-academy' },
    { label: 'Build with Bala', href: '#lessons', isNew: true },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
  ];

  return (
    <>
      <motion.nav
        id="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed z-50 transition-all duration-500 ${
          isScrolled
            ? 'top-3 left-3 right-3 h-16 px-5 md:px-8 glass-panel rounded-2xl max-w-7xl mx-auto shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'
            : 'top-0 left-0 right-0 h-20 px-6 md:px-12 bg-transparent border-b border-transparent'
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-bold font-mono text-white text-sm shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300">
            BV
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-sans">
            Bala Venkatesh
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = item.href === `#${activeSection}`;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-sm font-semibold py-1.5 transition-colors duration-300 flex items-center gap-1.5 ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-slate-300 hover:text-cyan-400'
                }`}
              >
                <span>{item.label}</span>
                {item.isNew && (
                  <span className="px-1.5 py-0.5 rounded-md bg-cyan-400/20 text-cyan-400 text-[8px] font-mono font-black animate-pulse tracking-wide border border-cyan-400/30">
                    NEW
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-cyan-400 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group text-white shadow-inner"
          >
            Speak with Me
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button and ThemeToggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-center p-8 lg:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-300 hover:text-white bg-white/5 border border-white/10 rounded-xl"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center gap-8 text-center">
              {menuItems.map((item, index) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-semibold text-slate-200 hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  {item.label}
                  {item.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-400 text-xs font-mono font-black animate-pulse tracking-wide border border-cyan-400/30">
                      NEW
                    </span>
                  )}
                </motion.a>
              ))}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: menuItems.length * 0.05 }}
                className="mt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 hover:from-cyan-400 hover:to-indigo-400 rounded-xl font-bold transition-all duration-300 inline-flex items-center gap-1.5"
                >
                  Speak with Me <ArrowUpRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
