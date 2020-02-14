import Vue from 'vue';
import Vuex from 'vuex';

import client, { FeathersVuex } from '../feathers';

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
    userId: (state) => (state.auth.user ? state.auth.user.id : ''),
    authenticated: (state) => !!state.auth.user,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: {
      namespaced: true,
      actions: {
        register: (context, data) => client.service('user').create(data),
      },
    },
    gameplay: {
      namespaced: true,
      state: {
        viewsByGameId: {},
      },
      getters: {
        get(state) {
          return (id) => state.viewsByGameId[id];
        },
      },
      actions: {
        async load(context, id) {
          const storedViews = context.getters.get(id);
          if (storedViews) {
            return storedViews;
          }
          const views = await client.service(`game/${id}/state`).find();
          context.commit('addViews', { id, views });
          return context.getters.get(id);
        },
        async move(context, data) {
          const {
            game,
            player,
            action,
            params,
          } = data;
          await client.service(`game/${game}/state`).patch(null, { player, action, params });
        },
      },
      mutations: {
        addViews(state, { id, views }) {
          const viewMap = {};
          views.forEach(({ id: playerId, state: view }) => {
            viewMap[playerId] = view;
          });
          state.viewsByGameId = {
            ...state.viewsByGameId,
            [id]: viewMap,
          };
        },
        patchViews(state, { id, views: partialViews }) {
          const storedViewMap = state.viewsByGameId[id];
          if (!storedViewMap) {
            return;
          }
          partialViews.forEach(({ id: playerId, state: partialView }) => {
            const storedView = storedViewMap[playerId];
            if (!storedView) {
              return;
            }
            Object.assign(storedView, partialView); // apply diff
          });
        },
      },
    },
  },
  plugins: [
    ...services,
    (store) => {
      const service = client.service('game/:pid/state');

      service.on('ready', ({ pid, views }) => {
        store.commit('gameplay/addViews', { id: pid, views });
      });

      service.on('move', ({ pid, views }) => {
        store.commit('gameplay/patchViews', { id: pid, views });
      });
    },
  ],
});
