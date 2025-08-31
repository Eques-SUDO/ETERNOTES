import React, { createContext, useContext, useState, useEffect } from 'react';

interface PerformanceContextType {
  performanceMode: 'auto' | 'high' | 'low';
  setPerformanceMode: (mode: 'auto' | 'high' | 'low') => void;
  effectiveMode: 'high' | 'low';
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [performanceMode, setPerformanceMode] = useState<'auto' | 'high' | 'low'>('auto');
  const [effectiveMode, setEffectiveMode] = useState<'high' | 'low'>('high');

  useEffect(() => {
    if (performanceMode === 'auto') {
      // Auto-detect performance capabilities
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Set to low if device has limited resources or user prefers reduced motion
      setEffectiveMode(
        cores <= 4 || memory <= 4 || prefersReducedMotion ? 'low' : 'high'
      );
    } else {
      setEffectiveMode(performanceMode);
    }

    // Store preference in localStorage
    localStorage.setItem('performanceMode', performanceMode);
  }, [performanceMode]);

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('performanceMode') as 'auto' | 'high' | 'low' | null;
    if (saved) {
      setPerformanceMode(saved);
    }
  }, []);

  return (
    <PerformanceContext.Provider value={{ performanceMode, setPerformanceMode, effectiveMode }}>
      {children}
    </PerformanceContext.Provider>
  );
};