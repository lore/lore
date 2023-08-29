import _ from 'lodash';

export function getConnectionName(modelName, options) {
  const {
    connectionMap,
    defaultConnection
  } = options;

  let connection = defaultConnection;

  _.mapKeys(connectionMap, function(models, connectionName) {
    if (models.indexOf(modelName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}

export default getConnectionName;
