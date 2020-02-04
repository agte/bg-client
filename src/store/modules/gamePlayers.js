import feathersClient from '../../feathers';

export default {
  namespaced: true,
  state: {},
  actions: {
    async join({ rootGetters, rootState }, { game }) {
      console.log(rootState);
      if (!rootGetters.userId) {
        throw new Error('NotAuthenticated');
      }
      return feathersClient.service(`game/${game.id}/players`).create({});
    },

    async leave({ rootGetters }, { game }) {
      const { userId } = rootGetters;
      if (!userId) {
        throw new Error('NotAuthenticated');
      }

      const player = game.players.find((p) => p.user === userId);
      if (!player) {
        throw new Error('Forbidden');
      }

      return feathersClient.service(`game/${game.id}/players`).remove(player.id);
    },
  },
};
