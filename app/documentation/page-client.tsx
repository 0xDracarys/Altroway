'use client';

import { useEffect, useState } from 'react';
import DocumentationContent from './documentation-content';

interface ProjectStats {
  phase: string;
  completion: string;
  version: string;
}

export default function DocumentationPage() {
  const [stats, setStats] = useState<ProjectStats>({
    phase: 'Final Enhancement',
    completion: '99%',
    version: 'v1.3.0'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();
      
      setStats({
        phase: data.phase_name || 'Final Enhancement',
        completion: data.completion_percentage ? `${data.completion_percentage}%` : '99%',
        version: data.version || 'v1.3.0'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Use default values if fetch fails
    } finally {
      setLoading(false);
    }
  };

  // Set up polling to refresh stats every 10 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return <DocumentationContent stats={stats} loading={loading} />;
}
