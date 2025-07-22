/**
 * Utility functions for data transformation and formatting
 */

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in format "YYYY-MM" or "YYYY-MM-DD"
 * @returns Formatted date string (e.g., "Jan 2021")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Calculate years of experience based on start and end dates
 * @param startDate - Start date string in format "YYYY-MM" or "YYYY-MM-DD"
 * @param endDate - End date string or null for present
 * @returns Years of experience as a number
 */
export const calculateYearsOfExperience = (startDate: string, endDate: string | null): number => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  return Math.round(diffYears * 10) / 10; // Round to 1 decimal place
};

/**
 * Format a phone number to a more readable format
 * @param phone - Phone number string
 * @returns Formatted phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // This is a simple formatter, adjust as needed for your specific format
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

/**
 * Get total years of experience from all experiences
 * @param experiences - Array of experience objects
 * @returns Total years of experience
 */
export const getTotalYearsOfExperience = (experiences: Array<{ startDate: string; endDate: string | null }>): number => {
  // This is a simplified calculation that doesn't account for overlapping periods
  let totalYears = 0;
  
  experiences.forEach(exp => {
    totalYears += calculateYearsOfExperience(exp.startDate, exp.endDate);
  });
  
  return Math.round(totalYears);
};

/**
 * Group skills by category
 * @param skills - Array of skill objects
 * @returns Object with skills grouped by category
 */
export const groupSkillsByCategory = (skills: Array<{ category: string; name: string; proficiency: string }>): Record<string, Array<{ name: string; proficiency: string }>> => {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    
    acc[skill.category].push({
      name: skill.name,
      proficiency: skill.proficiency,
    });
    
    return acc;
  }, {} as Record<string, Array<{ name: string; proficiency: string }>>);
};

/**
 * Group projects by category
 * @param projects - Array of project objects
 * @returns Object with projects grouped by category
 */
export const groupProjectsByCategory = (projects: Array<{ category: string; id: string }>): Record<string, string[]> => {
  return projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    
    acc[project.category].push(project.id);
    
    return acc;
  }, {} as Record<string, string[]>);
};