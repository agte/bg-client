import Vue from 'vue';
import client from '../../feathers';

export default (store) => {
  store.registerModule('gameplay', {
    namespaced: true,

    state: {
      viewMapsByGame: {},
      invitationDialog: {
        game: null,
        opened: false,
      },
    },

    getters: {
      get: (state) => (id) => state.viewMapsByGame[id],
      invitationDialog: (state) => state.invitationDialog,
    },

    actions: {
      load: async ({ commit, getters }, id) => {
        if (!getters.get(id)) {
          const views = await client.service(`game/${id}/state`).find();
          commit('addViews', { id, views });
        }
        return getters.get(id);
      },

      move: async (context, data) => {
        const {
          id,
          player,
          action,
          params,
        } = data;
        return client.service(`game/${id}/state`).patch(null, { player, action, params });
      },

      openInvitationDialog: async ({ commit, dispatch }, id) => {
        const game = await dispatch('game/getFast', id, { root: true });
        if (!game) return;
        commit('openInvitationDialog', game);
      },

      closeInvitationDialog: ({ commit }) => commit('closeInvitationDialog'),
    },

    mutations: {
      addViews: (state, { id, views }) => {
        const viewMap = {};
        views.forEach(({ id: playerId, data }) => { viewMap[playerId] = data; });
        Vue.set(state.viewMapsByGame, id, viewMap);
      },

      patchViews: (state, { id, views: partialViews }) => {
        const storedViewMap = state.viewMapsByGame[id];
        if (!storedViewMap) return;

        partialViews.forEach(({ id: playerId, data }) => {
          const storedView = storedViewMap[playerId];
          if (!storedView) return;
          Object.assign(storedView, data); // apply diff
        });
      },

      openInvitationDialog: (state, game) => {
        state.invitationDialog.game = game;
        state.invitationDialog.opened = true;
      },

      closeInvitationDialog: (state) => {
        state.invitationDialog.opened = false;
        state.invitationDialog.game = null;
      },
    },
  });

  const service = client.service('game/:pid/state');

  service.on('ready', async ({ pid, views }) => {
    store.commit('gameplay/addViews', { id: pid, views });
    store.dispatch('gameplay/openInvitationDialog', pid);
  });

  service.on('move', ({ pid, views }) => {
    store.commit('gameplay/patchViews', { id: pid, views });
  });
};
