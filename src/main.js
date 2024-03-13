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
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-blue/theme.css';
import Ripple from 'primevue/ripple';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';

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
app.use(PrimeVue, { ripple: true });
app.use(
    VueTippy,
    // optional
    {
      directive: 'tippy', // => v-tippy
      defaultProps: {
        placement: 'auto-end',
        allowHTML: true,
      }, // => Global default options * see all props
    }
  )

app.directive('ripple', Ripple);

app.mount('#app');
