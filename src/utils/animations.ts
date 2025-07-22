/**
 * Animation utilities and variants for Framer Motion
 */

import { Variants } from 'framer-motion';

// Common easing functions
export const easings = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const;

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: easings.easeOut }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: easings.easeIn }
  },
};

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Fade in variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
};

// Slide up variants
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
};

// Scale in variants
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: easings.bounce }
  },
};

// Rotate in variants
export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0,
    transition: { duration: 0.6, ease: easings.easeOut }
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2, ease: easings.easeOut }
};

export const hoverLift = {
  y: -5,
  transition: { duration: 0.2, ease: easings.easeOut }
};

export const hoverGlow = {
  boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)',
  transition: { duration: 0.3, ease: easings.easeOut }
};

// Tap animations
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Loading animations
export const pulse: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

export const spin: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Text animations
export const typewriter = {
  hidden: { width: 0 },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: easings.easeOut
    }
  }
};

// Progress bar animation
export const progressBar: Variants = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: {
      duration: 1.5,
      ease: easings.easeOut,
      delay: 0.5
    }
  })
};

// Floating animation
export const floating: Variants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

// Parallax scroll variants
export const parallaxVariants = {
  slow: { y: '-20%' },
  medium: { y: '-40%' },
  fast: { y: '-60%' }
};

// Card hover variants
export const cardHover: Variants = {
  rest: { 
    scale: 1,
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },
  hover: { 
    scale: 1.02,
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { duration: 0.3, ease: easings.easeOut }
  }
};

// Button variants
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: easings.easeOut }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Navigation variants
export const navVariants: Variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: easings.easeOut }
  }
};

// Modal variants
export const modalVariants: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: easings.easeOut
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: { 
      duration: 0.2,
      ease: easings.easeIn
    }
  }
};

// Backdrop variants
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};