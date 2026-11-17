import React, { useRef, useMemo } from 'react';
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
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  return texture;
}

export function FootballModel({ mouseRef, scrollRef, theme = 'dark', reducedMotion = false }) {
  const meshRef = useRef();
  const groupRef = useRef();

  const texture = useMemo(() => generateRealisticFootballTexture(theme), [theme]);

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const safeDelta = Math.min(delta, 0.05); // Clamp frame delta to prevent jitter/stutter

    if (!reducedMotion) {
      // Buttery-smooth 3D spin
      meshRef.current.rotation.y += safeDelta * 0.38;
      meshRef.current.rotation.x += safeDelta * 0.18;
      meshRef.current.rotation.z += safeDelta * 0.08;

      // Gentle floating physics with scroll responsiveness
      const scrollOffset = (scrollRef?.current?.targetY || 0) * 0.15;
      const floatY = Math.sin(t * 1.2) * 0.08 - scrollOffset;
      const floatX = Math.cos(t * 0.8) * 0.04;
      groupRef.current.position.y = floatY;
      groupRef.current.position.x = floatX;
    }

    if (mouseRef?.current) {
      const { targetX, targetY } = mouseRef.current;
      // Frame-rate independent exponential damping for liquid-smooth mouse tracking
      const damp = 1 - Math.exp(-6 * safeDelta);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY * 0.22, damp);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX * 0.22, damp);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Optimized sphere with physical sheen */}
      <mesh ref={meshRef} castShadow receiveShadow scale={1.58}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          map={texture}
          roughness={0.25}
          metalness={0.08}
          clearcoat={0.65}
          clearcoatRoughness={0.08}
          reflectivity={0.85}
        />
      </mesh>
    </group>
  );
}

export default FootballModel;
