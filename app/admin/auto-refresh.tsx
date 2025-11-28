'use client';

import { useEffect } from 'react';

export function AutoRefresh() {
  useEffect(() => {
    // Auto-refresh the page every 30 seconds to ensure fresh data
    const interval = setInterval(() => {
      // Only refresh if the page is visible (not in background tab)
      if (!document.hidden) {
        window.location.reload();
      }
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}


