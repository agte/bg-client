import client, { makeServicePlugin, BaseModel } from '../../feathers';

class GameKind extends BaseModel {
  // constructor(data, options) {
  //   super(data, options);
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'GameKind';

  // Define default properties here
  static instanceDefaults() {
    return {};
  }
}

const servicePath = 'gameKind';
const servicePlugin = makeServicePlugin({
  Model: GameKind,
  service: client.service(servicePath),
  servicePath,
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
