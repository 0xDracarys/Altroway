const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  try {
    console.log('🔍 Checking database schema...');
    
    // Check profiles table
    console.log('\n📋 Profiles table:');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profilesError) {
      console.error('❌ Error fetching profiles:', profilesError);
    } else if (profiles && profiles.length > 0) {
      console.log('✅ Profiles table columns:', Object.keys(profiles[0]));
    } else {
      console.log('⚠️  No profiles found');
    }

    // Check jobs table
    console.log('\n💼 Jobs table:');
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .limit(1);
      
    if (jobsError) {
      console.error('❌ Error fetching jobs:', jobsError);
    } else if (jobs && jobs.length > 0) {
      console.log('✅ Jobs table columns:', Object.keys(jobs[0]));
    } else {
      console.log('⚠️  No jobs found');
    }

    // Check analytics_events table
    console.log('\n📊 Analytics events table:');
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(1);
      
    if (eventsError) {
      console.error('❌ Error fetching analytics_events:', eventsError);
    } else if (events && events.length > 0) {
      console.log('✅ Analytics events table columns:', Object.keys(events[0]));
    } else {
      console.log('⚠️  No analytics events found');
    }

    // Get actual data counts
    console.log('\n📈 Data counts:');
    const { count: profilesCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    console.log(`Profiles: ${profilesCount}`);

    const { count: jobsCount } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    console.log(`Jobs: ${jobsCount}`);

    const { count: eventsCount } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true });
    console.log(`Analytics events: ${eventsCount}`);

  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

checkSchema();
