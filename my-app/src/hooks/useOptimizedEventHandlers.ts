import { useCallback, useRef } from 'react';

// Custom hook for optimized event handlers with debouncing and throttling
export const useOptimizedEventHandlers = () => {
  const debounceTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const throttleTimestamps = useRef<{ [key: string]: number }>({});

  const debounce = useCallback((
    fn: (...args: any[]) => void,
    delay: number,
    key: string = 'default'
  ) => {
    return (...args: any[]) => {
      if (debounceTimeouts.current[key]) {
        clearTimeout(debounceTimeouts.current[key]);
      }
      
      debounceTimeouts.current[key] = setTimeout(() => {
        fn(...args);
        delete debounceTimeouts.current[key];
      }, delay);
    };
  }, []);

  const throttle = useCallback((
    fn: (...args: any[]) => void,
    delay: number,
    key: string = 'default'
  ) => {
    return (...args: any[]) => {
      const now = Date.now();
      const lastExecution = throttleTimestamps.current[key] || 0;
      
      if (now - lastExecution >= delay) {
        throttleTimestamps.current[key] = now;
        fn(...args);
      }
    };
  }, []);

  // Optimized scroll handler
  const optimizedScroll = useCallback((handler: () => void) => {
    return throttle(handler, 16, 'scroll'); // ~60fps
  }, [throttle]);

  // Optimized resize handler
  const optimizedResize = useCallback((handler: () => void) => {
    return debounce(handler, 250, 'resize');
  }, [debounce]);

  // Optimized input handler
  const optimizedInput = useCallback((handler: (value: string) => void) => {
    return debounce(handler, 300, 'input');
  }, [debounce]);

  return {
    debounce,
    throttle,
    optimizedScroll,
    optimizedResize,
    optimizedInput
  };
};