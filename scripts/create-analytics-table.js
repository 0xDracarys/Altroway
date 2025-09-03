const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAnalyticsTable() {
  try {
    console.log('🔧 Creating analytics_events table...');
    
    // Create the analytics_events table
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS analytics_events (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
          event_type VARCHAR(100) NOT NULL,
          event_data JSONB DEFAULT '{}',
          page_url VARCHAR(500),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
        CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
        CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);
        
        ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Super admins can view all analytics events" ON analytics_events
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'super_admin'
          )
        );
        
        CREATE POLICY "Users can view their own analytics events" ON analytics_events
        FOR SELECT USING (auth.uid() = user_id);
        
        CREATE POLICY "Users can insert their own analytics events" ON analytics_events
        FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
      `
    });

    if (createError) {
      console.error('❌ Error creating analytics table:', createError);
    } else {
      console.log('✅ Analytics events table created successfully');
    }

    // Add some test analytics events
    console.log('📊 Adding test analytics events...');
    const { data: profiles } = await supabase
      .from('profiles')
      .select('user_id, full_name, role');

    if (profiles && profiles.length > 0) {
      const events = [
        { event_type: 'page_view', page_url: '/dashboard' },
        { event_type: 'page_view', page_url: '/jobs' },
        { event_type: 'page_view', page_url: '/profile' },
        { event_type: 'login', event_data: { method: 'email' } },
        { event_type: 'job_application', event_data: { job_id: 'test-job-1' } },
        { event_type: 'profile_update' },
        { event_type: 'message_sent', event_data: { conversation_id: 'test-conv-1' } },
        { event_type: 'error', event_data: { error: 'Network timeout' } }
      ];

      for (let i = 0; i < 30; i++) {
        const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        
        const { error: eventError } = await supabase
          .from('analytics_events')
          .insert({
            user_id: randomProfile.user_id,
            event_type: randomEvent.event_type,
            event_data: randomEvent.event_data || {},
            page_url: randomEvent.page_url || null,
            created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          });

        if (eventError) {
          console.log(`⚠️  Could not create analytics event:`, eventError.message);
        }
      }
      console.log('✅ Test analytics events created');
    }

    console.log('🎉 Analytics setup completed successfully!');

  } catch (error) {
    console.error('❌ Analytics setup failed:', error);
  }
}

createAnalyticsTable();
