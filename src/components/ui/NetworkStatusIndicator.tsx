'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface NetworkStatusIndicatorProps {
  showOfflineOnly?: boolean;
  className?: string;
}

/**
 * Component to display network connectivity status
 */
export const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  showOfflineOnly = false,
  className = '',
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);
    
    // Define event handlers
    const handleOnline = () => {
      setIsOnline(true);
      // Show the indicator for a few seconds when coming back online
      setVisible(true);
      setTimeout(() => setVisible(false), 3000);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setVisible(true);
    };
    
    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Clean up
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if we're online and only showing when offline
  if (isOnline && showOfflineOnly && !visible) {
    return null;
  }

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      } ${className}`}
    >
      {isOnline ? (
        <>
          <Wifi size={16} />
          <span className="text-sm font-medium">Online</span>
        </>
      ) : (
        <>
          <WifiOff size={16} />
          <span className="text-sm font-medium">Offline</span>
        </>
      )}
    </div>
  );
};

export default NetworkStatusIndicator;