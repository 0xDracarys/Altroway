# 🚀 Quick Testing Guide - Start Here

**Last Updated**: November 13, 2025
**Build Status**: ✅ PASSING (0 errors, 48 pages)

---

## 🎯 What Was Fixed

Your navbar wasn't refreshing after login because the component wasn't listening to auth state changes. **Just Fixed!** ✅

**What changed**:
- Added Supabase `onAuthStateChange` listener to `components/header-wrapper.tsx`
- Now navbar updates instantly when you login/logout
- User state syncs in real-time with Supabase session

---

## 📱 Quick Start: Test Login Flow

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: Create Test Account
1. Go to `http://localhost:3000/register`
2. Enter email: `test.user@example.com`
3. Enter password: `TestPassword123!`
4. Click "Create Account"
5. Verify email (Supabase link)

### Step 3: Test Login
1. Go to `http://localhost:3000/login`
2. Enter same credentials
3. Click "Sign In"
4. **WATCH NAVBAR**: Should update from "Get Started" → User Menu

### Step 4: Test Logout
1. Click user menu (top right)
2. Click "Logout"
3. **WATCH NAVBAR**: Should update from User Menu → "Get Started"

---

## 👥 Test All 4 Roles

### Quick Account Setup

**Job Seeker** (Default - No extra steps needed)
```
Email: test.jobseeker@example.com
Password: TestPassword123!
```

**Employer**
```
Email: test.employer@example.com
Password: TestPassword123!

Then: Update in Supabase
→ profiles table → Find user → role = "employer"
```

**Legal Advisor**
```
Email: test.legaladvisor@example.com
Password: TestPassword123!

Then: Update in Supabase
→ profiles table → Find user → role = "legal_advisor"
```

**Super Admin**
```
Email: test.superadmin@example.com
Password: TestPassword123!

Then: Update in Supabase
→ profiles table → Find user → role = "super_admin"
```

---

## ✅ 5-Minute Feature Checklist

### For Each Role, Check These:

#### Job Seeker
- [ ] Browse jobs (`/jobs`)
- [ ] Apply for job
- [ ] Save job
- [ ] View saved jobs (`/saved-jobs`)
- [ ] Send message (`/messages`)
- [ ] Update profile (`/profile/edit`)

#### Employer
- [ ] Create job (`/employer/create-job`)
- [ ] Manage jobs (`/employer/jobs`)
- [ ] View applications
- [ ] Send message to applicant
- [ ] View employer dashboard (`/dashboard`)

#### Legal Advisor
- [ ] View legal support page (`/legal-support`)
- [ ] Send message (`/messages`)
- [ ] Update profile

#### Super Admin
- [ ] Access admin dashboard (`/admin`)
- [ ] View users (`/admin/users`)
- [ ] View jobs (`/admin/jobs`)
- [ ] Check analytics (`/admin/analytics`)

---

## 🐛 Debug Checklist

If something doesn't work:

1. **Check Navbar Updates**
   - Login → Does navbar show user menu?
   - Logout → Does navbar show "Get Started"?
   - F5 refresh → Still logged in?

2. **Check Browser Console** (F12)
   - Any red errors?
   - Any auth warnings?
   - Take screenshot of errors

3. **Check Supabase**
   - User created in `auth.users`?
   - User record in `profiles` table?
   - Role set correctly?

4. **Check Network** (DevTools Network tab)
   - Auth requests successful (200 OK)?
   - API calls returning data?

---

## 📊 Testing Progress

| Feature | Job Seeker | Employer | Legal Advisor | Super Admin |
|---------|-----------|----------|---------------|-------------|
| Login | 🔄 | 🔄 | 🔄 | 🔄 |
| Navbar | 🔄 | 🔄 | 🔄 | 🔄 |
| Main Features | 🔄 | 🔄 | 🔄 | 🔄 |
| Dashboard | 🔄 | 🔄 | 🔄 | 🔄 |
| Messaging | 🔄 | 🔄 | 🔄 | 🔄 |

🟢 = Working ✅  |  🔄 = Not Tested  |  🔴 = Broken

---

## 📝 Command Reference

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# View current git status
git status

# View recent changes
git log --oneline -5
```

---

## 🔗 Key URLs

| Page | URL |
|------|-----|
| Home | `/` |
| Register | `/register` |
| Login | `/login` |
| Dashboard | `/dashboard` |
| Jobs | `/jobs` |
| Messages | `/messages` |
| Profile | `/profile` |
| Onboarding | `/onboarding/goals` |
| Admin | `/admin` |
| Legal Support | `/legal-support` |

---

## 💡 Pro Tips

1. **Use Incognito Mode** for clean testing (no cached sessions)
2. **Open DevTools** (F12) to watch console for errors
3. **Check Supabase Logs** if backend issues: supabase.com → Project → Logs
4. **Take Screenshots** of any bugs for debugging

---

## ✨ Expected Results

✅ **After Login**:
- Navbar shows user avatar/menu
- Can access protected pages
- Can perform role-specific actions
- Session persists on page refresh

✅ **After Logout**:
- Navbar shows "Get Started" button
- Redirected to login on protected pages
- Session completely cleared

---

## 🎉 Success!

When you see:
1. ✅ Navbar updates on login/logout
2. ✅ All 4 roles accessible
3. ✅ Features work for each role
4. ✅ No console errors

**= Ready for deployment!**

---

**Next Steps**:
1. Test login flow (5 min)
2. Create 4 role accounts (20 min)
3. Test all features (2-3 hours)
4. Report any issues

👉 **Start with**: `/register` → Create test account → Test login!

