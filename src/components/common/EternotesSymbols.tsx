import React from 'react';

interface EternotesSymbolsProps {
  density?: 'minimal' | 'light';
}

const EternotesSymbols: React.FC<EternotesSymbolsProps> = ({
  density = 'minimal'
}) => {
  const getSymbolCount = () => {
    switch (density) {
      case 'minimal': return 3;
      case 'light': return 5;
      default: return 3;
    }
  };

  const symbols = [];
  const symbolCount = getSymbolCount();

  // Only infinity symbols for performance
  for (let i = 0; i < symbolCount; i++) {
    const positions = ['symbol-top-right', 'symbol-bottom-left', 'symbol-top-left', 'symbol-bottom-right', 'symbol-center'];
    const sizes = ['small', '', 'small', '', 'small'];
    
    symbols.push(
      <div
        key={`infinity-${i}`}
        className={`symbol-decoration ${positions[i]} ${sizes[i]} infinity-float`}
        style={{ 
          animationDelay: `${i * 3}s`,
          opacity: 0.3
        }}
      >
        ∞
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols}
    </div>
  );
};

export default EternotesSymbols;