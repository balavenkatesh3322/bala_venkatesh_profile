import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  ChevronDown, 
  Boxes, 
  Cpu, 
  Globe 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (window.location.hash === '#lessons') {
        setActiveSection('lessons');
        return;
      }

      // Smooth navigation link tracking based on current viewport
      const sections = ['about', 'services', 'experience'];
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

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    document.addEventListener('mousedown', handleClickOutside);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Build with Bala', href: '#lessons', isNew: true },
    { label: 'Experience', href: '#experience' },
  ];

  const appStoreLinks = [
    {
      title: 'Bala App Store Hub',
      desc: 'All interactive AI apps, agents & tools live showcase',
      href: 'https://balavenkatesh3322.github.io/bala-ai-studio/',
      icon: Sparkles,
      badge: 'MAIN HUB',
      badgeColor: 'from-cyan-400 to-indigo-500 text-slate-950',
      iconColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30'
    },
    {
      title: 'Neural Decode 3D',
      desc: 'Interactive 3D AI neural architectures visualizer',
      href: 'https://neuraldecode.vercel.app/',
      icon: Boxes,
      badge: '3D AI',
      badgeColor: 'from-purple-400 to-indigo-400 text-slate-950',
      iconColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30'
    },
    {
      title: 'Open LLM Registry',
      desc: 'Catalog & benchmark directory for open LLMs',
      href: 'https://balavenkatesh3322.github.io/open-llm-registry/',
      icon: Cpu,
      badge: 'REGISTRY',
      badgeColor: 'from-emerald-400 to-teal-400 text-slate-950',
      iconColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
    },
    {
      title: 'Awesome Portfolios',
      desc: '2,000+ curated developer portfolio designs',
      href: 'https://balavenkatesh3322.github.io/awesome-developer-porfolio/',
      icon: Globe,
      badge: '2000+',
      badgeColor: 'from-blue-400 to-cyan-400 text-slate-950',
      iconColor: 'text-blue-400 bg-blue-400/10 border-blue-400/30'
    }
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

        {/* Desktop Links & Bala App Store Dropdown */}
        <div className="hidden lg:flex items-center gap-5">
          {menuItems.map((item) => {
            const isActive = !item.isExternal && item.href === `#${activeSection}`;
            return (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noreferrer' : undefined}
                  className={`relative text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
                    isActive
                      ? 'py-1.5 text-cyan-400 font-bold'
                      : 'py-1.5 text-slate-300 hover:text-cyan-400'
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

                {/* Render Bala App Store Dropdown Trigger right after Services */}
                {item.href === '#services' && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                        isDropdownOpen
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/60 shadow-[0_0_18px_rgba(34,211,238,0.35)]'
                          : 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-cyan-400/20 text-cyan-300 border-cyan-400/50 hover:border-cyan-300 hover:scale-105 shadow-[0_0_15px_rgba(34,211,238,0.35)]'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
                      <span>Bala App Store</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-black tracking-wide bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950">
                        APPS
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-cyan-300' : 'text-cyan-400'}`} />
                    </button>

                    {/* Dropdown Popover */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full right-0 mt-3 w-[320px] sm:w-[380px] p-4 sm:p-5 rounded-3xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] z-50 overflow-hidden bg-slate-950/95 backdrop-blur-2xl"
                        >
                          {/* Subtle background glow */}
                          <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="flex flex-col gap-3 relative z-10 text-left">
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                                  Bala App Store Apps
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">
                                Direct Apps
                              </span>
                            </div>

                            <div className="flex flex-col gap-2">
                              {appStoreLinks.map((item) => {
                                const IconComp = item.icon;
                                return (
                                  <a
                                    key={item.title}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="group p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-400/30 transition-all duration-200 flex items-start gap-3"
                                  >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${item.iconColor}`}>
                                      <IconComp className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                          {item.title}
                                        </span>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black tracking-wider bg-gradient-to-r ${item.badgeColor}`}>
                                          {item.badge}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-400 leading-tight line-clamp-1">
                                        {item.desc}
                                      </p>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white/5 hover:bg-cyan-500 hover:text-slate-950 border border-white/10 hover:border-cyan-400 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 group text-white shadow-inner"
          >
            Speak with Me
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile menu button & Theme Toggle */}
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

            <div className="flex flex-col items-center gap-5 text-center max-h-[85vh] overflow-y-auto w-full px-4 py-6">
              {menuItems.map((item, index) => (
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg sm:text-xl font-semibold transition-all flex items-center gap-2 text-slate-200 hover:text-cyan-400"
                >
                  {item.label}
                  {item.isNew && (
                    <span className="px-2 py-0.5 rounded-md bg-cyan-400/20 text-cyan-400 text-xs font-mono font-black animate-pulse tracking-wide border border-cyan-400/30">
                      NEW
                    </span>
                  )}
                </motion.a>
              ))}

              {/* Mobile Bala App Store Grid */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="w-full max-w-sm mt-2 pt-4 border-t border-white/10 flex flex-col gap-2 text-left"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 px-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Bala App Store Apps
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {appStoreLinks.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-colors"
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${item.iconColor}`}>
                          <IconComp className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-xs font-bold text-white truncate">{item.title}</span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-cyan-400 shrink-0" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-2"
              >
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-950 hover:from-cyan-400 hover:to-indigo-400 rounded-xl font-bold transition-all duration-300 inline-flex items-center gap-1.5 text-sm"
                >
                  Speak with Me <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
