import Vue from 'vue';
import Vuex from 'vuex';

import { FeathersVuex } from '../feathers';

Vue.use(Vuex);
Vue.use(FeathersVuex);

const requireModule = require.context(
  './services', // The path where the service modules live
  false, // Whether to look in subfolders
  /.js$/, // Only include .js files (prevents duplicate imports`)
);
const services = requireModule
  .keys()
  .map((modulePath) => requireModule(modulePath).default);

export default new Vuex.Store({
  state: {
  },
  getters: {
    userId: (state) => (state.auth && state.auth.user && state.auth.user.id ? state.auth.user.id : ''),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  plugins: services,
});
