"use client";
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with configuration from memory
    const lenis = new Lenis({
      duration: 1, // 1 second as specified in memory
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // Easing function from memory
      smoothWheel: true,
      touchMultiplier: 0, // Disable on touch devices for better performance
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Initialize with slight delay to prevent conflicts (from memory)
    const initTimer = setTimeout(() => {
      requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(initTimer);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1,
      });
    }
  };

  return { scrollTo, lenis: lenisRef.current };
};