import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BasketballLighting from './BasketballLighting';
import BasketballModel from './BasketballModel';
import BasketballParticles from './BasketballParticles';
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * 3D Scene Controller
 * Coordinates mouse parallax and renders the bouncing basketball across the arena pitch.
 */
function SceneController({
  mouseRef,
  isTurbo,
  theme,
  triggerBounce,
  reducedMotion,
}) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    const damp = 1 - Math.exp(-8 * safeDelta);

    if (!reducedMotion && mouseRef.current) {
      const targetRotY = mouseRef.current.x * 0.18;
      const targetRotX = -mouseRef.current.y * 0.12;
      const targetPosX = mouseRef.current.x * 0.12;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, damp);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, damp);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, damp);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <BasketballLighting theme={theme} studioMode="arena" />
      <BasketballModel
        isTurbo={isTurbo}
        theme={theme}
        triggerBounce={triggerBounce}
        reducedMotion={reducedMotion}
      />
      <BasketballParticles
        studioMode="arena"
        count={70}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}

export function BasketballScene({
  isTurbo = false,
  theme = 'dark',
  triggerBounce = 0,
}) {
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  const mouseRef = useRef({ x: 0, y: 0 });

  // Pointer move for subtle 3D parallax
  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseRef.current = { x, y };
  };

  const handlePointerLeave = () => {
    mouseRef.current = { x: 0, y: 0 };
  };

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
        WebGL 3D Accelerated Basketball
      </div>
    );
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      <ErrorBoundary fallback={<div className="text-xs font-semibold text-slate-500 p-4">WebGL 3D Accelerated Scene</div>}>
        <Canvas
          camera={{ position: [0, 0.35, 6.8], fov: 46 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-pan-y select-none"
        >
          <SceneController
            mouseRef={mouseRef}
            isTurbo={isTurbo}
            theme={theme}
            triggerBounce={triggerBounce}
            reducedMotion={false}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}

export default BasketballScene;
