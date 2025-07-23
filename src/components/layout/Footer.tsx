import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { personalInfo } from '@/data/personalInfo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-light py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-4">
              {personalInfo.name.split(' ')[0]}
              <span className="text-primary-500">{personalInfo.name.split(' ')[1]}</span>
            </h3>
            <p className="text-text-secondary mb-4 max-w-md">
              {personalInfo.summary}
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-text-secondary hover:text-primary-500 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-500 transition-colors"
                aria-label="Resume"
              >
                <FileText size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-text-secondary hover:text-primary-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-text-secondary hover:text-primary-500 transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-text-secondary hover:text-primary-500 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-text-secondary hover:text-primary-500 transition-colors">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-text-secondary hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Contact</h3>
            <p className="text-text-secondary mb-2">
              <Mail size={16} className="inline-block mr-2" />
              <a href={`mailto:${personalInfo.email}`} className="hover:text-primary-500 transition-colors">
                {personalInfo.email}
              </a>
            </p>
            <p className="text-text-secondary">
              <span className="inline-block mr-2">📍</span>
              {personalInfo.location}
            </p>
          </div>
        </div>

        <div className="border-t border-background mt-8 pt-8 text-center text-text-secondary">
          <p>
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;