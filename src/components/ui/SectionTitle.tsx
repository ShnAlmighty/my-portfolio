import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * SectionTitle component for consistent section headings
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  // Text alignment styles
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      }
    }
  };

  return (
    <div className={`mb-12 sm:mb-16 lg:mb-20 ${alignStyles[align]} ${className}`}>
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4 sm:mb-6"
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-text-secondary max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className="h-1 w-16 sm:w-20 lg:w-24 bg-primary-600 mt-6 sm:mt-8"
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? 96 : 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}
      />
    </div>
  );
};

export default SectionTitle;