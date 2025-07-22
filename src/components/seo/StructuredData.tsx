import React from 'react';
import { generatePersonStructuredData } from '@/utils/seo';

/**
 * Component to inject structured data (JSON-LD) into the page
 */
export const StructuredData: React.FC = () => {
  const personSchema = generatePersonStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(personSchema),
      }}
    />
  );
};

export default StructuredData;