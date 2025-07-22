import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'category';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Badge component for technology tags and categories
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  // Base styles for all badges
  const baseStyles = 'inline-flex items-center rounded-full font-medium';
  
  // Variant-specific styles
  const variantStyles = {
    default: 'bg-background-light text-text-secondary',
    primary: 'bg-primary-600/20 text-primary-500',
    secondary: 'bg-secondary-600/20 text-secondary-500',
    outline: 'bg-transparent border border-text-muted text-text-secondary',
    category: 'bg-accent/20 text-accent font-semibold',
  };
  
  // Size-specific styles
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  // Combine all styles
  const badgeStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <span className={badgeStyles}>
      {children}
    </span>
  );
};

export default Badge;