import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueApexCharts from 'vue3-apexcharts';
import 'clickout-event';
import 'material-symbols/rounded.scss';

/**
 * Swiper install
 */
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueApexCharts);

app.mount('#app');
