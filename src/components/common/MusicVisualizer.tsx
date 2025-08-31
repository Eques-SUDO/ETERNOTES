import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface MusicVisualizerProps {
  isPlaying?: boolean;
  bars?: number;
  className?: string;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ 
  isPlaying = true, 
  bars = 5,
  className = ''
}) => {
  const barVariants = useMemo(() => ({
    playing: (i: number) => ({
      height: ['20%', '100%', '20%'],
      transition: {
        duration: 0.5 + (i * 0.1),
        repeat: Infinity,
        ease: 'easeInOut',
        delay: i * 0.1
      }
    }),
    stopped: {
      height: '20%',
      transition: {
        duration: 0.3
      }
    }
  }), []);

  return (
    <div className={`flex items-end justify-center gap-1 h-12 ${className}`}>
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-nova-neon to-primary rounded-full"
          custom={i}
          animate={isPlaying ? 'playing' : 'stopped'}
          variants={barVariants}
          style={{ 
            minHeight: '4px',
            opacity: 0.6 + (i * 0.1)
          }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;