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

    const { query } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    // Security: Only allow SELECT queries for safety
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery.startsWith('select')) {
      return NextResponse.json({ 
        error: "Only SELECT queries are allowed for security reasons" 
      }, { status: 400 });
    }

    // Execute the query using Supabase RPC
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: query
    });

    if (error) {
      console.error("Query execution error:", error);
      return NextResponse.json({ 
        error: "Query execution failed", 
        details: error.message 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Query executed successfully",
      data,
      query
    });
  } catch (error) {
    console.error("Error executing custom query:", error);
    return NextResponse.json({ 
      error: "Query execution failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
