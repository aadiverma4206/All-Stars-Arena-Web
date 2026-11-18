import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CreditCard, 
  Video, 
  PhoneCall, 
  Sparkles, 
  MapPin, 
  Clock, 
  Calendar, 
  RefreshCw, 
  Lock, 
  Zap, 
  Bot, 
  Footprints, 
  HeartPulse, 
  FileText, 
  AlertTriangle,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useSupportStore } from '../../store/useSupportStore';

// SVG Helper to generate donut wedge sector paths
const getDonutSlicePath = (cx, cy, rInner, rOuter, startAngle, endAngle) => {
  const toRad = Math.PI / 180;
  const a1 = startAngle * toRad;
  const a2 = endAngle * toRad;
  const x1 = cx + rOuter * Math.cos(a1);
  const y1 = cy + rOuter * Math.sin(a1);
  const x2 = cx + rOuter * Math.cos(a2);
  const y2 = cy + rOuter * Math.sin(a2);
  const x3 = cx + rInner * Math.cos(a2);
  const y3 = cy + rInner * Math.sin(a2);
  const x4 = cx + rInner * Math.cos(a1);
  const y4 = cy + rInner * Math.sin(a1);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
};

// Extracts current real-time rotation angle from a DOM element
const getRotationAngle = (el) => {
  if (!el) return 0;
  const tr = window.getComputedStyle(el).transform;
  if (!tr || tr === 'none') return 0;
  const match = tr.match(/^matrix(?:3d)?\((.+)\)$/);
  if (!match) return 0;
  const parts = match[1].split(',').map((v) => parseFloat(v.trim()));
  if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return Math.atan2(parts[1], parts[0]) * (180 / Math.PI);
  }
  return 0;
};

export const ArenaEcosystemRadar = () => {
  const { openLegalModal, openCallModal, openChat } = useSupportStore();

  const [isRewinding, setIsRewinding] = useState(false);
  const [orbitCycle, setOrbitCycle] = useState(0);
  const [activeHoverNode, setActiveHoverNode] = useState(null);

  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const isRewindingRef = useRef(false);

  // Rewinds exactly by how much each ring rotated back to 0deg (initial arranged state), then resumes
  const handleCenterClick = () => {
    if (isRewindingRef.current) return;
    isRewindingRef.current = true;
    setIsRewinding(true);

    // 1. Measure real-time current angle of each ring from the live CSS animation
    const a1 = getRotationAngle(ring1Ref.current);
    const a2 = getRotationAngle(ring2Ref.current);
    const a3 = getRotationAngle(ring3Ref.current);

    // Ring 1 & Ring 3 rotate Clockwise (0 -> 360). Normalize to [0, 360)
    const curr1 = a1 < 0 ? a1 + 360 : a1;
    const curr3 = a3 < 0 ? a3 + 360 : a3;

    // Ring 2 rotates Anti-Clockwise (0 -> -360). Normalize to (-360, 0]
    const curr2 = a2 > 0 ? a2 - 360 : a2;

    const duration = 850;
    const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
    const activeAnimations = [];

    // Helper to rewind a ring and keep its badges upright
    const rewindRing = (ringEl, startAngle) => {
      if (!ringEl) return;
      const anim = ringEl.animate(
        [
          { transform: `rotate(${startAngle}deg)` },
          { transform: 'rotate(0deg)' }
        ],
        { duration, easing, fill: 'forwards' }
      );
      activeAnimations.push(anim);

      const badges = ringEl.querySelectorAll('.counter-badge');
      badges.forEach((b) => {
        const bAnim = b.animate(
          [
            { transform: `rotate(${-startAngle}deg)` },
            { transform: 'rotate(0deg)' }
          ],
          { duration, easing, fill: 'forwards' }
        );
        activeAnimations.push(bAnim);
      });
    };

    rewindRing(ring1Ref.current, curr1);
    rewindRing(ring2Ref.current, curr2);
    rewindRing(ring3Ref.current, curr3);

    // After rewind completes (850ms), cancel web animations and resume continuous CSS orbits
    setTimeout(() => {
      activeAnimations.forEach((a) => {
        try {
          a.cancel();
        } catch {
          // ignore
        }
      });

      setOrbitCycle((c) => c + 1);
      setIsRewinding(false);
      isRewindingRef.current = false;
    }, duration);
  };

  // Ring 1: Inner ring sectors (Clockwise) - Radius 145px (Multi-Colored)
  const innerSectors = [
    { 
      label: 'TURF BOOKING', 
      icon: Calendar, 
      angle: 0, 
      theme: {
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/80',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-400 dark:border-emerald-600',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        hover: 'hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-slate-950',
        fill: 'rgba(16, 185, 129, 0.16)',
        stroke: 'rgba(16, 185, 129, 0.35)',
      },
      action: () => {} 
    },
    { 
      label: 'PAYMENTS', 
      icon: CreditCard, 
      angle: 60, 
      theme: {
        badgeBg: 'bg-purple-50 dark:bg-purple-950/80',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-400 dark:border-purple-600',
        iconColor: 'text-purple-600 dark:text-purple-400',
        hover: 'hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 dark:hover:text-slate-950',
        fill: 'rgba(168, 85, 247, 0.16)',
        stroke: 'rgba(168, 85, 247, 0.35)',
      },
      action: () => openLegalModal('terms') 
    },
    { 
      label: 'CCTV & VAR', 
      icon: Video, 
      angle: 120, 
      theme: {
        badgeBg: 'bg-amber-50 dark:bg-amber-950/80',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-400 dark:border-amber-600',
        iconColor: 'text-amber-600 dark:text-amber-400',
        hover: 'hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950',
        fill: 'rgba(245, 158, 11, 0.16)',
        stroke: 'rgba(245, 158, 11, 0.35)',
      },
      action: () => openLegalModal('privacy') 
    },
    { 
      label: 'DATA PRIVACY', 
      icon: Shield, 
      angle: 180, 
      theme: {
        badgeBg: 'bg-blue-50 dark:bg-blue-950/80',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-400 dark:border-blue-600',
        iconColor: 'text-blue-600 dark:text-blue-400',
        hover: 'hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-slate-950',
        fill: 'rgba(59, 130, 246, 0.16)',
        stroke: 'rgba(59, 130, 246, 0.35)',
      },
      action: () => openLegalModal('privacy') 
    },
    { 
      label: 'SPORTS SAFETY', 
      icon: HeartPulse, 
      angle: 240, 
      theme: {
        badgeBg: 'bg-rose-50 dark:bg-rose-950/80',
        text: 'text-rose-700 dark:text-rose-300',
        border: 'border-rose-400 dark:border-rose-600',
        iconColor: 'text-rose-600 dark:text-rose-400',
        hover: 'hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-slate-950',
        fill: 'rgba(244, 63, 94, 0.16)',
        stroke: 'rgba(244, 63, 94, 0.35)',
      },
      action: () => openLegalModal('risk') 
    },
    { 
      label: '24/7 SUPPORT', 
      icon: PhoneCall, 
      angle: 300, 
      theme: {
        badgeBg: 'bg-cyan-50 dark:bg-cyan-950/80',
        text: 'text-cyan-700 dark:text-cyan-300',
        border: 'border-cyan-400 dark:border-cyan-600',
        iconColor: 'text-cyan-600 dark:text-cyan-400',
        hover: 'hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950',
        fill: 'rgba(6, 182, 212, 0.16)',
        stroke: 'rgba(6, 182, 212, 0.35)',
      },
      action: () => openCallModal() 
    },
  ];

  // Ring 2: Middle ring orbiting nodes (Anti-Clockwise) - Radius 240px (Multi-Colored)
  const middleNodes = [
    { 
      id: 'm1', 
      label: 'Arena Wallet', 
      icon: CreditCard, 
      angle: 0, 
      tag: 'PIN Protected', 
      iconBg: 'bg-purple-500/15 text-purple-600 dark:text-purple-400 group-hover/mid:bg-purple-500 group-hover/mid:text-white',
      tagBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
      borderHover: 'hover:border-purple-500 hover:shadow-purple-500/25',
      action: () => openLegalModal('terms') 
    },
    { 
      id: 'm2', 
      label: 'Instant QR Entry', 
      icon: Zap, 
      angle: 45, 
      tag: 'Fast Check-In', 
      iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover/mid:bg-emerald-500 group-hover/mid:text-white',
      tagBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
      borderHover: 'hover:border-emerald-500 hover:shadow-emerald-500/25',
      action: () => {} 
    },
    { 
      id: 'm3', 
      label: 'AWS S3 Cloud', 
      icon: Lock, 
      angle: 90, 
      tag: 'AES-256 Storage', 
      iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover/mid:bg-amber-500 group-hover/mid:text-white',
      tagBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
      borderHover: 'hover:border-amber-500 hover:shadow-amber-500/25',
      action: () => openLegalModal('privacy') 
    },
    { 
      id: 'm4', 
      label: '5G Synthetic Turf', 
      icon: Footprints, 
      angle: 135, 
      tag: 'ARENA Quality', 
      iconBg: 'bg-teal-500/15 text-teal-600 dark:text-teal-400 group-hover/mid:bg-teal-500 group-hover/mid:text-white',
      tagBg: 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800',
      borderHover: 'hover:border-teal-500 hover:shadow-teal-500/25',
      action: () => openLegalModal('risk') 
    },
    { 
      id: 'm5', 
      label: '4-Hr Full Refund', 
      icon: RefreshCw, 
      angle: 180, 
      tag: '100% Wallet Return', 
      iconBg: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 group-hover/mid:bg-blue-500 group-hover/mid:text-white',
      tagBg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
      borderHover: 'hover:border-blue-500 hover:shadow-blue-500/25',
      action: () => openLegalModal('terms') 
    },
    { 
      id: 'm6', 
      label: '350+ LUX LED', 
      icon: Sparkles, 
      angle: 225, 
      tag: 'Night Matches', 
      iconBg: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 group-hover/mid:bg-yellow-500 group-hover/mid:text-white',
      tagBg: 'bg-yellow-100 dark:bg-yellow-950/60 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800',
      borderHover: 'hover:border-yellow-500 hover:shadow-yellow-500/25',
      action: () => {} 
    },
    { 
      id: 'm7', 
      label: 'Arena Support Bot', 
      icon: Bot, 
      angle: 270, 
      tag: 'Live Chat AI', 
      iconBg: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 group-hover/mid:bg-cyan-500 group-hover/mid:text-white',
      tagBg: 'bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800',
      borderHover: 'hover:border-cyan-500 hover:shadow-cyan-500/25',
      action: () => openChat() 
    },
    { 
      id: 'm8', 
      label: 'MVP Match Playback', 
      icon: Award, 
      angle: 315, 
      tag: 'HD Video Clips', 
      iconBg: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 group-hover/mid:bg-rose-500 group-hover/mid:text-white',
      tagBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
      borderHover: 'hover:border-rose-500 hover:shadow-rose-500/25',
      action: () => openLegalModal('privacy') 
    },
  ];

  // Ring 3: Outer ring orbiting nodes (Clockwise) - Radius 335px (Multi-Colored)
  const outerNodes = [
    { id: 'o1', label: '256-Bit SSL', icon: Lock, angle: 0, color: 'text-blue-500', hoverBorder: 'hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400', action: () => openLegalModal('privacy') },
    { id: 'o2', label: '1800-123-4567', icon: PhoneCall, angle: 30, color: 'text-emerald-500', hoverBorder: 'hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400', action: () => openCallModal() },
    { id: 'o3', label: 'Rubber Studs TF', icon: Footprints, angle: 60, color: 'text-teal-500', hoverBorder: 'hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400', action: () => openLegalModal('risk') },
    { id: 'o4', label: 'Free 50+ Parking', icon: CheckCircle2, angle: 90, color: 'text-indigo-500', hoverBorder: 'hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400', action: () => {} },
    { id: 'o5', label: 'Beside Zora Mall', icon: MapPin, angle: 120, color: 'text-rose-500', hoverBorder: 'hover:border-rose-500 hover:text-rose-600 dark:hover:text-rose-400', action: () => {} },
    { id: 'o6', label: 'AC Locker Rooms', icon: CheckCircle2, angle: 150, color: 'text-cyan-500', hoverBorder: 'hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400', action: () => {} },
    { id: 'o7', label: 'Risk Disclosure', icon: AlertTriangle, angle: 180, color: 'text-orange-500', hoverBorder: 'hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400', action: () => openLegalModal('risk') },
    { id: 'o8', label: 'Terms of Use', icon: FileText, angle: 210, color: 'text-purple-500', hoverBorder: 'hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400', action: () => openLegalModal('terms') },
    { id: 'o9', label: 'Botivate Engine', icon: Sparkles, angle: 240, color: 'text-pink-500', hoverBorder: 'hover:border-pink-500 hover:text-pink-600 dark:hover:text-pink-400', action: () => {} },
    { id: 'o10', label: 'Sub-Base Drainage', icon: CheckCircle2, angle: 270, color: 'text-green-500', hoverBorder: 'hover:border-green-500 hover:text-green-600 dark:hover:text-green-400', action: () => openLegalModal('risk') },
    { id: 'o11', label: '6 AM - Midnight', icon: Clock, angle: 300, color: 'text-amber-500', hoverBorder: 'hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400', action: () => {} },
    { id: 'o12', label: 'Player OVR Rating', icon: Award, angle: 330, color: 'text-yellow-500', hoverBorder: 'hover:border-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400', action: () => openLegalModal('privacy') },
  ];

  return (
    <div className="w-full py-8 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden select-none">
      
      {/* Background Soft Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* Header Title */}
      <div className="text-center mb-6 sm:mb-8 relative z-10 px-4">
        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          All Stars Arena System
        </h3>
      </div>

      {/* 3D Perspective Stage Container */}
      <div 
        className="relative w-[270px] h-[270px] min-[350px]:w-[310px] min-[350px]:h-[310px] min-[400px]:w-[350px] min-[400px]:h-[350px] min-[480px]:w-[440px] min-[480px]:h-[440px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] lg:w-[740px] lg:h-[740px] flex items-center justify-center max-w-full"
        style={{ perspective: 1200 }}
      >
        {/* Responsive Scale Wrapper - Continuous Rotation (Cursor hover does not snap or interrupt) */}
        <div 
          className="relative w-[740px] h-[740px] flex items-center justify-center scale-[0.35] min-[350px]:scale-[0.41] min-[400px]:scale-[0.46] min-[480px]:scale-[0.58] sm:scale-[0.70] md:scale-[0.88] lg:scale-100 transition-transform origin-center shrink-0"
        >

          {/* Dotted Concentric Guide Rings with Multi-Color Accent Tints */}
          <div className="absolute w-[290px] h-[290px] rounded-full border border-dashed border-emerald-500/30 dark:border-emerald-500/25 pointer-events-none" />
          <div className="absolute w-[480px] h-[480px] rounded-full border border-dashed border-sky-500/30 dark:border-sky-500/25 pointer-events-none" />
          <div className="absolute w-[670px] h-[670px] rounded-full border border-dashed border-purple-400/30 dark:border-purple-500/25 pointer-events-none" />

          {/* Radiating Axis Lines (Radar Grid) */}
          {[0, 45, 90, 135].map((deg) => (
            <div
              key={deg}
              className="absolute w-[700px] h-[1px] bg-gradient-to-r from-transparent via-slate-200/60 dark:via-emerald-950/40 to-transparent pointer-events-none"
              style={{ transform: `rotate(${deg}deg)` }}
            />
          ))}

          {/* ============================================================ */}
          {/* RING 3 (OUTER ORBIT): CLOCKWISE ROTATION (GENTLE SLOW 110s)  */}
          {/* ============================================================ */}
          <div
            key={`ring3-${orbitCycle}`}
            ref={ring3Ref}
            className={`absolute w-[670px] h-[670px] rounded-full flex items-center justify-center pointer-events-none ${
              isRewinding ? '' : 'animate-orbit-cw-slow'
            }`}
          >
            {outerNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 335;
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Counter-rotation keeps badge perfectly upright */}
                  <div
                    className={`counter-badge ${
                      isRewinding ? '' : 'animate-counter-orbit-cw-slow'
                    }`}
                  >
                    <button
                      onClick={node.action}
                      onMouseEnter={() => setActiveHoverNode(node.label)}
                      onMouseLeave={() => setActiveHoverNode(null)}
                      className={`group/badge px-2.5 py-1.5 rounded-full bg-white/95 dark:bg-[#03231c]/95 border border-slate-200 dark:border-emerald-800/60 shadow-lg shadow-black/5 dark:shadow-black/40 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:scale-110 ${node.hoverBorder} hover:bg-emerald-50 dark:hover:bg-slate-900 transition-all cursor-pointer whitespace-nowrap`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${node.color} group-hover/badge:scale-110 transition-transform`} />
                      <span>{node.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* RING 2 (MIDDLE ORBIT): ANTI-CLOCKWISE ROTATION (SMOOTH 75s)  */}
          {/* ============================================================ */}
          <div
            key={`ring2-${orbitCycle}`}
            ref={ring2Ref}
            className={`absolute w-[480px] h-[480px] rounded-full flex items-center justify-center pointer-events-none ${
              isRewinding ? '' : 'animate-orbit-ccw-medium'
            }`}
          >
            {middleNodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 240;
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Counter-rotation for Anti-Clockwise ring */}
                  <div
                    className={`counter-badge ${
                      isRewinding ? '' : 'animate-counter-orbit-ccw-medium'
                    }`}
                  >
                    <button
                      onClick={node.action}
                      onMouseEnter={() => setActiveHoverNode(node.label)}
                      onMouseLeave={() => setActiveHoverNode(null)}
                      className={`group/mid p-2.5 rounded-2xl bg-white/95 dark:bg-[#042d24]/95 border border-slate-200 dark:border-emerald-700/60 shadow-xl shadow-black/10 dark:shadow-emerald-950/40 flex items-center gap-2 hover:scale-115 ${node.borderHover} transition-all cursor-pointer whitespace-nowrap`}
                    >
                      <div className={`w-7 h-7 rounded-xl ${node.iconBg} flex items-center justify-center transition-colors`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left leading-tight pr-1">
                        <span className="block text-xs font-black text-slate-900 dark:text-white group-hover/mid:text-sport-500 transition-colors">
                          {node.label}
                        </span>
                        <span className={`inline-block px-1.5 py-0.2 rounded-md text-[9px] font-bold mt-0.5 ${node.tagBg}`}>
                          {node.tag}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* RING 1 (INNER SECTOR RING): CLOCKWISE ROTATION (SLOW 55s)    */}
          {/* ============================================================ */}
          <div
            key={`ring1-${orbitCycle}`}
            ref={ring1Ref}
            className={`absolute w-[290px] h-[290px] rounded-full flex items-center justify-center pointer-events-none ${
              isRewinding ? '' : 'animate-orbit-cw-fast'
            }`}
          >
            {/* Multi-Colored SVG Donut Backdrop Pie Wedges */}
            <svg className="absolute w-[290px] h-[290px] pointer-events-none" viewBox="0 0 290 290">
              {innerSectors.map((sector, idx) => (
                <path
                  key={idx}
                  d={getDonutSlicePath(145, 145, 58, 142, sector.angle - 28, sector.angle + 28)}
                  fill={sector.theme.fill}
                  stroke={sector.theme.stroke}
                  strokeWidth="1.2"
                  className="transition-colors duration-300"
                />
              ))}
            </svg>

            {/* Orbiting Sector Badges */}
            {innerSectors.map((sector, idx) => {
              const rad = (sector.angle * Math.PI) / 180;
              const r = 145;
              const x = r * Math.cos(rad);
              const y = r * Math.sin(rad);
              const Icon = sector.icon;

              return (
                <div
                  key={idx}
                  className="absolute pointer-events-auto"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                >
                  {/* Counter-rotation keeps label readable */}
                  <div
                    className={`counter-badge ${
                      isRewinding ? '' : 'animate-counter-orbit-cw-fast'
                    }`}
                  >
                    <button
                      onClick={sector.action}
                      onMouseEnter={() => setActiveHoverNode(sector.label)}
                      onMouseLeave={() => setActiveHoverNode(null)}
                      className={`px-3 py-1.5 rounded-xl ${sector.theme.badgeBg} ${sector.theme.text} ${sector.theme.border} border shadow-md flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider ${sector.theme.hover} transition-all cursor-pointer whitespace-nowrap`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${sector.theme.iconColor}`} />
                      <span>{sector.label}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============================================================ */}
          {/* CENTER HUB: ADAPTIVE LIGHT/DARK MODE REWIND BUTTON HUB       */}
          {/* ============================================================ */}
          <div className="relative z-30 flex items-center justify-center">
            
            {/* Outer Pulsing Aura Ring */}
            <div className={`absolute w-36 h-36 rounded-full border-2 border-sport-500/30 dark:border-sport-500/40 ${isRewinding ? 'scale-125 opacity-100 border-sport-500 ring-4 ring-sport-400/20' : 'animate-ping [animation-duration:3.5s] opacity-30'} pointer-events-none`} />
            <div className="absolute w-32 h-32 rounded-full bg-sport-500/15 dark:bg-sport-500/20 blur-xl pointer-events-none" />

            {/* Central Interactive Click Hub (Light Mode & Dark Mode Adaptive) */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleCenterClick}
              className={`relative w-[116px] h-[116px] rounded-full bg-white dark:bg-slate-950 border-4 ${
                isRewinding 
                  ? 'border-sport-500 shadow-2xl shadow-sport-500/50 scale-105 ring-4 ring-sport-400/30' 
                  : 'border-sport-500/90 dark:border-sport-400 shadow-xl shadow-sport-500/25 dark:shadow-sport-500/40'
              } flex flex-col items-center justify-center p-2 text-center cursor-pointer group focus:outline-none transition-all`}
              aria-label="Reset and Rewind Radar Animation"
            >
              {/* Inner soft gradient highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-sport-500/10 via-transparent to-transparent pointer-events-none" />

              {/* Official All Stars Arena Brand Logo */}
              <img
                src="/assets/images/all_stars_arena_logo.png"
                alt="All Stars Arena Logo"
                className="h-10 sm:h-12 w-auto max-w-[62px] object-contain transition-transform duration-200 group-hover:scale-110 dark:brightness-0 dark:invert drop-shadow-sm relative z-10"
                onError={(e) => {
                  e.currentTarget.src = '/all_stars_arena_logo.png';
                }}
              />

              {/* Brand Title: High Contrast in Light & Dark Mode */}
              <div className="font-black text-[10px] uppercase tracking-tight leading-tight text-slate-900 dark:text-white group-hover:text-sport-600 dark:group-hover:text-sport-400 transition-colors mt-1 relative z-10">
                ALL STARS <span className="text-sport-600 dark:text-sport-400">ARENA</span>
              </div>
            </motion.button>
          </div>

        </div>
      </div>

      {/* Real-time Hover Feedback / Control Strip */}
      <div className="mt-4 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400 px-3 max-w-lg mx-auto">
        {activeHoverNode ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-sport-500/10 border border-sport-500/30 text-sport-600 dark:text-sport-400 animate-pulse text-center">
            <span className="w-2 h-2 rounded-full bg-sport-500 shrink-0" />
            <span className="break-words">Active Sector: <strong>{activeHoverNode}</strong> (Click to view details)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 text-center leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-sport-500 shrink-0" />
            <span>Tip: Click any node to view details • Click the center ALL STARS ARENA button to rewind!</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default ArenaEcosystemRadar;
