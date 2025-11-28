# ALT.XLSX Requirements Summary

## Overview
This document contains all requirements and items extracted from the `alt.xlsx` file.

---

## SECTION 1: GUIDES FEATURES

### Feature Comparison Matrix

| Feature | Short | Detailed | Premium |
|---------|-------|----------|---------|
| Location | ✓ | ✓ | ✓ |
| Documents | ✓ | ✓ | ✓ |
| Process | ✓ | ✓ | ✓ |
| VISA/Work permit/VFS | ✗ | ✓ | ✓ |
| Job Placement | ✗ | ✗ | ✓ |
| Legal Support | ✗ | ✗ | ✓ |
| Each Step Guidance | ✗ | ✗ | ✓ |
| Post Arrival Guidance | ✗ | ✗ | ✓ |

### Requirements by Tier:

#### Tier 1: SHORT GUIDE
- Location information
- Documents list
- Process overview

#### Tier 2: DETAILED GUIDE
- Location information
- Documents list
- Process overview
- VISA/Work permit/VFS information

#### Tier 3: PREMIUM GUIDE
- Location information
- Documents list
- Process overview
- VISA/Work permit/VFS information
- Job Placement assistance
- Legal Support
- Each Step Guidance
- Post Arrival Guidance

---

## SECTION 2: PAGE CONTENT

### Title Section
**Item 1: Main Title**
- Title: "Highway to Your Success"
- Status: Approved
- Note: This is the main heading for the landing/onboarding page

**Item 2: Second Page Title**
- Title: "Your Journey to European Success"
- Status: NOT NEEDED (marked as "not needed" in spreadsheet)
- Note: This was planned but has been marked for removal/skip

---

## SECTION 3: QUESTIONNAIRE/ASSESSMENT FORM

### Form Fields Required
The following fields must be added to the questionnaire/assessment form:

| # | Field Name | Type | Instructions | Priority |
|----|-----------|------|--------------|----------|
| 1 | NAME AND SURNAME | Text Input | Basic text field | High |
| 2 | AGE | Number Input | Numeric field | High |
| 3 | Nationality | Select/Text | User's country of origin | High |
| 4 | Languages Spoken | Multi-Select/Text | Format: "Language Level (B1, B2, C1, C2, native language)" | High |
| 5 | Work Experience | Multi-Select | Field options to include: Construction, Hospitality, etc. | High |
| 6 | Previous Workplace Reference | Yes/No | "Would you be able to provide reference from your previous workplace?" | High |
| 7 | Working Periods | Date Range | Format: DD/MM/YYYY to DD/MM/YYYY | High |
| 8 | EU Application History | Text Area | "Have you ever applied for EU countries before? If yes, please specify" | High |
| 9 | Education | Text/Select | User's educational background | High |
| 10 | Additional Diplomas | Text | List any additional qualifications/certifications | Medium |
| 11 | Achievements | Text Area | Personal/professional achievements | Medium |
| 12 | Work Type Preference | Multi-Select | "What kind of work are you looking for?" | High |
| 13 | Self Description | Text Area | "How you could describe yourself?" | Medium |

### Notes on Questionnaire:
- This appears to be for the onboarding/assessment process
- Field #5 (Work Experience) needs predefined category options (Construction, Hospitality mentioned as examples)
- Date format is specified as DD/MM/YYYY for consistency
- Language levels follow CEFR framework (B1, B2, C1, C2)

---

## SUMMARY OF ACTION ITEMS

### Immediate Implementation Needed:
1. ✓ Add "Guides" feature comparison (3 tiers: Short, Detailed, Premium)
2. ✓ Implement title "Highway to Your Success"
3. ✓ Skip/Remove "Your Journey to European Success" second page
4. ✓ Create comprehensive questionnaire form with all 13 fields
5. ✓ Add dropdown/multi-select options for Work Experience (Construction, Hospitality, etc.)
6. ✓ Ensure language field accepts level specifications (B1-C2)
7. ✓ Implement date range picker for Working Periods (DD/MM/YYYY format)

### Feature Blockers:
- None identified

### Status:
- Guides Feature: Ready for implementation
- Page Content: Title approved, second page marked as not needed
- Questionnaire: All fields identified, ready for form development

---

## Additional Notes:
- The spreadsheet has minimal metadata - most cells in columns B, C, D after the feature matrix are empty
- This appears to be a working document/checklist
- The language level specification (B1, B2, C1, C2) follows the Common European Framework of Reference (CEFR)
- Work experience categories should be expanded beyond the mentioned examples (Construction, Hospitality)
