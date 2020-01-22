import client, { makeServicePlugin, BaseModel } from '../../feathers';

class User extends BaseModel {
  // constructor(data, options) {
  //   super(data, options);
  // }

  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'User';

  // Define default properties here
  static instanceDefaults() {
    return {};
  }
}

const servicePath = 'user';
const servicePlugin = makeServicePlugin({
  Model: User,
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
