import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'relative overflow-hidden font-semibold rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-nova-gradient text-white hover:shadow-neon-lg',
    secondary: 'bg-primary/20 text-nova-neon hover:bg-primary/30',
    outline: 'border-2 border-primary/60 bg-primary/10 text-white hover:border-nova-neon'
  };
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Ripple effect on click */}
      <motion.span
        className="absolute inset-0 rounded-2xl"
        initial={{ scale: 0, opacity: 0.5 }}
        whileHover={{
          scale: 2,
          opacity: 0,
          transition: { duration: 0.5 }
        }}
        style={{
          background: 'radial-gradient(circle, rgba(232,145,255,0.3) 0%, transparent 70%)'
        }}
      />
      
      {/* Button content */}
      <motion.span 
        className="relative z-10 flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
      >
        {children}
      </motion.span>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 -top-2 h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        initial={{ x: '-200%' }}
        whileHover={{
          x: '200%',
          transition: { duration: 0.5 }
        }}
      />
    </motion.button>
  );
};

export default AnimatedButton;