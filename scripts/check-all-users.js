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

async function checkAllUsers() {
  try {
    console.log('👥 Checking ALL users in the database...');

    // Get all profiles
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('❌ Error fetching profiles:', error.message);
      return;
    }

    console.log(`📊 Found ${profiles.length} total profiles:`);
    console.log('');

    profiles.forEach((profile, index) => {
      console.log(`${index + 1}. User Details:`);
      console.log(`   - ID: ${profile.user_id}`);
      console.log(`   - Full Name: ${profile.full_name || 'No name'}`);
      console.log(`   - Username: ${profile.username || 'No username'}`);
      console.log(`   - Role: ${profile.role || 'No role'}`);
      console.log(`   - Active: ${profile.is_active ? 'Yes' : 'No'}`);
      console.log(`   - Headline: ${profile.headline || 'No headline'}`);
      console.log(`   - Created: ${new Date(profile.created_at).toLocaleString()}`);
      console.log('');
    });

    // Group by role
    const roleGroups = profiles.reduce((acc, profile) => {
      const role = profile.role || 'unknown';
      if (!acc[role]) acc[role] = [];
      acc[role].push(profile);
      return acc;
    }, {});

    console.log('📈 Users by Role:');
    Object.entries(roleGroups).forEach(([role, users]) => {
      console.log(`   - ${role}: ${users.length} users`);
    });

    console.log('');
    console.log('🔍 This is what should appear in your admin panel!');

  } catch (error) {
    console.error('❌ Check failed:', error);
  }
}

checkAllUsers();


