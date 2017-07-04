/* eslint no-param-reassign: "off" */

import _ from 'lodash';

const defaultConnectionData = {
  apiRoot: 'https://api.example.com',
  pluralize: true,
  casingStyle: 'camel',
  // headers: function() {},
  models: {},
  collections: {}
};

export default {

  dependencies: [],

  defaults: {
    connections: {
      default: _.extend({}, defaultConnectionData)
    }
  },

  load: function(lore) {
    const config = lore.config.connections;
    lore.connections = {};

    _.mapKeys(config, function(data, connectionName) {
      lore.connections[connectionName] = _.extend({}, defaultConnectionData, data);
    });
  }

};
