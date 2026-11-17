import { useState, useEffect, useRef } from 'react';

export function useFootballAnimation() {
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  });

  useEffect(() => {
    // Reduced motion listener
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMotionChange = (e) => setReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionChange);
    }

    // Mouse movement listener
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / innerHeight) * 2 + 1;
    };

    // Touch movement listener for mobile & tablets
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        mouseRef.current.targetX = (touch.clientX / innerWidth) * 2 - 1;
        mouseRef.current.targetY = -(touch.clientY / innerHeight) * 2 + 1;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    // Scroll listener
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      scrollRef.current.targetY = Math.min(1, scrollY / 600);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionChange);
      }
    };
  }, []);

  return { mouseRef, scrollRef, reducedMotion };
}

export default useFootballAnimation;
