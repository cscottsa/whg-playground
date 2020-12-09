import Vue from 'vue';
import Router from 'vue-router';

import { SiteName, TitleSeparator, RouterMode } from '@Config';

import Catalogue from '@View/Catalogue.vue';

Vue.use(Router);

const router = new Router({
  mode: RouterMode,
  routes: [
    { 
      path: '/',
      redirect: { path: '/top' }
    },
    {
      path: '/:category',
      name: 'Catalogue',
      component: Catalogue,
      meta: {
        title: 'White Hat Gaming',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + TitleSeparator + SiteName;
  next();
});

export default router;
