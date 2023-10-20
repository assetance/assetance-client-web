import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '@/store';
import useCookies from '@/composables/useCookies';
import usersAPI from '@/services/usersAPI';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from, next) => {
  /**
   * for development we are making the cookie here
   */
  useCookies.setCookie('userToken', process.env.VUE_APP_TEST);
  // useCookies.deleteCookie('userToken');

  // check token cookie
  let userToken = useCookies.getCookie('userToken');
  if (userToken) {
    // get and save user Data for this session
    let userData = await usersAPI.getUserData();
    store.dispatch('setUserDataObj', userData);
  }

  next();
});

export default router;
