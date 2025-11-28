import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET settings
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('setting_key, setting_value, description')
      .eq('is_public', true);

    if (error) throw error;

    // Convert array to object for easier access
    const settings: Record<string, string> = {};
    data?.forEach((item: any) => {
      settings[item.setting_key] = item.setting_value;
    });

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// PUT to update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    // Check if user is admin
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is super_admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (profile?.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only admins can update settings' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { setting_key, setting_value } = body;

    if (!setting_key || setting_value === undefined) {
      return NextResponse.json(
        { error: 'setting_key and setting_value are required' },
        { status: 400 }
      );
    }

    // Update setting
    const { data, error } = await supabase
      .from('site_settings')
      .update({ setting_value })
      .eq('setting_key', setting_key)
      .select();

    if (error) throw error;

    return NextResponse.json({
      message: 'Setting updated successfully',
      data: data?.[0]
    });
  } catch (error) {
    console.error('Settings API error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
