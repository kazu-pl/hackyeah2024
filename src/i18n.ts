import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en", // which language to use if user uses a language that is not supported in your app. The default value is `dev` which are just the translation keys (the strings you pass to `t` function - NOT THE REAL TRANSLATIONS).

    //// supportedLngs: ["pl", "en"],

    //// fallbackNS // if your current lang is e.g. `pl` and you won't find translation string you can search for that translation string in fallbackNS so it's like "which language to use if developer forgot to paste translated key in other language"

    //// ######### UNCOMMENT BELOW CODE TO REMOVE FETCHING `translation` FILE #########
    // defaultNS: "common", // the default namespace to fetch if you use useTranslation(); without passing any specific translation as an argument. The default value of `defaultNS` is translation.json and IT'S GONNA BE DOWNLOADED BY DEFAULT WHEN YOU ENTER THE APP FOR THE FIRST TIME EVEN IF YOU DON'T USE ANY TRANSLATION AT ALL. But even if you change `defaultNS` then you will still fetch `translation.json` file because it is also the default value of `ns` argument. So to stop fetching translation.json file you also have to override `ns` option

    //// ######### UNCOMMENT BELOW CODE TO REMOVE FETCHING `translation` FILE #########
    //// ns: ["common"], // a sets of translations that will be downloaded FOR YOUR CURRENT LANGUAGE (not for all languages) when you first enter the app. by default its value is 'translation'. Keep in mind that `defaultNS` also will be downloaded on initial page enter

    //// ns: "", // will download `.json` file (a file without a name) and it will probably return 304 (index.html from `public` folder)

    //// ######### OR YOU CAN UNCOMMENT BELOW CODE TO REMOVE FETCHING `translation` FILE #########
    // ns: [], // It won't fetch any translation initially when you first enter the app (beside the `defaultNS` one)

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
