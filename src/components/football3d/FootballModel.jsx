import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generate ultra-realistic 2048x1024 classic 32-panel FIFA match ball texture
function generateRealisticFootballTexture(theme = 'dark') {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 1. Premium white synthetic leather base
  const isDark = theme === 'dark';
  const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  bgGrad.addColorStop(0, '#ffffff');
  bgGrad.addColorStop(0.5, isDark ? '#f1f5f9' : '#ffffff');
  bgGrad.addColorStop(1, isDark ? '#e2e8f0' : '#f8fafc');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Add realistic leather micro-pore noise
  for (let i = 0; i < 120000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const alpha = 0.04 + Math.random() * 0.08;
    ctx.fillStyle = Math.random() > 0.5 ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha * 1.5})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  // 3. Draw 32-panel geodesic pattern (12 pentagons + 20 hexagons)
  const cols = 10;
  const rows = 5;
  const colStep = canvas.width / cols;
  const rowStep = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * colStep + colStep / 2;
      const cy = r * rowStep + rowStep / 2;
      const radius = 65;

      const isPentagon = (r + c) % 2 === 0;

      if (isPentagon) {
        // Dark Pentagonal Panel
        const panelGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, radius);
        panelGrad.addColorStop(0, '#1e293b');
        panelGrad.addColorStop(0.8, '#0f172a');
        panelGrad.addColorStop(1, '#020617');

        ctx.fillStyle = panelGrad;
        ctx.strokeStyle = '#22c55e'; // Sport green trim accent
        ctx.lineWidth = 6;

        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner panel seam highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else {
        // White Hexagonal Panel with seam borders
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * 2 * Math.PI) / 6;
          const x = cx + radius * 0.9 * Math.cos(angle);
          const y = cy + radius * 0.9 * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }
  }

  // 4. Panel Stitch Seams & Grooves across UV seams
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 4]); // Stitched thread look
  for (let r = 1; r < rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * rowStep);
    ctx.lineTo(canvas.width, r * rowStep);
    ctx.stroke();
  }
  ctx.setLineDash([]); // Reset dash

  // 5. Official ALL STARS ARENA Match Ball Watermark Logo
  const drawArenaBrand = (centerX, centerY) => {
    ctx.save();

    // Subtle contrast badge behind the text for crystal clear visibility
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 2.5;
    const badgeW = 240;
    const badgeH = 70;
    ctx.beginPath();
    ctx.roundRect(centerX - badgeW / 2, centerY - badgeH / 2, badgeW, badgeH, 16);
    ctx.fill();
    ctx.stroke();

    // Font setting
    ctx.font = '900 21px sans-serif';
    ctx.textBaseline = 'middle';

    const starLeft = '★ ';
    const allStars = 'ALL STARS ';
    const arena = 'ARENA';
    const starRight = ' ★';

    const starLeftW = ctx.measureText(starLeft).width;
    const allStarsW = ctx.measureText(allStars).width;
    const arenaW = ctx.measureText(arena).width;
    const starRightW = ctx.measureText(starRight).width;
    const fullW = starLeftW + allStarsW + arenaW + starRightW;

    let curX = centerX - fullW / 2;
    const line1Y = centerY - 11;

    ctx.textAlign = 'left';

    // Gold Star
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(starLeft, curX, line1Y);
    curX += starLeftW;

    // "ALL STARS " in bold dark slate
    ctx.fillStyle = '#0f172a';
    ctx.fillText(allStars, curX, line1Y);
    curX += allStarsW;

    // "ARENA" in official vibrant green
    ctx.fillStyle = '#22c55e';
    ctx.fillText(arena, curX, line1Y);
    curX += arenaW;

    // Gold Star
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(starRight, curX, line1Y);

    // Subtitle: "OFFICIAL MATCH BALL"
    ctx.font = '800 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#16a34a';
    ctx.fillText('OFFICIAL MATCH BALL', centerX, centerY + 15);

    ctx.restore();
  };

  // Draw on white hexagon panels so "ALL STARS ARENA" is always visible
  drawArenaBrand(canvas.width * 0.35, canvas.height * 0.5);
  drawArenaBrand(canvas.width * 0.75, canvas.height * 0.5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 16;
  return texture;
}

export function FootballModel({ mouseRef, scrollRef, theme = 'dark', reducedMotion = false }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const currentMouse = useRef({ x: 0, y: 0 });
  const currentScale = useRef(1.58);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const spinVelocity = useRef({ x: 0, y: 0 });

  const texture = useMemo(() => generateRealisticFootballTexture(theme), [theme]);

  // Global pointerup safety so releasing mouse outside window or canvas cleanly releases drag
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'auto';
    };
    window.addEventListener('pointerup', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
    };
  }, []);

  // Update cursor style on hover/drag
  useEffect(() => {
    if (isHovered) {
      document.body.style.cursor = isDragging.current ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [isHovered]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    document.body.style.cursor = 'grabbing';
    const cx = e.clientX ?? e.nativeEvent?.clientX ?? 0;
    const cy = e.clientY ?? e.nativeEvent?.clientY ?? 0;
    prevPointer.current = { x: cx, y: cy };
    if (e.target && e.target.setPointerCapture) {
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
    document.body.style.cursor = isHovered ? 'grab' : 'auto';
    if (e.target && e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
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

      // 1. DYNAMIC POSITION: Ball noticeably translates to follow cursor in 3D space
      const targetPosX = floatX + currentMouse.current.x * 0.85;
      const targetPosY = floatY + currentMouse.current.y * 0.60;
      const targetPosZ = isHovered ? 0.35 : 0;

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

      // 3. REACTIVE SCALE: Gentle expansion on hover
      const targetScale = isHovered ? 1.66 : 1.58;
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, damp);
      meshRef.current.scale.setScalar(currentScale.current);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Optimized sphere with physical sheen & cursor interaction */}
      <mesh
        ref={meshRef}
        scale={1.58}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => {
          setIsHovered(false);
          isDragging.current = false;
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.25}
          metalness={0.06}
        />
      </mesh>
    </group>
  );
}

export default FootballModel;
