"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Ban, 
  Unlock, 
  Eye, 
  Mail, 
  Shield,
  User
} from "lucide-react";
import { toast } from "sonner";

interface User {
  user_id: string;
  full_name: string;
  username: string;
  role: string;
  is_active: boolean;
  headline: string;
  created_at: string;
  profile_completion: number;
  bio?: string;
  skills?: string[];
}

interface UserManagementActionsProps {
  user: User;
}

export function UserManagementActions({ user }: UserManagementActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    full_name: user.full_name || '',
    username: user.username || '',
    role: user.role || 'job_seeker',
    headline: user.headline || '',
    bio: user.bio || '',
    skills: user.skills?.join(', ') || '',
    profile_completion: user.profile_completion || 0
  });

  const handleDeleteUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user.user_id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('User deleted successfully');
        window.location.reload();
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      toast.error('Error deleting user');
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  const handleToggleUserStatus = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: !user.is_active
        }),
      });

      if (response.ok) {
        toast.success(`User ${user.is_active ? 'banned' : 'unbanned'} successfully`);
        window.location.reload();
      } else {
        toast.error('Failed to update user status');
      }
    } catch (error) {
      toast.error('Error updating user status');
    } finally {
      setIsLoading(false);
      setShowBanDialog(false);
    }
  };

  const handleEditUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        toast.success('User updated successfully');
        window.location.reload();
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      toast.error('Error updating user');
    } finally {
      setIsLoading(false);
      setShowEditDialog(false);
    }
  };

  const handleRoleChange = async (newRole: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/users/${user.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: newRole
        }),
      });

      if (response.ok) {
        toast.success(`User role changed to ${newRole}`);
        window.location.reload();
      } else {
        toast.error('Failed to change user role');
      }
    } catch (error) {
      toast.error('Error changing user role');
    } finally {
      setIsLoading(false);
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
          <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('super_admin')}>
            <Shield className="h-4 w-4 mr-2" />
            Make Super Admin
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('employer')}>
            <User className="h-4 w-4 mr-2" />
            Make Employer
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('job_seeker')}>
            <User className="h-4 w-4 mr-2" />
            Make Job Seeker
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleRoleChange('legal_advisor')}>
            <Shield className="h-4 w-4 mr-2" />
            Make Legal Advisor
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setShowBanDialog(true)}>
            {user.is_active ? (
              <>
                <Ban className="h-4 w-4 mr-2" />
                Ban User
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4 mr-2" />
                Unban User
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User: {user.full_name}</DialogTitle>
            <DialogDescription>
              Update user information and settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editForm.username}
                  onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={editForm.role} onValueChange={(value) => setEditForm({...editForm, role: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="job_seeker">Job Seeker</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="legal_advisor">Legal Advisor</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="profile_completion">Profile Completion (%)</Label>
                <Input
                  id="profile_completion"
                  type="number"
                  min="0"
                  max="100"
                  value={editForm.profile_completion}
                  onChange={(e) => setEditForm({...editForm, profile_completion: parseInt(e.target.value)})}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={editForm.headline}
                onChange={(e) => setEditForm({...editForm, headline: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={editForm.bio}
                onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Input
                id="skills"
                value={editForm.skills}
                onChange={(e) => setEditForm({...editForm, skills: e.target.value})}
                placeholder="React, Node.js, TypeScript"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban/Unban User Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {user.is_active ? 'Ban User' : 'Unban User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {user.is_active 
                ? `Are you sure you want to ban ${user.full_name}? They will not be able to access the platform.`
                : `Are you sure you want to unban ${user.full_name}? They will regain access to the platform.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleToggleUserStatus}
              disabled={isLoading}
              className={user.is_active ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
            >
              {isLoading ? 'Processing...' : (user.is_active ? 'Ban User' : 'Unban User')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete {user.full_name}? 
              This action cannot be undone and will remove all their data from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteUser}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Deleting...' : 'Delete User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
