/**
 * Testimonials and recommendations data
 */

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  date: string;
  avatar?: string;
  linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'colleague-1',
    name: 'Team Lead',
    position: 'Engineering Manager',
    company: 'Brandie',
    content: 'Shantanu consistently delivers high-quality solutions and has been instrumental in scaling our AI systems. His expertise in backend architecture and AI/ML has been invaluable to our team.',
    rating: 5,
    date: '2024-01',
  },
  {
    id: 'colleague-2',
    name: 'Senior Developer',
    position: 'Full Stack Engineer',
    company: 'Tars',
    content: 'Working with Shantanu was a great experience. His leadership during the WhatsApp integration project and his ability to deliver under tight deadlines made a significant impact on our success.',
    rating: 5,
    date: '2023-06',
  },
  {
    id: 'colleague-3',
    name: 'Project Manager',
    position: 'Technical Project Manager',
    company: 'Tars',
    content: 'Shantanu\'s technical expertise and process improvement initiatives as interim Team Lead helped streamline our development workflow and improve overall team productivity.',
    rating: 5,
    date: '2023-03',
  },
];

// Achievement highlights
export const achievements = [
  {
    id: 'brandie-ai-impact',
    title: '1M+ User Engagements',
    description: 'Generated over 1 million user engagements through AI-powered features at Brandie',
    metric: '1,000,000+',
    category: 'impact',
  },
  {
    id: 'brandie-ai-scale',
    title: '7K Daily Invocations',
    description: 'Built and deployed Brandie AI system handling 7,000+ daily AI invocations',
    metric: '7,000+',
    category: 'scale',
  },
  {
    id: 'performance-improvement',
    title: '10x Performance Boost',
    description: 'Achieved 10x improvement in New Relic Apdex score through backend optimization',
    metric: '10x',
    category: 'performance',
  },
  {
    id: 'cost-optimization',
    title: '50% Cost Reduction',
    description: 'Reduced infrastructure costs by 50% while scaling user engagement',
    metric: '50%',
    category: 'optimization',
  },
  {
    id: 'database-migration',
    title: '300% Cost Avoidance',
    description: 'Prevented 300% surge in database expenses through strategic migration',
    metric: '300%',
    category: 'cost-saving',
  },
];