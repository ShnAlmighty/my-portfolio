'use client';

import React from 'react';
import { AlertCircle, Database, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface DataFallbackProps {
  title?: string;
  message?: string;
  type?: 'error' | 'empty' | 'loading';
  onRetry?: () => void;
  className?: string;
}

/**
 * Fallback component for missing or failed data loading
 */
export const DataFallback: React.FC<DataFallbackProps> = ({
  title,
  message,
  type = 'empty',
  onRetry,
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={48} className="text-red-500" />;
      case 'loading':
        return <div className="w-12 h-12 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />;
      case 'empty':
      default:
        return <Database size={48} className="text-text-secondary" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'error':
        return 'Failed to Load Data';
      case 'loading':
        return 'Loading...';
      case 'empty':
      default:
        return 'No Data Available';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'error':
        return 'There was an error loading the data. Please try again.';
      case 'loading':
        return 'Please wait while we load the content.';
      case 'empty':
      default:
        return 'The requested data is not available at the moment.';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
      <div className="p-4 bg-background-light rounded-full mb-6">
        {getIcon()}
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-4">
        {title || getDefaultTitle()}
      </h3>
      
      <p className="text-text-secondary mb-6 max-w-md">
        {message || getDefaultMessage()}
      </p>
      
      {onRetry && type !== 'loading' && (
        <Button
          onClick={onRetry}
          variant="primary"
          icon={<RefreshCw size={20} />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default DataFallback;