'use client';

import React from 'react';
import Image from 'next/image';

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
  const imageProps = {
    src,
    alt,
    className: `${className} transition-opacity duration-300`,
    priority,
    sizes,
    ...(fill 
      ? { fill: true } 
      : { width: width || 800, height: height || 600 }
    ),
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      <Image
        {...imageProps}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onLoad={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onError={(e) => {
          e.currentTarget.style.opacity = '0.5';
        }}
      />
    </div>
  );
};

export default ResponsiveImage;