import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/shared/config/locales/en.json';
import ru from '@/shared/config/locales/ru.json';

export const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
const STORAGE_KEY = 'app-lang';

const getStoredLanguage = (): SupportedLanguage | undefined => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'ru') {
    return stored;
  }
  return undefined;
};

export const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: getStoredLanguage() ?? DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

export const setAppLanguage = (language: SupportedLanguage) => {
  localStorage.setItem(STORAGE_KEY, language);
  void i18n.changeLanguage(language);
};
