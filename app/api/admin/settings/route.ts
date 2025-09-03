import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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

    // For now, return default settings
    // In a real app, you'd store these in a settings table
    const defaultSettings = {
      platformName: "Altroway Job Platform",
      platformDescription: "A modern job platform for European opportunities",
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 24,
      twoFactorAuth: false,
      maxLoginAttempts: 5,
      welcomeEmails: true,
      jobNotifications: true,
      applicationUpdates: true,
      marketingEmails: false,
      emailFrom: "noreply@altroway.com",
      backupFrequency: "daily",
      dataRetention: 7,
      autoCleanup: true,
      enableChat: true,
      enableAnalytics: true,
      enableJobRecommendations: true,
      enableCompanyProfiles: true,
      enableLegalServices: true
    };

    return NextResponse.json({ settings: defaultSettings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

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

    const settings = await request.json();

    // In a real app, you'd save these to a settings table
    // For now, we'll just log them and return success
    console.log("Settings updated:", settings);

    // You could create a settings table like this:
    // CREATE TABLE platform_settings (
    //   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    //   key VARCHAR(255) UNIQUE NOT NULL,
    //   value JSONB NOT NULL,
    //   updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    //   updated_by UUID REFERENCES auth.users(id)
    // );

    return NextResponse.json({ 
      success: true, 
      message: "Settings saved successfully",
      settings 
    });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}