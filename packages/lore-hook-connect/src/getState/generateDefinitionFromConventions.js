/* eslint no-unused-vars: "off" */
/* eslint no-param-reassign: "off" */

import _ from 'lodash';

export default function generateDefinitionFromConventions(stateKey, reducerActionMap) {
  const tokens = stateKey.split('.');
  const modelName = tokens[0];
  const reducer = tokens[1];

  const map = _.transform(reducerActionMap, function(result, value, key) {
    const newKey = key.replace('*', modelName);
    result[newKey] = {
      action: value.action ? value.action.replace('*', modelName) : null,
      reducer: value.reducer ? value.reducer.replace('*', modelName) : null,
      blueprint: value.blueprint ? value.blueprint.replace('*', modelName) : null,
    };
  }, {});

  return map[stateKey];
}
