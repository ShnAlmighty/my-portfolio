'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'hover' | 'interactive';
  onClick?: () => void;
}

/**
 * Card component with hover effects
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  onClick
}) => {
  // Base styles for all cards
  const baseStyles = 'rounded-lg bg-surface p-6 shadow-md';
  
  // Variant-specific styles
  const variantStyles = {
    default: '',
    hover: 'transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]',
    interactive: 'transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] cursor-pointer hover:border-primary-500 border-2 border-transparent',
  };
  
  // Animation variants
  const animations = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 }
  };

  return (
    <motion.div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      initial={animations.initial}
      animate={animations.animate}
      transition={animations.transition}
    >
      {children}
    </motion.div>
  );
};

export default Card;