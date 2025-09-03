"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Trash2, 
  Download, 
  Upload, 
  RefreshCw, 
  AlertTriangle, 
  Database,
  FileText,
  Zap
} from "lucide-react";
import { toast } from "sonner";

export function DatabaseManagementTools() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCleanupDialog, setShowCleanupDialog] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showQueryDialog, setShowQueryDialog] = useState(false);
  const [customQuery, setCustomQuery] = useState("");

  const handleDatabaseCleanup = async (type: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/cleanup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      });

      if (response.ok) {
        toast.success(`${type} cleanup completed successfully`);
      } else {
        toast.error(`Failed to cleanup ${type}`);
      }
    } catch (error) {
      toast.error('Error during cleanup');
    } finally {
      setIsLoading(false);
      setShowCleanupDialog(false);
    }
  };

  const handleDatabaseBackup = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/backup', {
        method: 'POST',
      });

      if (response.ok) {
        toast.success('Database backup created successfully');
      } else {
        toast.error('Failed to create backup');
      }
    } catch (error) {
      toast.error('Error creating backup');
    } finally {
      setIsLoading(false);
      setShowBackupDialog(false);
    }
  };

  const handleCustomQuery = async () => {
    if (!customQuery.trim()) {
      toast.error('Please enter a SQL query');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/database/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: customQuery }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Query executed successfully');
        console.log('Query result:', result);
      } else {
        toast.error('Failed to execute query');
      }
    } catch (error) {
      toast.error('Error executing query');
    } finally {
      setIsLoading(false);
      setShowQueryDialog(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database Cleanup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Database Cleanup
            </CardTitle>
            <CardDescription>
              Clean up old data and optimize database performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('analytics')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clean Old Analytics Events
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('applications')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clean Old Applications
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('sessions')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clean Expired Sessions
              </Button>
            </div>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => setShowCleanupDialog(true)}
              disabled={isLoading}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Advanced Cleanup
            </Button>
          </CardContent>
        </Card>

        {/* Database Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Database Backup
            </CardTitle>
            <CardDescription>
              Create and manage database backups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDatabaseBackup}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Create Full Backup
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('backup_cleanup')}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clean Old Backups
              </Button>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setShowBackupDialog(true)}
              disabled={isLoading}
            >
              <FileText className="h-4 w-4 mr-2" />
              Backup Settings
            </Button>
          </CardContent>
        </Card>

        {/* Database Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Database Maintenance
            </CardTitle>
            <CardDescription>
              Optimize and maintain database performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('vacuum')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Vacuum Database
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('analyze')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Update Statistics
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('reindex')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reindex Tables
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Custom SQL Query */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Custom SQL Query
            </CardTitle>
            <CardDescription>
              Execute custom SQL queries (Super Admin only)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setShowQueryDialog(true)}
                disabled={isLoading}
              >
                <FileText className="h-4 w-4 mr-2" />
                Execute Custom Query
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleDatabaseCleanup('test_connection')}
                disabled={isLoading}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Test Database Connection
              </Button>
            </div>
            
            <div className="text-xs text-gray-500">
              ⚠️ Use with extreme caution. Incorrect queries can damage data.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Cleanup Dialog */}
      <AlertDialog open={showCleanupDialog} onOpenChange={setShowCleanupDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Advanced Database Cleanup</AlertDialogTitle>
            <AlertDialogDescription>
              This will perform advanced cleanup operations. This action cannot be undone.
              Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => handleDatabaseCleanup('advanced')}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Cleaning...' : 'Proceed with Cleanup'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Backup Settings Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup Settings</DialogTitle>
            <DialogDescription>
              Configure automatic backup settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="retentionDays">Retention Days</Label>
              <Input
                id="retentionDays"
                type="number"
                defaultValue="30"
                min="1"
                max="365"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast.success('Backup settings saved');
              setShowBackupDialog(false);
            }}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Query Dialog */}
      <Dialog open={showQueryDialog} onOpenChange={setShowQueryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Execute Custom SQL Query</DialogTitle>
            <DialogDescription>
              Enter a SQL query to execute. Use with extreme caution.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="customQuery">SQL Query</Label>
              <Textarea
                id="customQuery"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="SELECT * FROM profiles LIMIT 10;"
                rows={6}
                className="font-mono text-sm"
              />
            </div>
            
            <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
              ⚠️ Warning: This will execute the SQL query directly on the database. 
              Make sure you know what you're doing. Incorrect queries can cause data loss.
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQueryDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCustomQuery}
              disabled={isLoading || !customQuery.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Executing...' : 'Execute Query'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
