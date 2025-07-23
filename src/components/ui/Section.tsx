import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  fullHeight?: boolean;
}

/**
 * Section component for consistent spacing and layout
 */
export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  fullHeight = false,
}) => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`py-16 sm:py-20 md:py-24 lg:py-28 ${fullHeight ? 'min-h-screen' : ''} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;