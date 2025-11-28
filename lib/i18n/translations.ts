// lib/i18n/translations.ts
// Complete translation strings for all supported languages

export type Language = 'en' | 'lt' | 'ru' | 'de' | 'fr' | 'es' | 'it' | 'pt' | 'pl';

const defaultTranslations = {
  // Header & Navigation
  'nav.jobs': 'Jobs',
  'nav.profile': 'Profile',
  'nav.messages': 'Messages',
  'nav.saved': 'Saved Jobs',
  'nav.employer': 'Employer',
  'nav.legal': 'Legal Support',
  'nav.admin': 'Admin',
  'nav.getStarted': 'Get Started',

  // Footer
  'footer.about': 'About Altroway',
  'footer.contact': 'Contact',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.legal': 'Legal',

  // Home Page
  'home.hero.title': 'Find Your Dream Job in Europe',
  'home.hero.subtitle': 'Discover thousands of opportunities with visa sponsorship and expert support',
  'home.cta.primary': 'Start Your Journey',
  'home.cta.secondary': 'Explore Jobs',

  // Jobs Page
  'jobs.hero.title': 'Find Your Dream Job in Europe',
  'jobs.hero.subtitle': 'Discover thousands of opportunities with visa sponsorship and expert support from leading European employers',
  'jobs.filter.search': 'Search',
  'jobs.filter.country': 'Country',
  'jobs.filter.industry': 'Industry',
  'jobs.filter.visa': 'Visa Sponsorship Available',
  'jobs.filter.urgent': 'Urgent Hire Only',
  'jobs.filter.clear': 'Clear Filters',
  'jobs.results.found': 'jobs found',
  'jobs.results.sort': 'Sort by',
  'jobs.results.empty': 'No jobs found',
  'jobs.results.tryAdjust': 'Try adjusting your filters or search terms',
  'jobs.card.view': 'View Details',
  'jobs.card.save': 'Save',
  'jobs.card.apply': 'Apply Now',
  'jobs.salary.notSpec': 'Salary not specified',
  'jobs.type.fulltime': 'Full-time',
  'jobs.type.parttime': 'Part-time',
  'jobs.type.contract': 'Contract',
  'jobs.type.internship': 'Internship',

  // Application
  'application.status.applied': 'Applied',
  'application.status.reviewed': 'Reviewed',
  'application.status.interview': 'Interview',
  'application.status.offer': 'Offer',
  'application.status.hired': 'Hired',
  'application.status.rejected': 'Rejected',
  'application.form.coverLetter': 'Cover Letter',
  'application.form.resume': 'Resume/CV',
  'application.form.submit': 'Submit Application',
  'application.success': 'Application submitted successfully',
  'application.error': 'Failed to submit application',

  // Profile
  'profile.edit': 'Edit Profile',
  'profile.fullName': 'Full Name',
  'profile.headline': 'Professional Headline',
  'profile.bio': 'Bio',
  'profile.skills': 'Skills',
  'profile.location': 'Location',
  'profile.phone': 'Phone',
  'profile.portfolio': 'Portfolio URL',
  'profile.save': 'Save Profile',
  'profile.success': 'Profile updated successfully',
  'profile.error': 'Failed to update profile',

  // Premium Features
  'premium.title': 'Premium Route',
  'premium.subtitle': 'Advanced job matching with premium support',
  'premium.feature.priority': 'Priority Listings',
  'premium.feature.analytics': 'Advanced Analytics',
  'premium.feature.support': 'Priority Support',
  'premium.feature.candidates': 'Candidate Management',
  'premium.feature.bulk': 'Bulk Operations',
  'premium.benefit': 'Premium Benefits',
  'premium.price': 'Pricing',
  'premium.select': 'Select Plan',
  'premium.upgrade': 'Upgrade to Premium',

  // Recruiter
  'recruiter.title': 'Recruiter Dashboard',
  'recruiter.candidates': 'Candidates',
  'recruiter.jobs': 'Job Postings',
  'recruiter.applications': 'Applications',
  'recruiter.interviews': 'Interviews',
  'recruiter.offers': 'Offers',
  'recruiter.analytics': 'Analytics',
  'recruiter.bulk': 'Bulk Actions',
  'recruiter.email': 'Email Campaign',

  // Messages
  'messages.title': 'Messages',
  'messages.noMessages': 'No messages yet',
  'messages.send': 'Send Message',
  'messages.type': 'Type a message...',
  'messages.conversation': 'Conversation',

  // Dashboard
  'dashboard.title': 'Dashboard',
  'dashboard.welcome': 'Welcome back',
  'dashboard.stats': 'Your Statistics',
  'dashboard.applications': 'Applications',
  'dashboard.saved': 'Saved Jobs',
  'dashboard.messages': 'New Messages',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'An error occurred',
  'common.success': 'Success!',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.delete': 'Delete',
  'common.edit': 'Edit',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.close': 'Close',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',
  'common.language': 'Language',
} as const;

export const translations: Record<Language, Record<string, string>> = {
  en: defaultTranslations as Record<string, string>,

  lt: defaultTranslations as Record<string, string>,

  ru: defaultTranslations as Record<string, string>,

  de: defaultTranslations as Record<string, string>,

  fr: defaultTranslations as Record<string, string>,

  es: defaultTranslations as Record<string, string>,

  it: defaultTranslations as Record<string, string>,

  pt: defaultTranslations as Record<string, string>,

  pl: defaultTranslations as Record<string, string>,
};

// Helper function to get translation
export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || key;
}

// Type-safe translation key
export type TranslationKey = keyof typeof translations.en;
