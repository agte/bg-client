import Vue from 'vue';
import VueRouter from 'vue-router';

// import store from '../store';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

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
    component() {
      return import('../views/Register.vue');
    },
  },
  // {
  //   path: '/games',
  //   name: 'Games',
  //   component: Games,
  //   beforeEnter: (to, from, next) => {
  //     if (!store.state.auth.user) {
  //       next({ name: 'Login' });
  //     } else {
  //       next();
  //     }
  //   },
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
