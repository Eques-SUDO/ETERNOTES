import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowImage {
  src: string;
  alt: string;
}

interface SplitScreenSlideshowProps {
  images: SlideshowImage[];
  interval?: number;
  className?: string;
}

const SplitScreenSlideshow: React.FC<SplitScreenSlideshowProps> = memo(({
  images,
  interval = 4000,
  className = ""
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'horizontal' | 'vertical' | 'diagonal'>('horizontal');

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      // Randomly change wipe direction for variety
      const directions: ('horizontal' | 'vertical' | 'diagonal')[] = ['horizontal', 'vertical', 'diagonal'];
      setDirection(directions[Math.floor(Math.random() * directions.length)]);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  const getWipeVariants = () => {
    switch (direction) {
      case 'horizontal':
        return {
          initial: { x: '100%' },
          animate: { x: '0%' },
          exit: { x: '-100%' }
        };
      case 'vertical':
        return {
          initial: { y: '100%' },
          animate: { y: '0%' },
          exit: { y: '-100%' }
        };
      case 'diagonal':
        return {
          initial: { x: '100%', y: '100%' },
          animate: { x: '0%', y: '0%' },
          exit: { x: '-100%', y: '-100%' }
        };
      default:
        return {
          initial: { x: '100%' },
          animate: { x: '0%' },
          exit: { x: '-100%' }
        };
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={getWipeVariants()}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth feel
          }}
        >
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>
      
      {/* Optional dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-nova-neon' : 'bg-white/30'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

SplitScreenSlideshow.displayName = 'SplitScreenSlideshow';

export default SplitScreenSlideshow;