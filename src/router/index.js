import Vue from 'vue';
import VueRouter from 'vue-router';

// import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import WaitingGames from '../views/WaitingGames.vue';

Vue.use(VueRouter);

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
    path: '/gameKinds/:gameKind/games',
    name: 'WaitingGames',
    component: WaitingGames,
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
