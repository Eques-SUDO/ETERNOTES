import React, { useMemo, useEffect, useState } from 'react';
import '../../styles/lighting-effects.css';

interface PerformanceSettings {
  reducedMotion: boolean;
  lowEndDevice: boolean;
  animationCount: number;
}

const OptimizedLightingEffects: React.FC = () => {
  const [performanceSettings, setPerformanceSettings] = useState<PerformanceSettings>({
    reducedMotion: false,
    lowEndDevice: false,
    animationCount: 10
  });

  useEffect(() => {
    // Detect user preferences and device capabilities
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    
    setPerformanceSettings({
      reducedMotion: prefersReducedMotion,
      lowEndDevice: isLowEndDevice,
      animationCount: prefersReducedMotion ? 2 : isLowEndDevice ? 5 : 10
    });
  }, []);

  const optimizedElements = useMemo(() => {
    if (performanceSettings.reducedMotion) {
      // Minimal static effects for users who prefer reduced motion
      return [
        <div key="static-glow" className="aurora-light" style={{ animation: 'none', opacity: 0.1 }} />,
        <div key="rim-light" className="rim-light" style={{ animation: 'none', opacity: 0.2 }} />
      ];
    }

    const elements: JSX.Element[] = [];
    const { animationCount, lowEndDevice } = performanceSettings;
    
    // Aurora background (always include, low cost)
    elements.push(
      <div key="aurora" className="aurora-light" style={{ 
        animationDuration: lowEndDevice ? '40s' : '25s' 
      }} />
    );
    
    // Rim lighting (static, very low cost)
    elements.push(<div key="rim" className="rim-light" />);
    
    // Light beams (limit to 2 for performance)
    for (let i = 0; i < Math.min(2, animationCount / 5); i++) {
      elements.push(
        <div
          key={`beam-${i}`}
          className="light-beam"
          style={{
            left: `${20 + i * 60}%`,
            animationDelay: `${i * 4}s`,
            animationDuration: lowEndDevice ? '12s' : '8s',
          }}
        />
      );
    }
    
    // Light orbs (limit based on device capability)
    const orbCount = lowEndDevice ? 3 : Math.min(6, animationCount);
    for (let i = 0; i < orbCount; i++) {
      elements.push(
        <div
          key={`orb-${i}`}
          className="light-orb"
          style={{
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: `${15 + Math.random() * 5}s`,
          }}
        />
      );
    }
    
    // Spotlights (only on higher-end devices)
    if (!lowEndDevice && animationCount >= 8) {
      for (let i = 0; i < 2; i++) {
        elements.push(
          <div
            key={`spotlight-${i}`}
            className="spotlight"
            style={{
              top: `${30 + i * 20}%`,
              left: `${15 + i * 50}%`,
              animationDelay: `${i * 7}s`,
              animationDuration: '20s',
            }}
          />
        );
      }
    }
    
    return elements;
  }, [performanceSettings]);

  // Don't render anything if user prefers no motion and wants minimal effects
  if (performanceSettings.reducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="aurora-light" style={{ animation: 'none', opacity: 0.1 }} />
        <div className="rim-light" style={{ animation: 'none', opacity: 0.2 }} />
      </div>
    );
  }
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        // Use will-change sparingly and only on animating elements
        willChange: performanceSettings.lowEndDevice ? 'auto' : 'transform, opacity'
      }}
    >
      {optimizedElements}
      
      {/* Simplified atmospheric effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 30% 30%, rgba(155, 77, 224, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)
          `,
        }}
      />
    </div>
  );
};

export default OptimizedLightingEffects;