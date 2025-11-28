'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslation, TranslationKey } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage') as Language | null;
    if (saved && ['en', 'lt', 'ru'].includes(saved)) {
      setLanguageState(saved);
      // Also update document lang attribute
      document.documentElement.lang = saved;
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    document.documentElement.lang = newLanguage;
    // Trigger re-render of all components using useTranslation
  };

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook to use translations
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within I18nProvider');
  }
  return context;
}
