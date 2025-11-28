// lib/google-translate-api.ts
// Google Translate API integration for dynamic translation

import { Language } from './i18n/translations';

const GOOGLE_TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/element.js';
const SUPPORTED_LANGUAGES: Record<Language, string> = {
  en: 'en',
  lt: 'lt',
  ru: 'ru',
};

/**
 * Translate text using Google Translate API
 * This uses a client-side approach that doesn't require API keys for basic usage
 */
export async function translateText(
  text: string,
  targetLanguage: Language,
  sourceLanguage: Language = 'en'
): Promise<string> {
  if (targetLanguage === sourceLanguage || !text) {
    return text;
  }

  try {
    // Using free translation API endpoint (no key required)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
    );

    if (!response.ok) {
      console.warn(`Translation API error: ${response.status}`);
      return text;
    }

    const data = await response.json();
    
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }

    return text;
  } catch (error) {
    console.warn('Translation failed, using original text:', error);
    return text;
  }
}

/**
 * Batch translate multiple texts
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: Language,
  sourceLanguage: Language = 'en'
): Promise<string[]> {
  const results = await Promise.all(
    texts.map(text => translateText(text, targetLanguage, sourceLanguage))
  );
  return results;
}

/**
 * Detect language of text
 */
export async function detectLanguage(text: string): Promise<Language | null> {
  if (!text) return null;

  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|en`
    );

    const data = await response.json();
    
    // Try to extract detected language from response
    if (data.responseData?.detectedLanguage) {
      const detected = data.responseData.detectedLanguage;
      if (detected === 'lt') return 'lt';
      if (detected === 'ru') return 'ru';
      return 'en';
    }

    return 'en';
  } catch (error) {
    console.warn('Language detection failed:', error);
    return 'en';
  }
}

/**
 * Get supported languages
 */
export function getSupportedLanguages(): Language[] {
  return ['en', 'lt', 'ru'];
}

/**
 * Get language display name
 */
export function getLanguageName(language: Language): string {
  const names: Record<Language, string> = {
    en: 'English',
    lt: 'Lietuvių',
    ru: 'Русский',
  };
  return names[language] || language;
}

/**
 * Check if language is supported
 */
export function isLanguageSupported(language: string): boolean {
  return ['en', 'lt', 'ru'].includes(language);
}
