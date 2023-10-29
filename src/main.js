// framework imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'clickout-event';

/**
 * Swiper Installation steps
 */
// import register function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

/**
 * fetching data about user locale
 */
// fetching and saving client's country data
await store.dispatch('fetchLocale');

// app start mounting
createApp(App).use(store).use(router).mount('#app');
