import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion, useDevicePerformance } from '../../hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleBackgroundProps {
  count?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  count = 20,
  className = '' 
}) => {
  const reducedMotion = useReducedMotion();
  const isLowEnd = useDevicePerformance();
  
  // Reduce particle count based on device performance
  const adjustedCount = reducedMotion ? 0 : isLowEnd ? Math.min(5, count) : Math.min(10, count);
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: adjustedCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 5
    }));
  }, [adjustedCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-nova-neon/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            opacity: [0.1, 0.3, 0.1, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Musical notes floating - skip on low-end devices */}
      {!isLowEnd && !reducedMotion && ['♪', '♫'].map((note, i) => (
        <motion.div
          key={`note-${i}`}
          className="absolute text-nova-neon/10 text-2xl"
          style={{
            left: `${20 + i * 20}%`,
            top: `${80 + Math.random() * 20}%`,
          }}
          animate={{
            y: [-20, -200],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 3,
          }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;