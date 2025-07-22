/**
 * Responsive design utilities and breakpoint helpers
 */

// Tailwind CSS breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Mobile-first responsive classes
export const responsiveClasses = {
  // Container classes
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  
  // Grid classes
  gridCols: {
    responsive: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    twoCol: 'grid-cols-1 lg:grid-cols-2',
    threeCol: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    fourCol: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  },
  
  // Text sizes
  textSize: {
    hero: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    heading: 'text-2xl sm:text-3xl md:text-4xl',
    subheading: 'text-xl sm:text-2xl md:text-3xl',
    body: 'text-base sm:text-lg',
    small: 'text-sm sm:text-base',
  },
  
  // Spacing
  spacing: {
    section: 'py-12 sm:py-16 md:py-20 lg:py-24',
    element: 'mb-6 sm:mb-8 md:mb-12',
    gap: 'gap-4 sm:gap-6 md:gap-8',
  },
  
  // Flex and layout
  flex: {
    responsive: 'flex-col sm:flex-row',
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
  },
} as const;

// Hook for detecting mobile devices
export const useIsMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Utility function to combine responsive classes
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Mobile touch optimization classes
export const touchOptimized = {
  button: 'min-h-[44px] min-w-[44px] touch-manipulation',
  link: 'min-h-[44px] touch-manipulation',
  input: 'min-h-[44px] touch-manipulation',
} as const;

// Responsive image classes
export const imageClasses = {
  responsive: 'w-full h-auto',
  cover: 'w-full h-full object-cover',
  contain: 'w-full h-full object-contain',
} as const;