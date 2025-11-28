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

async function fixDatabaseConnectivity() {
  try {
    console.log('🔧 Fixing database connectivity issues...');

    // 1. Check current database connection and data
    console.log('🔍 Checking current database status...');
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);
    
    const { data: jobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*')
      .limit(5);

    console.log('✅ Database connection status:');
    console.log(`   - Profiles: ${profilesError ? 'Error - ' + profilesError.message : 'Connected (' + (profiles?.length || 0) + ' records)'}`);
    console.log(`   - Jobs: ${jobsError ? 'Error - ' + jobsError.message : 'Connected (' + (jobs?.length || 0) + ' records)'}`);

    // 2. Check if analytics_events table exists
    console.log('📊 Checking analytics_events table...');
    const { data: analyticsTest, error: analyticsError } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(1);

    if (analyticsError) {
      console.log('❌ Analytics table does not exist:', analyticsError.message);
      console.log('💡 This is why the admin logs page shows no data');
    } else {
      console.log('✅ Analytics table exists and is accessible');
    }

    // 3. Check super admin setup
    console.log('👑 Checking super admin setup...');
    const { data: superAdmins, error: superAdminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'super_admin');

    if (superAdminError) {
      console.log('❌ Error checking super admins:', superAdminError.message);
    } else {
      console.log(`✅ Found ${superAdmins?.length || 0} super admin(s)`);
      if (superAdmins && superAdmins.length > 0) {
        console.log('   Super admin details:');
        superAdmins.forEach(admin => {
          console.log(`   - ${admin.full_name || 'Unknown'} (${admin.username || 'No username'})`);
        });
      }
    }

    // 4. Test API endpoints that might be failing
    console.log('🔌 Testing API endpoint connectivity...');
    
    // Test if we can fetch users (this is what the admin users page does)
    const { data: allUsers, error: usersError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.log('❌ Error fetching users for admin panel:', usersError.message);
    } else {
      console.log(`✅ Can fetch ${allUsers?.length || 0} users for admin panel`);
    }

    // Test if we can fetch jobs with employer info
    const { data: allJobs, error: jobsWithEmployerError } = await supabase
      .from('jobs')
      .select(`
        *,
        employer:employer_id (
          full_name,
          username,
          headline
        )
      `)
      .order('created_at', { ascending: false });

    if (jobsWithEmployerError) {
      console.log('❌ Error fetching jobs with employer info:', jobsWithEmployerError.message);
    } else {
      console.log(`✅ Can fetch ${allJobs?.length || 0} jobs with employer info`);
    }

    // 5. Check for any missing columns that might cause issues
    console.log('🔍 Checking for missing columns...');
    
    if (profiles && profiles.length > 0) {
      const sampleProfile = profiles[0];
      const expectedColumns = ['user_id', 'full_name', 'username', 'role', 'is_active', 'headline', 'created_at'];
      const missingColumns = expectedColumns.filter(col => !(col in sampleProfile));
      
      if (missingColumns.length > 0) {
        console.log('⚠️  Missing columns in profiles table:', missingColumns.join(', '));
      } else {
        console.log('✅ All expected columns present in profiles table');
      }
    }

    if (jobs && jobs.length > 0) {
      const sampleJob = jobs[0];
      const expectedJobColumns = ['id', 'title', 'company', 'location', 'status', 'employer_id', 'created_at'];
      const missingJobColumns = expectedJobColumns.filter(col => !(col in sampleJob));
      
      if (missingJobColumns.length > 0) {
        console.log('⚠️  Missing columns in jobs table:', missingJobColumns.join(', '));
      } else {
        console.log('✅ All expected columns present in jobs table');
      }
    }

    console.log('🎉 Database connectivity check completed!');
    console.log('');
    console.log('📋 Summary:');
    console.log('   - If you see "Connected" above, the database is working');
    console.log('   - If you see "Error", that explains why admin pages show no data');
    console.log('   - The super admin should be able to see users and jobs if they show as "Connected"');
    console.log('   - Analytics logs will only work if the analytics_events table exists');

  } catch (error) {
    console.error('❌ Connectivity check failed:', error);
  }
}

fixDatabaseConnectivity();


