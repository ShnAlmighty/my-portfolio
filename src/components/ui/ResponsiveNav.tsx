'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveNavProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive navigation wrapper that handles mobile/desktop differences
 */
export const ResponsiveNav: React.FC<ResponsiveNavProps> = ({
  children,
  className = '',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    checkMobile();
    handleScroll();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div
      className={`${className} ${
        isMobile 
          ? 'fixed bottom-0 left-0 right-0 z-50 bg-background-light border-t border-background p-4' 
          : ''
      } ${isScrolled && isMobile ? 'shadow-lg' : ''}`}
      initial={isMobile ? { y: 100 } : { y: 0 }}
      animate={isMobile ? { y: 0 } : { y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ResponsiveNav;