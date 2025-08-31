/**
 * SEO utilities and configurations
 */

import { Metadata } from 'next';
import { personalInfo } from '@/data/personalInfo';

// Base URL for the website
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://shantanupatnaik.dev';

// Default SEO configuration
export const defaultSEO = {
  title: `${personalInfo.name} - Softare Engineer & AI Specialist`,
  description: personalInfo.summary,
  keywords: [
    'Full Stack Engineer',
    'AI Specialist',
    'DevOps Engineer',
    'React Developer',
    'Node.js Developer',
    'Python Developer',
    'AWS Expert',
    'System Architecture',
    'Backend Development',
    'Frontend Development',
    'Machine Learning',
    'Artificial Intelligence',
    'Cloud Computing',
    'Software Engineer',
    'Web Development',
    'API Development',
    'Database Design',
    'Microservices',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Agile Development',
    personalInfo.name,
  ],
  author: personalInfo.name,
  creator: personalInfo.name,
  publisher: personalInfo.name,
  robots: 'index, follow',
  language: 'en',
  type: 'website',
  siteName: `${personalInfo.name} Portfolio`,
  locale: 'en_US'
  // twitterHandle: '@shantanupatnaik', // Update with actual handle if available
};

// Generate structured data for person
export const generatePersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personalInfo.name,
    jobTitle: 'Lead Backend Engineer & AI/ML Specialist',
    description: personalInfo.summary,
    url: BASE_URL,
    email: personalInfo.email,
    telephone: personalInfo.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: personalInfo.location,
    },
    sameAs: [
      personalInfo.socialLinks.linkedin,
      personalInfo.socialLinks.github,
      personalInfo.socialLinks.stackoverflow,
    ],
    knowsAbout: [
      'Full Stack Development',
      'AI/ML',
      'DevOps',
      'React',
      'Node.js',
      'Python',
      'AWS',
      'System Architecture',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Amity University',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jaipur',
        addressCountry: 'IN',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Brandie',
    },
  };
};

// Generate structured data for website
export const generateWebsiteStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: BASE_URL,
    description: defaultSEO.description,
    author: {
      '@type': 'Person',
      name: personalInfo.name,
    },
    inLanguage: 'en',
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      name: personalInfo.name,
    },
  };
};

// Generate Open Graph metadata
export const generateOpenGraphMetadata = (
  title?: string,
  description?: string,
  path?: string
) => {
  const url = path ? `${BASE_URL}${path}` : BASE_URL;
  const ogTitle = title || defaultSEO.title;
  const ogDescription = description || defaultSEO.description;

  return {
    title: ogTitle,
    description: ogDescription,
    url,
    siteName: defaultSEO.siteName,
    type: 'website',
    locale: defaultSEO.locale,
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`, // You'll need to create this image
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  };
};

// Generate Twitter metadata
// export const generateTwitterMetadata = (
//   title?: string,
//   description?: string
// ) => {
//   return {
//     card: 'summary_large_image',
//     site: defaultSEO.twitterHandle,
//     creator: defaultSEO.twitterHandle,
//     title: title || defaultSEO.title,
//     description: description || defaultSEO.description,
//     images: [`${BASE_URL}/og-image.jpg`],
//   };
// };

// Generate complete metadata for a page
export const generatePageMetadata = (
  title?: string,
  description?: string,
  path?: string,
  keywords?: string[]
): Metadata => {
  const pageTitle = title ? `${title} | ${personalInfo.name}` : defaultSEO.title;
  const pageDescription = description || defaultSEO.description;
  const pageKeywords = keywords ? [...defaultSEO.keywords, ...keywords] : defaultSEO.keywords;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    authors: [{ name: defaultSEO.author }],
    creator: defaultSEO.creator,
    publisher: defaultSEO.publisher,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: generateOpenGraphMetadata(pageTitle, pageDescription, path),
    // twitter: generateTwitterMetadata(pageTitle, pageDescription),
    alternates: {
      canonical: path ? `${BASE_URL}${path}` : BASE_URL,
    },
    other: {
      'theme-color': '#1e40af',
      'color-scheme': 'dark',
    },
  };
};

// SEO-friendly URL slug generator
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};