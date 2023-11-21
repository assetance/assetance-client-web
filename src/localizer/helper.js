import localizer from "@/localizer";
import { nextTick } from "vue";

const tr = {
    supportedLanguages() {
        return this.sterilizeArray(import.meta.env.VITE_SUPPORTED_LANGUAGES);
    },
    supportedCurrencies() {
        return this.sterilizeArray(import.meta.env.VITE_SUPPORTED_CURRENCIES);
    },
    sterilizeUnit(locale) {
        let fragmets = locale.split('-');
        let localeObj = {
            id: fragmets[0],
            slug: fragmets[1],
        };
        return localeObj;
    },
    sterilizeArray(locales) {
        let doted = locales.split(',');
        let localeObj = {
            ids: [],
            slugs: [],
        };
        doted.forEach(element => {
            localeObj.ids.push(element.split('-')[0]);
            localeObj.slugs.push(element.split('-')[1]);
        });
        return localeObj;
    },
    /**
     * 
     * @param {String} key specifying what are you searching by, id / slug
     * @param {String} value id / slug value
     * @return {String} an 'id-slug' format
     */
    getLang(key, value) {
        let languages = this.supportedLanguages();
        if (key == 'id') {
            return value + '-' + languages.slugs[languages.ids.indexOf(value)];
        } else {
            return languages.ids[languages.slugs.indexOf(value)] + '-' + value;
        }
    },
    getCurr(key, value) {
        let currencies = this.supportedCurrencies();
        if (key == 'id') {
            return value + '-' + currencies.slugs[currencies.ids.indexOf(value)];
        } else {
            return currencies.id[currencies.slugs.indexOf(value)] + '-' + value;
        }
    },
    async loadLocale(localeKey) {
        if (!localizer.global.availableLocales.includes(localeKey)) {
            const messages = await import(`@/localizer/locales/${localeKey}.json`);
            localizer.global.setLocaleMessage(localeKey, messages.default);
        }
        return nextTick();
    },
    needLanguageReload(key) {
        if (import.meta.env.VITE_RTL_LANGUAGES.split(',').includes(key) && document.documentElement.getAttribute('dir') == 'ltr') {
            return true;
        } else if (document.documentElement.getAttribute('dir') == 'rtl') {
            return true;
        }
        return false;
    },
}

export default tr;