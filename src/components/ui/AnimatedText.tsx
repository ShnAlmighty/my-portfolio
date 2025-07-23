'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  type?: 'words' | 'characters' | 'lines';
}

/**
 * Animated text reveal component
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  type = 'words',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: type === 'characters' ? 0.03 : 0.1,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  const splitText = () => {
    switch (type) {
      case 'characters':
        return text.split('').map((char, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block"
            style={{ transformOrigin: '50% 100%' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ));
      
      case 'words':
        return text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            variants={itemVariants}
            className="inline-block mr-2"
            style={{ transformOrigin: '50% 100%' }}
          >
            {word}
          </motion.span>
        ));
      
      case 'lines':
        return text.split('\n').map((line, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="block"
            style={{ transformOrigin: '50% 100%' }}
          >
            {line}
          </motion.div>
        ));
      
      default:
        return text;
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {splitText()}
    </motion.div>
  );
};

export default AnimatedText;