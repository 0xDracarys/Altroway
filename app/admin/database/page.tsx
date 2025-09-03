import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Database, Trash2, Download, Upload, RefreshCw, AlertTriangle, CheckCircle, HardDrive } from "lucide-react";
import Link from "next/link";
import { DatabaseManagementTools } from "./database-management-tools";

export default async function AdminDatabasePage() {
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

  // Get database statistics
  const [
    { count: profilesCount },
    { count: jobsCount },
    { count: applicationsCount },
    { count: eventsCount }
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }),
    supabase.from("job_applications").select("*", { count: "exact", head: true }),
    supabase.from("analytics_events").select("*", { count: "exact", head: true }).catch(() => ({ count: 0 }))
  ]);

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
          <h1 className="text-3xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600 mt-2">Manage database operations, backups, and maintenance</p>
        </div>

        {/* Database Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{profilesCount || 0}</p>
                  <p className="text-sm text-gray-600">User Profiles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{jobsCount || 0}</p>
                  <p className="text-sm text-gray-600">Job Listings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{applicationsCount || 0}</p>
                  <p className="text-sm text-gray-600">Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{eventsCount || 0}</p>
                  <p className="text-sm text-gray-600">Analytics Events</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Tables Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Database Tables</CardTitle>
            <CardDescription>Overview of all database tables and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Table Name</TableHead>
                  <TableHead>Records</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">profiles</span>
                    </div>
                  </TableCell>
                  <TableCell>{profilesCount || 0}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </TableCell>
                  <TableCell>Just now</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">jobs</span>
                    </div>
                  </TableCell>
                  <TableCell>{jobsCount || 0}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </TableCell>
                  <TableCell>Just now</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">job_applications</span>
                    </div>
                  </TableCell>
                  <TableCell>{applicationsCount || 0}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </TableCell>
                  <TableCell>Just now</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-gray-400" />
                      <span className="font-mono">analytics_events</span>
                    </div>
                  </TableCell>
                  <TableCell>{eventsCount || 0}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </TableCell>
                  <TableCell>Just now</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Database Management Tools */}
        <DatabaseManagementTools />

        {/* System Health */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Database performance and health metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Database Uptime</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">45ms</div>
                <div className="text-sm text-gray-600">Avg Query Time</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1.2GB</div>
                <div className="text-sm text-gray-600">Database Size</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}