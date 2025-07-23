import React from 'react';
import Head from 'next/head';
import { generatePageMetadata } from '@/utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
}

/**
 * SEO Head component for meta tags
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  noIndex = false,
}) => {
  const metaTags = generatePageMetadata(
    title,
    description,
    undefined,
    keywords
  );

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{metaTags.title as string}</title>
      <meta name="description" content={metaTags.description as string} />
      <meta name="keywords" content={(metaTags.keywords as string[]).join(', ')} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={metaTags.openGraph?.title as string} />
      <meta property="og:description" content={metaTags.openGraph?.description as string} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://shantanupatnaik.dev'} />
      <meta property="og:site_name" content={metaTags.openGraph?.siteName as string} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTags.title as string} />
      <meta name="twitter:description" content={metaTags.description as string} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Shantanu Patnaik" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || 'https://shantanupatnaik.dev'} />
    </Head>
  );
};

export default SEOHead;