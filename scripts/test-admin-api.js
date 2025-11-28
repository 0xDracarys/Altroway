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

async function testAdminAPI() {
  try {
    console.log('🔍 Testing Admin API endpoints...');

    // Test 1: Direct database query (what the admin page should do)
    console.log('📊 Testing direct database query...');
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (usersError) {
      console.log('❌ Database query failed:', usersError.message);
    } else {
      console.log(`✅ Database query successful: ${users.length} users found`);
      console.log('   Sample users:');
      users.slice(0, 3).forEach(user => {
        console.log(`   - ${user.full_name || 'No name'} (${user.role})`);
      });
    }

    // Test 2: Check if there's a caching issue
    console.log('🔄 Testing with fresh query...');
    const { data: freshUsers, error: freshError } = await supabase
      .from('profiles')
      .select('user_id, full_name, role, is_active, created_at')
      .order('created_at', { ascending: false });

    if (freshError) {
      console.log('❌ Fresh query failed:', freshError.message);
    } else {
      console.log(`✅ Fresh query successful: ${freshUsers.length} users found`);
    }

    // Test 3: Check specific user types
    console.log('👑 Testing super admin query...');
    const { data: superAdmins, error: superAdminError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'super_admin');

    if (superAdminError) {
      console.log('❌ Super admin query failed:', superAdminError.message);
    } else {
      console.log(`✅ Super admin query successful: ${superAdmins.length} super admins found`);
    }

    // Test 4: Check employers
    console.log('💼 Testing employer query...');
    const { data: employers, error: employerError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'employer');

    if (employerError) {
      console.log('❌ Employer query failed:', employerError.message);
    } else {
      console.log(`✅ Employer query successful: ${employers.length} employers found`);
    }

    // Test 5: Check job seekers
    console.log('👤 Testing job seeker query...');
    const { data: jobSeekers, error: jobSeekerError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'job_seeker');

    if (jobSeekerError) {
      console.log('❌ Job seeker query failed:', jobSeekerError.message);
    } else {
      console.log(`✅ Job seeker query successful: ${jobSeekers.length} job seekers found`);
    }

    console.log('');
    console.log('🎯 Summary:');
    console.log(`   - Total users in database: ${users?.length || 0}`);
    console.log(`   - Super admins: ${superAdmins?.length || 0}`);
    console.log(`   - Employers: ${employers?.length || 0}`);
    console.log(`   - Job seekers: ${jobSeekers?.length || 0}`);
    console.log('');
    console.log('💡 If you still can\'t see users in the admin panel, try:');
    console.log('   1. Hard refresh the page (Ctrl+F5)');
    console.log('   2. Clear browser cache');
    console.log('   3. Check browser console for errors');
    console.log('   4. Make sure you\'re logged in as super admin');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAdminAPI();


