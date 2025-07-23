'use client';

import React from 'react';
import { NetworkStatusIndicator } from '../ui';

/**
 * Client component to render the network status indicator
 */
export const NetworkStatus: React.FC = () => {
  return <NetworkStatusIndicator showOfflineOnly={true} />;
};

export default NetworkStatus;