import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NProgress from 'nprogress';
import { useSeoMeta } from '@unhead/vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        /*  page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        description: 'Invest In Real Estate Starting From $10',

        /* page meta data */
      }
    },
    {
      path: '/properties',
      name: 'properties',
      component: () => import('../views/PropertiesView.vue'),
      meta: {
        /* page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        title: 'Properties',
        description: 'Browse our list of carefully selected properties for you to invest in.',

        /* page meta data */
      }
    },
    {
      path: '/property/:id?', // optional for dev only 
      name: 'property',
      component: () => import('../views/PropertyView.vue'),
      meta: {
        /* page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        title: 'Property',
        description: 'Check out this lucrative investment opportunity.',

        /* page meta data */
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        /* page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        title: 'About Us',
        description: 'Learn More About Us',

        /* page meta data */
      }
    },
    {
      path: '/policies/:slug?',
      name: 'policies',
      component: () => import('../views/PoliciesView.vue'),
      meta: {
        /* page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        title: 'Policies',
        description: 'Learn More About Our Polices',

        /* page meta data */
      }
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/HelpCenterView.vue'),
      meta: {
        /* page meta tags */
        // TODO:: rewrite a solid SEO description of the page
        title: 'Help Center',
        description: 'Get Support And Read Helpful Guides',

        /* page meta data */
      }
    },
    {
      path: '/knowledge',
      children: [
        {
          path: '',
          name: 'knowledge',
          component: () => import('../views/KnowledgeBaseView.vue'),
          meta: {
            /* page meta tags */
            // TODO:: rewrite a solid SEO description of the page
            title: 'Knowledge Base',
            description: 'Discover More About Fractional Real Estate Investing, Investments Stratigies, And More',

            /* page meta data */
          }
        },
        {
          path: 'articles/:id?', // optional id for dev only
          name: 'knowledge-article',
          component: () => import('../views/ArticleView.vue'),
          meta: {
            /* page meta tags */
            // TODO:: rewrite a solid SEO description of the page
            title: 'Article Page',
            description: 'Assetance Article',

            /* page meta data */
          }
        }
      ]
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // scrolling to anchor
      if(from.name == undefined) {
        // adjust scroll timing for first load
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              // id scheme '<id>_hash' to prevent default browser scroll behavior
              el: `${to.hash}_hash`,
              top: 70
            })
          }, 1300);
        });
      } else {
        // adjust scroll timing for transitions
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              // id scheme '<id>_hash' to prevent default browser scroll behavior
              el: `${to.hash}_hash`,
              top: 70
            })
          }, 500);
        });
      }
    } else if (savedPosition) {
      // if no anchor provided but postion is saved
      return savedPosition
    } else {
      // if none is provided
      return { top: 0, behavior: 'smooth' }
    }
  },
});

router.beforeEach((to, from, next) => {
  // Start the NProgress bar
  NProgress.start();

  next();
});

router.afterEach((to) => {
  // changing meta tags
  useSeoMeta({
    title: to.meta.title,
    description: to.meta.description
  });

  /**
   * TODO:: add analytics logic
  */

  // Finish the NProgress bar
  NProgress.done();
});
export default router;
