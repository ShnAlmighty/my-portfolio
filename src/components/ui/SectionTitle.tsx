import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * SectionTitle component for consistent section headings
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  // Text alignment styles
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      }
    }
  };

  let titleStyle = {};

  titleStyle = {marginLeft: '300px', marginTop: '60px', marginBottom: '60px'}

  if(title == 'Featured Projects'){
    titleStyle = {marginLeft: '280px', marginTop: '200px', marginBottom: '60px'};
  }
  if(title == 'Professional Experience'){
    titleStyle = {marginRight: '150px', marginTop: '200px', marginBottom: '60px'};
  }
  if(title == 'About Me'){
    titleStyle = {marginLeft: '260px', marginTop: '150px', marginBottom: '60px'};
  }
  if(title == 'Technical Skills'){
    titleStyle = {marginLeft: '5px', marginTop: '150px', marginBottom: '60px'};
  }
  if(title == 'Education & Learning'){
    titleStyle = {marginRight: '90px', marginTop: '150px', marginBottom: '60px'};
  }
  if(title == 'Get In Touch'){
    titleStyle = {marginLeft: '230px', marginTop: '150px', marginBottom: '60px'};
  }

  let subTitleStyle = {};
  subTitleStyle = {marginLeft: '250px', marginTop: '20px', marginBottom: '20px'};
  if(title == 'Featured Projects') {
    subTitleStyle = {marginLeft: '370px', marginTop: '20px', marginBottom: '100px'};
  }
  if(title == 'About Me'){
    subTitleStyle = {marginLeft: '380px', marginTop: '20px', marginBottom: '100px'};
  }
  if(title == 'Professional Experience'){
    subTitleStyle = {marginLeft: '110px', marginTop: '20px', marginBottom: '100px'};
  }
  if(title == 'Technical Skills'){
    subTitleStyle = {marginLeft: '240px', marginTop: '20px', marginBottom: '90px'};
  }
  if(title == 'Education & Learning'){
    subTitleStyle = {marginLeft: '190px', marginTop: '20px', marginBottom: '100px'};
  }
  if(title == 'Get In Touch'){
    subTitleStyle = {marginLeft: '490px', marginTop: '20px', marginBottom: '100px'};
  }

  return (
    <div className={`mb-16 sm:mb-20 md:mb-24 lg:mb-28 xl:mb-32 mt-8 sm:mt-12 md:mt-16 lg:mt-20 ${alignStyles[align]} ${className}`}>
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 sm:mb-8 lg:mb-10"
        variants={titleVariants}
        // style={{marginLeft: '300px'}}
        style={titleStyle}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`text-lg sm:text-xl lg:text-2xl text-text-secondary max-w-2xl lg:max-w-3xl leading-relaxed ${alignStyles[align]} ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
            }`}
          variants={subtitleVariants}
          style={subTitleStyle}
          // style={{marginLeft: '250px', marginTop: '20px', marginBottom: '20px'}}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="h-1 w-16 sm:w-20 lg:w-24 bg-primary-600 mt-8 sm:mt-10 lg:mt-12"
        initial={{ width: 0 }}
        whileInView={{ width: align === 'center' ? 96 : 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        // style={{marginLeft: '300px', marginBottom: '10px'}}
        style={{ marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}
      />
    </div>
  );
};

export default SectionTitle;