import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files

import translationEN from "./assets/translation/en/en.json";
import translationFR from "./assets/translation/fr/fr.json";

//Creating object with the variables of imported translation files
const resources = {
    en: {
        translation: translationEN,
    },
    fr: {
        translation: translationFR,
    },
};

//i18N Initialization

i18n.use(initReactI18next).init({
    resources,
    lng: "en", //default language
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});
i18n.init({
    // ... other config

    react: {
      // Turn off the use of React Suspense
      useSuspense: false
    }
  });

export default i18n;
