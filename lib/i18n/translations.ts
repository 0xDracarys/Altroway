// lib/i18n/translations.ts
// Complete translation strings for all supported languages

export type Language = 'en' | 'lt' | 'ru';

export const translations: Record<Language, Record<string, string>> = {
  en: {
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
  },

  lt: {
    // Header & Navigation
    'nav.jobs': 'Darbai',
    'nav.profile': 'Profilis',
    'nav.messages': 'Žinutės',
    'nav.saved': 'Išsaugoti darbai',
    'nav.employer': 'Darbdavys',
    'nav.legal': 'Teisinis paramos',
    'nav.admin': 'Administracija',
    'nav.getStarted': 'Pradėti',

    // Footer
    'footer.about': 'Apie Altroway',
    'footer.contact': 'Kontaktai',
    'footer.privacy': 'Privatumo politika',
    'footer.terms': 'Naudojimosi sąlygos',
    'footer.legal': 'Teisinis',

    // Home Page
    'home.hero.title': 'Raskite savo svajonių darbą Europoje',
    'home.hero.subtitle': 'Atskleiskite tūkstančius galimybių su vizos sponzoriumi ir ekspertiniu palaikymu',
    'home.cta.primary': 'Pradėti kelionę',
    'home.cta.secondary': 'Skaitykite darbų',

    // Jobs Page
    'jobs.hero.title': 'Raskite savo svajonių darbą Europoje',
    'jobs.hero.subtitle': 'Atskleiskite tūkstančius galimybių su vizos sponzoriumi ir ekspertiniu palaikymu iš pagrindinių Europos darbdavių',
    'jobs.filter.search': 'Paieška',
    'jobs.filter.country': 'Šalis',
    'jobs.filter.industry': 'Industrija',
    'jobs.filter.visa': 'Prieinama viza',
    'jobs.filter.urgent': 'Tik Skubūs',
    'jobs.filter.clear': 'Išvalyti filtrus',
    'jobs.results.found': 'darbai rasti',
    'jobs.results.sort': 'Rūšiuoti pagal',
    'jobs.results.empty': 'Darbų nerastas',
    'jobs.results.tryAdjust': 'Pabandykite koreguoti filtrus arba paieškos terminus',
    'jobs.card.view': 'Peržiūrėti detales',
    'jobs.card.save': 'Išsaugoti',
    'jobs.card.apply': 'Pateikti paraišką',
    'jobs.salary.notSpec': 'Atlyginimas nenurodtas',
    'jobs.type.fulltime': 'Visą laiką',
    'jobs.type.parttime': 'Dalinis darbas',
    'jobs.type.contract': 'Sutartis',
    'jobs.type.internship': 'Stažas',

    // Application
    'application.status.applied': 'Patikslinta',
    'application.status.reviewed': 'Peržiūrėta',
    'application.status.interview': 'Pokalbis',
    'application.status.offer': 'Pasiūlymas',
    'application.status.hired': 'Pasamdyta',
    'application.status.rejected': 'Atmesta',
    'application.form.coverLetter': 'Lydraštis',
    'application.form.resume': 'CV',
    'application.form.submit': 'Pateikti paraišką',
    'application.success': 'Paraiška pateikta sėkmingai',
    'application.error': 'Nepavyko pateikti paraiškos',

    // Profile
    'profile.edit': 'Redaguoti profilį',
    'profile.fullName': 'Pilnas vardas',
    'profile.headline': 'Profesinis antraštė',
    'profile.bio': 'Biografija',
    'profile.skills': 'Gebėjimai',
    'profile.location': 'Vieta',
    'profile.phone': 'Telefonas',
    'profile.portfolio': 'Portfolio URL',
    'profile.save': 'Išsaugoti profilį',
    'profile.success': 'Profilis atnaujintas sėkmingai',
    'profile.error': 'Nepavyko atnaujinti profilio',

    // Premium Features
    'premium.title': 'Premium maršrutas',
    'premium.subtitle': 'Patobulintas darbų atitikimas su premium palaikymu',
    'premium.feature.priority': 'Prioritetinės sąrašai',
    'premium.feature.analytics': 'Pažangus analitika',
    'premium.feature.support': 'Prioritetinis palaikymas',
    'premium.feature.candidates': 'Kandidatų valdymas',
    'premium.feature.bulk': 'Masinės operacijos',
    'premium.benefit': 'Premium pranašumai',
    'premium.price': 'Kaina',
    'premium.select': 'Pasirinkti planą',
    'premium.upgrade': 'Pagerinti į Premium',

    // Recruiter
    'recruiter.title': 'Rekruterio skydelis',
    'recruiter.candidates': 'Kandidatai',
    'recruiter.jobs': 'Darbo skelbimas',
    'recruiter.applications': 'Paraiškos',
    'recruiter.interviews': 'Pokalbiai',
    'recruiter.offers': 'Pasiūlymai',
    'recruiter.analytics': 'Analitika',
    'recruiter.bulk': 'Masinės operacijos',
    'recruiter.email': 'El. pašto kampanija',

    // Messages
    'messages.title': 'Žinutės',
    'messages.noMessages': 'Dar žinučių nėra',
    'messages.send': 'Siųsti žinutę',
    'messages.type': 'Įrašykite žinutę...',
    'messages.conversation': 'Pokalbis',

    // Dashboard
    'dashboard.title': 'Skydelis',
    'dashboard.welcome': 'Malonu jus pamatyti',
    'dashboard.stats': 'Jūsų statistika',
    'dashboard.applications': 'Paraiškos',
    'dashboard.saved': 'Išsaugoti darbai',
    'dashboard.messages': 'Naujos žinutės',

    // Common
    'common.loading': 'Kraunama...',
    'common.error': 'Įvyko klaida',
    'common.success': 'Sėkmingai!',
    'common.save': 'Išsaugoti',
    'common.cancel': 'Atšaukti',
    'common.delete': 'Ištrinti',
    'common.edit': 'Redaguoti',
    'common.back': 'Grįžti',
    'common.next': 'Toliau',
    'common.previous': 'Grįžti atgal',
    'common.close': 'Uždaryti',
    'common.search': 'Paieška',
    'common.filter': 'Filtras',
    'common.sort': 'Rūšiuoti',
    'common.language': 'Kalba',
  },

  ru: {
    // Header & Navigation
    'nav.jobs': 'Вакансии',
    'nav.profile': 'Профиль',
    'nav.messages': 'Сообщения',
    'nav.saved': 'Сохраненные вакансии',
    'nav.employer': 'Работодатель',
    'nav.legal': 'Юридическая поддержка',
    'nav.admin': 'Администрация',
    'nav.getStarted': 'Начать',

    // Footer
    'footer.about': 'О компании Altroway',
    'footer.contact': 'Контакты',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    'footer.legal': 'Юридические',

    // Home Page
    'home.hero.title': 'Найди работу своей мечты в Европе',
    'home.hero.subtitle': 'Откройте для себя тысячи возможностей с поддержкой визы и экспертной помощью',
    'home.cta.primary': 'Начать путешествие',
    'home.cta.secondary': 'Смотреть вакансии',

    // Jobs Page
    'jobs.hero.title': 'Найди работу своей мечты в Европе',
    'jobs.hero.subtitle': 'Откройте для себя тысячи возможностей с поддержкой визы и экспертной помощью от ведущих европейских работодателей',
    'jobs.filter.search': 'Поиск',
    'jobs.filter.country': 'Страна',
    'jobs.filter.industry': 'Отрасль',
    'jobs.filter.visa': 'Доступна поддержка визы',
    'jobs.filter.urgent': 'Только срочные',
    'jobs.filter.clear': 'Очистить фильтры',
    'jobs.results.found': 'вакансий найдено',
    'jobs.results.sort': 'Сортировать по',
    'jobs.results.empty': 'Вакансий не найдено',
    'jobs.results.tryAdjust': 'Попробуйте отрегулировать фильтры или условия поиска',
    'jobs.card.view': 'Подробнее',
    'jobs.card.save': 'Сохранить',
    'jobs.card.apply': 'Подать заявку',
    'jobs.salary.notSpec': 'Зарплата не указана',
    'jobs.type.fulltime': 'Полная занятость',
    'jobs.type.parttime': 'Неполная занятость',
    'jobs.type.contract': 'Контракт',
    'jobs.type.internship': 'Стажировка',

    // Application
    'application.status.applied': 'Подано',
    'application.status.reviewed': 'Рассмотрено',
    'application.status.interview': 'Интервью',
    'application.status.offer': 'Предложение',
    'application.status.hired': 'Нанято',
    'application.status.rejected': 'Отклонено',
    'application.form.coverLetter': 'Сопроводительное письмо',
    'application.form.resume': 'Резюме',
    'application.form.submit': 'Отправить заявку',
    'application.success': 'Заявка успешно отправлена',
    'application.error': 'Не удалось отправить заявку',

    // Profile
    'profile.edit': 'Редактировать профиль',
    'profile.fullName': 'Полное имя',
    'profile.headline': 'Профессиональный заголовок',
    'profile.bio': 'Биография',
    'profile.skills': 'Навыки',
    'profile.location': 'Местоположение',
    'profile.phone': 'Телефон',
    'profile.portfolio': 'URL портфолио',
    'profile.save': 'Сохранить профиль',
    'profile.success': 'Профиль успешно обновлен',
    'profile.error': 'Не удалось обновить профиль',

    // Premium Features
    'premium.title': 'Premium маршрут',
    'premium.subtitle': 'Расширенный поиск вакансий с премиум-поддержкой',
    'premium.feature.priority': 'Приоритетные объявления',
    'premium.feature.analytics': 'Продвинутая аналитика',
    'premium.feature.support': 'Приоритетная поддержка',
    'premium.feature.candidates': 'Управление кандидатами',
    'premium.feature.bulk': 'Массовые операции',
    'premium.benefit': 'Преимущества Premium',
    'premium.price': 'Цены',
    'premium.select': 'Выбрать план',
    'premium.upgrade': 'Перейти на Premium',

    // Recruiter
    'recruiter.title': 'Панель рекрутера',
    'recruiter.candidates': 'Кандидаты',
    'recruiter.jobs': 'Объявления о вакансиях',
    'recruiter.applications': 'Заявки',
    'recruiter.interviews': 'Интервью',
    'recruiter.offers': 'Предложения',
    'recruiter.analytics': 'Аналитика',
    'recruiter.bulk': 'Массовые операции',
    'recruiter.email': 'Почтовая кампания',

    // Messages
    'messages.title': 'Сообщения',
    'messages.noMessages': 'Нет сообщений',
    'messages.send': 'Отправить сообщение',
    'messages.type': 'Введите сообщение...',
    'messages.conversation': 'Разговор',

    // Dashboard
    'dashboard.title': 'Панель управления',
    'dashboard.welcome': 'Добро пожаловать',
    'dashboard.stats': 'Ваша статистика',
    'dashboard.applications': 'Заявки',
    'dashboard.saved': 'Сохраненные вакансии',
    'dashboard.messages': 'Новые сообщения',

    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.success': 'Успешно!',
    'common.save': 'Сохранить',
    'common.cancel': 'Отмена',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Назад',
    'common.close': 'Закрыть',
    'common.search': 'Поиск',
    'common.filter': 'Фильтр',
    'common.sort': 'Сортировать',
    'common.language': 'Язык',
  },
};

// Helper function to get translation
export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || key;
}

// Type-safe translation key
export type TranslationKey = keyof typeof translations.en;
