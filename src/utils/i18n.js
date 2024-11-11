/**
 * ref:
 * https://codesandbox.io/s/8187wm9yj8?file=/src/app.js
 * https://react.i18next.com/guides/quick-start
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import config from "../config";
import enData from "../i18n";

const optionsLanguageDetector = {
  // order and from where user language should be detected
  order: ["localStorage"],

  lookupLocalStorage: `${config.NAME_KEY}:language`,

  // cache user language on
  caches: ["localStorage"],
  // excludeCacheFor: ['cimode'] // languages to not persist (cookie, localStorage)
};

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: { ...enData("en") },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector) // https://github.com/i18next/i18next-browser-languageDetector
  .init({
    resources,
    fallbackLng: config.DEFAULT_LANGUAGE,
    debug: config.NODE_ENV === "development",

    detection: optionsLanguageDetector,

    keySeparator: ".", // we use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
