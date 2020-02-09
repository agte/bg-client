import client, { makeServicePlugin, BaseModel, errors } from '../../feathers';

const { NotFound, Forbidden } = errors;

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

  static setupInstance(data, { models }) {
    const kind = models.api.GameKind.store.getters['gameKind/get'](data.kind);
    return {
      ...data,
      kind,
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
    async getFast({ getters, dispatch }, id) {
      const cached = getters.get(id);
      if (cached) {
        return cached;
      }
      return dispatch('get', id);
    },

    async join({ rootGetters }, id) {
      if (!rootGetters.userId) {
        throw new Error('NotAuthenticated');
      }
      return client
        .service(`game/${id}/players`)
        .create({});
    },

    async launch(context, id) {
      return client
        .service(`game/${id}/status`)
        .update(null, { value: 'launched' });
    },

    async leave({ getters, rootGetters, dispatch }, id) {
      const { userId } = rootGetters;
      if (!userId) {
        throw new Error('NotAuthenticated');
      }

      let game = getters.get(id);
      if (!game) {
        game = await dispatch('get', id);
      }

      if (!game) {
        throw new NotFound();
      }

      const player = game.players.reverse().find((p) => p.user === userId);
      if (!player) {
        throw new Forbidden();
      }

      return client
        .service(`game/${id}/players`)
        .remove(player.id);
    },

    async startGathering(context, id) {
      return client
        .service(`game/${id}/status`)
        .update(null, { value: 'gathering' });
    },

    async stopGathering(context, id) {
      return client
        .service(`game/${id}/status`)
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
