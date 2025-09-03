"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle,
  Pause,
  Play
} from "lucide-react";
import { toast } from "sonner";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  status: string;
  job_type: string;
  experience_level: string;
  salary_min: number;
  salary_max: number;
  visa_sponsorship: boolean;
  created_at: string;
  employer_id: string;
}

interface JobManagementActionsProps {
  job: Job;
}

export function JobManagementActions({ job }: JobManagementActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    title: job.title || '',
    company: job.company || '',
    location: job.location || '',
    description: job.description || '',
    job_type: job.job_type || 'Full-time',
    experience_level: job.experience_level || 'Mid-level',
    salary_min: job.salary_min || 0,
    salary_max: job.salary_max || 0,
    visa_sponsorship: job.visa_sponsorship || false
  });

  const handleDeleteJob = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Job deleted successfully');
        window.location.reload();
      } else {
        toast.error('Failed to delete job');
      }
    } catch (error) {
      toast.error('Error deleting job');
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus
        }),
      });

      if (response.ok) {
        toast.success(`Job status changed to ${newStatus}`);
        window.location.reload();
      } else {
        toast.error('Failed to update job status');
      }
    } catch (error) {
      toast.error('Error updating job status');
    } finally {
      setIsLoading(false);
      setShowStatusDialog(false);
    }
  };

  const handleEditJob = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/jobs/${job.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        toast.success('Job updated successfully');
        window.location.reload();
      } else {
        toast.error('Failed to update job');
      }
    } catch (error) {
      toast.error('Error updating job');
    } finally {
      setIsLoading(false);
      setShowEditDialog(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'draft':
        return <Pause className="h-4 w-4 text-yellow-600" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Pause className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => window.open(`/jobs/${job.id}`, '_blank')}>
            <Eye className="h-4 w-4 mr-2" />
            View Job
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Job
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleStatusChange('active')}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Activate Job
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleStatusChange('draft')}>
            <Pause className="h-4 w-4 mr-2" />
            Mark as Draft
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleStatusChange('closed')}>
            <XCircle className="h-4 w-4 mr-2" />
            Close Job
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Job
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Job Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Job: {job.title}</DialogTitle>
            <DialogDescription>
              Update job information and requirements
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={editForm.company}
                  onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editForm.location}
                onChange={(e) => setEditForm({...editForm, location: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="job_type">Job Type</Label>
                <Select value={editForm.job_type} onValueChange={(value) => setEditForm({...editForm, job_type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="experience_level">Experience Level</Label>
                <Select value={editForm.experience_level} onValueChange={(value) => setEditForm({...editForm, experience_level: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry-level">Entry-level</SelectItem>
                    <SelectItem value="Mid-level">Mid-level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="salary_min">Minimum Salary</Label>
                <Input
                  id="salary_min"
                  type="number"
                  value={editForm.salary_min}
                  onChange={(e) => setEditForm({...editForm, salary_min: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="salary_max">Maximum Salary</Label>
                <Input
                  id="salary_max"
                  type="number"
                  value={editForm.salary_max}
                  onChange={(e) => setEditForm({...editForm, salary_max: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                rows={4}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="visa_sponsorship"
                checked={editForm.visa_sponsorship}
                onChange={(e) => setEditForm({...editForm, visa_sponsorship: e.target.checked})}
                className="rounded"
              />
              <Label htmlFor="visa_sponsorship">Visa Sponsorship Available</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditJob} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Job Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete "{job.title}"? 
              This action cannot be undone and will remove all applications and data related to this job.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteJob}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete Job'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
