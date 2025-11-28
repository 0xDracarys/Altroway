# Implementation Checklist - Altroway XLSX Requirements

## Summary
- **Total Requirements**: 30 items
- **Already Implemented**: 2 items (Language support, Sign-up system partial)
- **Need Implementation**: 24 items
- **Blocked (Waiting for Input)**: 4 items
- **Current Build Status**: ✅ PASSING (0 errors, 43 pages)

---

## PHASE 5.1: CRITICAL ONBOARDING FLOW 
**Priority**: 🔴 CRITICAL - Must complete before launch
**Estimated Duration**: 3-4 hours
**Status**: ⏳ NOT STARTED

### Task 5.1.1: Update Homepage "Let's Start Your Journey" Button
- [ ] Modify: `app/page.tsx`
- [ ] Replace current dual buttons with single "Let's Start Your Journey" CTA
- [ ] Route to sign-up flow (item 6)
- [ ] Add button styling with Tailwind
- [ ] Update i18n translations for all languages (EN, LT, RU)
- [ ] Test button navigation
- **Files**: `app/page.tsx`
- **Tests**: Homepage button click → redirects to /register

### Task 5.1.2: Verify/Complete Email Verification Flow
- [ ] Check Supabase auth config for email confirmation settings
- [ ] Enable email confirmations in Supabase if not already done
- [ ] Verify confirmation email sends to user
- [ ] Create confirmation page: `app/auth/confirm/page.tsx`
- [ ] Test full email verification flow
- **Files**: `app/auth/confirm/page.tsx`, Supabase config
- **Tests**: Sign-up → Email verification → Account confirmed

### Task 5.1.3: Create Goal Setting Page
- [ ] Create: `app/onboarding/goals/page.tsx`
- [ ] Component: Simple goal selection form
- [ ] Options: "Short term work", "Long term work", "Family relocation + citizenship"
- [ ] Store selection in `user_profiles.goals`
- [ ] Add success message and next button
- [ ] Update i18n translations
- **Database**: Update `user_profiles` table - add `goals` field
- **Files**: `app/onboarding/goals/page.tsx`, migration
- **Tests**: Select goal → Save → Redirect to job types

### Task 5.1.4: Create Job Type Multi-Select Page
- [ ] Create: `app/onboarding/job-types/page.tsx`
- [ ] Component: Multi-select checkboxes using Radix UI
- [ ] Options: "Short term work", "Long term work", "Family relocation + citizenship"
- [ ] Allow multiple selections
- [ ] Store in `user_profiles.job_types` (array)
- [ ] Update i18n translations
- **Database**: Update `user_profiles` table - add `job_types` field (text array)
- **Files**: `app/onboarding/job-types/page.tsx`, migration
- **Tests**: Select types → Save → Redirect to questionary

### Task 5.1.5: Update Header Navigation
- [ ] Modify: `components/header.tsx`
- [ ] Replace "Sign In" link with "Get Started" link
- [ ] Ensure language selector is prominent
- [ ] Route "Get Started" → /register (sign-up)
- [ ] Update i18n for "Sign In" → "Get Started"
- [ ] Test navigation in mobile and desktop
- **Files**: `components/header.tsx`, i18n translations
- **Tests**: Header Get Started button works on all pages

### Task 5.1.6: Database Migration - Onboarding Fields
- [ ] Create migration: Add fields to `user_profiles`
  - `goals: text`
  - `job_types: text[]`
- [ ] Test migration on development database
- [ ] Verify no data loss
- **Files**: `supabase/migrations/add_onboarding_fields.sql`
- **Tests**: Migration runs successfully, table structure correct

---

## PHASE 5.2: ROUTE GENERATION & DISPLAY
**Priority**: 🔴 CRITICAL - Core feature
**Estimated Duration**: 4-5 hours
**Status**: ⏳ NOT STARTED

### Task 5.2.1: Create Loading Screen with Route Generation
- [ ] Create: `app/onboarding/loading/page.tsx`
- [ ] Display: "Generating your routes…" loading animation
- [ ] Simulate processing for 2-5 seconds
- [ ] Logic: Analyze user goals + job types → determine recommended routes
- [ ] Show two options:
  - [ ] Button 1: "Short Route" (quick path to job matching)
  - [ ] Button 2: "Premium Route" (full service with support)
- [ ] Store route selection in `user_profiles.selected_route`
- [ ] Redirect based on selection
- **Files**: `app/onboarding/loading/page.tsx`, `lib/route-generation.ts`
- **Tests**: 
  - Page loads with animation
  - 2 route buttons appear
  - Selecting route redirects appropriately

### Task 5.2.2: Create Short Route Dashboard
- [ ] Create: `app/routes/short/page.tsx`
- [ ] Component: Tab-based interface (Radix UI Tabs)
- [ ] 6 Tabs:
  1. **Requirements** - Immigration requirements for user goals
  2. **Documents** - Checklist of needed documents
  3. **Employers** - Available employers (fetch from jobs table)
  4. **Migration Process** - Step-by-step process guide
  5. **Costs** - Cost breakdown estimation
  6. **Timeline** - Estimated timeline (e.g., 3-6 months)
- [ ] Fetch data from database / hard-coded content
- [ ] Make content editable via admin panel (future)
- [ ] Update i18n for all 6 tabs
- **Database**: Use `jobs`, `employers` tables; consider `route_content` table
- **Files**: `app/routes/short/page.tsx`, components/short-route-tabs.tsx
- **Tests**:
  - All 6 tabs load
  - Content displays correctly
  - Tab switching works
  - Mobile responsive

### Task 5.2.3: Create Premium Route Dashboard
- [ ] Create: `app/routes/premium/page.tsx`
- [ ] Feature: Premium subscription required
- [ ] 6 Features:
  1. **Individual Guide** - AI/ML personalized recommendations
  2. **Live Support** - In-app support messaging (integrate existing messaging system)
  3. **Operation Setup** - Business setup guidance
  4. **Post-Arrival Tips** - Living in Lithuania guide
  5. **Rules & Regulations** - Legal requirements
  6. **Upgrade Option** - Link to premium subscription
- [ ] Check premium subscription status
- [ ] Show lock icon if not subscribed
- [ ] Update i18n for all features
- **Database**: Use `premium_analytics`, `user_subscriptions` tables
- **Files**: `app/routes/premium/page.tsx`, `components/premium-route-features.tsx`
- **Tests**:
  - Premium user sees full features
  - Non-premium user sees locked content + upgrade button
  - Messaging integration works

### Task 5.2.4: Implement Route Recommendation Logic
- [ ] Create: `lib/route-generation.ts`
- [ ] Function: Analyze user profile data
  - User goals
  - Job types selected
  - Qualifications
  - Language level
- [ ] Logic: Recommend Short or Premium based on:
  - Complexity of goals (relocation = premium)
  - Language level (B1+ = short, below = premium)
  - Time availability
- [ ] Return recommended route(s)
- [ ] Test with various user profiles
- **Files**: `lib/route-generation.ts`
- **Tests**: Various user profiles → correct route recommended

---

## PHASE 5.3: QUESTIONARY & ASSESSMENT
**Priority**: 🟡 HIGH - Important for MVP
**Estimated Duration**: 3-4 hours
**Status**: ⏳ BLOCKED - Waiting for form field specification

### Task 5.3.1: Create Personal Info Questionary Form
- [ ] **BLOCKED**: Waiting for user to specify form fields (Item 11)
- [ ] Create: `app/onboarding/questionary/page.tsx`
- [ ] Estimated fields (to confirm with user):
  - Personal: Name, Email, Phone, Date of Birth
  - Address: Street, City, Country, Postal Code
  - Education: Degree, Field, University, Year
  - Experience: Previous jobs, duration, roles, companies
  - Languages: Languages spoken, proficiency levels
  - Skills: Professional skills, certifications
  - Goals: Specific migration goals
- [ ] Form type: Multi-step form (5-7 steps) for better UX
- [ ] Validation: All fields required
- [ ] Store in `user_questionary` table
- [ ] Add submit success page
- [ ] Update i18n for all labels
- **Database**: Create `user_questionary` table (new migration)
- **Files**: 
  - `app/onboarding/questionary/page.tsx`
  - `components/questionary-form.tsx` (reusable component)
  - `lib/questionary-validation.ts`
- **Tests**: 
  - All fields accept input
  - Validation works
  - Data saves to database
  - Multi-step flow works

### Task 5.3.2: Integrate English B1 Language Test
- [ ] Create: `app/assessment/b1-test/page.tsx`
- [ ] Component: Optional language assessment
- [ ] Options:
  - [ ] Option A: Embed existing B1 test API
  - [ ] Option B: Create custom B1 quiz (15-20 questions)
- [ ] Store test result in `user_language_assessments` table
- [ ] Show result score to user
- [ ] Use result to recommend routes/employers
- [ ] Mark as optional in UI ("Skip" option)
- [ ] Update i18n
- **Database**: Create `user_language_assessments` table (new migration)
- **Files**: 
  - `app/assessment/b1-test/page.tsx`
  - `components/b1-test-quiz.tsx`
  - `lib/b1-test-logic.ts`
- **Tests**:
  - Test loads with questions
  - Can skip test
  - Results save
  - Skip doesn't block onboarding

### Task 5.3.3: Database Migrations - Questionary & Assessment
- [ ] Create migration 1: `user_questionary` table
  - Fields: user_id, personal info, education, experience, languages, skills
  - Relationships: FK to users, timestamps
- [ ] Create migration 2: `user_language_assessments` table
  - Fields: user_id, test_type (B1), score, result, created_at
  - Relationships: FK to users
- [ ] Test migrations
- **Files**: 
  - `supabase/migrations/create_questionary_table.sql`
  - `supabase/migrations/create_assessment_table.sql`
- **Tests**: Migrations run, tables created with proper schema

---

## PHASE 5.4: VISUAL & CONTENT UPDATES
**Priority**: 🟢 MEDIUM - Important but not blocking
**Estimated Duration**: 2-3 hours
**Status**: ⏳ PARTIALLY BLOCKED

### Task 5.4.1: Update Logo & Theme Colors
- [ ] **BLOCKED**: Waiting for new logo design and color theme (Item 1)
- [ ] Steps (once design received):
  - [ ] Replace logo file in `public/logo.png` (or SVG)
  - [ ] Update `components/header.tsx` logo import
  - [ ] Update `tailwind.config.ts` with new color palette
  - [ ] Update CSS variables in `app/globals.css`
  - [ ] Test color consistency across all pages
  - [ ] Update i18n for any brand text changes
- **Files**: 
  - `public/` (logo files)
  - `components/header.tsx`
  - `tailwind.config.ts`
  - `app/globals.css`
- **Tests**: Logo displays correctly, colors consistent, brand identity clear

### Task 5.4.2: Add Background Video to Homepage
- [ ] **BLOCKED**: Waiting for video file (Item 17)
- [ ] Requirements: Dark/space → Europe map → Vilnius old town
- [ ] Note: Cannot use internet videos (copyright)
- [ ] Steps (once video provided):
  - [ ] Add video file to `public/videos/`
  - [ ] Create video component in `app/page.tsx`
  - [ ] Use HTML5 `<video>` with optimized codec
  - [ ] Add fallback image for unsupported browsers
  - [ ] Test on mobile and desktop
  - [ ] Optimize video size for web (< 10MB)
- **Files**: 
  - `public/videos/` (video file)
  - `app/page.tsx`
  - `components/background-video.tsx` (optional)
- **Tests**: 
  - Video plays on page load
  - Mobile: Video doesn't autoplay (save bandwidth)
  - Performance: Page loads in < 3s
  - Fallback image shows if video fails

### Task 5.4.3: Implement Editable Content System
- [ ] Create: `app/admin/content/page.tsx` (admin panel)
- [ ] Identify hardcoded text that needs to be editable:
  - Homepage hero text
  - Statistics numbers (Item 29)
  - Section descriptions
  - Button text
- [ ] Options:
  - [ ] Option A: Simple form to edit numbers/text (quick)
  - [ ] Option B: Full CMS with database (scalable)
- [ ] Recommendation: Database approach
  - Create `editable_content` table
  - Store key-value pairs (key = "homepage_stat_1", value = "500+")
  - Admin CRUD interface
- [ ] Store in database / cache with Redis for performance
- [ ] Add to admin dashboard
- [ ] Update i18n if content changes
- **Database**: Create `editable_content` table (new migration)
- **Files**: 
  - `app/admin/content/page.tsx`
  - `lib/content-management.ts`
  - `supabase/migrations/create_content_table.sql`
- **Tests**:
  - Admin can edit content
  - Changes reflect on frontend
  - Performance: No lag from database fetch
  - i18n aware

---

## PHASE 5.5: COMMUNITY & FUTURE FEATURES
**Priority**: 🔵 LOW - Future phases
**Estimated Duration**: 2-3 hours
**Status**: ⏳ NOT STARTED

### Task 5.5.1: Create Community Section
- [ ] Create: `app/community/page.tsx`
- [ ] Feature: Forum/discussion board
- [ ] Database schema:
  - `community_posts` table (topics/threads)
  - `community_comments` table (replies)
- [ ] Features:
  - Create post
  - Browse posts
  - Comment on posts
  - Like/upvote system
  - Real-time updates (Supabase Realtime)
- [ ] Moderation: Admin approval (phase 2)
- [ ] Update i18n
- **Database**: Create `community_posts`, `community_comments` tables
- **Files**: 
  - `app/community/page.tsx`
  - `components/community-feed.tsx`
  - `components/create-post-form.tsx`
- **Tests**:
  - Can create posts
  - Can comment
  - Posts display in feed
  - Real-time updates work

### Task 5.5.2: Add Guide Subtopics
- [ ] **BLOCKED**: Waiting for subtopic list (Item 3)
- [ ] Current: `/app/documentation/page.tsx` (static)
- [ ] Update: Add subtopic structure
- [ ] Steps (once list provided):
  - [ ] Create `guide_categories` and `guide_articles` tables
  - [ ] Create: `app/documentation/[category]/page.tsx`
  - [ ] Create: `app/documentation/[category]/[article]/page.tsx`
  - [ ] Add navigation/breadcrumbs
  - [ ] Update i18n
- **Database**: Create guide tables (new migration)
- **Files**: 
  - `app/documentation/` (new structure)
  - Dynamic routes
- **Tests**: Can browse guides by category and article

### Task 5.5.3: Implement Full CMS System
- [ ] Scope: Content management for all editable content
- [ ] Features:
  - Admin dashboard for content management
  - WYSIWYG editor for rich text
  - Image upload support
  - Version history
  - Draft/publish workflow
- [ ] Integrate with existing content tables
- [ ] Add user roles for content managers
- **Files**: Requires significant implementation
- **Tests**: Admin can manage all content

### Task 5.5.4: Test Chatbot After Deployment
- [ ] Current: Chatbot exists but needs cloud setup
- [ ] Location: `components/chatbot/chatbot.tsx`
- [ ] Steps:
  - [ ] Deploy app to Netlify/production
  - [ ] Configure chatbot API endpoint
  - [ ] Test chatbot functionality
  - [ ] Add to help section
- **Files**: `components/chatbot/chatbot.tsx`, deployment config
- **Tests**: Chatbot responds to user queries after deployment

---

## DATABASE MIGRATIONS REQUIRED

### Migration 1: Add Onboarding Fields
```sql
-- Add to user_profiles table
ALTER TABLE user_profiles 
ADD COLUMN goals text DEFAULT NULL,
ADD COLUMN job_types text[] DEFAULT ARRAY[]::text[],
ADD COLUMN selected_route text DEFAULT NULL;
```

### Migration 2: Create Questionary Table
```sql
CREATE TABLE user_questionary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  -- Personal Info
  phone VARCHAR(20),
  date_of_birth DATE,
  -- Address
  street_address TEXT,
  city TEXT,
  country TEXT,
  postal_code VARCHAR(10),
  -- Education
  education_level TEXT,
  field_of_study TEXT,
  university TEXT,
  graduation_year INTEGER,
  -- Experience
  previous_jobs JSONB,
  total_years_experience DECIMAL(3,1),
  -- Languages
  languages JSONB,
  -- Skills
  skills TEXT[],
  certifications TEXT[],
  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_questionary_user_id ON user_questionary(user_id);
```

### Migration 3: Create Assessment Table
```sql
CREATE TABLE user_language_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_type VARCHAR(50),
  score DECIMAL(3,2),
  result TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_assessment_user_id ON user_language_assessments(user_id);
```

### Migration 4: Create Content Management Table
```sql
CREATE TABLE editable_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50),
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_content_key ON editable_content(key);
```

### Migration 5: Create Community Tables
```sql
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE community_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_comments_post_id ON community_comments(post_id);
```

---

## BLOCKED ITEMS - WAITING FOR USER INPUT

### ⏸️ Item 1: Logo & Theme Colors
- **Status**: Blocked - Waiting for design
- **What's Needed**: Logo file (PNG/SVG) + color palette (hex codes)
- **Impact**: Medium - Affects branding
- **Can Proceed Without**: Yes - Can use placeholder, update later

### ⏸️ Item 3: Guide Subtopics List
- **Status**: Blocked - Waiting for specification
- **What's Needed**: List of subtopic categories and articles
- **Example**: "Getting Started", "Work Visa Process", "Accommodation", etc.
- **Impact**: Medium - Content structure
- **Can Proceed Without**: Yes - Can create skeleton structure first

### ⏸️ Item 11: Questionary Form Fields
- **Status**: Blocked - Waiting for specification
- **What's Needed**: Complete list of fields for personal info form
- **Current Estimate**: 15-20 fields across 5 categories
- **Impact**: High - Affects onboarding flow
- **Can Proceed Without**: Partial - Can estimate and update later

### ⏸️ Item 17: Background Video
- **Status**: Blocked - Waiting for video file
- **What's Needed**: Video file (MP4, WebM) showing: dark/space → Europe map → Vilnius old town
- **Constraint**: Cannot use internet videos (copyright)
- **Impact**: Low - Visual enhancement
- **Can Proceed Without**: Yes - Can add placeholder, implement video later

---

## QUICK START IMPLEMENTATION ORDER

### 🚀 Start Here (These can begin immediately):

1. **Phase 5.1.1** - Homepage button "Let's Start Your Journey" (30 min)
2. **Phase 5.1.2** - Email verification flow (1 hour)
3. **Phase 5.1.3** - Goal setting page (45 min)
4. **Phase 5.1.4** - Job type selection (45 min)
5. **Phase 5.1.5** - Header navigation update (30 min)
6. **Phase 5.2.1** - Loading/route generation screen (1 hour)
7. **Phase 5.2.2** - Short route dashboard (1.5 hours)
8. **Phase 5.2.3** - Premium route dashboard (1.5 hours)

### ⏸️ Cannot Start (Blocked on Input):

- Phase 5.3.1 - Questionary (needs field list - Item 11)
- Phase 5.4.1 - Logo/colors (needs design - Item 1)
- Phase 5.4.2 - Background video (needs video file - Item 17)
- Phase 5.5.2 - Guide subtopics (needs list - Item 3)

### ✅ Already Complete:

- Item 5 - Language support (EN, LT, RU) - Already implemented

---

## PERFORMANCE & TESTING CHECKLIST

### Before Each Phase:
- [ ] TypeScript compilation: 0 errors
- [ ] No console errors/warnings in dev tools
- [ ] All links/routes working
- [ ] i18n translations complete
- [ ] Mobile responsive testing

### After Completing All Phases:
- [ ] Full endpoint test suite (re-run test-endpoints-simple.js)
- [ ] Performance audit (Lighthouse score > 80)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Database performance (query optimization)
- [ ] Build size optimization

---

## QUESTIONS FOR USER

1. **Logo & Colors (Item 1)**: Can you provide the new logo design and color theme hex codes?
2. **Form Fields (Item 11)**: What specific fields should the personal info questionary include?
3. **Guide Subtopics (Item 3)**: What guide categories and subtopics should we include?
4. **Background Video (Item 17)**: Can you provide a video file? (Cannot be from internet due to copyright)
5. **Start Date**: Should we start Phase 5.1 immediately while waiting for the above inputs?

---

## SUMMARY

**Total Work**: ~15-18 hours of implementation
**Phases**: 5 major phases
**Critical Path**: Phase 5.1 → Phase 5.2 (8-9 hours minimum)
**Blocked Items**: 4 items awaiting user input
**Can Start Immediately**: Phases 5.1, 5.2 (est. 8-9 hours)

**Next Action**: Confirm above requirements and provide blocked item inputs, then start Phase 5.1!

