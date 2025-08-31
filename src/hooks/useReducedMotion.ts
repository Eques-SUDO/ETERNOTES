import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
};

export const useDevicePerformance = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check device capabilities
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    
    // Consider device low-end if it has 4 or fewer cores or 4GB or less RAM
    setIsLowEnd(cores <= 4 || memory <= 4);
  }, []);

  return isLowEnd;
};