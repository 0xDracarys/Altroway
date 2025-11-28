'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectStats {
  completion_percentage: string;
  phase_name: string;
  version: string;
}

export function ProjectStatsSettings() {
  const { toast } = useToast();
  const supabase = createClient();

  const [stats, setStats] = useState<ProjectStats>({
    completion_percentage: '',
    phase_name: '',
    version: ''
  });
  const [originalStats, setOriginalStats] = useState<ProjectStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      const data = await response.json();
      
      const formattedStats: ProjectStats = {
        completion_percentage: data.completion_percentage || '',
        phase_name: data.phase_name || '',
        version: data.version || ''
      };
      
      setStats(formattedStats);
      setOriginalStats(formattedStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to load project stats',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ProjectStats, value: string) => {
    const newStats = { ...stats, [field]: value };
    setStats(newStats);
    setHasChanges(JSON.stringify(newStats) !== JSON.stringify(originalStats));
  };

  const handleSave = async (field: keyof ProjectStats) => {
    try {
      setSaving(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast({
          title: 'Error',
          description: 'Session expired. Please login again.',
          variant: 'destructive'
        });
        return;
      }

      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          setting_key: field,
          setting_value: stats[field]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save setting');
      }

      setOriginalStats({ ...stats });
      setHasChanges(false);
      
      toast({
        title: 'Success',
        description: `${field.replace(/_/g, ' ')} updated successfully`,
        variant: 'default'
      });
    } catch (error) {
      console.error('Error saving setting:', error);
      toast({
        title: 'Error',
        description: 'Failed to save setting',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast({
          title: 'Error',
          description: 'Session expired. Please login again.',
          variant: 'destructive'
        });
        return;
      }

      const updates = [
        { setting_key: 'completion_percentage', setting_value: stats.completion_percentage },
        { setting_key: 'phase_name', setting_value: stats.phase_name },
        { setting_key: 'version', setting_value: stats.version }
      ];

      for (const update of updates) {
        const response = await fetch('/api/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify(update)
        });

        if (!response.ok) {
          throw new Error(`Failed to save ${update.setting_key}`);
        }
      }

      setOriginalStats({ ...stats });
      setHasChanges(false);
      
      toast({
        title: 'Success',
        description: 'All project stats updated successfully',
        variant: 'default'
      });
    } catch (error) {
      console.error('Error saving stats:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project stats',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Completion Percentage */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Completion Percentage (%)
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Set the overall project completion percentage (0-100)
            </p>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={stats.completion_percentage}
                onChange={(e) => handleChange('completion_percentage', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="99"
              />
              <Button
                onClick={() => handleSave('completion_percentage')}
                disabled={saving}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
              </Button>
            </div>
          </div>
        </div>

        {/* Phase Name */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Current Phase
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Set the current development phase name
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={stats.phase_name}
                onChange={(e) => handleChange('phase_name', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Final Enhancement"
              />
              <Button
                onClick={() => handleSave('phase_name')}
                disabled={saving}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
              </Button>
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Version Number
            </label>
            <p className="text-xs text-gray-500 mb-3">
              Set the current version (e.g., v1.3.0)
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={stats.version}
                onChange={(e) => handleChange('version', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="v1.3.0"
              />
              <Button
                onClick={() => handleSave('version')}
                disabled={saving}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save All Button */}
      <div className="pt-4 flex gap-3">
        <Button
          onClick={handleSaveAll}
          disabled={saving || !hasChanges}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            'Save All Changes'
          )}
        </Button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
        <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-semibold">Real-time Updates</p>
          <p className="text-xs mt-1">
            Changes are saved to the database and will be reflected on the documentation page immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
