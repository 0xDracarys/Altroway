import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Briefcase, Building, MapPin, DollarSign, Calendar, Users, Eye, Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { JobManagementActions } from "./job-management-actions";

export default async function AdminJobsPage() {
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

  // Fetch all jobs
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select(`
      *,
      profiles:employer_id (
        full_name,
        username
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
  }

  // Get job statistics
  const totalJobs = jobs?.length || 0;
  const activeJobs = jobs?.filter(j => j.status === 'active').length || 0;
  const draftJobs = jobs?.filter(j => j.status === 'draft').length || 0;
  const closedJobs = jobs?.filter(j => j.status === 'closed').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/jobs/create" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Job
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-2">Manage all job postings and applications</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalJobs}</p>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{activeJobs}</p>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{draftJobs}</p>
                  <p className="text-sm text-gray-600">Draft Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{closedJobs}</p>
                  <p className="text-sm text-gray-600">Closed Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Jobs</CardTitle>
            <CardDescription>Manage job postings and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Employer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Salary</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs?.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-600">{job.job_type}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>{job.company}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {job.profiles ? (
                        <div>
                          <p className="font-medium">{job.profiles.full_name}</p>
                          <p className="text-sm text-gray-600">{job.profiles.username}</p>
                        </div>
                      ) : (
                        <span className="text-gray-500">Unknown</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        job.status === 'active' ? 'default' :
                        job.status === 'draft' ? 'secondary' : 'outline'
                      }>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {job.salary_min && job.salary_max ? (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">Not specified</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <JobManagementActions job={job} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {(!jobs || jobs.length === 0) && (
              <div className="text-center py-8">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No jobs found</p>
                <p className="text-sm text-gray-400">Jobs will appear here when employers post them</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}