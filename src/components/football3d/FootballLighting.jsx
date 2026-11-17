import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function FootballLighting({ theme = 'dark' }) {
  const pointLightRef = useRef();

  useFrame((state) => {
    if (!pointLightRef.current) return;
    const t = state.clock.getElapsedTime();
    pointLightRef.current.position.x = Math.sin(t * 0.4) * 3;
    pointLightRef.current.position.y = Math.cos(t * 0.3) * 2;
    pointLightRef.current.position.z = Math.sin(t * 0.5) * 3 + 2;
  });

  const isDark = theme === 'dark';

  return (
    <>
      {/* Omnidirectional Ambient Fill - Guarantees the ball is NEVER black from any angle */}
      <ambientLight intensity={isDark ? 0.85 : 1.1} />

      {/* Front Camera Facing Key Light - Always lights whatever side faces the user */}
      <directionalLight
        position={[0, 1, 5.5]}
        intensity={isDark ? 1.8 : 2.0}
        color="#ffffff"
      />

      {/* Top-Right Stadium Key Light - Creates authentic stadium highlights */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={isDark ? 2.2 : 2.6}
        color={isDark ? '#ffffff' : '#f8fafc'}
      />

      {/* Left Rim Accent Light (Sport Emerald Green) */}
      <directionalLight
        position={[-5, -1, -2]}
        intensity={isDark ? 2.0 : 1.4}
        color="#22c55e"
      />

      {/* Bottom Soft Fill Light */}
      <directionalLight
        position={[0, -4, 2]}
        intensity={isDark ? 0.7 : 0.9}
        color="#38bdf8"
      />

      {/* Dynamic Animated Point Light */}
      <pointLight
        ref={pointLightRef}
        intensity={isDark ? 1.6 : 1.2}
        distance={9}
        color="#22c55e"
      />
    </>
  );
}

export default FootballLighting;
