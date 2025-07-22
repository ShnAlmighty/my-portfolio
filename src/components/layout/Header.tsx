'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import { Button } from '../ui/Button';
import { personalInfo } from '@/data/personalInfo';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to update active section and header style
  useEffect(() => {
    const handleScroll = () => {
      // Update header style based on scroll position
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background py-3 shadow-md' : 'bg-transparent py-5'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <Link href="/" className="text-xl font-bold text-text-primary hover:text-primary-500 transition-colors">
            {personalInfo.name.split(' ')[0]}
            <span className="text-primary-500">{personalInfo.name.split(' ')[1]}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === item.href.substring(1)
                    ? 'text-primary-500'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    className="h-1 bg-primary-500 mt-1 rounded-full"
                    layoutId="activeSection"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <a
              href={personalInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <Button
              href="/resume.pdf"
              variant="ghost"
              size="sm"
              icon={<FileText size={16} />}
              external
            >
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-primary rounded-md hover:bg-background-light transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-[60px] bg-background z-40 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col h-full p-4">
              <nav className="flex flex-col space-y-2 py-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-3 text-lg font-medium rounded-md transition-colors ${
                      activeSection === item.href.substring(1)
                        ? 'bg-background-light text-primary-500'
                        : 'text-text-secondary hover:bg-background-light hover:text-text-primary'
                    }`}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Social Links - Mobile */}
              <div className="mt-auto flex items-center justify-center space-x-4 py-6">
                <a
                  href={personalInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Resume"
                >
                  <FileText size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;