import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function pseudoRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function FootballParticles({ count = 90, theme = 'dark', reducedMotion = false }) {
  const pointsRef = useRef();

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere around origin
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);
      const radius = 3.5 + r1 * 4.5;
      const theta = r2 * Math.PI * 2;
      const phi = Math.acos(r3 * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      sc[i] = 0.05 + pseudoRandom(i * 4 + 7) * 0.12;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  const particleColor = theme === 'dark' ? '#22c55e' : '#16a34a';

  return (
    <points ref={pointsRef} raycast={() => null}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-scale"
          args={[scales, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={particleColor}
        transparent
        opacity={theme === 'dark' ? 0.35 : 0.25}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default FootballParticles;
