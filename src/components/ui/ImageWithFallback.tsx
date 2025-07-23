'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User, ImageOff } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackType?: 'user' | 'image' | 'custom';
  fallbackContent?: React.ReactNode;
  priority?: boolean;
}

/**
 * Image component with fallback handling for missing images
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackType = 'image',
  fallbackContent,
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const renderFallback = () => {
    if (fallbackContent) {
      return fallbackContent;
    }

    const iconSize = Math.min(width || 100, height || 100) * 0.4;
    const iconClass = "text-text-secondary";

    switch (fallbackType) {
      case 'user':
        return (
          <div className={`flex items-center justify-center bg-background-light ${className}`}>
            <User size={iconSize} className={iconClass} />
          </div>
        );
      case 'image':
      default:
        return (
          <div className={`flex items-center justify-center bg-background-light ${className}`}>
            <ImageOff size={iconSize} className={iconClass} />
          </div>
        );
    }
  };

  if (hasError) {
    return renderFallback();
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center bg-background-light animate-pulse ${className}`}>
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        priority={priority}
      />
    </div>
  );
};

export default ImageWithFallback;