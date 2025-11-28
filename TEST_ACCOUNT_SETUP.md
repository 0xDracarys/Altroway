# 👥 Test Account Creation Guide

**Date**: November 13, 2025
**Purpose**: Set up 4 role-based test accounts for comprehensive testing

---

## 📋 Quick Reference

| Role | Email | Password | Role Setup |
|------|-------|----------|-----------|
| Job Seeker | `test.jobseeker@altroway.com` | `TestPassword123!` | Automatic (default) |
| Employer | `test.employer@altroway.com` | `TestPassword123!` | Manual: Update in Supabase |
| Legal Advisor | `test.legaladvisor@altroway.com` | `TestPassword123!` | Manual: Update in Supabase |
| Super Admin | `test.superadmin@altroway.com` | `TestPassword123!` | Manual: Update in Supabase |

---

## 🚀 Step-by-Step Account Creation

### 1️⃣ Job Seeker Account (Easy - Auto-assigned)

**Step 1**: Go to Registration
```
URL: http://localhost:3000/register
```

**Step 2**: Fill Registration Form
- Email: `test.jobseeker@altroway.com`
- Password: `TestPassword123!`
- Confirm Password: `TestPassword123!`

**Step 3**: Click "Create Account"

**Step 4**: Verify Email
- Check Supabase email (or console log in dev mode)
- Click verification link
- You're done! Role automatically set to `job_seeker`

**Result**: ✅ Job Seeker account created and ready

---

### 2️⃣ Employer Account (Need Manual Role Update)

**Part A**: Create Account (Same as Job Seeker)

**Step 1**: Go to Registration
```
URL: http://localhost:3000/register
```

**Step 2**: Fill Registration Form
- Email: `test.employer@altroway.com`
- Password: `TestPassword123!`
- Confirm Password: `TestPassword123!`

**Step 3**: Click "Create Account"

**Step 4**: Verify Email
- Check Supabase email (or console log)
- Click verification link

**Part B**: Update Role to Employer

**Option A**: Via Supabase Dashboard (Easiest)

1. Go to: https://app.supabase.com/
2. Select your project
3. Go to **SQL Editor**
4. Copy this query:
```sql
UPDATE profiles 
SET role = 'employer' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'test.employer@altroway.com'
);
```
5. Click "Run"
6. See message: "1 row affected" ✅

**Option B**: Via Table Editor

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **profiles** table
4. Find row with email `test.employer@altroway.com`
5. Click **Edit** (pencil icon)
6. Change **role** from `job_seeker` → `employer`
7. Click **Save**

**Verify**: 
- Go to login page
- Login with employer credentials
- Navigate to `/employer/create-job`
- Should see job creation form ✅

---

### 3️⃣ Legal Advisor Account (Manual Role Update)

**Part A**: Create Account

**Step 1**: Go to Registration
```
URL: http://localhost:3000/register
```

**Step 2**: Fill Registration Form
- Email: `test.legaladvisor@altroway.com`
- Password: `TestPassword123!`
- Confirm Password: `TestPassword123!`

**Step 3**: Click "Create Account"

**Step 4**: Verify Email

**Part B**: Update Role to Legal Advisor

Run this SQL query in Supabase SQL Editor:
```sql
UPDATE profiles 
SET role = 'legal_advisor' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'test.legaladvisor@altroway.com'
);
```

**Verify**:
- Go to login page
- Login with legal advisor credentials
- Navigate to `/legal-support`
- Should see legal support page ✅

---

### 4️⃣ Super Admin Account (Manual Role Update)

**Part A**: Create Account

**Step 1**: Go to Registration
```
URL: http://localhost:3000/register
```

**Step 2**: Fill Registration Form
- Email: `test.superadmin@altroway.com`
- Password: `TestPassword123!`
- Confirm Password: `TestPassword123!`

**Step 3**: Click "Create Account"

**Step 4**: Verify Email

**Part B**: Update Role to Super Admin

Run this SQL query in Supabase SQL Editor:
```sql
UPDATE profiles 
SET role = 'super_admin' 
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'test.superadmin@altroway.com'
);
```

**Verify**:
- Go to login page
- Login with super admin credentials
- Navigate to `/admin`
- Should see admin dashboard ✅

---

## 🔍 Verify Accounts Created

### Check in Supabase Dashboard

**Method 1**: View All Users
1. Go to Supabase Dashboard
2. Click **Auth** → **Users**
3. Should see 4 users:
   - test.jobseeker@altroway.com
   - test.employer@altroway.com
   - test.legaladvisor@altroway.com
   - test.superadmin@altroway.com

**Method 2**: View Profiles Table
1. Go to Supabase Dashboard
2. Click **Table Editor** → **profiles**
3. Should see 4 rows with:
   - Role: `job_seeker`, `employer`, `legal_advisor`, `super_admin`
   - Other fields populated correctly

**Method 3**: Run Verification Query
```sql
SELECT user_id, role, created_at FROM profiles 
WHERE user_id IN (
  SELECT id FROM auth.users 
  WHERE email LIKE 'test.%@altroway.com'
)
ORDER BY created_at;
```

Expected output: 4 rows with different roles

---

## ⚠️ Troubleshooting

### Problem: Account not created
**Solution**:
- Check email address spelling
- Check password meets requirements (8+ chars, uppercase, numbers)
- Check email verification link (check spam folder)

### Problem: Role not updating in Supabase
**Solution**:
- Make sure role value is exactly: `job_seeker`, `employer`, `legal_advisor`, or `super_admin`
- Check that row exists in profiles table before updating
- Run query again if needed

### Problem: Role not showing after login
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Logout completely
- Hard refresh (Ctrl+Shift+R)
- Login again

### Problem: Can't find user ID in query
**Solution**:
- Make sure email is exactly correct (case-sensitive)
- Verify user exists in auth.users table
- Check that email is verified

---

## 🎯 Verification Checklist

After creating all 4 accounts:

### In Supabase
- [ ] 4 users in auth.users table
- [ ] 4 rows in profiles table
- [ ] Each has correct role assigned
- [ ] All emails verified
- [ ] Timestamps reasonable

### In App
- [ ] Job Seeker login works
  - [ ] Can access `/jobs`
  - [ ] Can access `/dashboard`
  - [ ] Navbar shows user menu
- [ ] Employer login works
  - [ ] Can access `/employer/create-job`
  - [ ] Can access `/employer/jobs`
  - [ ] Navbar shows employer menu
- [ ] Legal Advisor login works
  - [ ] Can access `/legal-support`
  - [ ] Can send messages
  - [ ] Navbar shows legal menu
- [ ] Super Admin login works
  - [ ] Can access `/admin`
  - [ ] Can access `/admin/users`
  - [ ] Can access `/admin/jobs`
  - [ ] Navbar shows admin menu

---

## 💾 Backup Test Credentials

Save these somewhere safe:

```
JOB SEEKER
Email: test.jobseeker@altroway.com
Password: TestPassword123!

EMPLOYER
Email: test.employer@altroway.com
Password: TestPassword123!

LEGAL ADVISOR
Email: test.legaladvisor@altroway.com
Password: TestPassword123!

SUPER ADMIN
Email: test.superadmin@altroway.com
Password: TestPassword123!
```

---

## 🔄 Reset Accounts (If Needed)

To delete an account and start over:

### In Supabase SQL Editor
```sql
-- Delete user and profile (cascade delete should work)
DELETE FROM auth.users WHERE email = 'test.jobseeker@altroway.com';
```

Then create new account by following steps above.

---

## ⏱️ Time Estimate

| Task | Time |
|------|------|
| Create Job Seeker account | 5 min |
| Create Employer account + role update | 5 min |
| Create Legal Advisor account + role update | 5 min |
| Create Super Admin account + role update | 5 min |
| **Total** | **20 minutes** |

---

## ✅ Success Criteria

✅ All 4 accounts created
✅ All 4 accounts have correct roles
✅ All 4 accounts can login
✅ All 4 accounts show correct role-based features
✅ Ready for comprehensive testing

---

**Next Steps**: 
1. Create all 4 accounts using this guide
2. Go to `COMPREHENSIVE_TEST_PLAN.md`
3. Run through all test cases for each role

