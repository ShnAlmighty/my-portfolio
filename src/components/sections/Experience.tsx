'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Section, SectionTitle, Card, Badge } from '../ui';
import { experiences } from '@/data/experiences';
import { formatDate, calculateYearsOfExperience } from '@/utils/dataUtils';

export const Experience: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Toggle expanded state for experience items
  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      marginTop: 0,
      paddingTop: 0,
      borderTopWidth: 0
    },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: 24,
      paddingTop: 24,
      borderTopWidth: 1,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      paddingTop: 0,
      borderTopWidth: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      },
    }
  };

  return (
    <Section id="experience" className="bg-background-light">
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto w-full"
        >
        <SectionTitle
          title="Professional Experience"
          subtitle="My journey through different roles and the impact I've made"
          align="center"
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-600/30"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => {
              const isExpanded = expandedItems.includes(experience.id);
              const duration = calculateYearsOfExperience(experience.startDate, experience.endDate);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:justify-between`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-background z-10">
                    <div className="absolute inset-1 bg-primary-400 rounded-full animate-pulse"></div>
                  </div>

                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card 
                      variant="hover" 
                      className="cursor-pointer overflow-hidden"
                      onClick={() => toggleExpanded(experience.id)}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-text-primary mb-1">
                            {experience.position}
                          </h3>
                          <div className="flex items-center text-primary-500 font-semibold mb-2">
                            <Briefcase size={16} className="mr-2" />
                            {experience.company}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-text-secondary text-sm">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {experience.location}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <span className="text-primary-500 font-medium">
                              {duration} {duration === 1 ? 'year' : 'years'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <Badge variant={experience.type === 'fulltime' ? 'primary' : 'secondary'}>
                            {experience.type === 'fulltime' ? 'Full-time' : 
                             experience.type === 'intern' ? 'Internship' : 'Contract'}
                          </Badge>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary mb-4 leading-relaxed">
                        {experience.description}
                      </p>

                      {/* Expand/Collapse button */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-text-muted">
                          {isExpanded ? 'Hide details' : 'View achievements & technologies'}
                        </span>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>

                      {/* Expanded content */}
                      <AnimatePresence mode="wait">
                        {isExpanded && (
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="overflow-hidden border-background"
                            style={{ borderTopStyle: 'solid' }}
                          >
                            {/* Key achievements */}
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold text-text-primary mb-3">
                                Key Achievements
                              </h4>
                              <ul className="space-y-2">
                                {experience.achievements.map((achievement, idx) => (
                                  <li key={idx} className="flex items-start">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span className="text-text-secondary leading-relaxed">
                                      {achievement}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="text-lg font-semibold text-text-primary mb-3">
                                Technologies & Tools
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {experience.technologies.map((tech, idx) => (
                                  <Badge key={idx} variant="outline" size="sm">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Summary stats */}
        <motion.div 
          className="mt-16 text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {experiences.length}
              </div>
              <div className="text-text-secondary">
                Professional Roles
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {experiences.filter(exp => exp.type === 'fulltime').length}
              </div>
              <div className="text-text-secondary">
                Full-time Positions
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {new Set(experiences.map(exp => exp.company)).size}
              </div>
              <div className="text-text-secondary">
                Companies Worked With
              </div>
            </div>
          </div>
        </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Experience;