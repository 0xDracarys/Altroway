import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, ArrowLeft, Calendar, CheckCircle, XCircle, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { JobManagementActions } from "./job-management-actions";
import { AutoRefresh } from "../auto-refresh";

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
    .select("*")
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
      <AutoRefresh />
      <div className="container mx-auto px-4 py-8">
        {/* Auto-refresh and cache busting */}
        <div className="mb-4 p-2 bg-green-100 text-green-800 text-sm rounded">
          🔄 Page refreshed at: {new Date().toLocaleString()} | Jobs: {totalJobs}
          <button 
            onClick={() => window.location.reload()} 
            className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
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
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600 mt-2">Manage job postings and applications</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                <CheckCircle className="h-5 w-5 text-green-600" />
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
                <XCircle className="h-5 w-5 text-red-600" />
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
                  <TableHead>Status</TableHead>
                  <TableHead>Employer</TableHead>
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
                        <p className="text-sm text-gray-600">{job.job_type || 'Full-time'}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{job.company}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{job.location}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        job.status === 'active' ? 'default' :
                        job.status === 'draft' ? 'secondary' :
                        job.status === 'closed' ? 'destructive' : 'outline'
                      }>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-500">Employer ID: {job.employer_id}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(job.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <JobManagementActions jobId={job.id} />
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