'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Star, Filter } from 'lucide-react';
import { Section, SectionTitle, Card, Badge, Button, ErrorBoundary, DataFallback } from '../ui';
import { projects } from '@/data/projects';
import { formatDate } from '@/utils/dataUtils';

type ProjectCategory = 'all' | 'ai-ml' | 'fullstack' | 'iot' | 'automation';

const categoryLabels: Record<ProjectCategory, string> = {
  all: 'All Projects',
  'ai-ml': 'AI/ML',
  fullstack: 'Full Stack',
  iot: 'IoT',
  automation: 'Automation',
};

const categoryIcons: Record<ProjectCategory, React.ReactNode> = {
  all: <Filter size={16} />,
  'ai-ml': '🤖',
  fullstack: '💻',
  iot: '🔗',
  automation: '⚡',
};

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    const filtered = activeCategory === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    
    // Sort by featured first, then by date
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [activeCategory]);

  // Show limited projects initially
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  // Get unique categories from projects
  const categories: ProjectCategory[] = ['all', ...Array.from(new Set(projects.map(p => p.category))) as Exclude<ProjectCategory, 'all'>[]];

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

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  // Handle empty projects data
  if (!projects || projects.length === 0) {
    return (
      <Section id="projects">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12 mt-8">
              <SectionTitle
                title="Featured Projects"
                subtitle="A showcase of my work in AI/ML, full-stack development, IoT, and automation"
                align="center"
              />
            </div>
            <DataFallback
              type="empty"
              title="No Projects Available"
              message="Projects are currently being updated. Please check back soon!"
              className="min-h-[400px] my-12"
            />
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section id="projects">
      <div className="flex flex-col items-center justify-center w-full">
        <ErrorBoundary
          fallback={
            <DataFallback
              type="error"
              title="Failed to Load Projects"
              message="There was an error loading the projects. Please refresh the page."
              className="min-h-[400px]"
            />
          }
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto w-full"
          >
          <div className="mb-12">
            <SectionTitle
              title="Featured Projects"
              subtitle="A showcase of my work in AI/ML, full-stack development, IoT, and automation"
              align="center"
            />
          </div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-20 mt-8 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-background-light text-text-secondary hover:bg-background hover:text-text-primary'
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{categoryIcons[category]}</span>
              {categoryLabels[category]}
              <span className="text-xs opacity-75">
                ({category === 'all' ? projects.length : projects.filter(p => p.category === category).length})
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={filterVariants}
                layout
                className="group"
              >
                <Card variant="hover" className="h-full flex flex-col my-4">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6 mt-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-500 transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <div className="flex items-center text-yellow-500">
                            <Star size={16} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-muted mb-3">
                        <Calendar size={14} />
                        {formatDate(project.date)}
                        <span>•</span>
                        <Badge variant="category" size="sm">
                          {categoryLabels[project.category]}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-text-secondary leading-relaxed mb-8 flex-1">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-8 mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center gap-3 mt-auto pt-4">
                    {project.githubUrl && (
                      <Button
                        href={project.githubUrl}
                        variant="ghost"
                        size="sm"
                        icon={<Github size={16} />}
                        external
                        className="flex-1"
                      >
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        href={project.liveUrl}
                        variant="primary"
                        size="sm"
                        icon={<ExternalLink size={16} />}
                        external
                        className="flex-1"
                      >
                        Live Demo
                      </Button>
                    )}
                    {!project.githubUrl && !project.liveUrl && (
                      <div className="flex-1 text-center text-text-muted text-sm py-2">
                        Private Project
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Show More/Less Button */}
        {filteredProjects.length > 6 && (
          <motion.div 
            className="text-center mt-20 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="min-w-[200px]"
            >
              {showAll ? 'Show Less' : `Show All ${filteredProjects.length} Projects`}
            </Button>
          </motion.div>
        )}

        {/* Project Stats */}
        <motion.div 
          className="mt-24 mb-12 text-center max-w-4xl mx-auto py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            <div className="py-4">
              <div className="text-3xl font-bold text-primary-500 mb-3">
                {projects.length}
              </div>
              <div className="text-text-secondary text-sm">
                Total Projects
              </div>
            </div>
            <div className="py-4">
              <div className="text-3xl font-bold text-primary-500 mb-3">
                {projects.filter(p => p.featured).length}
              </div>
              <div className="text-text-secondary text-sm">
                Featured Projects
              </div>
            </div>
            <div className="py-4">
              <div className="text-3xl font-bold text-primary-500 mb-3">
                {projects.filter(p => p.category === 'ai-ml').length}
              </div>
              <div className="text-text-secondary text-sm">
                AI/ML Projects
              </div>
            </div>
            <div className="py-4">
              <div className="text-3xl font-bold text-primary-500 mb-3">
                {new Set(projects.flatMap(p => p.technologies)).size}
              </div>
              <div className="text-text-secondary text-sm">
                Technologies Used
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20 mb-8 max-w-2xl mx-auto py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text-secondary mb-8 mt-4">
            Interested in collaborating on a project?
          </p>
          <Button
            href="#contact"
            variant="primary"
            size="lg"
          >
            Let&apos;s Work Together
          </Button>
        </motion.div>
          </motion.div>
        </ErrorBoundary>
      </div>
    </Section>
  );
};

export default Projects;