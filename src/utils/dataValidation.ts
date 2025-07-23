/**
 * Data validation utilities
 */

import { PersonalInfo, Experience, Project, Skill, Education } from './types';

// Validation functions
export const validatePersonalInfo = (data: PersonalInfo): boolean => {
  return !!(
    data.name &&
    data.title &&
    data.email &&
    data.summary &&
    data.socialLinks.github &&
    data.socialLinks.linkedin
  );
};

export const validateExperience = (data: Experience): boolean => {
  return !!(
    data.id &&
    data.company &&
    data.position &&
    data.startDate &&
    data.description &&
    data.achievements.length > 0 &&
    data.technologies.length > 0
  );
};

export const validateProject = (data: Project): boolean => {
  return !!(
    data.id &&
    data.title &&
    data.description &&
    data.technologies.length > 0 &&
    data.category &&
    data.date
  );
};

export const validateSkill = (data: Skill): boolean => {
  return !!(
    data.name &&
    data.category &&
    data.proficiency &&
    ['beginner', 'intermediate', 'advanced', 'expert'].includes(data.proficiency)
  );
};

export const validateEducation = (data: Education): boolean => {
  return !!(
    data.degree &&
    data.institution &&
    data.location &&
    data.startDate &&
    data.endDate
  );
};

// Data completeness checker
export const checkDataCompleteness = async () => {
  const issues: string[] = [];

  // Check if all required data files exist and have content
  try {
    // Use dynamic import instead of require
    const data = await import('../data');
    const { personalInfo, experiences, projects, skills, education } = data;

    if (!validatePersonalInfo(personalInfo)) {
      issues.push('Personal information is incomplete');
    }

    if (!experiences || experiences.length === 0) {
      issues.push('No experience data found');
    } else {
      experiences.forEach((exp: Experience, index: number) => {
        if (!validateExperience(exp)) {
          issues.push(`Experience ${index + 1} is incomplete`);
        }
      });
    }

    if (!projects || projects.length === 0) {
      issues.push('No project data found');
    } else {
      projects.forEach((project: Project, index: number) => {
        if (!validateProject(project)) {
          issues.push(`Project ${index + 1} is incomplete`);
        }
      });
    }

    if (!skills || skills.length === 0) {
      issues.push('No skills data found');
    } else {
      skills.forEach((skill: Skill, index: number) => {
        if (!validateSkill(skill)) {
          issues.push(`Skill ${index + 1} is incomplete`);
        }
      });
    }

    if (!education || education.length === 0) {
      issues.push('No education data found');
    } else {
      education.forEach((edu: Education, index: number) => {
        if (!validateEducation(edu)) {
          issues.push(`Education ${index + 1} is incomplete`);
        }
      });
    }
  } catch (_) {
    issues.push('Error loading data files');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
};

// Data statistics
export const getDataStatistics = async () => {
  try {
    // Use dynamic import instead of require
    const data = await import('../data');
    const { experiences, projects, skills, education } = data;

    return {
      totalExperiences: experiences?.length || 0,
      totalProjects: projects?.length || 0,
      featuredProjects: projects?.filter((p: Project) => p.featured)?.length || 0,
      totalSkills: skills?.length || 0,
      expertSkills: skills?.filter((s: Skill) => s.proficiency === 'expert')?.length || 0,
      totalEducation: education?.length || 0,
      uniqueTechnologies: new Set([
        ...projects?.flatMap((p: Project) => p.technologies) || [],
        ...experiences?.flatMap((e: Experience) => e.technologies) || [],
        ...skills?.map((s: Skill) => s.name) || [],
      ]).size,
    };
  } catch (_) {
    return {
      totalExperiences: 0,
      totalProjects: 0,
      featuredProjects: 0,
      totalSkills: 0,
      expertSkills: 0,
      totalEducation: 0,
      uniqueTechnologies: 0,
    };
  }
};