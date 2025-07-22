import React from 'react';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

/**
 * Loading component for skeleton loaders and spinners
 */
export const Loading: React.FC<LoadingProps> = ({
  variant = 'spinner',
  size = 'md',
  className = '',
  text,
}) => {
  // Size-specific styles
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  // Skeleton size styles
  const skeletonSizeStyles = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
  };

  // Render spinner
  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className={`border-4 border-background-light border-t-primary-500 rounded-full animate-spin ${sizeStyles[size]}`} />
        {text && <p className="mt-2 text-text-secondary">{text}</p>}
      </div>
    );
  }

  // Render dots
  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '0ms' }} />
        <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '150ms' }} />
        <div className={`bg-primary-500 rounded-full animate-bounce ${size === 'sm' ? 'h-2 w-2' : size === 'md' ? 'h-3 w-3' : 'h-4 w-4'}`} style={{ animationDelay: '300ms' }} />
        {text && <p className="ml-2 text-text-secondary">{text}</p>}
      </div>
    );
  }

  // Render skeleton
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      <div className={`bg-background-light rounded ${skeletonSizeStyles[size]} w-full`} />
      <div className={`bg-background-light rounded ${skeletonSizeStyles[size]} w-3/4`} />
      <div className={`bg-background-light rounded ${skeletonSizeStyles[size]} w-1/2`} />
    </div>
  );
};

export default Loading;