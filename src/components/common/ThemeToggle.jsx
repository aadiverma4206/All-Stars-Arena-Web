import React, { useId } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export const ThemeToggle = ({ className = "" }) => {
  const { theme, setTheme } = useThemeStore();
  const uniqueId = useId();

  const isDark = theme === 'dark';

  return (
    <div
      role="group"
      aria-label="Theme mode switcher (Light / Dark)"
      className={`relative inline-flex items-center p-1 rounded-full bg-slate-200/90 dark:bg-[#031c17] border border-slate-300/80 dark:border-emerald-900/60 shadow-inner backdrop-blur-xs select-none transition-colors duration-200 ${className}`}
    >
      {/* Light Mode Button (Sun Icon Only) */}
      <motion.button
        type="button"
        onClick={() => setTheme('light')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        aria-pressed={!isDark}
        aria-label="Switch to Light mode"
        title="Switch to Light mode"
        className="relative z-10 w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 transition-colors"
      >
        {/* Animated Active Pill Indicator for Light Mode */}
        {!isDark && (
          <motion.div
            layoutId={`themeIndicatorPill-${uniqueId}`}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute inset-0 rounded-full bg-white border-2 border-amber-400 ring-2 ring-amber-300/40 shadow-xs shadow-amber-500/20"
          />
        )}

        <motion.div
          animate={
            !isDark
              ? { rotate: [0, 180, 360], scale: [0.85, 1.25, 1.1] }
              : { rotate: 0, scale: 0.9 }
          }
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <Sun
            className={`w-4.5 h-4.5 transition-colors duration-200 ${
              !isDark
                ? 'text-amber-500 stroke-[2.4] drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 stroke-[2]'
            }`}
          />
        </motion.div>
      </motion.button>

      {/* Dark Mode Button (Moon Icon Only) */}
      <motion.button
        type="button"
        onClick={() => setTheme('dark')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        aria-pressed={isDark}
        aria-label="Switch to Dark mode"
        title="Switch to Dark mode"
        className="relative z-10 w-8 h-8 sm:w-8.5 sm:h-8.5 flex items-center justify-center rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors"
      >
        {/* Animated Active Pill Indicator for Dark Mode */}
        {isDark && (
          <motion.div
            layoutId={`themeIndicatorPill-${uniqueId}`}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="absolute inset-0 rounded-full bg-[#011410] border-2 border-emerald-400 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/30"
          />
        )}

        <motion.div
          animate={
            isDark
              ? { rotate: [-30, 15, -5, 0], scale: [0.85, 1.25, 1.1] }
              : { rotate: 0, scale: 0.9 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 flex items-center justify-center"
        >
          <Moon
            className={`w-4.5 h-4.5 transition-colors duration-200 ${
              isDark
                ? 'text-emerald-400 stroke-[2.4] drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 stroke-[2]'
            }`}
          />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
