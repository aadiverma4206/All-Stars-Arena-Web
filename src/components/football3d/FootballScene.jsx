import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useThemeStore } from '../../store/useThemeStore';
import { useFootballAnimation } from './useFootballAnimation';
import FootballModel from './FootballModel';
import { getRealisticFootballTexture } from './footballTexture';
import FootballLighting from './FootballLighting';
import FootballParticles from './FootballParticles';
import FootballEnvironment from './FootballEnvironment';
import FootballFallback from './FootballFallback';
import ErrorBoundary from '../common/ErrorBoundary';

export function FootballScene() {
  const { theme } = useThemeStore();
  const { mouseRef, scrollRef, reducedMotion } = useFootballAnimation();
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  if (!hasWebGL) {
    return <FootballFallback theme={theme} />;
  }

  return (
    <div className="relative w-full h-[260px] sm:h-[340px] md:h-[420px] lg:h-[480px] xl:h-[520px] flex items-center justify-center pointer-events-auto overflow-visible select-none">
      {/* Soft Ambient Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(34,197,94,0.14)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      <ErrorBoundary fallback={<FootballFallback theme={theme} />}>
        <Suspense fallback={<FootballFallback theme={theme} />}>
          <Canvas
            camera={{ position: [0, 0, 6.0], fov: 42 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              preserveDrawingBuffer: true,
            }}
            onCreated={({ gl }) => {
              const dom = gl?.domElement;
              if (dom) {
                dom.addEventListener('webglcontextlost', (e) => {
                  e.preventDefault();
                }, false);
                dom.addEventListener('webglcontextrestored', () => {
                  const tex = getRealisticFootballTexture();
                  if (tex) {
                    tex.needsUpdate = true;
                  }
                }, false);
              }
            }}
            className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y select-none"
          >
            <FootballLighting theme={theme} />
            <FootballModel
              mouseRef={mouseRef}
              scrollRef={scrollRef}
              theme={theme}
              reducedMotion={reducedMotion}
            />
            <FootballParticles theme={theme} reducedMotion={reducedMotion} />
            <FootballEnvironment theme={theme} />
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default FootballScene;
