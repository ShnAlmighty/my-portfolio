'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from 'lucide-react';
import { Section, SectionTitle, Card, Badge } from '../ui';
import { education } from '@/data/education';
import { formatDate } from '@/utils/dataUtils';

export const Education: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  // Additional learning and certifications (based on your experience)
  const additionalLearning = [
    {
      title: 'AWS Cloud Architecture',
      description: 'Hands-on experience with AWS services, security, and infrastructure',
      icon: <Award size={20} />,
      type: 'Professional Experience',
    },
    {
      title: 'AI/ML Development',
      description: 'Practical experience with OpenAI, prompt engineering, and vector databases',
      icon: <BookOpen size={20} />,
      type: 'Self-Directed Learning',
    },
    {
      title: 'Team Leadership',
      description: 'Led engineering teams and mentored junior developers',
      icon: <Users size={20} />,
      type: 'Professional Development',
    },
    {
      title: 'DevOps & SRE',
      description: 'Infrastructure monitoring, CI/CD, and system reliability engineering',
      icon: <Award size={20} />,
      type: 'Professional Experience',
    },
  ];

  return (
    <Section id="education">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle
          title="Education & Learning"
          subtitle="My academic background and continuous learning journey"
          align="center"
        />

        {/* Formal Education */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Formal Education
          </h3>
          
          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
              >
                <Card variant="hover" className="mb-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Institution Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <GraduationCap size={32} className="text-primary-500" />
                      </div>
                    </div>

                    {/* Education Details */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-text-primary mb-2">
                            {edu.degree}
                          </h4>
                          <p className="text-lg text-primary-500 font-semibold mb-2">
                            {edu.institution}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-text-secondary text-sm mb-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              {edu.location}
                            </div>
                          </div>
                        </div>
                        <Badge variant="primary" className="self-start">
                          Bachelor&apos;s Degree
                        </Badge>
                      </div>

                      {/* Achievements */}
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div>
                          <h5 className="text-lg font-semibold text-text-primary mb-3">
                            Key Highlights
                          </h5>
                          <ul className="space-y-2">
                            {edu.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-text-secondary leading-relaxed">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continuous Learning */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Continuous Learning & Development
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {additionalLearning.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card variant="hover" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary-600/20 rounded-lg text-secondary-500 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                          {item.title}
                        </h4>
                        <Badge variant="outline" size="sm">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Philosophy */}
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-primary-600/10 to-secondary-600/10 border border-primary-600/20">
            <div className="flex items-center justify-center mb-4">
              <div className="p-4 bg-primary-600/20 rounded-full">
                <BookOpen size={32} className="text-primary-500" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-text-primary mb-4">
              Learning Philosophy
            </h4>
            <p className="text-text-secondary leading-relaxed">
              I believe in continuous learning and staying updated with the latest technologies. 
              My education provided a strong foundation in computer science fundamentals, while 
              my professional experience has been my greatest teacher. I&apos;m always exploring 
              new technologies, contributing to open-source projects, and sharing knowledge 
              with the developer community.
            </p>
          </Card>
        </motion.div>

        {/* Education Stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                4
              </div>
              <div className="text-text-secondary text-sm">
                Years of Study
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                CS&E
              </div>
              <div className="text-text-secondary text-sm">
                Specialization
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                2021
              </div>
              <div className="text-text-secondary text-sm">
                Graduation Year
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Education;