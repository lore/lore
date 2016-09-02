var _ = require('lodash');
var pluralize = require('pluralize');
var SailsWebSocketConnection = require('./SailsWebSocketConnection');
var blueprints = require('lore-websockets').blueprints;

// var buildDictionary = require('webpack-requiredir');
// var context = require.context(__LORE_ROOT__ + '/src/websockets', true, /\.js$/);
// var result = buildDictionary(context, {
//
// });

module.exports = {

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
    var models = lore.models;
    var store = lore.store;
    var config = lore.config.websockets;
    var websockets = {};

    Object.keys(models).forEach(function(modelName) {
      var Model = models[modelName];

      // establish conventions for the namespace and event to listen for
      var conventions = {
        namespace: config.pluralize ? `/${pluralize(modelName)}` : `/${modelName}`,
        event: modelName
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
      var CustomSailsWebSocketConnection = SailsWebSocketConnection.extend(_.extend(conventions, config));

      // create the websocket connection for the model
      websockets[modelName] = new CustomSailsWebSocketConnection(dispatchers, actions);
    });

    // Bind all actions to the store's dispatch method
    // lore.websockets = bindActionsToActionCreators(actions, store);
    lore.websockets = websockets;
  }
};
