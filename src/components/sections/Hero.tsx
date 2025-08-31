'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import { Button, FloatingParticles, AnimatedText } from '../ui';
import { personalInfo } from '@/data/personalInfo';
import { staggerContainer, slideUp, fadeIn } from '@/utils/animations';

export const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Different titles to cycle through - memoized to prevent re-renders
  const titles = useMemo(() => [
    'Full Stack Engineer',
    'AI Specialist',
    'DevOps Engineer',
    'Backend Developer',
    'System Architect',
  ], []);

  // Typing animation effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 1000 : 2000;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentIndex < currentTitle.length) {
        setDisplayedText(currentTitle.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(currentTitle.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (!isDeleting && currentIndex === currentTitle.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentTitleIndex, titles]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary-600/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-500/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary mb-4"
            variants={itemVariants}
            style={{marginBottom: '-40px'}}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Animated Title */}
          <motion.div
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-text-secondary mb-8 h-12 md:h-16"
            variants={itemVariants}
          >
            <span className="text-text-primary">I&apos;m a </span>
            <span className="text-primary-500">
              {displayedText}
              <motion.span
                className="inline-block w-0.5 h-8 md:h-10 bg-primary-500 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={itemVariants}
            style={{marginLeft: '90px'}}
          >
            {personalInfo.summary}
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            variants={itemVariants}
            style={{padding: '40px'}}
          >
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              icon={<Mail size={20} />}
              className="min-w-[200px]"
            >
              Get In Touch
            </Button>
            <Button
              href="/resume.pdf"
              variant="ghost"
              size="lg"
              icon={<Download size={20} />}
              external
              className="min-w-[200px]"
            >
              Download Resume
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            variants={itemVariants}
            onClick={scrollToAbout}
            whileHover={{ y: -5 }}
          >
            <p className="text-text-muted text-sm mb-2">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={24} className="text-text-muted" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;