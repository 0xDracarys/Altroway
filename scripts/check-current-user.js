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

async function checkCurrentUser() {
  try {
    console.log('🔍 Checking current user authentication...');

    // Check the super admin user specifically
    const superAdminEmail = 'shubhambhaskr123+lg@gmail.com';
    
    console.log(`👑 Looking for super admin: ${superAdminEmail}`);
    
    // First, let's see all users with their emails
    const { data: allUsers, error: allUsersError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (allUsersError) {
      console.log('❌ Error fetching all users:', allUsersError.message);
      return;
    }

    console.log('📋 All users in database:');
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.full_name} (${user.role}) - ID: ${user.user_id}`);
    });

    // Check if the super admin email exists in auth.users
    console.log('🔐 Checking auth.users table...');
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.log('❌ Error fetching auth users:', authError.message);
    } else {
      console.log(`✅ Found ${authUsers.users.length} users in auth.users`);
      
      const superAdminAuth = authUsers.users.find(u => u.email === superAdminEmail);
      if (superAdminAuth) {
        console.log(`✅ Super admin found in auth.users: ${superAdminAuth.email}`);
        console.log(`   - ID: ${superAdminAuth.id}`);
        console.log(`   - Email confirmed: ${superAdminAuth.email_confirmed_at ? 'Yes' : 'No'}`);
        console.log(`   - Created: ${new Date(superAdminAuth.created_at).toLocaleString()}`);
        
        // Check if this user has a profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', superAdminAuth.id)
          .single();
          
        if (profileError) {
          console.log('❌ No profile found for super admin:', profileError.message);
        } else {
          console.log(`✅ Profile found for super admin:`);
          console.log(`   - Role: ${profile.role}`);
          console.log(`   - Active: ${profile.is_active}`);
          console.log(`   - Full name: ${profile.full_name}`);
        }
      } else {
        console.log(`❌ Super admin email ${superAdminEmail} not found in auth.users`);
        console.log('📧 Available emails in auth.users:');
        authUsers.users.forEach(user => {
          console.log(`   - ${user.email}`);
        });
      }
    }

    console.log('');
    console.log('💡 Troubleshooting steps:');
    console.log('   1. Make sure you\'re logged in with: shubhambhaskr123+lg@gmail.com');
    console.log('   2. Check if the user has super_admin role in profiles table');
    console.log('   3. Try logging out and logging back in');
    console.log('   4. Clear browser cache and cookies');

  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkCurrentUser();


