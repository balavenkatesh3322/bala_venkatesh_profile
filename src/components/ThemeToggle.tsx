import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.add('light');
    } else {
      // Default strictly to dark theme, ignoring system prefers-color-scheme
      setTheme('dark');
      document.documentElement.classList.remove('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 text-slate-300 hover:text-cyan-300 cursor-pointer flex items-center justify-center group shadow-md"
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        {/* Animated Sun */}
        <motion.div
          animate={{
            y: theme === 'dark' ? 24 : 0,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Sun className="w-5 h-5 text-amber-500 fill-amber-500/10" />
        </motion.div>

        {/* Animated Moon */}
        <motion.div
          animate={{
            y: theme === 'light' ? -24 : 0,
            opacity: theme === 'light' ? 0 : 1,
            rotate: theme === 'light' ? -45 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Moon className="w-5 h-5 text-cyan-400 fill-cyan-400/10" />
        </motion.div>
      </div>
    </button>
  );
}
