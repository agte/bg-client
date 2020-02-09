import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import WaitingGames from '../views/WaitingGames.vue';

Vue.use(VueRouter);

const checkAccess = (to, from, next) => {
  if (!store.getters.userId) {
    next({
      name: 'Login',
      query: { redirectFrom: to.fullPath },
    });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/gameKind/:gameKind/games',
    name: 'WaitingGames',
    component: WaitingGames,
    beforeEnter: checkAccess,
  },
  {
    path: '/launched-games',
    name: 'LaunchedGames',
    component: () => import('../views/LaunchedGames.vue'),
  },
  {
    path: '/my-games',
    name: 'MyGames',
    component: () => import('../views/MyGames.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
