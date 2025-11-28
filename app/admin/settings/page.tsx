import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Settings, Shield, Globe, Mail, Database, Bell, Users, Lock, AlertTriangle, Gauge } from "lucide-react";
import Link from "next/link";
import { PlatformSettings } from "./platform-settings";
import { ProjectStatsSettings } from "./project-stats";

export default async function AdminSettingsPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // Check if user is super admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-2">Configure platform-wide settings and preferences</p>
        </div>

        {/* Settings Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic platform configuration and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Platform Name</p>
                  <p className="text-sm text-gray-600">Altroway Job Platform</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-600">Platform availability</p>
                </div>
                <Badge variant="outline" className="text-green-600">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Registration</p>
                  <p className="text-sm text-gray-600">New user signups</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Authentication and security configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password Requirements</p>
                  <p className="text-sm text-gray-600">Minimum 8 characters</p>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Optional for users</p>
                </div>
                <Badge variant="outline">Optional</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-gray-600">24 hours</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>
                Email notifications and templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Welcome Emails</p>
                  <p className="text-sm text-gray-600">New user onboarding</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Job Notifications</p>
                  <p className="text-sm text-gray-600">New job alerts</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Application Updates</p>
                  <p className="text-sm text-gray-600">Status changes</p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Management
              </CardTitle>
              <CardDescription>
                Database operations and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Database Status</p>
                  <p className="text-sm text-gray-600">Supabase PostgreSQL</p>
                </div>
                <Badge variant="default" className="text-green-600">Healthy</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Backup Schedule</p>
                  <p className="text-sm text-gray-600">Daily at 2 AM</p>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Retention</p>
                  <p className="text-sm text-gray-600">7 years</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Stats Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Project Statistics
            </CardTitle>
            <CardDescription>
              Update project completion percentage, phase, and version in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProjectStatsSettings />
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Advanced Platform Settings
            </CardTitle>
            <CardDescription>
              Configure advanced platform features and integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformSettings />
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current system health and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">2.3s</div>
                <div className="text-sm text-gray-600">Avg Response</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1.2GB</div>
                <div className="text-sm text-gray-600">Database Size</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">8</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}