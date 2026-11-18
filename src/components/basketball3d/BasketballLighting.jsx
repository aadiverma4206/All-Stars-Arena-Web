import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function BasketballLighting({ theme = 'dark', studioMode = 'arena' }) {
  const dynamicLightRef = useRef();

  useFrame((state) => {
    if (!dynamicLightRef.current) return;
    const t = state.clock.getElapsedTime();
    dynamicLightRef.current.position.x = Math.sin(t * 0.8) * 3;
    dynamicLightRef.current.position.y = 2 + Math.cos(t * 0.6) * 1.5;
    dynamicLightRef.current.position.z = 3 + Math.sin(t * 0.5) * 1;
  });

  const isYellowStudio = studioMode === 'studio';
  const isDark = theme === 'dark' && !isYellowStudio;

  return (
    <>
      {/* 1. Global Ambient Fill */}
      <ambientLight intensity={isYellowStudio ? 1.2 : (isDark ? 0.9 : 1.1)} />

      {/* 2. Key Studio Light (Front-Left Top specular matching reference photo) */}
      <directionalLight
        position={[-2.8, 4.4, 4.2]}
        intensity={isYellowStudio ? 2.6 : (isDark ? 2.4 : 2.2)}
        color={isYellowStudio ? '#fffdf0' : '#ffffff'}
        castShadow
      />

      {/* 3. Soft Fill Light (Front-Right) */}
      <directionalLight
        position={[3.5, 2.2, 3.5]}
        intensity={isYellowStudio ? 1.1 : (isDark ? 1.2 : 0.9)}
        color={isYellowStudio ? '#ffe875' : '#e2e8f0'}
      />

      {/* 4. Stadium Rim Light (Crisp rim contour along ball silhouette) */}
      <directionalLight
        position={[0, -2, -3.5]}
        intensity={isYellowStudio ? 1.5 : (isDark ? 2.0 : 1.6)}
        color="#ffffff"
      />

      {/* 5. Top Overhead Rim (Catches the top curve of the basketball) */}
      <directionalLight
        position={[0, 6, -1]}
        intensity={isYellowStudio ? 1.8 : 2.0}
        color="#ffffff"
      />

      {/* 6. Dynamic Orbiting Specular Sparkle Light */}
      <pointLight
        ref={dynamicLightRef}
        intensity={isYellowStudio ? 1.0 : 1.4}
        distance={8}
        color="#ffeacc"
      />
    </>
  );
}

export default BasketballLighting;
