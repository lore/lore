var _ = require('lodash');

var defaultConnectionData = {
  apiRoot: 'https://api.example.com',
  pluralize: true,
  casingStyle: 'camel',
  // headers: function() {},
  models: {},
  collections: {}
};

module.exports = {

  dependencies: [],

  defaults: {
    connections: {
      default: _.extend({}, defaultConnectionData)
    }
  },

  load: function(lore) {
    var config = lore.config.connections;
    lore.connections = {};

    _.mapKeys(config, function(data, connectionName) {
      lore.connections[connectionName] = _.extend({}, defaultConnectionData, data);
    });
  }

};
