'use client';

import React, { useEffect, useState } from 'react';

interface MobileOptimizedProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that applies mobile-specific optimizations
 */
export const MobileOptimized: React.FC<MobileOptimizedProps> = ({
  children,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div 
      className={`${className} ${isMobile ? 'touch-manipulation' : ''}`}
      style={{
        WebkitTapHighlightColor: 'transparent',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  );
};

export default MobileOptimized;