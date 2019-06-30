/* eslint no-param-reassign: "off" */

import _ from 'lodash';
import loader from './loader';
import convertBlueprintsToActionCreators from './convertBlueprintsToActionCreators';
import getConfig from './getConfig';

export { ActionsContext } from './ActionsContext';
export { getConfig } from './getConfig';
export { useActions } from './useActions';

export const getActions = function(models, collections, configOverride, lore) {
  const result = {};
  const config = getConfig(configOverride);
  const blueprints = config.blueprints;
  let actions = loader.load();

  // todo: should actions be created for files in /collections
  // that have no corresponding model in /models Currently
  // this only creates 'find' actions for things in /models

  Object.keys(models).forEach(function(modelName) {
    result[modelName] = result[modelName] || {};
    _.assign(result[modelName], {
      create: blueprints.create(modelName, models, config, lore),
      destroy: blueprints.destroy(modelName, models, lore),
      get: blueprints.get(modelName, models, lore),
      find: blueprints.find(modelName, collections, lore),
      refetch: blueprints.refetch(modelName, collections, lore),
      update: blueprints.update(modelName, models, lore)
    });
  });

  // overwrite any blueprints with custom implementations
  actions = _.defaultsDeep({}, actions, result);

  // convert blueprints to action creators
  return convertBlueprintsToActionCreators(actions);
};
