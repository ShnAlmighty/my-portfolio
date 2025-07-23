'use client';

import { useEffect } from 'react';
import { registerServiceWorker } from '@/utils/serviceWorker';

/**
 * Component to register the service worker
 */
export default function ServiceWorkerRegistration() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
}