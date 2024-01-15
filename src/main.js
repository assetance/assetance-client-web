import { createApp } from 'vue/dist/vue.esm-bundler';
import App from './App.vue';
import NProgress from 'nprogress';
import router from './router';
import 'material-symbols/rounded.scss';
import localizer from './localizer';
import store from './store';
import VueApexCharts from 'vue3-apexcharts';
import 'clickout-event';
import { createHead } from '@unhead/vue';

/**
 * Swiper install
 */
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

// Vue app creation
const app = createApp(App);
// Unhead lib init
const head = createHead();

app.use((app) => {
    app.config.globalProperties.$NProgress = NProgress;
    NProgress.configure({ showSpinner: false });
});
app.use(router);
app.use(store);
app.use(VueApexCharts);
app.use(localizer);
app.use(head);

app.mount('#app');
