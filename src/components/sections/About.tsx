'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Brain, Users, Award } from 'lucide-react';
import { Section, SectionTitle, Card, AnimatedCounter } from '../ui';
import { personalInfo } from '@/data/personalInfo';
import { experiences } from '@/data/experiences';
import { getTotalYearsOfExperience } from '@/utils/dataUtils';

export const About: React.FC = () => {
  // Calculate total years of experience
  const totalExperience = getTotalYearsOfExperience(experiences);

  // Key highlights/stats
  const highlights = [
    {
      icon: <Code size={24} />,
      title: 'Years of Experience',
      value: `${totalExperience}+`,
      description: 'Building scalable applications',
    },
    {
      icon: <Brain size={24} />,
      title: 'AI/ML Projects',
      value: '10+',
      description: 'AI systems and integrations',
    },
    {
      icon: <Cloud size={24} />,
      title: 'Cloud Platforms',
      value: 'AWS Expert',
      description: 'Infrastructure & DevOps',
    },
    {
      icon: <Database size={24} />,
      title: 'Database Systems',
      value: '7+',
      description: 'SQL & NoSQL databases',
    },
    {
      icon: <Users size={24} />,
      title: 'Team Leadership',
      value: 'Lead Role',
      description: 'At Brandie & Tars',
    },
    {
      icon: <Award size={24} />,
      title: 'Impact',
      value: '1M+',
      description: 'User engagements delivered',
    },
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <Section id="about" className="py-20 lg:py-32">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        <SectionTitle
          title="About Me"
          subtitle="Get to know more about my background, skills, and passion for technology"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-24 lg:mb-32 mt-16 lg:mt-20">
          {/* Professional Summary */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8">
                Professional Summary
              </h3>
              <div className="space-y-8 text-text-secondary leading-relaxed text-base lg:text-lg">
                <p>
                  I&apos;m a passionate Full Stack Engineer with over {totalExperience} years of experience 
                  building scalable web applications and AI-powered solutions. Currently serving as 
                  Lead Backend Engineer at Brandie, I specialize in creating robust systems that 
                  handle millions of user interactions.
                </p>
                <p>
                  My expertise spans across modern web technologies, cloud infrastructure, and 
                  artificial intelligence. I&apos;ve successfully led teams, architected complex systems, 
                  and delivered solutions that have generated over 1 million user engagements.
                </p>
                <p>
                  I&apos;m particularly passionate about AI/ML technologies and have developed several 
                  AI systems including Brandie AI, which handles 7,000+ daily invocations, and 
                  contributed to Tars Prime, an advanced chatbot platform.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Personal Touch */}
          <motion.div variants={itemVariants}>
            <Card className="h-full p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-8">
                Beyond the Code
              </h3>
              <div className="space-y-8 text-text-secondary leading-relaxed text-base lg:text-lg">
                <p>
                  When I&apos;m not coding, I enjoy exploring the latest developments in AI and 
                  machine learning. I&apos;m always eager to learn new technologies and apply 
                  them to solve real-world problems.
                </p>
                <p>
                  I believe in the power of collaboration and have experience mentoring junior 
                  developers and leading cross-functional teams. My approach combines technical 
                  excellence with clear communication and strategic thinking.
                </p>
                <p>
                  I&apos;m based in India and open to remote opportunities worldwide. I&apos;m always 
                  excited to discuss new projects and innovative solutions.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Key Highlights Grid */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl lg:text-3xl font-bold text-text-primary text-center mb-16 lg:mb-20">
            Key Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                variants={cardVariants}
                custom={index}
              >
                <Card variant="hover" className="text-center h-full p-8 lg:p-10">
                  <div className="flex justify-center mb-8">
                    <div className="p-5 bg-primary-600/20 rounded-full text-primary-500">
                      {highlight.icon}
                    </div>
                  </div>
                  <h4 className="text-lg lg:text-xl font-semibold text-text-primary mb-4">
                    {highlight.title}
                  </h4>
                  <div className="text-2xl lg:text-3xl font-bold text-primary-500 mb-4">
                    {highlight.title === 'Years of Experience' ? (
                      <AnimatedCounter end={totalExperience} suffix="+" />
                    ) : highlight.title === 'AI/ML Projects' ? (
                      <AnimatedCounter end={10} suffix="+" />
                    ) : highlight.title === 'Impact' ? (
                      <AnimatedCounter end={1} suffix="M+" />
                    ) : (
                      highlight.value
                    )}
                  </div>
                  <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
                    {highlight.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20 lg:mt-28"
          variants={itemVariants}
        >
          <p className="text-text-secondary text-lg lg:text-xl mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed">
            Interested in working together? Let&apos;s discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center">
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors text-base lg:text-lg shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center px-10 py-5 border border-text-muted text-text-primary rounded-lg font-medium hover:bg-background-light transition-colors text-base lg:text-lg hover:border-primary-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default About;