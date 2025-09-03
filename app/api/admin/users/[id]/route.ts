import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is super admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (profile?.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const userId = params.id;

    // Update user profile
    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", userId)
      .select();

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in user update API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is super admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (profile?.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userId = params.id;

    // Delete user profile and related data
    const { error: profileError } = await supabase
      .from("profiles")
      .delete()
      .eq("user_id", userId);

    if (profileError) {
      console.error("Error deleting user profile:", profileError);
      return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }

    // Delete user's jobs
    const { error: jobsError } = await supabase
      .from("jobs")
      .delete()
      .eq("employer_id", userId);

    if (jobsError) {
      console.error("Error deleting user jobs:", jobsError);
    }

    // Delete user's job applications
    const { error: applicationsError } = await supabase
      .from("job_applications")
      .delete()
      .eq("user_id", userId);

    if (applicationsError) {
      console.error("Error deleting user applications:", applicationsError);
    }

    // Delete user's saved jobs
    const { error: savedJobsError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("user_id", userId);

    if (savedJobsError) {
      console.error("Error deleting user saved jobs:", savedJobsError);
    }

    // Delete user's analytics events
    const { error: analyticsError } = await supabase
      .from("analytics_events")
      .delete()
      .eq("user_id", userId);

    if (analyticsError) {
      console.error("Error deleting user analytics:", analyticsError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in user delete API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
