import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

const availableLanguages = ['en'];

const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export { i18n as default, availableLanguages };
