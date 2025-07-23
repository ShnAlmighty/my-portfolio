/**
 * Utility for lazy loading components with suspense
 */
import React, { Suspense, lazy, ComponentType } from 'react';
import { LoadingSpinner } from '@/components/ui';

interface LazyLoadOptions {
  fallback?: React.ReactNode;
  ssr?: boolean;
}

/**
 * Lazy loads a component with a loading fallback
 * @param importFunc - Dynamic import function
 * @param options - Options for lazy loading
 * @returns Lazy loaded component with suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: LazyLoadOptions = {}
): React.FC<React.ComponentProps<T>> {
  const {
    fallback = (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="md" />
      </div>
    ),
    ssr = false,
  } = options;

  const LazyComponent = lazy(importFunc);

  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default lazyLoad;