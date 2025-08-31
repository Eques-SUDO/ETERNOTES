import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';

interface ScrollAnimationOptions {
  offset?: [string, string];
  outputRange?: [number, number];
}

interface ScrollAnimations {
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  blur: MotionValue<number>;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}): ScrollAnimations => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset || ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [100, 0, 0, -100]
  );

  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [10, 0, 0, 10]
  );

  return {
    scrollYProgress,
    opacity,
    scale,
    y,
    blur
  };
};

export const useParallax = (offset: number = 50): MotionValue<number> => {
  const { scrollY } = useScroll();
  return useTransform(scrollY, [0, 1000], [0, offset]);
};