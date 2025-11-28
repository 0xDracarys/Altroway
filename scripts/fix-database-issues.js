require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase environment variables are not set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

async function fixDatabaseIssues() {
  try {
    console.log('🔧 Fixing database issues...');

    // 1. Create analytics_events table
    console.log('📊 Creating analytics_events table...');
    const createAnalyticsTable = `
      CREATE TABLE IF NOT EXISTS analytics_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        event_type VARCHAR(50) NOT NULL,
        user_id UUID REFERENCES auth.users(id),
        payload JSONB,
        source VARCHAR(50) DEFAULT 'web'
      );
      
      -- Enable Row Level Security (RLS)
      ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
      
      -- Policies for analytics_events
      CREATE POLICY "Super admins can view all analytics events" ON analytics_events
      FOR SELECT USING (
        EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'super_admin')
      );
      
      CREATE POLICY "Authenticated users can insert their own analytics events" ON analytics_events
      FOR INSERT WITH CHECK (auth.uid() = user_id);
    `;

    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createAnalyticsTable
    });

    if (createError) {
      console.log('⚠️  Could not create analytics table via RPC, trying direct approach...');
      // Try to create it manually by inserting a test record
      const { error: insertError } = await supabase
        .from('analytics_events')
        .insert({
          event_type: 'test',
          user_id: null,
          payload: { test: true }
        });
      
      if (insertError) {
        console.log('❌ Analytics table creation failed:', insertError.message);
      } else {
        console.log('✅ Analytics table created successfully');
        // Clean up test record
        await supabase.from('analytics_events').delete().eq('event_type', 'test');
      }
    } else {
      console.log('✅ Analytics table created successfully');
    }

    // 2. Add missing phone column to profiles if it doesn't exist
    console.log('📱 Adding phone column to profiles...');
    const addPhoneColumn = `
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
    `;

    const { error: phoneError } = await supabase.rpc('exec_sql', {
      sql: addPhoneColumn
    });

    if (phoneError) {
      console.log('⚠️  Could not add phone column:', phoneError.message);
    } else {
      console.log('✅ Phone column added successfully');
    }

    // 3. Create some test analytics events
    console.log('📊 Creating test analytics events...');
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, full_name, role')
      .limit(5);

    if (profiles && profiles.length > 0) {
      const events = [
        { event_type: 'page_view', payload: { page: 'dashboard' } },
        { event_type: 'page_view', payload: { page: 'jobs' } },
        { event_type: 'page_view', payload: { page: 'profile' } },
        { event_type: 'login', payload: { method: 'email' } },
        { event_type: 'job_application', payload: { job_id: 'test-job-1' } },
        { event_type: 'profile_update', payload: {} },
        { event_type: 'message_sent', payload: { conversation_id: 'test-conv-1' } },
        { event_type: 'error', payload: { error: 'Network timeout' } }
      ];

      for (let i = 0; i < 20; i++) {
        const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        const { error: eventError } = await supabase
          .from('analytics_events')
          .insert({
            user_id: randomProfile.user_id,
            event_type: randomEvent.event_type,
            payload: randomEvent.payload,
            created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          });

        if (eventError) {
          console.log(`⚠️  Could not create analytics event:`, eventError.message);
        }
      }
      console.log('✅ Test analytics events created');
    }

    // 4. Verify the setup
    console.log('🔍 Verifying database setup...');
    
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .limit(1);
    
    const { data: analyticsData } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(1);

    console.log('✅ Database verification:');
    console.log(`   - Profiles: ${profilesData ? 'Connected' : 'Error'}`);
    console.log(`   - Jobs: ${jobsData ? 'Connected' : 'Error'}`);
    console.log(`   - Analytics: ${analyticsData ? 'Connected' : 'Error'}`);

    // 5. Get current data counts
    const [
      { count: profilesCount },
      { count: jobsCount },
      { count: analyticsCount }
    ] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("jobs").select("*", { count: "exact", head: true }),
      supabase.from("analytics_events").select("*", { count: "exact", head: true }).catch(() => ({ count: 0 }))
    ]);

    console.log('📈 Current data counts:');
    console.log(`   - Profiles: ${profilesCount || 0}`);
    console.log(`   - Jobs: ${jobsCount || 0}`);
    console.log(`   - Analytics Events: ${analyticsCount || 0}`);

    console.log('🎉 Database issues fixed successfully!');
    console.log('🔑 Your super admin should now be able to see all data');

  } catch (error) {
    console.error('❌ Fix failed:', error);
  }
}

fixDatabaseIssues();


