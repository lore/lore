/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import pluralize from 'pluralize';
import { blueprints } from 'lore-websockets';
import SocketIoWebSocketConnection from './SocketIoWebSocketConnection';

// import buildDictionary from 'webpack-requiredir';
// const context = require.context(__LORE_ROOT__ + '/src/websockets', true, /\.js$/);
// const result = buildDictionary(context, {
//
// });

export default {

  dependencies: ['models', 'redux'],

  defaults: {
    websockets: {
      serverUrl: 'https://websockets.example.com',
      // namespace: '',
      // event: '',
      pluralize: true
    }
  },

  load: function(lore) {
    const models = lore.models;
    const store = lore.store;
    const config = lore.config.websockets;
    const websockets = {};

    Object.keys(models).forEach(function(modelName) {
      const Model = models[modelName];

      // establish conventions for the namespace and event to listen for
      const conventions = {
        namespace: config.pluralize ? `/${pluralize(modelName)}` : `/${modelName}`,
        event: modelName
      };

      // create the default dispatchers from blueprints
      const dispatchers = {
        created: blueprints.dispatchers.created(modelName, Model)(store),
        updated: blueprints.dispatchers.updated(modelName, Model)(store),
        destroyed: blueprints.dispatchers.destroyed(modelName, Model)(store)
      };

      // there are currently no actions provided by default
      const actions = {};

      // override the defaults with an user provided configuration
      const CustomSocketIoWebSocketConnection = SocketIoWebSocketConnection.extend(
        _.extend(conventions, config)
      );

      // create the websocket connection for the model
      websockets[modelName] = new CustomSocketIoWebSocketConnection(dispatchers, actions);
    });

    // Bind all actions to the store's dispatch method
    // lore.websockets = bindActionsToActionCreators(actions, store);
    lore.websockets = websockets;
  }
};
