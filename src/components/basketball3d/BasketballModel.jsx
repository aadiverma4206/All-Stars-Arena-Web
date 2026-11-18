import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getBasketballTextures } from './basketballTexture';
import { getGrassTextures } from './grassTexture';

/**
 * 3D Bouncing Basketball with Multi-Directional Arena Court Kinetics
 *
 * Visual & Physical Features:
 * - Bounces around across the court in 3D (X, Y, Z): left, right, front, back!
 * - Real-world gravity, parabolic jump arcs, and arena boundary bank rebounds
 * - True rolling physics: ball spins & rolls along its trajectory vector
 * - Elastic squash & stretch compression on each ground grass impact
 * - Dynamic contact occlusion shadow follows the ball across the grass court
 * - Full interactive cursor control:
 *   - Drag & throw across the arena in any direction with fling momentum
 *   - Click / tap to kick / smash bounce
 *   - Cursor proximity deflection (bat the ball with cursor!)
 */
export function BasketballModel({
  isTurbo = false,
  reducedMotion = false,
  triggerBounce = 0,
  theme = 'dark',
}) {
  const meshRef = useRef();
  const groupRef = useRef();
  const shadowRef = useRef();
  const rippleRef = useRef();

  // Multi-directional physics state with Earth's Gravity (g = 9.81 m/s²)
  const physics = useRef({
    x: 0,
    y: 2.2, // Starts dropped from air onto grass surface
    z: 0.0,
    vx: 1.2, // Initial gentle horizontal drift
    vy: 0.0,
    vz: 0.6,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    squash: 0,
    isGrounded: false,
  });

  const isDragging = useRef(false);
  const dragDistance = useRef(0);
  const isHovered = useRef(false);
  const dragPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const prevDragPos = useRef(new THREE.Vector3());
  const dragVelocity = useRef(new THREE.Vector3());
  const mouseScreenRef = useRef(new THREE.Vector2(-999, -999));

  // Arena ground & boundaries
  const GROUND_SURFACE_Y = -1.25;
  const BALL_RADIUS = 1.12;
  const CONTACT_Y = GROUND_SURFACE_Y + BALL_RADIUS; // -0.13: exact turf contact point
  const ARENA_BOUND_X = 2.8; // Court boundary limits
  const ARENA_BOUND_Z = 1.4;

  // Cached PBR Textures
  const { map, emissiveMap, bumpMap, roughnessMap } = useMemo(() => getBasketballTextures(), []);
  const { grassMap, grassBumpMap } = useMemo(() => getGrassTextures(), []);

  // External bounce trigger
  useEffect(() => {
    if (triggerBounce > 0) {
      physics.current.isGrounded = false;
      physics.current.vy = isTurbo ? 8.0 : 6.8;
      physics.current.vx = (Math.random() - 0.5) * 2.6;
      physics.current.vz = (Math.random() - 0.5) * 1.6;
    }
  }, [triggerBounce, isTurbo]);

  // Global pointer up safety
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        physics.current.isGrounded = false;

        if (dragDistance.current < 0.12) {
          // Tap launch under Earth gravity
          physics.current.vy = isTurbo ? 7.8 : 6.6;
          physics.current.vx = (Math.random() - 0.5) * 2.4;
          physics.current.vz = (Math.random() - 0.5) * 1.6;
        } else {
          // Fling release with cursor momentum
          const flingX = THREE.MathUtils.clamp(dragVelocity.current.x * 24, -4.5, 4.5);
          const flingY = THREE.MathUtils.clamp(dragVelocity.current.y * 24, -2.0, 9.0);
          physics.current.vx = Math.abs(flingX) > 0.4 ? flingX : (Math.random() - 0.5) * 2.2;
          physics.current.vy = Math.abs(flingY) > 0.8 ? flingY : (isTurbo ? 7.6 : 6.4);
          physics.current.vz = (Math.random() - 0.5) * 1.8;
        }

        document.body.style.cursor = isHovered.current ? 'grab' : 'auto';
      }
    };

    const handlePointerMoveGlobal = (e) => {
      mouseScreenRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseScreenRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointermove', handlePointerMoveGlobal);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointermove', handlePointerMoveGlobal);
    };
  }, [isTurbo]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    dragDistance.current = 0;
    document.body.style.cursor = 'grabbing';

    const intersectPoint = new THREE.Vector3();
    e.ray.intersectPlane(dragPlane.current, intersectPoint);
    prevDragPos.current.copy(intersectPoint);
    dragVelocity.current.set(0, 0, 0);

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
    const intersectPoint = new THREE.Vector3();
    e.ray.intersectPlane(dragPlane.current, intersectPoint);

    const deltaX = intersectPoint.x - prevDragPos.current.x;
    const deltaY = intersectPoint.y - prevDragPos.current.y;
    dragDistance.current += Math.hypot(deltaX, deltaY);

    dragVelocity.current.set(deltaX, deltaY, 0);
    prevDragPos.current.copy(intersectPoint);

    physics.current.x = THREE.MathUtils.clamp(intersectPoint.x, -ARENA_BOUND_X, ARENA_BOUND_X);
    physics.current.y = Math.max(CONTACT_Y, intersectPoint.y);
    physics.current.z = THREE.MathUtils.lerp(physics.current.z, 0, 0.1);
    physics.current.vy = 0;
    physics.current.vx = 0;
    physics.current.isGrounded = false;
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    document.body.style.cursor = isHovered.current ? 'grab' : 'auto';

    physics.current.isGrounded = false;

    // Distinguish between a tap and a drag-fling
    if (dragDistance.current < 0.12) {
      physics.current.vy = isTurbo ? 7.8 : 6.6;
      physics.current.vx = (Math.random() - 0.5) * 2.4;
      physics.current.vz = (Math.random() - 0.5) * 1.6;
    } else {
      const flingX = THREE.MathUtils.clamp(dragVelocity.current.x * 24, -4.5, 4.5);
      const flingY = THREE.MathUtils.clamp(dragVelocity.current.y * 24, -2.0, 9.0);

      physics.current.vx = Math.abs(flingX) > 0.4 ? flingX : (Math.random() - 0.5) * 2.2;
      physics.current.vy = Math.abs(flingY) > 0.8 ? flingY : (isTurbo ? 7.6 : 6.4);
      physics.current.vz = (Math.random() - 0.5) * 1.8;
    }

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
    const safeDelta = Math.min(delta, 0.05);

    if (reducedMotion) return;

    const p = physics.current;

    // --- 1. REAL-WORLD EARTH GRAVITY PHYSICS (g = 9.81 m/s²) ON SURFACE ---
    if (!isDragging.current) {
      const EARTH_GRAVITY = isTurbo ? 13.5 : 9.81;

      if (!p.isGrounded) {
        // Natural downward acceleration under Earth's gravity
        p.vy -= EARTH_GRAVITY * safeDelta;
        p.x += p.vx * safeDelta;
        p.y += p.vy * safeDelta;
        p.z += p.vz * safeDelta;
      } else {
        // Grounded on turf grass surface: apply real rolling friction & surface resistance
        const rollFriction = Math.exp(-3.5 * safeDelta);
        p.vx *= rollFriction;
        p.vz *= rollFriction;
        p.x += p.vx * safeDelta;
        p.z += p.vz * safeDelta;
        if (Math.abs(p.vx) < 0.015) p.vx = 0;
        if (Math.abs(p.vz) < 0.015) p.vz = 0;
        p.y = CONTACT_Y;
      }

      // Arena Court Boundary Rebounds (Banks off court walls!)
      if (p.x > ARENA_BOUND_X) {
        p.x = ARENA_BOUND_X;
        p.vx = -Math.abs(p.vx) * 0.84;
      } else if (p.x < -ARENA_BOUND_X) {
        p.x = -ARENA_BOUND_X;
        p.vx = Math.abs(p.vx) * 0.84;
      }

      if (p.z > ARENA_BOUND_Z) {
        p.z = ARENA_BOUND_Z;
        p.vz = -Math.abs(p.vz) * 0.84;
      } else if (p.z < -ARENA_BOUND_Z) {
        p.z = -ARENA_BOUND_Z;
        p.vz = Math.abs(p.vz) * 0.84;
      }

      // Earth Ground Surface Impact on Athletic Turf Pitch
      if (p.y <= CONTACT_Y) {
        p.y = CONTACT_Y;
        const impactSpeed = Math.abs(p.vy);

        // Ground settling condition: when bounce energy decays after several taps, settle stably into grass
        if (impactSpeed < 0.42 && Math.abs(p.vx) < 0.8) {
          p.vy = 0;
          p.isGrounded = true;
          p.squash = 0;
        } else {
          // Energetic rebound under Earth's coefficient of restitution
          const RESTITUTION = isTurbo ? 0.78 : 0.72; // Official regulation basketball on turf
          p.vy = impactSpeed * RESTITUTION;
          p.isGrounded = false;

          // Surface friction on impact absorbs tangential speed
          p.vx *= 0.88;
          p.vz *= 0.88;

          // Natural subtle deflection on grass turf
          p.vx += (Math.random() - 0.5) * 0.22;
          p.vz += (Math.random() - 0.5) * 0.16;

          // Squash on impact proportional to impact velocity
          p.squash = Math.min(0.24, impactSpeed * 0.035);

          // Trigger ground ripple shockwave on turf
          if (rippleRef.current) {
            rippleRef.current.position.set(p.x, 0.014, p.z);
            rippleRef.current.scale.set(0.7, 0.7, 1);
            rippleRef.current.material.opacity = Math.min(0.75, impactSpeed * 0.12);
          }
        }
      }
    }

    // --- 2. SQUASH & STRETCH RECOVERY ---
    p.squash = THREE.MathUtils.lerp(p.squash, 0, 1 - Math.exp(-20 * safeDelta));
    const scaleY = 1.0 - p.squash;
    const scaleXZ = 1.0 + p.squash * 0.5;

    // --- 3. TRUE TRAJECTORY ROLLING & GYROSCOPIC SPIN ---
    // The ball naturally rolls along its travel vector
    if (p.isGrounded) {
      // Pure physical rolling along grass turf
      p.rotX += p.vz * safeDelta * 1.5;
      p.rotZ -= p.vx * safeDelta * 1.5;
      p.rotY += safeDelta * (Math.abs(p.vx) + Math.abs(p.vz)) * 0.8;
    } else {
      // In-flight gyroscopic spin
      p.rotX += p.vz * safeDelta * 1.4;
      p.rotZ -= p.vx * safeDelta * 1.4;
      p.rotY += safeDelta * (isTurbo ? 1.8 : 0.9);
    }

    meshRef.current.rotation.x = p.rotX;
    meshRef.current.rotation.y = p.rotY;
    meshRef.current.rotation.z = p.rotZ;
    meshRef.current.scale.set(scaleXZ, scaleY, scaleXZ);

    // Apply 3D position
    groupRef.current.position.set(p.x, p.y, p.z);

    // --- 4. DYNAMIC GRASS CONTACT SHADOW ---
    // Shadow follows ball's exact (X, Z) on the turf ground
    const heightAboveGrass = Math.max(0, p.y - CONTACT_Y);
    const shadowOpacity = THREE.MathUtils.clamp(0.88 - heightAboveGrass * 0.38, 0.15, 0.88);
    const shadowScale = THREE.MathUtils.clamp(1.0 + heightAboveGrass * 0.42, 0.98, 2.2);

    if (shadowRef.current) {
      shadowRef.current.position.set(p.x, 0.012, p.z);
      shadowRef.current.scale.set(shadowScale, shadowScale, 1);
      shadowRef.current.material.opacity = shadowOpacity;
    }

    // Ripple shockwave dissipation
    if (rippleRef.current && rippleRef.current.material.opacity > 0) {
      rippleRef.current.scale.x += safeDelta * 2.4;
      rippleRef.current.scale.y += safeDelta * 2.4;
      rippleRef.current.material.opacity = Math.max(0, rippleRef.current.material.opacity - safeDelta * 2.2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Interactive 3D Bouncing Basketball */}
      <group ref={groupRef} position={[-1.2, 1.4, 0.2]}>
        <mesh
          ref={meshRef}
          scale={1.0}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[BALL_RADIUS, 96, 96]} />
          <meshStandardMaterial
            map={map}
            roughness={0.92}
            roughnessMap={roughnessMap}
            metalness={0.02}
            bumpMap={bumpMap}
            bumpScale={0.045}
            emissiveMap={emissiveMap}
            emissive="#000000"
            emissiveIntensity={0.0}
          />
        </mesh>
      </group>

      {/* 2. Athletic Sports Arena Turf Pitch Ground (Grace Ground) at Y = -1.25 */}
      <group position={[0, GROUND_SURFACE_Y, 0]}>
        {/* Dynamic Contact Occlusion Shadow directly on grass following ball (X, Z) */}
        <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[-1.2, 0.012, 0.2]}>
          <ringGeometry args={[0.01, 1.15, 36]} />
          <meshBasicMaterial
            color="#011b0e"
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Grass Impact Ripple Shockwave */}
        <mesh ref={rippleRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
          <ringGeometry args={[1.08, 1.28, 36]} />
          <meshBasicMaterial
            color="#34d399"
            transparent
            opacity={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Wide Arena Sports Turf Grass Pitch Surface */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <ringGeometry args={[0.01, 3.8, 64]} />
          <meshStandardMaterial
            map={grassMap}
            bumpMap={grassBumpMap}
            bumpScale={0.038}
            color={theme === 'dark' ? '#146338' : '#1fa657'}
            roughness={0.78}
            metalness={0.0}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner Pitch Court Boundary Chalk Line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
          <ringGeometry args={[3.2, 3.26, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={theme === 'dark' ? 0.6 : 0.85}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Outer Arena Pitch Border Bevel */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <ringGeometry args={[3.78, 4.15, 64]} />
          <meshBasicMaterial
            color={theme === 'dark' ? '#042a18' : '#146637'}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export default BasketballModel;
