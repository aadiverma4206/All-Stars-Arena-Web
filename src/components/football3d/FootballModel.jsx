import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getRealisticFootballTexture } from './footballTexture';

export function FootballModel({ mouseRef, scrollRef, reducedMotion = false }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1.58);
  const isHovered = useRef(false);
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const spinVelocity = useRef({ x: 0, y: 0 });

  // 100% synchronous, permanent, cached match ball texture
  const texture = useMemo(() => getRealisticFootballTexture(), []);

  // Global pointerup safety so releasing mouse outside window or canvas cleanly releases drag
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = isHovered.current ? 'grab' : 'auto';
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, []);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    document.body.style.cursor = 'grabbing';
    const cx = e.clientX ?? e.nativeEvent?.clientX ?? 0;
    const cy = e.clientY ?? e.nativeEvent?.clientY ?? 0;
    prevPointer.current = { x: cx, y: cy };
    if (e.target?.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const cx = e.clientX ?? e.nativeEvent?.clientX ?? 0;
    const cy = e.clientY ?? e.nativeEvent?.clientY ?? 0;
    const dx = cx - prevPointer.current.x;
    const dy = cy - prevPointer.current.y;
    prevPointer.current = { x: cx, y: cy };

    // Inject angular momentum proportional to cursor drag distance
    spinVelocity.current.y += dx * 0.007;
    spinVelocity.current.x += dy * 0.007;
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    document.body.style.cursor = isHovered.current ? 'grab' : 'auto';
    if (e.target?.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  const handlePointerOver = () => {
    isHovered.current = true;
    if (!isDragging.current) {
      document.body.style.cursor = 'grab';
    }
  };

  const handlePointerOut = () => {
    isHovered.current = false;
    if (!isDragging.current) {
      document.body.style.cursor = 'auto';
    }
  };

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const safeDelta = Math.min(delta, 0.05); // Clamp frame delta to prevent jitter/stutter
    const damp = 1 - Math.exp(-7 * safeDelta);

    // Track mouse coordinate targets smoothly
    if (mouseRef?.current) {
      currentMouse.current.x = THREE.MathUtils.lerp(
        currentMouse.current.x,
        mouseRef.current.targetX || 0,
        damp
      );
      currentMouse.current.y = THREE.MathUtils.lerp(
        currentMouse.current.y,
        mouseRef.current.targetY || 0,
        damp
      );
    }

    if (!reducedMotion) {
      // Continuous base spin + direct cursor spin momentum
      const autoSpinY = safeDelta * 0.38;
      const autoSpinX = safeDelta * 0.18;
      const autoSpinZ = safeDelta * 0.08;

      meshRef.current.rotation.y += autoSpinY + spinVelocity.current.y;
      meshRef.current.rotation.x += autoSpinX + spinVelocity.current.x;
      meshRef.current.rotation.z += autoSpinZ;

      // Momentum friction decay on manual cursor spin
      spinVelocity.current.x *= 0.94;
      spinVelocity.current.y *= 0.94;

      // Gentle floating physics with scroll responsiveness
      const scrollOffset = (scrollRef?.current?.targetY || 0) * 0.15;
      const floatY = Math.sin(t * 1.2) * 0.08 - scrollOffset;
      const floatX = Math.cos(t * 0.8) * 0.04;

      // Responsive screen width adaptation:
      // Narrow screens get reduced travel distance so the ball never clips
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
      const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024;
      const travelX = isMobile ? 0.45 : (isTablet ? 0.65 : 0.85);
      const travelY = isMobile ? 0.35 : (isTablet ? 0.50 : 0.60);

      // 1. DYNAMIC POSITION: Ball translates to follow cursor in 3D space
      const targetPosX = floatX + currentMouse.current.x * travelX;
      const targetPosY = floatY + currentMouse.current.y * travelY;
      const targetPosZ = isHovered.current ? 0.35 : 0;

      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, damp);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, damp);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, damp);

      // 2. DYNAMIC TILT: Ball leans and rotates toward cursor orientation
      const targetRotX = -currentMouse.current.y * 0.38;
      const targetRotY = currentMouse.current.x * 0.50;
      const targetRotZ = -currentMouse.current.x * 0.22;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, damp);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, damp);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, damp);

      // 3. RESPONSIVE SCALE:
      // Auto-scales for mobile (1.25), tablet (1.42), desktop (1.58) + gentle hover expansion
      const baseScale = isMobile ? 1.25 : (isTablet ? 1.42 : 1.58);
      const targetScale = isHovered.current ? baseScale * 1.05 : baseScale;
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, damp);
      meshRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
        MeshPhongMaterial guarantees:
        - NEVER turns black (independent of environment maps or PBR irradiance loss)
        - Rich white synthetic leather diffuse body
        - Brilliant stadium specular reflections
      */}
      <mesh
        ref={meshRef}
        scale={1.58}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={texture}
          color="#ffffff"
          specular="#ffffff"
          shininess={35}
        />
      </mesh>
    </group>
  );
}

export default FootballModel;
