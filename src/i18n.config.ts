// i18next.config.js
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en/common.json';
import fr from '@/locales/fr/common.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    react: {
      useSuspense: false,
    },
    resources: {
      en: { common: en },
      fr: { common: fr },
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en',
  });

export default i18next;
