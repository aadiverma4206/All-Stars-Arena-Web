import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

/**
 * BasketballRiverFlow - Ambient Soft Rainbow River Flow
 *
 * Flowing organic water waves beneath the 3D Basketball court with subtle,
 * iridescent pastel rainbow gradient accents matching the user's request:
 * - 3 continuous seamless GPU-accelerated wave layers (.animate-river-1, -2, -3)
 * - Soft rainbow spectrum: rose, warm amber, mint emerald, sky cyan, and gentle violet
 * - Soft bottom mist blend that transitions smoothly with dark & light mode
 * - 100% independent component: does not touch or affect the hero football river flow
 */
export const BasketballRiverFlow = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 w-full h-32 sm:h-40 lg:h-48 overflow-hidden pointer-events-none select-none z-20"
      aria-hidden="true"
    >
      {/* Soft Ambient Rainbow Glow behind waves */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-28 blur-3xl pointer-events-none opacity-40 dark:opacity-30 ${
          isDark 
            ? 'bg-gradient-to-r from-rose-500/20 via-amber-400/20 via-emerald-400/20 via-sky-400/20 to-purple-500/20' 
            : 'bg-gradient-to-r from-rose-400/25 via-amber-300/25 via-emerald-300/25 via-sky-300/25 to-purple-400/25'
        }`}
      />

      {/* Wave Layer 1: Deep Slow Rainbow River Current */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-1 opacity-75">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="bballRainbowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              {/* Subtle multi-chromatic pastel rainbow transitions */}
              <stop offset="0%" stopColor={isDark ? '#e11d48' : '#fda4af'} stopOpacity={isDark ? '0.35' : '0.40'} />
              <stop offset="22%" stopColor={isDark ? '#d97706' : '#fcd34d'} stopOpacity={isDark ? '0.30' : '0.35'} />
              <stop offset="48%" stopColor={isDark ? '#059669' : '#6ee7b7'} stopOpacity={isDark ? '0.35' : '0.40'} />
              <stop offset="74%" stopColor={isDark ? '#0284c7' : '#7dd3fc'} stopOpacity={isDark ? '0.35' : '0.35'} />
              <stop offset="100%" stopColor={isDark ? '#7c3aed' : '#c4b5fd'} stopOpacity={isDark ? '0.35' : '0.40'} />
            </linearGradient>
          </defs>
          <path
            d="M 0 60 C 117.0 34.0, 208.0 34.0, 325.0 60 C 442.0 80.0, 533.0 80.0, 650.0 60 C 749.0 42.0, 826.0 42.0, 925.0 60 C 1024.0 84.0, 1101.0 84.0, 1200.0 60 C 1317.0 34.0, 1408.0 34.0, 1525.0 60 C 1642.0 80.0, 1733.0 80.0, 1850.0 60 C 1949.0 42.0, 2026.0 42.0, 2125.0 60 C 2224.0 84.0, 2301.0 84.0, 2400.0 60 L 2400 160 L 0 160 Z"
            fill="url(#bballRainbowGrad1)"
          />
        </svg>
      </div>

      {/* Wave Layer 2: Mid-Level Flowing Rainbow Water Waves */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-2 opacity-80">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="bballRainbowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#9333ea' : '#d8b4fe'} stopOpacity={isDark ? '0.25' : '0.35'} />
              <stop offset="25%" stopColor={isDark ? '#0284c7' : '#38bdf8'} stopOpacity={isDark ? '0.22' : '0.30'} />
              <stop offset="50%" stopColor={isDark ? '#10b981' : '#34d399'} stopOpacity={isDark ? '0.25' : '0.35'} />
              <stop offset="75%" stopColor={isDark ? '#f59e0b' : '#fde047'} stopOpacity={isDark ? '0.25' : '0.35'} />
              <stop offset="100%" stopColor={isDark ? '#f43f5e' : '#fb7185'} stopOpacity={isDark ? '0.28' : '0.35'} />
            </linearGradient>
          </defs>
          <path
            d="M 0 82 C 75.6 62.0, 134.4 62.0, 210.0 82 C 285.6 98.0, 344.4 98.0, 420.0 82 C 492.0 68.0, 548.0 68.0, 620.0 82 C 692.0 104.0, 748.0 104.0, 820.0 82 C 888.4 60.0, 941.6 60.0, 1010.0 82 C 1078.4 97.0, 1131.6 97.0, 1200.0 82 C 1275.6 62.0, 1334.4 62.0, 1410.0 82 C 1485.6 98.0, 1544.4 98.0, 1620.0 82 C 1692.0 68.0, 1748.0 68.0, 1820.0 82 C 1892.0 104.0, 1948.0 104.0, 2020.0 82 C 2088.4 60.0, 2141.6 60.0, 2210.0 82 C 2278.4 97.0, 2331.6 97.0, 2400.0 82 L 2400 160 L 0 160 Z"
            fill="url(#bballRainbowGrad2)"
          />
        </svg>
      </div>

      {/* Wave Layer 3: Foreground Shimmering Ripple & Iridescent Crest */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-3 opacity-90">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="bballRainbowGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#06b6d4' : '#38bdf8'} stopOpacity={isDark ? '0.30' : '0.35'} />
              <stop offset="40%" stopColor={isDark ? '#10b981' : '#6ee7b7'} stopOpacity={isDark ? '0.20' : '0.22'} />
              <stop offset="100%" stopColor={isDark ? '#011410' : '#ffffff'} stopOpacity={isDark ? '0.65' : '0.50'} />
            </linearGradient>
            {/* Continuous seamless rainbow iridescent crest stroke */}
            <linearGradient id="bballRainbowCrest" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb7185" stopOpacity="0.85" />
              <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.85" />
              <stop offset="40%" stopColor="#34d399" stopOpacity="0.90" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.90" />
              <stop offset="80%" stopColor="#a855f7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#fb7185" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M 0 100 C 57.6 85.0, 102.4 85.0, 160.0 100 C 217.6 112.0, 262.4 112.0, 320.0 100 C 370.4 89.0, 409.6 89.0, 460.0 100 C 510.4 116.0, 549.6 116.0, 600.0 100 C 661.2 83.0, 708.8 83.0, 770.0 100 C 831.2 110.0, 878.8 110.0, 940.0 100 C 986.8 88.0, 1023.2 88.0, 1070.0 100 C 1116.8 114.0, 1153.2 114.0, 1200.0 100 C 1257.6 85.0, 1302.4 85.0, 1360.0 100 C 1417.6 112.0, 1462.4 112.0, 1520.0 100 C 1570.4 89.0, 1609.6 89.0, 1660.0 100 C 1710.4 116.0, 1749.6 116.0, 1800.0 100 C 1861.2 83.0, 1908.8 83.0, 1970.0 100 C 2031.2 110.0, 2078.8 110.0, 2140.0 100 C 2186.8 88.0, 2223.2 88.0, 2270.0 100 C 2316.8 114.0, 2353.2 114.0, 2400.0 100 L 2400 160 L 0 160 Z"
            fill="url(#bballRainbowGrad3)"
            stroke="url(#bballRainbowCrest)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Bottom Mist & Soft Fade Blend */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-6 transition-colors duration-300 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-t from-[#011410]/70 via-[#011410]/30 to-transparent' 
            : 'bg-gradient-to-t from-white/60 via-white/20 to-transparent'
        }`} 
      />
    </div>
  );
};

export default BasketballRiverFlow;
