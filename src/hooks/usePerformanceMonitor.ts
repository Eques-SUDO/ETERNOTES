import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  isLowPerformance: boolean;
  deviceCapability: 'high' | 'medium' | 'low';
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    isLowPerformance: false,
    deviceCapability: 'high'
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    // Detect device capability
    const detectDeviceCapability = (): 'high' | 'medium' | 'low' => {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      
      if (cores >= 8 && memory >= 8) return 'high';
      if (cores >= 4 && memory >= 4) return 'medium';
      return 'low';
    };

    // Simple FPS counter
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          isLowPerformance: fps < 45, // Consider low if below 45fps
          deviceCapability: detectDeviceCapability()
        }));
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    // Start monitoring after a short delay to allow page to settle
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(measureFPS);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
};