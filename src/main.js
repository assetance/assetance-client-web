// framework imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'clickout-event';

/*
 * data preference to be fetched for
 * - locals
 *    - language
 *    - currency
 * -
 */

// fetching and saving client's country data
await store.dispatch('fetchLocale');

// app start mounting
createApp(App).use(store).use(router).mount('#app');
