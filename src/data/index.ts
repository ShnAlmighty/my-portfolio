/**
 * Central export for all data files
 */

export { personalInfo } from './personalInfo';
export { experiences } from './experiences';
export { projects } from './projects';
export { skills } from './skills';
export { education } from './education';
export { testimonials, achievements } from './testimonials';
export * from './constants';

// Re-export types for convenience
export type { PersonalInfo, Experience, Project, Skill, Education } from '../utils/types';
export type { Testimonial } from './testimonials';