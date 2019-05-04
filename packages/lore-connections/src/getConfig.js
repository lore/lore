/* eslint no-param-reassign: "off" */

import _ from 'lodash';

export function getConfig(configOverride) {
  const defaultConnectionData = {
    apiRoot: 'https://api.example.com',
    pluralize: true,
    casingStyle: 'camel',
    // endpoint: '',
    // headers: function() {}
  };

  const config = _.merge({
    default: {}
  }, configOverride);

  _.mapKeys(config, function(data, connectionName) {
    config[connectionName] = _.extend({}, defaultConnectionData, data);
  });

  return config;
}

export default getConfig;
