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
        byGameId: {},
      },
      getters: {
        get(state) {
          return (id) => state.byGameId[id];
        },
      },
      actions: {
        async load(context, id) {
          const views = await client.service(`game/${id}/state`).find();
          context.commit('add', { id, views });
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
        add(state, { id, views }) {
          const viewMap = {};
          views.forEach(({ id: playerId, state: view }) => {
            viewMap[playerId] = view;
          });
          state.byGameId = {
            ...state.byGameId,
            [id]: viewMap,
          };
        },
        applyDiff(state, { id, player, diff }) {
          const views = state.byGameId[id];
          if (!views) {
            return;
          }
          const view = views[player];
          if (!view) {
            return;
          }
          Object.assign(view, diff);
        },
      },
    },
  },
  plugins: [
    ...services,
    (store) => {
      client.service('game/:pid/state').on('move', ({ id, pid, diff }) => {
        store.commit('gameplay/applyDiff', {
          id: pid,
          player: id,
          diff,
        });
      });
    },
  ],
});
