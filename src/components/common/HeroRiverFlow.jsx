import React from 'react';
import { useThemeStore } from '../../store/useThemeStore';

export const HeroRiverFlow = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32 lg:h-36 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Wave Layer 1: Deep Slow River Current */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-1 opacity-70">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="riverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#052e24' : '#a7f3d0'} stopOpacity={isDark ? '0.6' : '0.45'} />
              <stop offset="50%" stopColor={isDark ? '#0a4234' : '#6ee7b7'} stopOpacity={isDark ? '0.4' : '0.3'} />
              <stop offset="100%" stopColor={isDark ? '#011410' : '#38bdf8'} stopOpacity={isDark ? '0.7' : '0.2'} />
            </linearGradient>
          </defs>
          <path
            d="M 0 60 C 117.0 34.0, 208.0 34.0, 325.0 60 C 442.0 80.0, 533.0 80.0, 650.0 60 C 749.0 42.0, 826.0 42.0, 925.0 60 C 1024.0 84.0, 1101.0 84.0, 1200.0 60 C 1317.0 34.0, 1408.0 34.0, 1525.0 60 C 1642.0 80.0, 1733.0 80.0, 1850.0 60 C 1949.0 42.0, 2026.0 42.0, 2125.0 60 C 2224.0 84.0, 2301.0 84.0, 2400.0 60 L 2400 160 L 0 160 Z"
            fill="url(#riverGrad1)"
          />
        </svg>
      </div>

      {/* Wave Layer 2: Mid-Level Flowing Water Waves */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-2 opacity-80">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="riverGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#10b981' : '#34d399'} stopOpacity={isDark ? '0.25' : '0.35'} />
              <stop offset="50%" stopColor={isDark ? '#059669' : '#38bdf8'} stopOpacity={isDark ? '0.2' : '0.25'} />
              <stop offset="100%" stopColor={isDark ? '#047857' : '#10b981'} stopOpacity={isDark ? '0.3' : '0.35'} />
            </linearGradient>
          </defs>
          <path
            d="M 0 82 C 75.6 62.0, 134.4 62.0, 210.0 82 C 285.6 98.0, 344.4 98.0, 420.0 82 C 492.0 68.0, 548.0 68.0, 620.0 82 C 692.0 104.0, 748.0 104.0, 820.0 82 C 888.4 60.0, 941.6 60.0, 1010.0 82 C 1078.4 97.0, 1131.6 97.0, 1200.0 82 C 1275.6 62.0, 1334.4 62.0, 1410.0 82 C 1485.6 98.0, 1544.4 98.0, 1620.0 82 C 1692.0 68.0, 1748.0 68.0, 1820.0 82 C 1892.0 104.0, 1948.0 104.0, 2020.0 82 C 2088.4 60.0, 2141.6 60.0, 2210.0 82 C 2278.4 97.0, 2331.6 97.0, 2400.0 82 L 2400 160 L 0 160 Z"
            fill="url(#riverGrad2)"
          />
        </svg>
      </div>

      {/* Wave Layer 3: Foreground Shimmering Ripple & Water Crest */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-3 opacity-90">
        <svg
          viewBox="0 0 2400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <defs>
            <linearGradient id="riverGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#22c55e' : '#10b981'} stopOpacity={isDark ? '0.35' : '0.4'} />
              <stop offset="40%" stopColor={isDark ? '#10b981' : '#6ee7b7'} stopOpacity={isDark ? '0.2' : '0.25'} />
              <stop offset="100%" stopColor={isDark ? '#011410' : '#ffffff'} stopOpacity={isDark ? '0.6' : '0.5'} />
            </linearGradient>
            <linearGradient id="crestStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#4ade80' : '#059669'} stopOpacity="0.85" />
              <stop offset="50%" stopColor={isDark ? '#22c55e' : '#38bdf8'} stopOpacity="0.95" />
              <stop offset="100%" stopColor={isDark ? '#4ade80' : '#10b981'} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path
            d="M 0 100 C 57.6 85.0, 102.4 85.0, 160.0 100 C 217.6 112.0, 262.4 112.0, 320.0 100 C 370.4 89.0, 409.6 89.0, 460.0 100 C 510.4 116.0, 549.6 116.0, 600.0 100 C 661.2 83.0, 708.8 83.0, 770.0 100 C 831.2 110.0, 878.8 110.0, 940.0 100 C 986.8 88.0, 1023.2 88.0, 1070.0 100 C 1116.8 114.0, 1153.2 114.0, 1200.0 100 C 1257.6 85.0, 1302.4 85.0, 1360.0 100 C 1417.6 112.0, 1462.4 112.0, 1520.0 100 C 1570.4 89.0, 1609.6 89.0, 1660.0 100 C 1710.4 116.0, 1749.6 116.0, 1800.0 100 C 1861.2 83.0, 1908.8 83.0, 1970.0 100 C 2031.2 110.0, 2078.8 110.0, 2140.0 100 C 2186.8 88.0, 2223.2 88.0, 2270.0 100 C 2316.8 114.0, 2353.2 114.0, 2400.0 100 L 2400 160 L 0 160 Z"
            fill="url(#riverGrad3)"
            stroke="url(#crestStroke)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Bottom Mist & Soft Fade Blend */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-10 transition-colors duration-300 pointer-events-none ${
          isDark 
            ? 'bg-gradient-to-t from-[#011410] via-[#011410]/70 to-transparent' 
            : 'bg-gradient-to-t from-white/80 via-white/40 to-transparent'
        }`} 
      />
    </div>
  );
};

export default HeroRiverFlow;
