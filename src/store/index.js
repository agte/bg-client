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
  mutations: {
  },
  actions: {
  },
  plugins: services,
});
