/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import pluralize from 'pluralize';
import { blueprints } from 'lore-websockets';
import ActionCableWebSocketConnection from './ActionCableWebSocketConnection';

function getChannelName(modelName, config) {
  const capitalizedModelName = _.capitalize(modelName);

  if (config.pluralize) {
    return `${pluralize(capitalizedModelName)}Channel`;
  }

  return `${capitalizedModelName}Channel`;
}

export default {

  dependencies: ['models', 'redux'],

  defaults: {
    websockets: {
      serverUrl: 'https://websockets.example.com',
      // channel: '',
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
        channel: getChannelName(modelName, config)
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
      const CustomActionCableWebSocketConnection = ActionCableWebSocketConnection.extend(
        _.extend(conventions, config)
      );

      // create the websocket connection for the model
      websockets[modelName] = new CustomActionCableWebSocketConnection(dispatchers, actions);
    });

    // Bind all actions to the store's dispatch method
    // lore.websockets = bindActionsToActionCreators(actions, store);
    lore.websockets = websockets;
  }
};
