import _ from 'lodash';

export default function getConnectionName(config, collectionName) {
  let connection = config.defaultConnection;
  const connectionModelMap = config.connectionModelMap;

  _.mapKeys(connectionModelMap, function(models, connectionName) {
    if (models.indexOf(collectionName) >= 0) {
      connection = connectionName;
    }
  });

  return connection;
}
