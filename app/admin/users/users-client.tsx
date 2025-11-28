"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, XCircle, Shield, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UserManagementActions } from "./user-management-actions";

interface User {
  user_id: string;
  full_name: string | null;
  username: string | null;
  role: string;
  is_active: boolean;
  headline: string | null;
  created_at: string;
}

export function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    superAdmins: 0,
    jobSeekers: 0,
    employers: 0,
    legalAdvisors: 0
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const supabase = createClient();
        
        // Check if user is authenticated and is super admin
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.href = "/login";
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("user_id", user.id)
          .single();

        if (profile?.role !== "super_admin") {
          window.location.href = "/dashboard";
          return;
        }

        // Fetch all users
        const { data: usersData, error: usersError } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (usersError) {
          console.error("Error fetching users:", usersError);
          setError(usersError.message);
          return;
        }

                 // Filter out any null/undefined users
         const validUsers = (usersData || []).filter(user => user && user.user_id);
         setUsers(validUsers);

                 // Calculate statistics using valid users
         const totalUsers = validUsers.length;
         const activeUsers = validUsers.filter(u => u?.is_active).length;
         const jobSeekers = validUsers.filter(u => u?.role === 'job_seeker').length;
         const employers = validUsers.filter(u => u?.role === 'employer').length;
         const legalAdvisors = validUsers.filter(u => u?.role === 'legal_advisor').length;
         const superAdmins = validUsers.filter(u => u?.role === 'super_admin').length;

        setStats({
          totalUsers,
          activeUsers,
          superAdmins,
          jobSeekers,
          employers,
          legalAdvisors
        });

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
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
                <p className="text-2xl font-bold">{stats.totalUsers}</p>
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
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
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
                <p className="text-2xl font-bold">{stats.superAdmins}</p>
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
                <p className="text-2xl font-bold">{stats.jobSeekers}</p>
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
                <p className="text-2xl font-bold">{stats.employers}</p>
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
                <p className="text-2xl font-bold">{stats.legalAdvisors}</p>
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
              {users.map((user) => (
                <TableRow key={user.user_id}>
                                     <TableCell>
                     <div>
                       <p className="font-medium">{user?.full_name || 'N/A'}</p>
                       <p className="text-sm text-gray-600">{user?.username || 'No username'}</p>
                     </div>
                   </TableCell>
                                     <TableCell>
                     <Badge variant={
                       user?.role === 'super_admin' ? 'default' :
                       user?.role === 'employer' ? 'secondary' :
                       user?.role === 'legal_advisor' ? 'outline' : 'default'
                     }>
                       {user?.role?.replace('_', ' ') || 'Unknown'}
                     </Badge>
                   </TableCell>
                                     <TableCell>
                     <div className="flex items-center gap-2">
                       {user?.is_active ? (
                         <CheckCircle className="h-4 w-4 text-green-600" />
                       ) : (
                         <XCircle className="h-4 w-4 text-red-600" />
                       )}
                       <span className={user?.is_active ? 'text-green-600' : 'text-red-600'}>
                         {user?.is_active ? 'Active' : 'Inactive'}
                       </span>
                     </div>
                   </TableCell>
                   <TableCell>{user?.headline || 'N/A'}</TableCell>
                                     <TableCell>
                     <div className="flex items-center gap-2">
                       <Calendar className="h-4 w-4 text-gray-400" />
                       <span className="text-sm">
                         {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                       </span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <UserManagementActions userId={user?.user_id || ''} />
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
