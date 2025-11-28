/**
 * Google Translator API Integration
 * This file handles translation using Google Cloud Translation API
 * 
 * Setup required:
 * 1. Create Google Cloud project
 * 2. Enable Cloud Translation API
 * 3. Create service account with Translation API permissions
 * 4. Download credentials JSON key
 * 5. Set GOOGLE_TRANSLATE_API_KEY in environment
 */

interface TranslateOptions {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
}

interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

const GOOGLE_TRANSLATE_API_URL = 'https://translation.googleapis.com/language/translate/v2';

/**
 * Translate text using Google Translate API
 */
export async function translateText(
  options: TranslateOptions
): Promise<TranslationResult> {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      throw new Error('GOOGLE_TRANSLATE_API_KEY environment variable not set');
    }

    const url = new URL(GOOGLE_TRANSLATE_API_URL);
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: options.text,
        source_language_code: options.sourceLanguage || 'en',
        target_language_code: options.targetLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`API response: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const translated = data?.data?.translations[0]?.translatedText || options.text;

    return {
      translatedText: translated,
      sourceLanguage: options.sourceLanguage || 'en',
      targetLanguage: options.targetLanguage,
    };
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error(`Failed to translate text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Translate multiple texts
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: string,
  sourceLanguage?: string
): Promise<TranslationResult[]> {
  try {
    const results = await Promise.all(
      texts.map((text) =>
        translateText({
          text,
          sourceLanguage,
          targetLanguage,
        })
      )
    );
    return results;
  } catch (error) {
    console.error('Batch translation error:', error);
    throw new Error(`Failed to translate batch: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Detect language of text
 */
export async function detectLanguage(text: string): Promise<string> {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      throw new Error('GOOGLE_TRANSLATE_API_KEY environment variable not set');
    }

    const url = new URL('https://translation.googleapis.com/language/translate/v2/detect');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: text }),
    });

    if (!response.ok) {
      return 'en';
    }

    const data = await response.json();
    const detectedLanguage = data?.data?.detections[0][0]?.language;
    return detectedLanguage || 'en';
  } catch (error) {
    console.error('Language detection error:', error);
    return 'en';
  }
}

/**
 * Get list of supported languages
 */
export async function getSupportedLanguages(): Promise<{ [key: string]: string }> {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      throw new Error('GOOGLE_TRANSLATE_API_KEY environment variable not set');
    }

    const url = new URL('https://translation.googleapis.com/language/translate/v2/languages');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      // Return default languages if API fails
      return {
        en: 'English',
        lt: 'Lithuanian',
        ru: 'Russian',
      };
    }

    const data = await response.json();
    const languages: { [key: string]: string } = {};
    data?.data?.languages?.forEach((lang: any) => {
      languages[lang.language] = lang.name || lang.language;
    });

    return languages;
  } catch (error) {
    console.error('Get languages error:', error);
    // Return default supported languages
    return {
      en: 'English',
      lt: 'Lithuanian',
      ru: 'Russian',
    };
  }
}
