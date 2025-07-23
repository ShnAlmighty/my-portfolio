/**
 * Lazy-loaded section components for better performance
 */
import { lazyLoad } from '@/utils/lazyLoad';

// Lazy load section components
export const Hero = lazyLoad(() => import('./Hero'));
export const About = lazyLoad(() => import('./About'));
export const Experience = lazyLoad(() => import('./Experience'));
export const Projects = lazyLoad(() => import('./Projects'));
export const Skills = lazyLoad(() => import('./Skills'));
export const Education = lazyLoad(() => import('./Education'));
export const Contact = lazyLoad(() => import('./Contact'));