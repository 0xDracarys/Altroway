import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    const status = searchParams.get('status') || 'active';

    let query = supabase
      .from('jobs')
      .select('id, title, company, location, industry, salary_min, salary_max, job_type, experience_level, description, created_at')
      .eq('status', status);

    if (industry) {
      query = query.ilike('industry', `%${industry}%`);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw error;
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}
