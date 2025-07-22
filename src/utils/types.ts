/**
 * Type definitions for the portfolio website
 */

/**
 * Personal information interface
 */
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  socialLinks: {
    github: string;
    linkedin: string;
    stackoverflow: string;
  };
}

/**
 * Experience interface
 */
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'fulltime' | 'intern' | 'contract';
}

/**
 * Project interface
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'ai-ml' | 'fullstack' | 'iot' | 'automation';
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  date: string;
}

/**
 * Skill interface
 */
export interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'databases' | 'cloud-devops' | 'ai-ml';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

/**
 * Education interface
 */
export interface Education {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string[];
}