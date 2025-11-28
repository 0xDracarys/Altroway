"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, CheckCircle, XCircle, Calendar, ArrowLeft, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { JobManagementActions } from "./job-management-actions";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  employer_id: string;
  created_at: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  job_type?: string;
}

export function JobsClient() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    draftJobs: 0,
    closedJobs: 0
  });

  useEffect(() => {
    async function fetchJobs() {
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

        // Fetch all jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from("jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (jobsError) {
          console.error("Error fetching jobs:", jobsError);
          setError(jobsError.message);
          return;
        }

                 // Filter out any null/undefined jobs
         const validJobs = (jobsData || []).filter(job => job && job.id);
         setJobs(validJobs);

                 // Calculate statistics using valid jobs
         const totalJobs = validJobs.length;
         const activeJobs = validJobs.filter(j => j?.status === 'active').length;
         const draftJobs = validJobs.filter(j => j?.status === 'draft').length;
         const closedJobs = validJobs.filter(j => j?.status === 'closed').length;

        setStats({
          totalJobs,
          activeJobs,
          draftJobs,
          closedJobs
        });

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
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
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
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
                <p className="text-2xl font-bold">{stats.activeJobs}</p>
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
                <p className="text-2xl font-bold">{stats.draftJobs}</p>
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
                <p className="text-2xl font-bold">{stats.closedJobs}</p>
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
              {jobs.map((job) => (
                <TableRow key={job.id}>
                                     <TableCell>
                     <div>
                       <p className="font-medium">{job?.title || 'N/A'}</p>
                       <p className="text-sm text-gray-600">{job?.job_type || 'Full-time'}</p>
                     </div>
                   </TableCell>
                   <TableCell>
                     <p className="font-medium">{job?.company || 'N/A'}</p>
                   </TableCell>
                   <TableCell>
                     <p className="text-sm">{job?.location || 'N/A'}</p>
                   </TableCell>
                                     <TableCell>
                     <Badge variant={
                       job?.status === 'active' ? 'default' :
                       job?.status === 'draft' ? 'secondary' :
                       job?.status === 'closed' ? 'destructive' : 'outline'
                     }>
                       {job?.status || 'Unknown'}
                     </Badge>
                   </TableCell>
                   <TableCell>
                     <span className="text-gray-500">Employer ID: {job?.employer_id || 'N/A'}</span>
                   </TableCell>
                                     <TableCell>
                     <div className="flex items-center gap-2">
                       <Calendar className="h-4 w-4 text-gray-400" />
                       <span className="text-sm">
                         {job?.created_at ? new Date(job.created_at).toLocaleDateString() : 'N/A'}
                       </span>
                     </div>
                   </TableCell>
                   <TableCell>
                     <JobManagementActions jobId={job?.id || ''} />
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
