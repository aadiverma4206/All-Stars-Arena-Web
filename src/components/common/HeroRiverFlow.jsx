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
          viewBox="0 0 2880 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="riverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#052e24' : '#a7f3d0'} stopOpacity={isDark ? '0.6' : '0.45'} />
              <stop offset="50%" stopColor={isDark ? '#0a4234' : '#6ee7b7'} stopOpacity={isDark ? '0.4' : '0.3'} />
              <stop offset="100%" stopColor={isDark ? '#011410' : '#38bdf8'} stopOpacity={isDark ? '0.7' : '0.2'} />
            </linearGradient>
          </defs>
          <path
            d="M0,65 C240,20 480,110 720,65 C960,20 1200,110 1440,65 C1680,20 1920,110 2160,65 C2400,20 2640,110 2880,65 L2880,160 L0,160 Z"
            fill="url(#riverGrad1)"
          />
        </svg>
      </div>

      {/* Wave Layer 2: Mid-Level Flowing Water Waves */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-2 opacity-80">
        <svg
          viewBox="0 0 2880 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="riverGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#10b981' : '#34d399'} stopOpacity={isDark ? '0.25' : '0.35'} />
              <stop offset="50%" stopColor={isDark ? '#059669' : '#38bdf8'} stopOpacity={isDark ? '0.2' : '0.25'} />
              <stop offset="100%" stopColor={isDark ? '#047857' : '#10b981'} stopOpacity={isDark ? '0.3' : '0.35'} />
            </linearGradient>
          </defs>
          <path
            d="M0,85 C180,45 360,125 540,85 C720,45 900,125 1080,85 C1260,45 1440,125 1620,85 C1800,45 1980,125 2160,85 C2340,45 2520,125 2700,85 C2880,45 3060,125 3240,85 L3240,160 L0,160 Z"
            fill="url(#riverGrad2)"
          />
        </svg>
      </div>

      {/* Wave Layer 3: Foreground Shimmering Ripple & Water Crest */}
      <div className="absolute inset-x-0 bottom-0 w-[200%] h-full animate-river-3 opacity-90">
        <svg
          viewBox="0 0 2880 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="riverGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#22c55e' : '#10b981'} stopOpacity={isDark ? '0.35' : '0.4'} />
              <stop offset="40%" stopColor={isDark ? '#10b981' : '#6ee7b7'} stopOpacity={isDark ? '0.2' : '0.25'} />
              <stop offset="100%" stopColor={isDark ? '#011410' : '#ffffff'} stopOpacity={isDark ? '0.6' : '0.5'} />
            </linearGradient>
            <linearGradient id="crestStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDark ? '#4ade80' : '#059669'} stopOpacity="0.8" />
              <stop offset="50%" stopColor={isDark ? '#22c55e' : '#38bdf8'} stopOpacity="0.9" />
              <stop offset="100%" stopColor={isDark ? '#4ade80' : '#10b981'} stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M0,105 C300,70 600,135 900,105 C1200,70 1500,135 1800,105 C2100,70 2400,135 2700,105 L2700,160 L0,160 Z"
            fill="url(#riverGrad3)"
            stroke="url(#crestStroke)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Bottom Mist & Soft Fade Blend */}
      <div 
        className={`absolute inset-x-0 bottom-0 h-10 transition-colors duration-300 ${
          isDark 
            ? 'bg-gradient-to-t from-[#011410] via-[#011410]/70 to-transparent' 
            : 'bg-gradient-to-t from-white/80 via-white/40 to-transparent'
        }`} 
      />
    </div>
  );
};

export default HeroRiverFlow;
