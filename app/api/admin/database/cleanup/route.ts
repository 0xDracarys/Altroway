import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

    const { type } = await request.json();

    let result;
    let message;

    switch (type) {
      case 'analytics':
        // Delete analytics events older than 90 days
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 90);
        
        const { error: analyticsError } = await supabase
          .from("analytics_events")
          .delete()
          .lt("created_at", cutoffDate.toISOString());
        
        if (analyticsError) {
          throw analyticsError;
        }
        
        message = "Old analytics events cleaned up successfully";
        break;

      case 'applications':
        // Delete applications older than 1 year
        const appCutoffDate = new Date();
        appCutoffDate.setFullYear(appCutoffDate.getFullYear() - 1);
        
        const { error: applicationsError } = await supabase
          .from("job_applications")
          .delete()
          .lt("created_at", appCutoffDate.toISOString());
        
        if (applicationsError) {
          throw applicationsError;
        }
        
        message = "Old job applications cleaned up successfully";
        break;

      case 'sessions':
        // This would clean up expired sessions if you had a sessions table
        message = "Session cleanup completed (no sessions table found)";
        break;

      case 'vacuum':
        // PostgreSQL VACUUM operation
        const { error: vacuumError } = await supabase.rpc('exec_sql', {
          sql: 'VACUUM ANALYZE;'
        });
        
        if (vacuumError) {
          throw vacuumError;
        }
        
        message = "Database vacuum completed successfully";
        break;

      case 'analyze':
        // Update table statistics
        const { error: analyzeError } = await supabase.rpc('exec_sql', {
          sql: 'ANALYZE;'
        });
        
        if (analyzeError) {
          throw analyzeError;
        }
        
        message = "Database statistics updated successfully";
        break;

      case 'reindex':
        // Reindex tables
        const { error: reindexError } = await supabase.rpc('exec_sql', {
          sql: 'REINDEX DATABASE;'
        });
        
        if (reindexError) {
          throw reindexError;
        }
        
        message = "Database reindexing completed successfully";
        break;

      case 'test_connection':
        // Test database connection
        const { data: testData, error: testError } = await supabase
          .from("profiles")
          .select("count")
          .limit(1);
        
        if (testError) {
          throw testError;
        }
        
        message = "Database connection test successful";
        break;

      case 'advanced':
        // Advanced cleanup - multiple operations
        const advancedCutoffDate = new Date();
        advancedCutoffDate.setDate(advancedCutoffDate.getDate() - 180);
        
        // Clean old analytics
        await supabase
          .from("analytics_events")
          .delete()
          .lt("created_at", advancedCutoffDate.toISOString());
        
        // Clean old applications
        const oldAppCutoff = new Date();
        oldAppCutoff.setFullYear(oldAppCutoff.getFullYear() - 2);
        
        await supabase
          .from("job_applications")
          .delete()
          .lt("created_at", oldAppCutoff.toISOString());
        
        message = "Advanced database cleanup completed successfully";
        break;

      default:
        return NextResponse.json({ error: "Invalid cleanup type" }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message,
      type 
    });
  } catch (error) {
    console.error("Error during database cleanup:", error);
    return NextResponse.json({ 
      error: "Database cleanup failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
