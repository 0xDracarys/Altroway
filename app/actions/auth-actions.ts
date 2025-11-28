"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    console.error("Logout error:", error);
  }
  // Always redirect to home after logout attempt
  redirect("/");
}

export async function getUserRole() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { role: null };
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user role:", error);
      return { role: null };
    }

    return { role: profile?.role || "job_seeker" };
  } catch (error) {
    console.error("getUserRole error:", error);
    return { role: null };
  }
}

export async function updateUserRole(role: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: "Authentication required" };
    }

    // Validate role
    const validRoles = ["job_seeker", "employer", "legal_advisor", "super_admin"];
    if (!validRoles.includes(role)) {
      return { error: "Invalid role" };
    }

    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating user role:", error);
      return { error: "Failed to update role" };
    }

    return { success: true };
  } catch (error) {
    console.error("updateUserRole error:", error);
    return { error: "Failed to update role" };
  }
}

export async function checkPermission(requiredRole: string) {
  try {
    const { role } = await getUserRole();
    
    if (!role) {
      return { hasPermission: false };
    }

    // Special case: super_admin can do everything
    if (role === "super_admin") {
      return { hasPermission: true };
    }

    // Define which roles can access which features
    const rolePermissions: { [key: string]: string[] } = {
      "job_seeker": ["job_seeker"], // Can only access job_seeker features
      "employer": ["employer", "job_seeker"], // Can access employer and job_seeker features
      "legal_advisor": ["legal_advisor", "job_seeker"], // Can access legal and job_seeker features
      "super_admin": ["super_admin", "employer", "legal_advisor", "job_seeker"], // Can access all
    };

    const userPermissions = rolePermissions[role] || [];
    
    // Check if user's role has permission to access required role's features
    const hasPermission = userPermissions.includes(requiredRole);
    
    return { hasPermission };
  } catch (error) {
    console.error("checkPermission error:", error);
    return { hasPermission: false };
  }
}
