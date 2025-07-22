'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  icon,
  fullWidth = false,
}) => {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800',
    ghost: 'bg-transparent hover:bg-background-light text-text-primary hover:text-text-primary border border-text-muted hover:border-text-secondary',
  };
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 h-8',
    md: 'text-base px-4 py-2 h-10',
    lg: 'text-lg px-6 py-3 h-12',
  };

  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';

  // Animation properties
  const buttonAnimation = {
    tap: { scale: 0.98 },
  };

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  // If href is provided, render as Link
  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <Link href={href} {...linkProps} passHref>
        <motion.a
          className={buttonStyles}
          whileTap={buttonAnimation.tap}
          onClick={onClick}
        >
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </motion.a>
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <motion.button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      whileTap={buttonAnimation.tap}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;