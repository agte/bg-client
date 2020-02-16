import client, { makeServicePlugin, BaseModel, errors } from '../../feathers';

const { NotAuthenticated, NotFound } = errors;

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

  static setupInstance(data, { store, models }) {
    const {
      kind,
      maxPlayers,
      minPlayers,
      owner,
      players,
      status,
    } = data;
    const { userId } = store.getters;

    // Game kind properties
    const kindInstance = models.api.GameKind.getFromStore(kind);
    const name = kindInstance ? kindInstance.name : 'Неизвестно';

    // User permissions
    const isOwner = owner === userId;
    const isMember = players.some((player) => player.user === userId);

    const gatheringStatus = status === 'gathering';
    const draftStatus = status === 'draft';
    const canJoin = (gatheringStatus || (draftStatus && isOwner)) && (players.length < maxPlayers);
    const canLeave = isMember && (gatheringStatus || (draftStatus && isOwner));
    const canRun = isOwner && gatheringStatus && (players.length >= minPlayers);
    const canPlay = isMember && (status === 'running');

    return {
      ...data,
      name,
      user: {
        isOwner,
        isMember,
        canJoin,
        canLeave,
        canRun,
        canPlay,
      },
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
    createFast: async ({ dispatch }, { kind }) => {
      const game = await dispatch('create', { kind });
      await dispatch('join', game.id);
      await client.service(`game/${game.id}/status`).update(null, { value: 'gathering' });
    },

    getFast: async ({ getters, dispatch }, id) => getters.get(id) || dispatch('get', id),

    join: async (context, id) => client.service(`game/${id}/players`).create({}),

    leave: async ({ getters, rootGetters, dispatch }, id) => {
      const { userId } = rootGetters;
      if (!userId) throw new NotAuthenticated();

      const game = getters.get(id) || await dispatch('get', id);
      if (!game) throw new NotFound();

      const player = game.players.reverse().find((p) => p.user === userId);
      if (!player) throw new NotFound();
      const lastMember = game.players.length === 1;

      await client.service(`game/${id}/players`).remove(player.id);
      if (lastMember) {
        await client.service(`game/${game.id}/status`).update(null, { value: 'draft' });
        await dispatch('remove', game.id);
      }
    },

    run: async (context, id) => client.service(`game/${id}/status`).update(null, { value: 'running' }),
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
