import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';
import AllStarsLogo from './AllStarsLogo';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Stats', id: 'stats' },
    { label: 'Pitches', id: 'pitches' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors overflow-x-clip">
      <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => scrollToSection('top')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer focus:outline-none group text-left min-w-0"
            aria-label="All Stars Arena Home"
          >
            <AllStarsLogo size="md" />
            <span className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-sport-500 dark:group-hover:text-sport-400 transition-colors whitespace-nowrap">
              All Stars Arena
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => scrollToSection('top')}
              className="px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30 cursor-pointer"
            >
              HOME
            </button>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <ThemeToggle />

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollToSection('pitches')}
                className="px-4 py-2 rounded-2xl text-xs font-black uppercase text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Register
              </button>

              <Button 
                variant="danger"
                size="sm"
                rainbowBorder={true}
                onClick={() => scrollToSection('pitches')}
                className="px-5 py-2 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase shadow-md shadow-rose-500/30"
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Mobile hamburger menu & Theme Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 sm:p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer focus:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[100] lg:hidden">
              <motion.div
                key="drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
              />

              <motion.div
                key="drawer-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-2xl z-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => scrollToSection('top')}
                      className="flex items-center gap-2.5 text-left focus:outline-none group"
                    >
                      <AllStarsLogo size="sm" />
                      <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white group-hover:text-sport-500 transition-colors">
                        All Stars Arena
                      </span>
                    </button>

                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                      aria-label="Close mobile menu"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    <button
                      onClick={() => scrollToSection('top')}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-500/30"
                    >
                      Home
                    </button>

                    {navLinks.map((link) => (
                      <button
                        key={link.id}
                        onClick={() => scrollToSection(link.id)}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                      >
                        {link.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <button 
                    onClick={() => scrollToSection('pitches')}
                    className="w-full py-2.5 rounded-xl text-xs font-black uppercase text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                  >
                    Register
                  </button>

                  <Button 
                    variant="danger"
                    size="sm"
                    rainbowBorder={true}
                    onClick={() => scrollToSection('pitches')}
                    className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-black uppercase shadow-md shadow-rose-500/30"
                  >
                    Sign In
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
