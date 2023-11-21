import { createStore } from 'vuex';
import ipAPI from '@/services/ipAPI.js';
import exchangeRatesApi from '@/services/exchangeRatesApi.js';
import useCookies from '../composables/useCookies';

export default createStore({
  state: {
    userLocale: {
      prefLang: navigator.language.split('-')[0],
      prefCurrency: import.meta.env.VITE_FALLBACK_CURRENCY.split('-')[0],
    },
    exchangeRates: null,
    exchangeRate: null,
  },
  getters: {
    getUserLocale: (state) => (key) => {
      return state.userLocale[key];
    },
    getUserLocaleLanguage: (state) => () => {
      if (state.userLocale.prefLang) {
        return state.userLocale.prefLang;
      } else if (state.userLocale.userIpData) {
        return state.userLocale.userIpData.languages.slice(0, 2);
      } else return import.meta.env.VITE_FALLBACK_LOCALE.split('-')[0];
    },
    getUserLocaleCurrency: (state) => () => {
      return state.userLocale.prefCurrency;
    },
    getExchangeRate: (state) => () => {
      return state.exchangeRate;
    },
    getExchangeRates: (state) => () => {
      return state.exchangeRates;
    },
  },
  mutations: {
    ADD_USER_LOCALE: (state, userLocaleObj) => {
      state.userLocale.userIpData = userLocaleObj;
      localStorage.setItem('userIpData', JSON.stringify(userLocaleObj));
    },
    SET_USER_PREF_LANGUAGE: (state, userLanguage) => {
      state.userLocale.prefLang = userLanguage;
      localStorage.setItem('userPrefLanguage', state.userLocale.prefLang);
    },
    SET_USER_PREF_CURRENCY: (state, userCurrency) => {
      state.userLocale.prefCurrency = userCurrency;
      localStorage.setItem('userPrefCurrency', state.userLocale.prefCurrency);
    },
    SET_EXCHANGE_RATE: (state, rate) => {
      state.exchangeRate = rate;
    },
    SET_EXCHANGE_RATES: (state, rates) => {
      state.exchangeRates = rates;
    }
  },
  actions: {
    fetchLocale: async ({ commit, dispatch, getters }) => {
      // check for saved locale preferences
      let savedPrefs = {};
      savedPrefs.lang = localStorage.getItem('userPrefLanguage');
      savedPrefs.curr = localStorage.getItem('userPrefCurrency');

      // save it or fetch the ip locales then save it
      if (savedPrefs.lang && savedPrefs.curr) {
        dispatch('setUserPrefLanguage', savedPrefs.lang);
        dispatch('setUserPrefCurrency', savedPrefs.curr);
      } else {
        let userIpData = await ipAPI.getIpData();
        if (userIpData) {
          commit('ADD_USER_LOCALE', userIpData);
          dispatch('setUserPrefLanguage', getters.getUserLocaleLanguage());
          dispatch('setUserPrefCurrency', userIpData.currency);
        }
      }
    },
    updateRates: async ({ commit, getters }) => {
      // request data from server
      if (getters.getExchangeRates()) {
        commit('SET_EXCHANGE_RATE', getters.getExchangeRates()[getters.getUserLocaleCurrency()]);
      } else {
        let rates = await exchangeRatesApi.getRates();
        if (rates) {
          commit('SET_EXCHANGE_RATES', rates);
          commit('SET_EXCHANGE_RATE', rates[getters.getUserLocaleCurrency()]);
        } else {
          let localRates = await exchangeRatesApi.getLocalRates();
          commit('SET_EXCHANGE_RATES', localRates);
          commit('SET_EXCHANGE_RATE', localRates[getters.getUserLocaleCurrency()]);
        }

      }
    },
    setUserPrefLanguage: ({ commit }, userLanguage) => {
      commit('SET_USER_PREF_LANGUAGE', userLanguage);
      useCookies.setCookie('USER_LANGUAGE', userLanguage, 1000, undefined, undefined);
    },
    setUserPrefCurrency: ({ commit }, userCurrency) => {
      commit('SET_USER_PREF_CURRENCY', userCurrency);
    },
  },
  modules: {},
});
