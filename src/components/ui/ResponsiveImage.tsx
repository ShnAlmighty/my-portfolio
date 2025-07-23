'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { generateSizes, generateSrcSet } from '@/utils/imageOptimization';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/**
 * Responsive image component optimized for mobile
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHighDensity, setIsHighDensity] = useState(false);

  useEffect(() => {
    // Check if the device has a high-density display
    if (typeof window !== 'undefined') {
      setIsHighDensity(window.devicePixelRatio > 1);
    }
  }, []);

  const imageProps = {
    src,
    alt,
    className: `${className} transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`,
    priority,
    sizes,
    quality: isHighDensity ? 80 : 75,
    loading: priority ? 'eager' as const : 'lazy' as const,
    ...(fill 
      ? { fill: true } 
      : { width: width || 800, height: height || 600 }
    ),
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background-light animate-pulse">
          <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}
      <Image
        {...imageProps}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
        }}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
      />
    </div>
  );
};

export default ResponsiveImage;