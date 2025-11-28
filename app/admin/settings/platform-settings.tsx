"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Mail, 
  Shield,
  Database,
  Bell
} from "lucide-react";
import { toast } from "sonner";

export function PlatformSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    platformName: "Altroway Job Platform",
    platformDescription: "A modern job platform for European opportunities",
    maintenanceMode: false,
    allowRegistration: true,
    
    // Security Settings
    passwordMinLength: 8,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    
    // Email Settings
    emailFrom: "noreply@altroway.com",
    
    // Feature Flags (Only real features)
    enableJobPosting: true,
    enableUserProfiles: true,
    enableJobApplications: true,
    enableSavedJobs: true,
    enableMessaging: true
  });

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Error saving settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values
      setSettings({
        platformName: "Altroway Job Platform",
        platformDescription: "A modern job platform for European opportunities",
        maintenanceMode: false,
        allowRegistration: true,
        passwordMinLength: 8,
        sessionTimeout: 24,
        maxLoginAttempts: 5,
        emailFrom: "noreply@altroway.com",
        enableJobPosting: true,
        enableUserProfiles: true,
        enableJobApplications: true,
        enableSavedJobs: true,
        enableMessaging: true
      });
      toast.success('Settings reset to defaults');
    }
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            General Platform Settings
          </CardTitle>
          <CardDescription>
            Basic platform configuration and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="platformName">Platform Name</Label>
              <Input
                id="platformName"
                value={settings.platformName}
                onChange={(e) => setSettings({...settings, platformName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="emailFrom">Email From Address</Label>
              <Input
                id="emailFrom"
                value={settings.emailFrom}
                onChange={(e) => setSettings({...settings, emailFrom: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="platformDescription">Platform Description</Label>
            <Textarea
              id="platformDescription"
              value={settings.platformDescription}
              onChange={(e) => setSettings({...settings, platformDescription: e.target.value})}
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Temporarily disable platform access</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="allowRegistration">Allow Registration</Label>
                <p className="text-sm text-gray-600">Enable new user signups</p>
              </div>
              <Switch
                id="allowRegistration"
                checked={settings.allowRegistration}
                onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

             {/* Security Settings */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <Shield className="h-5 w-5" />
             Security Configuration
           </CardTitle>
           <CardDescription>
             Basic security settings
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div>
               <Label htmlFor="passwordMinLength">Password Min Length</Label>
               <Input
                 id="passwordMinLength"
                 type="number"
                 min="6"
                 max="20"
                 value={settings.passwordMinLength}
                 onChange={(e) => setSettings({...settings, passwordMinLength: parseInt(e.target.value)})}
               />
             </div>
             
             <div>
               <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
               <Input
                 id="sessionTimeout"
                 type="number"
                 min="1"
                 max="168"
                 value={settings.sessionTimeout}
                 onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
               />
             </div>
             
             <div>
               <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
               <Input
                 id="maxLoginAttempts"
                 type="number"
                 min="3"
                 max="10"
                 value={settings.maxLoginAttempts}
                 onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
               />
             </div>
           </div>
         </CardContent>
       </Card>

             {/* Email Settings */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <Mail className="h-5 w-5" />
             Email Configuration
           </CardTitle>
           <CardDescription>
             Basic email settings
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <div>
             <Label htmlFor="emailFrom">Email From Address</Label>
             <Input
               id="emailFrom"
               value={settings.emailFrom}
               onChange={(e) => setSettings({...settings, emailFrom: e.target.value})}
               placeholder="noreply@altroway.com"
             />
           </div>
         </CardContent>
       </Card>

             {/* Feature Flags */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <Bell className="h-5 w-5" />
             Platform Features
           </CardTitle>
           <CardDescription>
             Enable or disable platform features (only real features)
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center justify-between">
               <div>
                 <Label htmlFor="enableJobPosting">Job Posting</Label>
                 <p className="text-sm text-gray-600">Allow employers to post jobs</p>
               </div>
               <Switch
                 id="enableJobPosting"
                 checked={settings.enableJobPosting}
                 onCheckedChange={(checked) => setSettings({...settings, enableJobPosting: checked})}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <div>
                 <Label htmlFor="enableUserProfiles">User Profiles</Label>
                 <p className="text-sm text-gray-600">User profile management</p>
               </div>
               <Switch
                 id="enableUserProfiles"
                 checked={settings.enableUserProfiles}
                 onCheckedChange={(checked) => setSettings({...settings, enableUserProfiles: checked})}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <div>
                 <Label htmlFor="enableJobApplications">Job Applications</Label>
                 <p className="text-sm text-gray-600">Job application system</p>
               </div>
               <Switch
                 id="enableJobApplications"
                 checked={settings.enableJobApplications}
                 onCheckedChange={(checked) => setSettings({...settings, enableJobApplications: checked})}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <div>
                 <Label htmlFor="enableSavedJobs">Saved Jobs</Label>
                 <p className="text-sm text-gray-600">Job seekers can save jobs</p>
               </div>
               <Switch
                 id="enableSavedJobs"
                 checked={settings.enableSavedJobs}
                 onCheckedChange={(checked) => setSettings({...settings, enableSavedJobs: checked})}
               />
             </div>
             
             <div className="flex items-center justify-between">
               <div>
                 <Label htmlFor="enableMessaging">Messaging</Label>
                 <p className="text-sm text-gray-600">User messaging system</p>
               </div>
               <Switch
                 id="enableMessaging"
                 checked={settings.enableMessaging}
                 onCheckedChange={(checked) => setSettings({...settings, enableMessaging: checked})}
               />
             </div>
           </div>
         </CardContent>
       </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSaveSettings} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
