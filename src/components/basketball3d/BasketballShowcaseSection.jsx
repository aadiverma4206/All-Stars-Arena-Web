import React, { useState } from 'react';
import { 
  Zap, 
  RotateCcw
} from 'lucide-react';
import BasketballScene from './BasketballScene';
import BasketballRiverFlow from './BasketballRiverFlow';
import { useThemeStore } from '../../store/useThemeStore';

/**
 * 3D Basketball Arena with Multi-Directional Grass Ground Bouncing
 *
 * Visual & Kinetic Features:
 * - Natural sports arena grass pitch with wide court boundary
 * - Bounces around across the court in 3D (left, right, front, back)
 * - True trajectory rolling, gravity, and arena wall rebounds
 * - Full cursor control: drag & throw anywhere across the pitch or click to smash bounce!
 */
export const BasketballShowcaseSection = () => {
  const { theme } = useThemeStore();
  const [isTurbo, setIsTurbo] = useState(false);
  const [triggerBounce, setTriggerBounce] = useState(0);

  const handleManualBounce = () => {
    setTriggerBounce((prev) => prev + 1);
  };

  return (
    <section 
      id="basketball-freestyle"
      className="scroll-mt-24 my-8 sm:my-12"
    >
      {/* Premium All Stars Arena Stadium Card */}
      <div 
        className={`relative rounded-3xl overflow-hidden border transition-all duration-300 p-4 sm:p-6 lg:p-8 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#021f17] via-[#011410] to-[#03241b] text-white border-emerald-500/30 shadow-2xl shadow-emerald-950/60'
            : 'bg-gradient-to-br from-emerald-50/90 via-white to-amber-50/50 text-slate-900 border-emerald-200/80 shadow-2xl shadow-emerald-600/10'
        }`}
      >
        {/* Corner Ambient Gradient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-tl from-amber-500/15 to-transparent blur-3xl pointer-events-none" />

        {/* Dynamic Stadium Radial Glow */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.16)_0%,_rgba(245,158,11,0.08)_45%,_transparent_75%)]" 
        />
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_rgba(34,197,94,0.12)_0%,_transparent_65%)]" 
        />

        {/* Stadium Court Pattern Grid Mesh */}
        <div 
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(#10b981_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-10 dark:opacity-15" 
        />

        {/* Header Bar */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70 dark:border-white/10">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight break-words">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-sport-600 to-amber-600 dark:from-white dark:via-emerald-300 dark:to-amber-400">
                All Stars Arena Play Basketball
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            {/* Quick Bounce Trigger Button */}
            <button
              onClick={handleManualBounce}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer shadow-md shadow-emerald-500/25 bg-gradient-to-r from-sport-500 via-emerald-500 to-sport-600 hover:from-sport-400 hover:to-emerald-400 text-slate-950 active:scale-95 whitespace-nowrap"
              title="Launch high bounce across the court"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Bounce Ball</span>
            </button>

            {/* Bounce Speed / Tempo Toggle */}
            <button
              onClick={() => setIsTurbo((prev) => !prev)}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer border ${
                isTurbo
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                  : 'bg-white/90 hover:bg-emerald-50/80 text-slate-700 border-slate-300/80 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-500/25 shadow-sm'
              } active:scale-95 whitespace-nowrap`}
            >
              <Zap className={`w-3.5 h-3.5 stroke-[2.5] ${isTurbo ? 'fill-current text-slate-950' : 'text-amber-500'}`} />
              <span>{isTurbo ? 'Fast Bounce' : 'Normal Bounce'}</span>
            </button>
          </div>
        </div>

        {/* 3D Viewport: Free Bouncing Ball across Arena Pitch */}
        <div className="relative z-10 w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[540px] flex items-center justify-center my-2">
          {/* Center Spotlight behind 3D Ball */}
          <div className="absolute w-[260px] sm:w-[440px] h-[260px] sm:h-[440px] rounded-full bg-gradient-to-tr from-emerald-500/10 via-amber-400/8 to-transparent blur-3xl pointer-events-none" />

          {/* Smooth Fade Edge Vignettes */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/30 dark:from-[#011410]/30 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/30 dark:from-[#011410]/30 to-transparent z-10" />

          {/* Subtle Ground Depth Vignette */}
          <div className="absolute bottom-4 w-72 sm:w-96 h-8 rounded-full blur-2xl bg-black/40 pointer-events-none" />

          <BasketballScene
            isTurbo={isTurbo}
            theme={theme}
            triggerBounce={triggerBounce}
          />
        </div>

        {/* Ambient Organic Soft Rainbow River Flow - Rendered ON TOP of the 3D Ground & Court (z-20) */}
        <BasketballRiverFlow />

      </div>
    </section>
  );
};

export default BasketballShowcaseSection;
