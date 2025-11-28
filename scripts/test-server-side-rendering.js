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

async function testServerSideRendering() {
  try {
    console.log('🔍 Testing Server-Side Rendering Simulation...');

    // Simulate the exact server-side code from the admin page
    console.log('📊 Testing server-side user query...');
    
    // Check if user is authenticated (simulate super admin)
    const superAdminEmail = 'shubhambhaskr123+lg@gmail.com';
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const superAdminAuth = authUsers.users.find(u => u.email === superAdminEmail);
    
    if (!superAdminAuth) {
      console.log('❌ Super admin not found in auth');
      return;
    }
    
    console.log(`✅ Super admin found: ${superAdminAuth.email}`);

    // Check if user is super admin (simulate the profile check)
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", superAdminAuth.id)
      .single();

    if (profileError) {
      console.log('❌ Profile check failed:', profileError.message);
      return;
    }

    if (profile?.role !== "super_admin") {
      console.log('❌ User is not super admin, role:', profile?.role);
      return;
    }

    console.log('✅ User is super admin');

    // Fetch all users (exact same query as server-side)
    const { data: users, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log('❌ Error fetching users:', error.message);
      return;
    }

    console.log(`✅ Server-side query successful: ${users.length} users found`);
    
    // Show what the server-side code would see
    console.log('👥 Users that server-side code would see:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.full_name || 'No name'} (${user.role}) - ID: ${user.user_id}`);
    });

    // Calculate statistics exactly like server-side
    const totalUsers = users?.length || 0;
    const activeUsers = users?.filter(u => u.is_active).length || 0;
    const jobSeekers = users?.filter(u => u.role === 'job_seeker').length || 0;
    const employers = users?.filter(u => u.role === 'employer').length || 0;
    const legalAdvisors = users?.filter(u => u.role === 'legal_advisor').length || 0;
    const superAdmins = users?.filter(u => u.role === 'super_admin').length || 0;

    console.log('');
    console.log('📈 Server-side statistics:');
    console.log(`   - Total Users: ${totalUsers}`);
    console.log(`   - Active Users: ${activeUsers}`);
    console.log(`   - Super Admins: ${superAdmins}`);
    console.log(`   - Job Seekers: ${jobSeekers}`);
    console.log(`   - Employers: ${employers}`);
    console.log(`   - Legal Advisors: ${legalAdvisors}`);

    console.log('');
    console.log('💡 If server-side shows 8 users but website shows 1, the issue is:');
    console.log('   1. Browser caching the old server-rendered content');
    console.log('   2. Authentication context mismatch between server and client');
    console.log('   3. The server-side code is running with different credentials');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testServerSideRendering();


