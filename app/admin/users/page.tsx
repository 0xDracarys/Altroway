import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ArrowLeft, Shield, Mail, Calendar, CheckCircle, XCircle, Edit, Trash2, UserPlus, Ban, Unlock } from "lucide-react";
import Link from "next/link";
import { UserManagementActions } from "./user-management-actions";
import { AutoRefresh } from "../auto-refresh";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  
  // DEBUG: Show what we're getting
  console.log("DEBUG: User from auth:", user?.email || "NO USER");
  
  if (!user) {
    console.log("DEBUG: No user found, redirecting to login");
    redirect("/login");
  }

  // Check if user is super admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  console.log("DEBUG: Profile check:", profile?.role || "NO PROFILE", profileError?.message || "NO ERROR");

  if (profile?.role !== "super_admin") {
    console.log("DEBUG: Not super admin, redirecting to dashboard");
    redirect("/dashboard");
  }

  // Fetch all users
  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("DEBUG: Users query result:", users?.length || 0, "users", error?.message || "NO ERROR");

  if (error) {
    console.error("Error fetching users:", error);
  }

  // Get user statistics
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter(u => u.is_active).length || 0;
  const jobSeekers = users?.filter(u => u.role === 'job_seeker').length || 0;
  const employers = users?.filter(u => u.role === 'employer').length || 0;
  const legalAdvisors = users?.filter(u => u.role === 'legal_advisor').length || 0;
  const superAdmins = users?.filter(u => u.role === 'super_admin').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <AutoRefresh />
      <div className="container mx-auto px-4 py-8">
        {/* Auto-refresh and cache busting */}
        <div className="mb-4 p-2 bg-blue-100 text-blue-800 text-sm rounded">
          🔄 Page refreshed at: {new Date().toLocaleString()} | Users: {totalUsers}
          <button 
            onClick={() => window.location.reload()} 
            className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
          >
            Refresh Now
          </button>
        </div>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                  <p className="text-sm text-gray-600">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{superAdmins}</p>
                  <p className="text-sm text-gray-600">Super Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{jobSeekers}</p>
                  <p className="text-sm text-gray-600">Job Seekers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{employers}</p>
                  <p className="text-sm text-gray-600">Employers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{legalAdvisors}</p>
                  <p className="text-sm text-gray-600">Legal Advisors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Manage user accounts and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Headline</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user) => (
                  <TableRow key={user.user_id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.full_name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{user.username || 'No username'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        user.role === 'super_admin' ? 'default' :
                        user.role === 'employer' ? 'secondary' :
                        user.role === 'legal_advisor' ? 'outline' : 'default'
                      }>
                        {user.role?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {user.is_active ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={user.is_active ? 'text-green-600' : 'text-red-600'}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.headline || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(user.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <UserManagementActions userId={user.user_id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}