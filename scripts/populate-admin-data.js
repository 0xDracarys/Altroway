const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function populateAdminData() {
  try {
    console.log('🔧 Populating admin data...');
    
    // First, ensure we have a super admin
    console.log('👤 Setting up super admin...');
    
    // Get the most recent profile and make it super admin
    const { data: recentProfile, error: recentError } = await supabase
      .from('profiles')
      .select('user_id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (recentProfile) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          role: 'super_admin',
          full_name: 'Super Administrator',
          is_active: true,
          phone: '+1-555-0001',
          company: 'Altroway',
          position: 'Super Administrator',
          industry: 'Technology',
          profile_completion: 100
        })
        .eq('user_id', recentProfile.user_id);
        
      if (updateError) {
        console.log('⚠️  Could not update super admin:', updateError.message);
      } else {
        console.log('✅ Super admin updated successfully');
      }
    }

    // Create test users
    console.log('👥 Creating test users...');
    const testUsers = [
      { full_name: 'John Doe', role: 'job_seeker', company: 'Freelancer', position: 'Software Developer' },
      { full_name: 'Jane Smith', role: 'employer', company: 'Tech Corp', position: 'HR Manager' },
      { full_name: 'Bob Wilson', role: 'legal_advisor', company: 'Legal Group', position: 'Immigration Lawyer' },
      { full_name: 'Alice Johnson', role: 'job_seeker', company: 'Startup Inc', position: 'Product Manager' },
      { full_name: 'Mike Brown', role: 'employer', company: 'Finance Ltd', position: 'Recruitment Director' }
    ];

    for (const user of testUsers) {
      const testUserId = crypto.randomUUID();
      
      const { error: userError } = await supabase
        .from('profiles')
        .upsert({
          user_id: testUserId,
          full_name: user.full_name,
          role: user.role,
          is_active: true,
          company: user.company,
          position: user.position,
          industry: 'Technology',
          profile_completion: Math.floor(Math.random() * 100),
          phone: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`
        }, { onConflict: 'user_id' });

      if (userError) {
        console.log(`⚠️  Could not create test user ${user.full_name}:`, userError.message);
      } else {
        console.log(`✅ Test user created: ${user.full_name}`);
      }
    }

    // Create test jobs
    console.log('💼 Creating test jobs...');
    const { data: employerProfile } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('role', 'employer')
      .limit(1)
      .single();

    if (employerProfile) {
      const testJobs = [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          location: 'Berlin, Germany',
          description: 'We are looking for a senior software engineer to join our growing team.',
          salary_min: 70000,
          salary_max: 95000,
          status: 'active',
          employer_id: employerProfile.user_id,
          job_type: 'Full-time',
          experience_level: 'Senior',
          visa_sponsorship: true
        },
        {
          title: 'Product Manager',
          company: 'Startup Inc',
          location: 'Amsterdam, Netherlands',
          description: 'Lead product development for our innovative platform.',
          salary_min: 60000,
          salary_max: 85000,
          status: 'active',
          employer_id: employerProfile.user_id,
          job_type: 'Full-time',
          experience_level: 'Mid-level',
          visa_sponsorship: true
        },
        {
          title: 'Data Scientist',
          company: 'Finance Ltd',
          location: 'Zurich, Switzerland',
          description: 'Analyze financial data and build predictive models.',
          salary_min: 80000,
          salary_max: 110000,
          status: 'active',
          employer_id: employerProfile.user_id,
          job_type: 'Full-time',
          experience_level: 'Senior',
          visa_sponsorship: false
        }
      ];

      for (const job of testJobs) {
        const { error: jobError } = await supabase
          .from('jobs')
          .upsert(job, { onConflict: 'id' });

        if (jobError) {
          console.log(`⚠️  Could not create test job ${job.title}:`, jobError.message);
        } else {
          console.log(`✅ Test job created: ${job.title}`);
        }
      }
    }

    // Create test analytics events
    console.log('📊 Creating test analytics events...');
    const { data: allProfiles } = await supabase
      .from('profiles')
      .select('user_id, full_name, role');

    if (allProfiles && allProfiles.length > 0) {
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

      for (let i = 0; i < 20; i++) {
        const randomProfile = allProfiles[Math.floor(Math.random() * allProfiles.length)];
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

    console.log('🎉 Admin data population completed successfully!');
    console.log('🔑 You can now access the admin panel with real data');
    console.log('🌐 Go to: /admin');

  } catch (error) {
    console.error('❌ Population failed:', error);
  }
}

populateAdminData();
