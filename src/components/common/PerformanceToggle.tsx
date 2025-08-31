import React from 'react';
import { usePerformance } from '../../contexts/PerformanceContext';
import { FaBolt, FaBatteryHalf, FaCog } from 'react-icons/fa';

const PerformanceToggle: React.FC = () => {
  const { performanceMode, setPerformanceMode, effectiveMode } = usePerformance();

  const modes = [
    { value: 'auto', icon: FaCog, label: 'Auto' },
    { value: 'high', icon: FaBolt, label: 'High' },
    { value: 'low', icon: FaBatteryHalf, label: 'Low' }
  ] as const;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-dark-surface/90 backdrop-blur-md rounded-full p-2 border border-primary/20">
      <div className="flex items-center gap-1">
        {modes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setPerformanceMode(value as any)}
            className={`p-2 rounded-full transition-all duration-300 ${
              performanceMode === value
                ? 'bg-primary text-dark-bg'
                : 'text-text-secondary hover:text-primary hover:bg-primary/10'
            }`}
            title={`${label} Performance${value === 'auto' ? ` (Currently: ${effectiveMode})` : ''}`}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PerformanceToggle;