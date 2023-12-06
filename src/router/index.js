import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NProgress from 'nprogress';
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
});

router.beforeEach((to, from, next) => {
  // Start the NProgress bar
  NProgress.start();

  /**
   * TODO:: add analytics logic
  */

  next();
});

router.afterEach(() => {
  /**
   * TODO:: add analytics logic
  */

  // Finish the NProgress bar
  NProgress.done();
});
export default router;
