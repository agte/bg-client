import io from 'socket.io-client';
import feathers from '@feathersjs/client';

import { iff, discard } from 'feathers-hooks-common';
// import feathersVuex from 'feathers-vuex';

const socket = io(process.env.VUE_APP_API_URL, { transports: ['websocket'] });
const client = feathers();

client.configure(feathers.socketio(socket));
client.configure(feathers.authentication({ storage: window.localStorage }));
client.hooks({
  before: {
    all: [
      iff(
        context => ['create', 'update', 'patch'].includes(context.method),
        discard('__id', '__isTemp'),
      ),
    ],
  },
});

export default client;

// const {
//   makeServicePlugin,
//   makeAuthPlugin,
//   BaseModel,
//   models,
//   FeathersVuex,
// } = feathersVuex(
//   client,
//   {
//     serverAlias: 'api',
//     idField: 'id',
//     whitelist: ['$regex', '$options'],
//   },
// );

// export {
//   makeAuthPlugin,
//   makeServicePlugin,
//   BaseModel,
//   models,
//   FeathersVuex,
// };
