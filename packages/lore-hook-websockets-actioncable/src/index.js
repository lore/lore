var _ = require('lodash');
var pluralize = require('pluralize');
var ActionCableWebSocketConnection = require('./ActionCableWebSocketConnection');
var blueprints = require('lore-websockets').blueprints;

function getChannelName(modelName, config) {
  var capitalizedModelName = _.capitalize(modelName);

  if (config.pluralize) {
    return `${pluralize(capitalizedModelName)}Channel`;
  }

  return `${capitalizedModelName}Channel`;
}

module.exports = {

  dependencies: ['models', 'redux'],

  defaults: {
    websockets: {
      serverUrl: 'https://websockets.example.com',
      // channel: '',
      pluralize: true
    }
  },

  load: function(lore) {
    var models = lore.models;
    var store = lore.store;
    var config = lore.config.websockets;
    var websockets = {};

    Object.keys(models).forEach(function(modelName) {
      var Model = models[modelName];

      // establish conventions for the namespace and event to listen for
      var conventions = {
        channel: getChannelName(modelName, config)
      };

      // create the default dispatchers from blueprints
      var dispatchers = {
        created: blueprints.dispatchers.created(modelName, Model)(store),
        updated: blueprints.dispatchers.updated(modelName, Model)(store),
        destroyed: blueprints.dispatchers.destroyed(modelName, Model)(store)
      };

      // there are currently no actions provided by default
      var actions = {};

      // override the defaults with an user provided configuration
      var CustomActionCableWebSocketConnection = ActionCableWebSocketConnection.extend(_.extend(conventions, config));

      // create the websocket connection for the model
      websockets[modelName] = new CustomActionCableWebSocketConnection(dispatchers, actions);
    });

    // Bind all actions to the store's dispatch method
    // lore.websockets = bindActionsToActionCreators(actions, store);
    lore.websockets = websockets;
  }
};
