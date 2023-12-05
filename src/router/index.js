import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
/**
 * TODO:: fix suspense loaders
 */
// import LoadingSlide from '../components/LoadingSlide.vue';
// import { defineAsyncComponent } from 'vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/policies/:slug?',
      name: 'policies',
      component: () => import('../views/PoliciesView.vue'),
      /**
       * TODO:: fix suspense loaders
       */
      // component: defineAsyncComponent({
      //   loader: () => import('../views/PoliciesView.vue'),
      //   delay: 1000,
      //   loadingComponent: LoadingSlide,
      //   suspensible: false
      // }),
    },
  ],
});

export default router;
