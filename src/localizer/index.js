import { createI18n } from "vue-i18n";
import en from './locales/en.json';
import numberFormats from "./numbers/numberFormats";
import store from "../store";

/**
 * fetching data about user locale
 */
// fetching and saving client's country data and currency rates
store.dispatch('fetchLocale');
store.dispatch('updateRates');

let messages = {
    en
}

const localizer = createI18n({
    locale: await initiateLanguage(store.getters.getUserLocaleLanguage()),
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE.split('-')[0],
    legacy: false,
    globalInjection: true,
    messages,
    numberFormats
});

async function initiateLanguage(localeKey) {
    // checking if locale is the default, otherwise start loading it
    if (localeKey !== import.meta.env.VITE_FALLBACK_LOCALE.split('-')[0]) {
        const message = await import(`@/localizer/locales/${localeKey}.json`);
        messages[localeKey] = message;
    }

    // setting up locale
    document.documentElement.setAttribute('lang', localeKey);

    if (localeKey == 'ar' && document.documentElement.getAttribute('dir') == 'ltr') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    return localeKey;
}

export default localizer;