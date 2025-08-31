import React, { useMemo } from 'react';
import '../../styles/lighting-effects.css';

const LightingEffects: React.FC = () => {
  const lightingElements = useMemo(() => {
    const elements: JSX.Element[] = [];
    
    // Add animated light beams
    for (let i = 0; i < 3; i++) {
      elements.push(
        <div
          key={`beam-${i}`}
          className="light-beam"
          style={{
            left: `${15 + i * 30}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      );
    }
    
    // Add moving spotlights
    for (let i = 0; i < 3; i++) {
      elements.push(
        <div
          key={`spotlight-${i}`}
          className="spotlight"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 25}%`,
            animationDelay: `${i * 5}s`,
          }}
        />
      );
    }
    
    // Add floating light orbs
    for (let i = 0; i < 8; i++) {
      elements.push(
        <div
          key={`orb-${i}`}
          className="light-orb"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${12 + Math.random() * 6}s`,
          }}
        />
      );
    }
    
    // Add pulsing glow effects
    for (let i = 0; i < 3; i++) {
      elements.push(
        <div
          key={`glow-${i}`}
          className="glow-pulse"
          style={{
            top: `${30 + i * 20}%`,
            right: `${5 + i * 15}%`,
            animationDelay: `${i * 2}s`,
          }}
        />
      );
    }
    
    // Add stage lighting effects
    elements.push(
      <div
        key="stage-light-1"
        className="stage-light"
        style={{
          top: '-50px',
          left: '20%',
        }}
      />
    );
    
    elements.push(
      <div
        key="stage-light-2"
        className="stage-light"
        style={{
          top: '-50px',
          right: '20%',
        }}
      />
    );
    
    // Add disco ball reflections
    for (let i = 0; i < 4; i++) {
      elements.push(
        <div
          key={`disco-${i}`}
          className="disco-reflection"
          style={{
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
            animationDelay: `${i}s`,
          }}
        />
      );
    }
    
    return elements;
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Aurora background effect */}
      <div className="aurora-light" />
      
      {/* Rim lighting around edges */}
      <div className="rim-light" />
      
      {/* All lighting elements */}
      {lightingElements}
      
      {/* Additional atmospheric effects */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 40% 90%, rgba(236, 72, 153, 0.06) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Subtle animated noise texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23A855F7' fill-opacity='0.05'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3Ccircle cx='43' cy='43' r='1'/%3E%3Ccircle cx='12' cy='35' r='1'/%3E%3Ccircle cx='25' cy='8' r='1'/%3E%3Ccircle cx='38' cy='51' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 30s infinite linear',
        }}
      />
    </div>
  );
};

export default LightingEffects;