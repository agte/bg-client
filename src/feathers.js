import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import { iff, discard } from 'feathers-hooks-common';
import feathersVuex from 'feathers-vuex';
import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_API_URL, { transports: ['websocket'] });

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [
        iff(
          (context) => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp'),
        ),
      ],
    },
  });

export default feathersClient;

const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex,
} = feathersVuex(
  feathersClient,
  {
    serverAlias: 'api',
    idField: 'id',
    whitelist: ['$regex', '$options'],
  },
);

export {
  makeAuthPlugin,
  makeServicePlugin,
  BaseModel,
  models,
  FeathersVuex,
};
