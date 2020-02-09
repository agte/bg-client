import client, { makeServicePlugin, BaseModel } from '../../feathers';

class Game extends BaseModel {
  // constructor(data, options) {
  //   super(data, options);
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Game';

  // Define default properties here
  static instanceDefaults() {
    return {
      kind: '',
    };
  }
}

const servicePath = 'game';
const servicePlugin = makeServicePlugin({
  Model: Game,
  service: client.service(servicePath),
  servicePath,
  idField: 'id',
  getters: {
  },
  actions: {
    async join({ rootGetters }, { game }) {
      if (!rootGetters.userId) {
        throw new Error('NotAuthenticated');
      }
      return client
        .service(`game/${game.id}/players`)
        .create({});
    },

    async launch(context, { game }) {
      return client
        .service(`game/${game.id}/status`)
        .update(null, { value: 'launched' });
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

      return client
        .service(`game/${game.id}/players`)
        .remove(player.id);
    },

    async startGathering(context, { game }) {
      return client
        .service(`game/${game.id}/status`)
        .update(null, { value: 'gathering' });
    },

    async stopGathering(context, { game }) {
      return client
        .service(`game/${game.id}/status`)
        .update(null, { value: 'draft' });
    },
  },
});

// Setup the client-side Feathers hooks.
client.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

export default servicePlugin;
