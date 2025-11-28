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

async function debugAdminUsers() {
  try {
    console.log('🔍 Debugging Admin Users Page...');

    // Simulate the exact query from the admin page
    console.log('📊 Testing the exact admin page query...');
    const { data: users, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log('❌ Error fetching users:', error.message);
      return;
    }

    console.log(`✅ Query successful: ${users.length} users found`);
    console.log('');

    // Show all users
    console.log('👥 All users from query:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.full_name || 'No name'} (${user.role}) - ID: ${user.user_id}`);
      console.log(`   - Active: ${user.is_active}`);
      console.log(`   - Headline: ${user.headline || 'No headline'}`);
      console.log(`   - Created: ${new Date(user.created_at).toLocaleString()}`);
      console.log('');
    });

    // Calculate statistics exactly like the admin page
    const totalUsers = users?.length || 0;
    const activeUsers = users?.filter(u => u.is_active).length || 0;
    const jobSeekers = users?.filter(u => u.role === 'job_seeker').length || 0;
    const employers = users?.filter(u => u.role === 'employer').length || 0;
    const legalAdvisors = users?.filter(u => u.role === 'legal_advisor').length || 0;
    const superAdmins = users?.filter(u => u.role === 'super_admin').length || 0;

    console.log('📈 Statistics (should match admin page):');
    console.log(`   - Total Users: ${totalUsers}`);
    console.log(`   - Active Users: ${activeUsers}`);
    console.log(`   - Super Admins: ${superAdmins}`);
    console.log(`   - Job Seekers: ${jobSeekers}`);
    console.log(`   - Employers: ${employers}`);
    console.log(`   - Legal Advisors: ${legalAdvisors}`);

    // Check if there are any users with null or undefined values that might cause issues
    console.log('');
    console.log('🔍 Checking for problematic data...');
    
    const problematicUsers = users.filter(user => 
      !user.user_id || 
      !user.role || 
      user.full_name === null || 
      user.full_name === undefined
    );

    if (problematicUsers.length > 0) {
      console.log(`⚠️  Found ${problematicUsers.length} users with problematic data:`);
      problematicUsers.forEach(user => {
        console.log(`   - ID: ${user.user_id}, Name: ${user.full_name}, Role: ${user.role}`);
      });
    } else {
      console.log('✅ No problematic data found');
    }

    // Test if the issue is with the server-side rendering
    console.log('');
    console.log('🔄 Testing with different query approaches...');
    
    // Test 1: Simple select
    const { data: simpleUsers, error: simpleError } = await supabase
      .from("profiles")
      .select("*");
    
    if (simpleError) {
      console.log('❌ Simple query failed:', simpleError.message);
    } else {
      console.log(`✅ Simple query: ${simpleUsers.length} users`);
    }

    // Test 2: With limit
    const { data: limitedUsers, error: limitedError } = await supabase
      .from("profiles")
      .select("*")
      .limit(10);
    
    if (limitedError) {
      console.log('❌ Limited query failed:', limitedError.message);
    } else {
      console.log(`✅ Limited query: ${limitedUsers.length} users`);
    }

    console.log('');
    console.log('💡 If the query shows 8 users but admin page shows 1, the issue might be:');
    console.log('   1. Server-side rendering problem');
    console.log('   2. Client-side filtering');
    console.log('   3. Authentication/authorization issue');
    console.log('   4. Browser caching issue');

  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
}

debugAdminUsers();


