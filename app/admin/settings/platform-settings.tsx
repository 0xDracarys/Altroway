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
    requireEmailVerification: true,
    
    // Security Settings
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 24,
    twoFactorAuth: false,
    maxLoginAttempts: 5,
    
    // Email Settings
    welcomeEmails: true,
    jobNotifications: true,
    applicationUpdates: true,
    marketingEmails: false,
    emailFrom: "noreply@altroway.com",
    
    // Database Settings
    backupFrequency: "daily",
    dataRetention: 7,
    autoCleanup: true,
    
    // Feature Flags
    enableChat: true,
    enableAnalytics: true,
    enableJobRecommendations: true,
    enableCompanyProfiles: true,
    enableLegalServices: true
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
        requireEmailVerification: true,
        passwordMinLength: 8,
        requireSpecialChars: true,
        sessionTimeout: 24,
        twoFactorAuth: false,
        maxLoginAttempts: 5,
        welcomeEmails: true,
        jobNotifications: true,
        applicationUpdates: true,
        marketingEmails: false,
        emailFrom: "noreply@altroway.com",
        backupFrequency: "daily",
        dataRetention: 7,
        autoCleanup: true,
        enableChat: true,
        enableAnalytics: true,
        enableJobRecommendations: true,
        enableCompanyProfiles: true,
        enableLegalServices: true
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
            Authentication and security policies
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                <p className="text-sm text-gray-600">Enforce complex passwords</p>
              </div>
              <Switch
                id="requireSpecialChars"
                checked={settings.requireSpecialChars}
                onCheckedChange={(checked) => setSettings({...settings, requireSpecialChars: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Optional 2FA for users</p>
              </div>
              <Switch
                id="twoFactorAuth"
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
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
            Email Notifications
          </CardTitle>
          <CardDescription>
            Configure email notifications and templates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="welcomeEmails">Welcome Emails</Label>
                <p className="text-sm text-gray-600">Send to new users</p>
              </div>
              <Switch
                id="welcomeEmails"
                checked={settings.welcomeEmails}
                onCheckedChange={(checked) => setSettings({...settings, welcomeEmails: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="jobNotifications">Job Notifications</Label>
                <p className="text-sm text-gray-600">New job alerts</p>
              </div>
              <Switch
                id="jobNotifications"
                checked={settings.jobNotifications}
                onCheckedChange={(checked) => setSettings({...settings, jobNotifications: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="applicationUpdates">Application Updates</Label>
                <p className="text-sm text-gray-600">Status change notifications</p>
              </div>
              <Switch
                id="applicationUpdates"
                checked={settings.applicationUpdates}
                onCheckedChange={(checked) => setSettings({...settings, applicationUpdates: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-gray-600">Promotional content</p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({...settings, marketingEmails: checked})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Flags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Feature Flags
          </CardTitle>
          <CardDescription>
            Enable or disable platform features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableChat">Chat System</Label>
                <p className="text-sm text-gray-600">User messaging</p>
              </div>
              <Switch
                id="enableChat"
                checked={settings.enableChat}
                onCheckedChange={(checked) => setSettings({...settings, enableChat: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableAnalytics">Analytics</Label>
                <p className="text-sm text-gray-600">User behavior tracking</p>
              </div>
              <Switch
                id="enableAnalytics"
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => setSettings({...settings, enableAnalytics: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableJobRecommendations">Job Recommendations</Label>
                <p className="text-sm text-gray-600">AI-powered suggestions</p>
              </div>
              <Switch
                id="enableJobRecommendations"
                checked={settings.enableJobRecommendations}
                onCheckedChange={(checked) => setSettings({...settings, enableJobRecommendations: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableCompanyProfiles">Company Profiles</Label>
                <p className="text-sm text-gray-600">Employer profiles</p>
              </div>
              <Switch
                id="enableCompanyProfiles"
                checked={settings.enableCompanyProfiles}
                onCheckedChange={(checked) => setSettings({...settings, enableCompanyProfiles: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableLegalServices">Legal Services</Label>
                <p className="text-sm text-gray-600">Legal advisor features</p>
              </div>
              <Switch
                id="enableLegalServices"
                checked={settings.enableLegalServices}
                onCheckedChange={(checked) => setSettings({...settings, enableLegalServices: checked})}
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
