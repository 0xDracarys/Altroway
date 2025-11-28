# 🧪 Comprehensive Testing Plan - Phase 5 Auth Fix + Role-Based Features

**Status**: 🟢 READY TO EXECUTE
**Build Status**: ✅ PASSING (0 errors, 48 pages)
**Auth Fix Applied**: ✅ HeaderWrapper now has `onAuthStateChange` listener
**Date**: November 13, 2025

---

## 📋 Table of Contents

1. [Build Verification](#build-verification)
2. [Auth Flow Testing](#auth-flow-testing)
3. [Test Account Setup](#test-account-setup)
4. [Role-Based Feature Testing](#role-based-feature-testing)
5. [Bug Report Template](#bug-report-template)
6. [Deployment Readiness Checklist](#deployment-readiness-checklist)

---

## 🏗️ Build Verification

### ✅ Completed
- **Build Command**: `npm run build`
- **Result**: ✅ PASSING
- **Details**: 
  - 0 TypeScript errors
  - 0 compilation warnings (1 edge runtime warning - expected)
  - 48 pages generated successfully
  - First Load JS: 101 kB (shared)
  - Middleware: 68.7 kB

### Build Summary
```
✓ Compiled successfully
✓ Collected page data 
✓ Generating static pages (48/48)
✓ Collecting build traces
✓ Finalizing page optimization
```

**Status**: ✅ BUILD READY FOR TESTING

---

## 🔐 Auth Flow Testing

### Test 1: Initial Login Flow

**Objective**: Verify navbar updates immediately after login

**Steps**:
1. Navigate to `/login` (fresh browser/incognito)
2. Clear any existing session
3. Enter test credentials
4. Click "Sign In"
5. **Observe**: Navbar should update from "Get Started" → UserMenu

**Expected Results**:
- ✅ Login succeeds
- ✅ Redirect to dashboard/onboarding
- ✅ Navbar shows user menu (not "Get Started")
- ✅ User dropdown displays correctly
- ✅ No page refresh needed (real-time update)

**How to Verify**:
- Look for user avatar/name in navbar
- Click user menu dropdown
- See "My Profile", "Logout" options

**Status**: 🔄 TO DO

---

### Test 2: Logout Flow

**Objective**: Verify navbar updates after logout

**Steps**:
1. Login with test account
2. Click user menu → "Logout"
3. **Observe**: Navbar should update from UserMenu → "Get Started"

**Expected Results**:
- ✅ Logout succeeds
- ✅ Session cleared
- ✅ Navbar shows "Get Started" button (not user menu)
- ✅ Protected routes redirect to login
- ✅ Real-time update (no page refresh)

**Status**: 🔄 TO DO

---

### Test 3: Session Persistence

**Objective**: Verify logged-in state persists across page navigation

**Steps**:
1. Login with test account
2. Navigate to multiple pages:
   - `/dashboard`
   - `/jobs`
   - `/profile`
   - `/about`
3. **Observe**: Navbar should maintain UserMenu on each page

**Expected Results**:
- ✅ UserMenu persists on all pages
- ✅ No unexpected logouts
- ✅ Session remains valid
- ✅ Page navigation smooth

**Status**: 🔄 TO DO

---

### Test 4: Page Refresh Persistence

**Objective**: Verify logged-in state survives page refresh

**Steps**:
1. Login with test account
2. Press F5 or Cmd+R to refresh page
3. **Observe**: Should stay logged in, navbar shows UserMenu

**Expected Results**:
- ✅ Page refreshes without logout
- ✅ UserMenu still visible
- ✅ User data still available
- ✅ No loading flicker

**Status**: 🔄 TO DO

---

## 👥 Test Account Setup

### Create 4 Role-Based Test Accounts

**Database Roles Available**:
- `job_seeker` (default role)
- `employer`
- `legal_advisor`
- `super_admin`

### Account 1: Job Seeker

**Details**:
- Email: `test.jobseeker@altroway.com`
- Password: `TestPassword123!`
- Role: `job_seeker`
- Expected Features: Jobs, Applications, Messaging, Profile, Saved Jobs

**Setup Steps**:
1. Go to `/register`
2. Enter email & password
3. Verify email
4. Complete onboarding (goals + job types)
5. Role automatically set to `job_seeker`

**Status**: 🔄 TO DO

---

### Account 2: Employer

**Details**:
- Email: `test.employer@altroway.com`
- Password: `TestPassword123!`
- Role: `employer`
- Expected Features: Create Jobs, Manage Jobs, View Applications, Messaging

**Setup Steps**:
1. Go to `/register`
2. Enter email & password
3. Verify email
4. Via Supabase dashboard OR update query:
   ```sql
   UPDATE profiles SET role = 'employer' WHERE id = '<user_id>'
   ```
5. Login and verify navbar shows employer-specific menu

**Status**: 🔄 TO DO

---

### Account 3: Legal Advisor

**Details**:
- Email: `test.legaladvisor@altroway.com`
- Password: `TestPassword123!`
- Role: `legal_advisor`
- Expected Features: Legal Support Services, Consultation Dashboard, Messaging

**Setup Steps**:
1. Go to `/register`
2. Enter email & password
3. Verify email
4. Via Supabase: Update role to `legal_advisor`
5. Login and verify navbar shows legal-specific menu

**Status**: 🔄 TO DO

---

### Account 4: Super Admin

**Details**:
- Email: `test.superadmin@altroway.com`
- Password: `TestPassword123!`
- Role: `super_admin`
- Expected Features: Admin Dashboard, User Management, Analytics, Security Settings

**Setup Steps**:
1. Go to `/register`
2. Enter email & password
3. Verify email
4. Via Supabase: Update role to `super_admin`
5. Login and verify `/admin` page accessible
6. Navigate all admin sub-pages

**Status**: 🔄 TO DO

---

## 🎯 Role-Based Feature Testing

### Role 1: Job Seeker (Default)

#### Features to Test

##### 1.1 Browse Jobs
**Path**: `/jobs`

- [ ] Page loads successfully
- [ ] Job list displays
- [ ] Pagination works
- [ ] Search filters work
- [ ] Job details page loads (`/jobs/[id]`)

**Status**: 🔄 TO DO

---

##### 1.2 Apply for Job
**Path**: `/jobs/[id]/apply`

- [ ] Application form loads
- [ ] Can submit application
- [ ] Success notification shows
- [ ] Application saved to database
- [ ] Application visible in applications list

**Status**: 🔄 TO DO

---

##### 1.3 Save Job
**Path**: `/jobs/[id]` → Save button

- [ ] Save button clickable
- [ ] Job added to saved list
- [ ] Saved jobs page shows (`/saved-jobs`)
- [ ] Can remove from saved

**Status**: 🔄 TO DO

---

##### 1.4 Messaging
**Path**: `/messages`

- [ ] Messages page loads
- [ ] Can start new conversation
- [ ] Can send/receive messages
- [ ] Message history displays
- [ ] Real-time updates work

**Status**: 🔄 TO DO

---

##### 1.5 Profile
**Path**: `/profile` & `/profile/edit`

- [ ] Profile page shows user info
- [ ] Can edit profile
- [ ] Avatar upload works
- [ ] Changes saved to database
- [ ] Profile visible to other users (`/profile/[id]`)

**Status**: 🔄 TO DO

---

##### 1.6 Dashboard
**Path**: `/dashboard`

- [ ] Dashboard loads
- [ ] Shows job seeker-specific widgets
- [ ] Applications widget shows
- [ ] Saved jobs widget shows
- [ ] Quick action buttons work

**Status**: 🔄 TO DO

---

##### 1.7 Onboarding Flow
**Path**: `/onboarding/goals` → `/onboarding/job-types` → `/onboarding/loading` → `/routes/short` or `/routes/premium`

- [ ] Goal selection page works
- [ ] Job type multi-select works (min 1 required)
- [ ] Loading screen displays with progress
- [ ] Route options appear (Short & Premium)
- [ ] Can select route
- [ ] Route selection saves to profile

**Status**: 🔄 TO DO

---

### Role 2: Employer

#### Features to Test

##### 2.1 Create Job
**Path**: `/employer/create-job`

- [ ] Form loads all required fields
- [ ] Can fill job details
- [ ] Can select job type
- [ ] Can set salary range
- [ ] Can add job description
- [ ] Form validates required fields
- [ ] Can submit job
- [ ] Job appears in job list

**Status**: 🔄 TO DO

---

##### 2.2 Manage Jobs
**Path**: `/employer/jobs`

- [ ] Job list shows all employer's jobs
- [ ] Can edit job (`/employer/jobs/[id]/edit`)
- [ ] Can delete job
- [ ] Can view applications for job
- [ ] Job status changes work

**Status**: 🔄 TO DO

---

##### 2.3 View Applications
**Path**: `/employer/jobs/[id]` → Applications tab

- [ ] Application list shows
- [ ] Can view applicant details
- [ ] Can accept application
- [ ] Can reject application
- [ ] Status updates reflected

**Status**: 🔄 TO DO

---

##### 2.4 Messaging
**Path**: `/messages`

- [ ] Can message job seekers
- [ ] Can message applicants
- [ ] Message history preserved
- [ ] Real-time message delivery

**Status**: 🔄 TO DO

---

##### 2.5 Employer Dashboard
**Path**: `/dashboard` (as employer)

- [ ] Shows employer-specific widgets
- [ ] Active jobs counter shows
- [ ] Applications counter shows
- [ ] Quick job creation button works

**Status**: 🔄 TO DO

---

### Role 3: Legal Advisor

#### Features to Test

##### 3.1 Legal Support Page
**Path**: `/legal-support`

- [ ] Page loads
- [ ] Services list displays
- [ ] Can view service details
- [ ] CTA buttons work

**Status**: 🔄 TO DO

---

##### 3.2 Messaging
**Path**: `/messages`

- [ ] Can message clients
- [ ] Can view consultation requests
- [ ] Message history available

**Status**: 🔄 TO DO

---

##### 3.3 Profile
**Path**: `/profile`

- [ ] Legal advisor profile displays
- [ ] Can edit profile
- [ ] Services list editable
- [ ] Expertise/certifications visible

**Status**: 🔄 TO DO

---

### Role 4: Super Admin

#### Features to Test

##### 4.1 Admin Dashboard
**Path**: `/admin`

- [ ] Admin page accessible
- [ ] All 8 admin sections visible
- [ ] Dashboard loads without errors

**Status**: 🔄 TO DO

---

##### 4.2 User Management
**Path**: `/admin/users`

- [ ] User list displays
- [ ] Can view user details
- [ ] Can edit user info
- [ ] Can deactivate/activate users
- [ ] Can change user roles

**Status**: 🔄 TO DO

---

##### 4.3 Job Moderation
**Path**: `/admin/jobs`

- [ ] Job list displays
- [ ] Can view job details
- [ ] Can approve/reject jobs
- [ ] Can edit job content
- [ ] Can delete inappropriate jobs

**Status**: 🔄 TO DO

---

##### 4.4 Analytics
**Path**: `/admin/analytics`

- [ ] Analytics dashboard loads
- [ ] Charts display correctly
- [ ] Stats update in real-time

**Status**: 🔄 TO DO

---

##### 4.5 Database Admin
**Path**: `/admin/database`

- [ ] Database admin page loads
- [ ] Can view table stats
- [ ] Backup options visible
- [ ] Query tools available

**Status**: 🔄 TO DO

---

##### 4.6 Security Settings
**Path**: `/admin/security`

- [ ] Security page loads
- [ ] Can configure security settings
- [ ] Rate limiting options visible
- [ ] CORS settings visible

**Status**: 🔄 TO DO

---

##### 4.7 Logs & Monitoring
**Path**: `/admin/logs`

- [ ] Logs display correctly
- [ ] Can filter logs
- [ ] Log levels visible (info, warning, error)
- [ ] Timestamp accurate

**Status**: 🔄 TO DO

---

##### 4.8 Settings
**Path**: `/admin/settings`

- [ ] Admin settings page loads
- [ ] Can edit platform settings
- [ ] Changes persist

**Status**: 🔄 TO DO

---

## 🐛 Bug Report Template

When you encounter issues during testing, use this template:

```markdown
### Bug Report

**Date**: [Date]
**Test Case**: [Which test failed]
**Role**: [job_seeker/employer/legal_advisor/super_admin]
**Browser**: [Chrome/Firefox/Safari]
**Severity**: [Critical/High/Medium/Low]

#### Description
[What happened]

#### Expected Behavior
[What should have happened]

#### Actual Behavior
[What actually happened]

#### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

#### Screenshots/Logs
[Include error messages from browser console]

#### Notes
[Any additional context]
```

---

## ✅ Deployment Readiness Checklist

### Pre-Testing
- [x] Build passes (0 errors)
- [x] Auth fix applied and verified
- [x] All 48 pages compiled

### Auth Testing
- [ ] Login flow works
- [ ] Logout flow works
- [ ] Session persistence works
- [ ] Page refresh persistence works

### Account Setup
- [ ] Job Seeker account created
- [ ] Employer account created
- [ ] Legal Advisor account created
- [ ] Super Admin account created

### Feature Testing
- [ ] All job_seeker features working
- [ ] All employer features working
- [ ] All legal_advisor features working
- [ ] All super_admin features working

### Deployment
- [ ] No critical bugs found
- [ ] No medium bugs blocking deployment
- [ ] Performance acceptable
- [ ] All role-based navigation working
- [ ] Ready for production deployment

---

## 📊 Testing Summary

### Test Execution Order

**Phase 1: Auth Flow** (15 minutes)
1. Test 1: Login Flow
2. Test 2: Logout Flow
3. Test 3: Session Persistence
4. Test 4: Page Refresh Persistence

**Phase 2: Account Setup** (20 minutes)
1. Create Job Seeker account
2. Create Employer account
3. Create Legal Advisor account
4. Create Super Admin account

**Phase 3: Role-Based Testing** (2-3 hours)
1. Test all Job Seeker features (30 min)
2. Test all Employer features (40 min)
3. Test all Legal Advisor features (20 min)
4. Test all Super Admin features (60 min)

**Total Estimated Time**: ~3-3.5 hours

---

## 🎯 Success Criteria

### Must Have (Blocking)
- ✅ Auth flow works without issues
- ✅ Navbar updates in real-time on login/logout
- ✅ Session persists across pages
- ✅ All 4 roles accessible and functional
- ✅ No TypeScript errors in browser console
- ✅ No auth-related errors

### Should Have (High Priority)
- ✅ Features load quickly
- ✅ Real-time updates smooth
- ✅ UI responsive on all devices
- ✅ Messages display correctly

### Nice to Have
- ✅ Animations smooth
- ✅ Loading states visible
- ✅ Error messages clear

---

## 📞 Support

**If you encounter issues**:
1. Check browser console for errors (F12)
2. Check Supabase logs for backend issues
3. Take screenshot of error
4. Use bug report template above
5. Share findings with development team

**Expected Outcome**: 
✅ All tests passing = Ready for production deployment!

---

**Last Updated**: November 13, 2025
**Status**: 🟢 READY TO EXECUTE
