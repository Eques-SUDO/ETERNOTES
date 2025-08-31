import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  size?: 'default' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = memo(({
  children,
  variant = 'primary',
  size = 'default',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center gap-3 font-semibold font-heading rounded-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary via-jamhouse-navy to-jamhouse-darkNavy text-accent hover:shadow-glow',
    outline: 'border-2 border-primary/50 backdrop-blur-sm bg-primary/10 text-accent hover:border-jamhouse-gold hover:shadow-glow',
  };
  
  const sizeClasses = {
    default: 'px-8 py-4 text-base',
    large: 'px-12 py-5 text-lg',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;