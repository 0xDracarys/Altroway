# XLSX Requirements Analysis - Altroway Feature Implementation Roadmap

## Overview
Extracted from: "I am going to provide you the answer which are re....xlsx"
Total Requirements: 30 items
Status: Categorizing for implementation priority

---

## Requirements Breakdown

### CATEGORY A: UI/UX & Visual Elements (Items 1, 17, 29)

#### 1. Logo & Theme Colors
- **Requirement**: Logo change with custom theme colors
- **Status**: ⏳ NOT STARTED
- **Current State**: Default logo in place
- **Action**: Waiting for new logo design and color specification
- **Implementation Notes**:
  - Need to update `components/header.tsx` - logo component
  - Need to update Tailwind theme in `tailwind.config.ts`
  - Update favicon in `public/`

#### 17. Background Video Animation
- **Requirement**: Video background transitioning from dark/space → Europe map → Vilnius old town
- **Status**: ⏳ NOT STARTED
- **Current State**: No background video
- **Constraint**: Cannot use internet videos (copyright)
- **Action**: User needs to provide video file
- **Implementation Notes**:
  - Add to `app/page.tsx` (homepage)
  - Use HTML5 `<video>` or `next/image` for optimization
  - Need video file from user

#### 29. Editable Numbers/Text on Homepage
- **Requirement**: Currently hardcoded numbers need CMS-like editability
- **Status**: ⏳ NOT STARTED
- **Current State**: Hardcoded in `app/page.tsx`
- **Action**: Implement content editing system
- **Implementation Notes**:
  - Option 1: Create admin panel for text editing (quick)
  - Option 2: Store in database and fetch (scalable)
  - Currently: Recommend database approach with admin CRUD

---

### CATEGORY B: Content Structure (Items 2-5)

#### 2. Content Sections: Guides, Jobs, Legal Support, Community
- **Status**: ✅ PARTIALLY COMPLETE
- **Current State**:
  - ✅ Jobs: Fully implemented (`app/jobs/`)
  - ✅ Guides/Documentation: Page exists (`app/documentation/`)
  - ✅ Legal Support: Page exists (`app/legal-support/`)
  - ⏳ Community: No implementation
- **Missing**: Community section needs implementation
- **Action**: Create community feature (forum/discussion board)
- **Implementation Notes**:
  - Need database schema for community posts/comments
  - Real-time updates using Supabase Realtime
  - Similar to existing messaging system

#### 3. Guides: Subtopics
- **Requirement**: Guide page should have subtopics
- **Status**: ⏳ NOT STARTED
- **Current State**: `/app/documentation/page.tsx` exists but needs subtopics
- **Action**: Specify subtopic list
- **Implementation Notes**:
  - Wait for user to provide subtopic list
  - Structure: Parent guides → Child subtopics
  - Can use same UI pattern as Job categories

#### 4. Title & Text Customization
- **Requirement**: Hardcoded text needs ability to change
- **Status**: ⏳ NOT STARTED
- **Current State**: Hardcoded throughout app
- **Action**: Implement text/content management
- **Implementation Notes**:
  - Similar to item #29 (numbers)
  - Create centralized content table in database
  - Or use i18n system (already implemented for languages)

#### 5. Language Support
- **Requirement**: Add Lithuanian (LT) and Russian (RU), with future language support
- **Status**: ✅ ALREADY IMPLEMENTED
- **Current State**: 
  - EN, LT, RU translations in `lib/i18n/translations.ts`
  - Language selector in header
  - Context provider configured
  - 200+ translation keys
- **Action**: No action needed - Already complete

---

### CATEGORY C: User Onboarding Journey (Items 6-13)

#### 6. "Let's Start Your Journey" Button
- **Requirement**: Replace current two buttons with single CTA
- **Status**: ⏳ NOT STARTED
- **Current State**: Current button structure in `app/page.tsx`
- **Action**: Update homepage button flow
- **Implementation Notes**:
  - Update `app/page.tsx` hero section
  - Route to sign-up flow (item 7)
  - Update i18n translations for new CTA

#### 7. Sign Up / Account Creation with Email Verification
- **Requirement**: Email confirmation flow on signup
- **Status**: ✅ PARTIALLY COMPLETE
- **Current State**:
  - ✅ Sign-up form exists (`app/register/page.tsx`)
  - ✅ Auth working with Supabase
  - ⏳ Email confirmation flow unclear
- **Action**: Verify/complete email confirmation
- **Implementation Notes**:
  - Check Supabase auth config for email verification
  - May need to enable email confirmations in Supabase
  - Update auth flow to show confirmation message

#### 8. Set Your Goals (Post-Signup)
- **Requirement**: After signup, users set their goals
- **Status**: ⏳ NOT STARTED
- **Current State**: No goal-setting form
- **Action**: Create goal selection UI
- **Implementation Notes**:
  - Create new page: `app/onboarding/goals/page.tsx`
  - Store in user_profiles table
  - Goals: short_term, long_term, relocation_citizenship

#### 9. Mark Job Type/Goal (Multi-Select)
- **Requirement**: Users select: short term work, long term work, or family relocation + citizenship
- **Status**: ⏳ NOT STARTED
- **Current State**: Not implemented
- **Action**: Create multi-select form
- **Implementation Notes**:
  - Integrate with item #8 (same flow)
  - Store in `user_profiles.job_types` (needs migration)
  - Use Radix UI Checkbox components (already in project)

#### 10. Personal Information Questionary (CV-like Template)
- **Requirement**: Collect personal info using custom CV-like form
- **Status**: ⏳ NOT STARTED
- **Current State**: Profile edit exists but not comprehensive
- **Action**: Create questionary form
- **Implementation Notes**:
  - Create: `app/onboarding/questionary/page.tsx`
  - Fields needed: Education, Experience, Skills, Languages, Certificates
  - Store in new `user_questionary` table or expand `user_profiles`
  - Multi-step form recommended

#### 11. Questionary Form Specification
- **Requirement**: Need personal info form template specification
- **Status**: ⏳ WAITING FOR INPUT
- **Current State**: No specification provided
- **Action**: User to provide form field list
- **Expected Fields** (estimate): Name, Email, Phone, Address, Education, Experience, Languages, Skills, Certifications

#### 12. English B1 Test (Optional)
- **Requirement**: Optional English B1 language test
- **Status**: ⏳ NOT STARTED
- **Current State**: No language tests implemented
- **Action**: Integrate or build B1 test
- **Implementation Notes**:
  - Option 1: Embed existing B1 test API
  - Option 2: Create custom B1 quiz
  - Store results in `user_assessments` table
  - Mark as optional in UI

---

### CATEGORY D: User Routes & Recommendations (Items 13-16)

#### 13. Loading Screen with Route Options
- **Requirement**: "Generating your routes…" loading screen → 2 options
- **Status**: ⏳ NOT STARTED
- **Current State**: No loading/route generation screen
- **Action**: Create route generation experience
- **Implementation Notes**:
  - Create: `app/onboarding/loading/page.tsx`
  - Simulate processing (2-5 seconds)
  - Display two buttons: Short Route & Premium Route
  - Route based on user qualifications + goals (from items 8-10)

#### 14-20. Short Route Display (6 tabs)
- **Requirement**: Display: Requirements, Documents, Employers, Migration Process, Costs, Timeline
- **Status**: ⏳ NOT STARTED
- **Current State**: No implementation
- **Action**: Create Short Route dashboard
- **Implementation Notes**:
  - Create: `app/routes/short/page.tsx`
  - Tab component structure:
    1. Requirements - Immigration requirements
    2. Documents - Needed documents checklist
    3. Employers - Available employers
    4. Migration Process - Step-by-step process
    5. Costs - Breakdown of costs
    6. Timeline - Estimated timeline
  - Fetch data from database

#### 21-26. Premium Route Display (6 features)
- **Requirement**: Individual guide, live support, operation setup, post-arrival tips, rules & regulations
- **Status**: ⏳ NOT STARTED
- **Current State**: Premium database structure exists but no UI
- **Action**: Create Premium Route dashboard
- **Implementation Notes**:
  - Create: `app/routes/premium/page.tsx`
  - Database: Use existing premium_analytics table
  - Features:
    1. Individual Guide - AI/personalized recommendations
    2. Live Support - Messaging/support chat
    3. Operation Setup - Business setup guidance
    4. Post-Arrival Tips - Living in Lithuania
    5. Rules & Regulations - Legal info
    6. Payment - Upgrade option
  - Requires premium subscription

---

### CATEGORY E: Navigation & UX Tweaks (Items 20, 18, 28)

#### 20. Replace "Sign In" with "Get Started" + Language Options
- **Requirement**: Update header navigation
- **Status**: ⏳ NOT STARTED
- **Current State**: 
  - Header has "Sign In" link
  - Language selector exists
- **Action**: Update header navigation structure
- **Implementation Notes**:
  - Update `components/header.tsx`
  - Change "Sign In" to "Get Started"
  - Ensure language selector visible
  - Route "Get Started" → Sign-up flow

#### 18. Chatbot Functionality
- **Requirement**: Chatbot will work once deployed to cloud
- **Status**: ✅ ALREADY EXISTS (Conditional)
- **Current State**:
  - Chatbot component exists: `components/chatbot/chatbot.tsx`
  - Currently local/development version
- **Action**: Will activate after cloud deployment
- **Implementation Notes**:
  - Currently in development
  - Requires API endpoint configuration
  - Add to deployment checklist
  - Test post-deployment

#### 28. Logo/Theme/Colors
- **Status**: Same as item #1
- **See**: CATEGORY A - Item 1

---

## Implementation Priority Matrix

### 🔴 CRITICAL (Must have before launch)
1. **Item 6** - "Let's Start Your Journey" button (entry point)
2. **Item 7** - Email verification flow (auth)
3. **Item 8** - Goal setting (onboarding)
4. **Item 9** - Job type selection (onboarding)
5. **Item 13** - Route generation screen (core flow)
6. **Item 14-20** - Short Route display (core feature)
7. **Item 20** - Navigation updates (UX)
8. **Item 1** - Logo & colors (branding)

### 🟡 HIGH (Important for MVP)
1. **Item 10** - Questionary form (onboarding)
2. **Item 21-26** - Premium route (premium feature)
3. **Item 12** - B1 English test (optional assessment)
4. **Item 2** - Content sections (structure)
5. **Item 5** - Language support (✅ Already done)

### 🟢 MEDIUM (Nice to have)
1. **Item 17** - Background video (visual)
2. **Item 29** - Editable numbers/text (admin)
3. **Item 4** - Text customization (CMS)
4. **Item 3** - Guide subtopics (content)
5. **Item 18** - Chatbot (utility)

### 🔵 LOW (Future phases)
1. **Item 11** - Form specification (awaiting input)

---

## Database Migration Requirements

### New Tables Needed
1. `user_goals` - User goal selection (item 8)
2. `user_questionary` - Personal info form (item 10)
3. `user_language_assessments` - B1 test results (item 12)
4. `route_recommendations` - Generated route data (item 13)
5. `community_posts` - Community feature (item 2)
6. `editable_content` - CMS for text (item 4, 29)

### Existing Tables to Update
1. `user_profiles` - Add job_types array field
2. `premium_analytics` - Ensure has all required fields for items 21-26

---

## Files to Create/Modify

### New Files
- [ ] `app/onboarding/goals/page.tsx` - Goal selection
- [ ] `app/onboarding/questionary/page.tsx` - Personal info form
- [ ] `app/onboarding/loading/page.tsx` - Route generation
- [ ] `app/routes/short/page.tsx` - Short route dashboard
- [ ] `app/routes/premium/page.tsx` - Premium route dashboard
- [ ] `app/community/page.tsx` - Community section
- [ ] `app/assessment/b1-test/page.tsx` - English B1 test
- [ ] `components/questionary-form.tsx` - Reusable form component
- [ ] `lib/route-generation.ts` - Logic for route recommendation

### Modify Files
- [ ] `app/page.tsx` - Update homepage button & hero section
- [ ] `components/header.tsx` - Update navigation (Sign In → Get Started, language selector)
- [ ] `tailwind.config.ts` - Update colors based on logo theme
- [ ] Database migrations - Create new tables

---

## Implementation Roadmap

### Phase 5.1: Onboarding Flow (CRITICAL)
**Duration**: ~3-4 hours
1. Update homepage button (item 6)
2. Verify email verification (item 7)
3. Create goal setting page (item 8)
4. Create job type selection (item 9)
5. Update header navigation (item 20)

### Phase 5.2: Route Generation & Display (CRITICAL)
**Duration**: ~4-5 hours
1. Create loading screen (item 13)
2. Build Short Route dashboard (items 14-20)
3. Build Premium Route dashboard (items 21-26)
4. Add route recommendation logic

### Phase 5.3: Questionary & Assessment (HIGH)
**Duration**: ~3-4 hours
1. Create questionary form (item 10)
2. Add B1 test integration (item 12)
3. Store results in database

### Phase 5.4: Visual & Content (MEDIUM)
**Duration**: ~2-3 hours
1. Update logo & theme colors (item 1) - Waiting for design
2. Add background video (item 17) - Waiting for video file
3. Implement editable content system (item 29)

### Phase 5.5: Community & Future (LOW)
**Duration**: ~2-3 hours
1. Create community section (item 2)
2. Add guide subtopics (item 3)
3. Implement CMS for text (item 4)
4. Test chatbot integration (item 18)

---

## Status Summary

| Category | Status | Notes |
|----------|--------|-------|
| Language Support (Item 5) | ✅ Complete | EN, LT, RU working |
| Sign-up System (Item 7) | 🟡 Partial | Email verify unclear |
| Premium System (Items 21-26) | 🟡 Partial | DB ready, UI missing |
| Onboarding Flow (Items 6-10) | 🔴 Not Started | Critical path |
| Route Generation (Items 13-16) | 🔴 Not Started | Core feature |
| Questionary Form (Item 10) | 🔴 Not Started | Blocked on spec |
| B1 Test (Item 12) | 🔴 Not Started | Optional feature |
| Logo & Colors (Item 1) | 🟡 Blocked | Waiting for design |
| Background Video (Item 17) | 🟡 Blocked | Waiting for video |
| Editable Content (Items 4, 29) | 🔴 Not Started | CMS needed |
| Community (Item 2) | 🔴 Not Started | New feature |
| Chatbot (Item 18) | 🟡 Partial | Needs deployment |
| Header Navigation (Item 20) | 🔴 Not Started | Quick fix |

---

## Blocked Items (Waiting for User Input)

1. **Item 1**: New logo design and color theme
2. **Item 3**: List of guide subtopics
3. **Item 11**: Personal info form field specification
4. **Item 17**: Background video file (must be provided, not from internet)

---

## Next Immediate Actions

1. ✅ **READ XLSX** - COMPLETE
2. 🔄 **CREATE IMPLEMENTATION PLAN** - IN PROGRESS
3. ⏳ **START PHASE 5.1: Onboarding Flow**
   - Update homepage button
   - Create goal selection page
   - Create job type selection page
   - Update navigation header
4. ⏳ **AWAIT USER INPUT** on blocked items (items 1, 3, 11, 17)

---

**Questions for User**:
1. What are the logo design and color specifications?
2. What guide subtopics should be included?
3. What fields should the personal info questionary include?
4. What background video should be used? (Can you provide the file?)
5. Should we start with the onboarding flow while waiting for these specs?

