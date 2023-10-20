import { createStore } from 'vuex';
import ipAPI from '@/services/ipAPI';

export default createStore({
  state: {
    userLocale: {},
  },
  getters: {
    getUserLocale: (state) => (key) => {
      return state.userLocale[key];
    },
    getUserLocaleLanguage: (state) => () => {
      if (state.userLocale.languages) {
        return state.userLocale.languages.slice(0, 2);
      } else return state.userLocale.prefLang;
    },
    getUserLocaleCurrency: (state) => () => {
      if (state.userLocale.currency) {
        return (
          state.userLocale.currency +
          ' | ' +
          state.userLocale.country_name +
          ' ' +
          state.userLocale.currency_name
        );
      } else return state.userLocale.prefCurrency;
    },
  },
  mutations: {
    ADD_USER_LOCALE: (state, userLocaleObj) => {
      state.userLocale = userLocaleObj;
      localStorage.setItem('userCountry', JSON.stringify(userLocaleObj));
    },
    SET_USER_PREF_LANGUAGE: (state, userLanguage) => {
      state.userLocale.prefLang = userLanguage;
      localStorage.setItem('userPrefLanguage', state.userLocale.prefLang);
    },
    SET_USER_PREF_CURRENCY: (state, userCurrency) => {
      state.userLocale.prefCurrency = userCurrency;
      localStorage.setItem('userPrefCurrency', state.userLocale.prefCurrency);
    },
  },
  actions: {
    fetchLocale: async ({ commit, getters }) => {
      // check for saved locale preferences
      let savedPrefs = {};
      savedPrefs.lang = localStorage.getItem('userPrefLanguage');
      savedPrefs.curr = localStorage.getItem('userPrefCurrency');

      // save it or fetch the ip locales then save it
      if (savedPrefs.lang && savedPrefs.curr) {
        commit('SET_USER_PREF_LANGUAGE', savedPrefs.lang);
        commit('SET_USER_PREF_CURRENCY', savedPrefs.curr);
      } else {
        let userCountry = await ipAPI.getIpData();
        commit('ADD_USER_LOCALE', userCountry);
        commit('SET_USER_PREF_LANGUAGE', getters.getUserLocaleLanguage());
        commit('SET_USER_PREF_CURRENCY', getters.getUserLocaleCurrency());
      }
    },
    setUserPrefLanguage: ({ commit }, userLanguage) => {
      commit('SET_USER_PREF_LANGUAGE', userLanguage);
    },
    setuserPrefCurrency: ({ commit }, userCurrency) => {
      commit('SET_USER_PREF_CURRENCY', userCurrency);
    },
  },
  modules: {},
});
