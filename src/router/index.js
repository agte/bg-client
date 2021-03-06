import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import MyGames from '../views/MyGames.vue';
import WaitingGames from '../views/WaitingGames.vue';

Vue.use(VueRouter);

const checkAccess = (to, from, next) => {
  if (!store.getters.authenticated) {
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
    path: '/my-games',
    name: 'MyGames',
    component: MyGames,
    beforeEnter: checkAccess,
  },
  {
    path: '/play/tic-tac-toe/:id',
    name: 'tic-tac-toe',
    component: () => import('../views/boards/TicTacToe.vue'),
    beforeEnter: checkAccess,
    meta: {
      type: 'gameplay',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
