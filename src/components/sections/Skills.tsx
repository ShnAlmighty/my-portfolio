'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Cpu, Wrench, Star, TrendingUp } from 'lucide-react';
import { Section, SectionTitle, Card, Badge, ErrorBoundary, DataFallback } from '../ui';
import { skills } from '@/data/skills';
import { groupSkillsByCategory } from '@/utils/dataUtils';

type SkillCategory = 'languages' | 'frameworks' | 'databases' | 'cloud-devops' | 'ai-ml';

const categoryConfig = {
  languages: {
    title: 'Programming Languages',
    icon: <Code size={24} />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/20',
  },
  frameworks: {
    title: 'Frameworks & Libraries',
    icon: <Wrench size={24} />,
    color: 'text-green-500',
    bgColor: 'bg-green-500/20',
  },
  databases: {
    title: 'Databases',
    icon: <Database size={24} />,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/20',
  },
  'cloud-devops': {
    title: 'Cloud & DevOps',
    icon: <Cloud size={24} />,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/20',
  },
  'ai-ml': {
    title: 'AI & Machine Learning',
    icon: <Cpu size={24} />,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/20',
  },
};

const proficiencyConfig = {
  beginner: { level: 1, color: 'bg-gray-400', label: 'Beginner' },
  intermediate: { level: 2, color: 'bg-yellow-500', label: 'Intermediate' },
  advanced: { level: 3, color: 'bg-blue-500', label: 'Advanced' },
  expert: { level: 4, color: 'bg-green-500', label: 'Expert' },
};

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Group skills by category
  const groupedSkills = groupSkillsByCategory(skills);

  // Get trending/current technologies (expert level skills)
  const trendingSkills = skills.filter(skill => skill.proficiency === 'expert').slice(0, 6);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  // Render proficiency bars
  const renderProficiencyBar = (proficiency: string) => {
    const config = proficiencyConfig[proficiency as keyof typeof proficiencyConfig];
    const level = config.level;
    
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-2 h-2 rounded-full ${
              dot <= level ? config.color : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  // Handle empty skills data
  if (!skills || skills.length === 0) {
    return (
      <Section id="skills" className="bg-background-light">
        <SectionTitle
          title="Technical Skills"
          subtitle="Technologies and tools I use to bring ideas to life"
          align="right"
        />
        <DataFallback
          type="empty"
          title="No Skills Data Available"
          message="Skills information is currently being updated."
          className="min-h-[400px]"
        />
      </Section>
    );
  }

  return (
    <Section id="skills" className="bg-background-light">
      <ErrorBoundary
        fallback={
          <DataFallback
            type="error"
            title="Failed to Load Skills"
            message="There was an error loading the skills data."
            className="min-h-[400px]"
          />
        }
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{marginLeft: '250px', marginBottom: '150px'}}
        >
          <SectionTitle
            title="Technical Skills"
            subtitle="Technologies and tools I use to bring ideas to life"
            align="center"
          />

        {/* Trending Skills */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-8" style={{marginBottom: '30px', marginTop: '-40px'}}>
            <TrendingUp className="text-primary-500" size={20} />
            <h3 className="text-xl font-semibold text-text-primary">
              Current Expertise
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mr-80">
            {trendingSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={skillVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600/20 text-primary-500 rounded-full font-medium"
                style={{marginBottom: '30px'}}
              >
                <Star size={14} fill="currentColor" />
                {skill.name}
                {skill.yearsOfExperience && (
                  <span className="text-xs opacity-75" style={{padding: '5px'}}>
                    {skill.yearsOfExperience}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const config = categoryConfig[category as SkillCategory];
            
            return (
              <motion.div key={category} variants={itemVariants}>
                <Card className="h-full">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg ${config.bgColor} ${config.color}`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        {config.title}
                      </h3>
                      <p className="text-text-muted text-sm">
                        {categorySkills.length} technologies
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-4">
                    {categorySkills.map((skill) => {
                      const fullSkill = skills.find(s => s.name === skill.name);
                      const isHovered = hoveredSkill === skill.name;
                      
                      return (
                        <motion.div
                          key={skill.name}
                          className="flex items-center justify-between p-3 rounded-lg bg-background hover:bg-background-light transition-colors cursor-pointer"
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ x: 5 }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-text-primary">
                              {skill.name}
                            </span>
                            {fullSkill?.yearsOfExperience && (
                              <Badge variant="outline" size="sm">
                                {fullSkill.yearsOfExperience} years
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {isHovered && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm text-text-secondary"
                              >
                                {proficiencyConfig[skill.proficiency as keyof typeof proficiencyConfig].label}
                              </motion.span>
                            )}
                            {renderProficiencyBar(skill.proficiency)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Skills Summary Stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{marginBottom: '30px', marginTop: '50px'}}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {skills.length}
              </div>
              <div className="text-text-secondary text-sm">
                Total Skills
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {skills.filter(s => s.proficiency === 'expert').length}
              </div>
              <div className="text-text-secondary text-sm">
                Expert Level
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {Object.keys(groupedSkills).length}
              </div>
              <div className="text-text-secondary text-sm">
                Categories
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {Math.round(skills.reduce((acc, skill) => acc + (skill.yearsOfExperience || 0), 0) / skills.filter(s => s.yearsOfExperience).length)}
              </div>
              <div className="text-text-secondary text-sm">
                Avg. Experience
              </div>
            </div>
          </div>
        </motion.div>

        {/* Proficiency Legend */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-lg font-semibold text-text-primary mb-4" style={{marginLeft: '50px', marginBottom: '30px'}}>
            Proficiency Levels
          </h4>
          <div className="flex flex-wrap justify-center gap-6" >
            {Object.entries(proficiencyConfig).map(([level, config]) => (
              <div key={level} className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full ${
                        dot <= config.level ? config.color : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-text-secondary text-sm">
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
        </motion.div>
      </ErrorBoundary>
    </Section>
  );
};

export default Skills;