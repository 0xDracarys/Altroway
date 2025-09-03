const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupSuperAdmin() {
  try {
    console.log('🔧 Setting up Super Admin...');
    
    // First, ensure the super_admin role exists in the enum
    console.log('📝 Ensuring super_admin role exists...');
    await supabase.rpc('exec_sql', {
      sql: "ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'super_admin';"
    });

    // Update the most recent user to be super admin
    console.log('👤 Setting up super admin for most recent user...');
    
    // Get the most recent profile and update it
    const { data: recentProfile, error: recentError } = await supabase
      .from('profiles')
      .select('user_id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (recentError || !recentProfile) {
      console.error('❌ No profiles found to update');
      return;
    }
    
    // Update the most recent profile to be super admin
    const { data: profile, error: updateError } = await supabase
      .from('profiles')
      .update({
        role: 'super_admin',
        full_name: 'Super Administrator',
        is_active: true,
        phone: '+1-555-0001',
        profile_completion: 100
      })
      .eq('user_id', recentProfile.user_id)
      .select();
      
    if (updateError) {
      console.error('❌ Error updating profile:', updateError);
    } else {
      console.log('✅ Super admin profile updated successfully');
    }



    // Verify the super admin setup
    const { data: verifyProfile, error: verifyError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'super_admin')
      .single();

    if (verifyError) {
      console.error('❌ Error verifying profile:', verifyError);
    } else {
      console.log('✅ Super admin verification successful:');
      console.log(`   Email: ${verifyProfile.email}`);
      console.log(`   Role: ${verifyProfile.role}`);
      console.log(`   Name: ${verifyProfile.full_name}`);
      console.log(`   Active: ${verifyProfile.is_active}`);
    }

    // Create some test data for the admin to manage
    console.log('📊 Creating test data...');
    
    // Add test users (create profiles for existing auth users or create new ones)
    const testUsers = [
      { full_name: 'John Doe', role: 'job_seeker' },
      { full_name: 'Jane Smith', role: 'employer' },
      { full_name: 'Bob Wilson', role: 'legal_advisor' }
    ];

    for (const user of testUsers) {
      // Create a random user_id for test purposes
      const testUserId = crypto.randomUUID();
      
      const { error: userError } = await supabase
        .from('profiles')
        .upsert({
          user_id: testUserId,
          full_name: user.full_name,
          role: user.role,
          is_active: true
        }, { onConflict: 'user_id' });

      if (userError) {
        console.log(`⚠️  Could not create test user ${user.full_name}:`, userError.message);
      } else {
        console.log(`✅ Test user created: ${user.full_name}`);
      }
    }

    // Add test jobs
    const { data: employerProfile } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('full_name', 'Jane Smith')
      .single();

    if (employerProfile) {
      const testJobs = [
        {
          title: 'Software Engineer',
          company: 'Tech Corp',
          location: 'Berlin',
          description: 'Full-stack developer needed for our growing team',
          salary_min: 50000,
          salary_max: 80000,
          status: 'active',
          is_verified: false,
          employer_id: employerProfile.user_id
        },
        {
          title: 'Legal Advisor',
          company: 'Law Firm',
          location: 'Paris',
          description: 'EU law specialist required for international cases',
          salary_min: 60000,
          salary_max: 90000,
          status: 'active',
          is_verified: false,
          employer_id: employerProfile.user_id
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

    console.log('🎉 Super admin setup completed successfully!');
    console.log(`🔑 Login with: ${targetEmail}`);
    console.log('🔑 Password: test123321');
    console.log('🌐 Access admin panel at: /admin');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setupSuperAdmin();
