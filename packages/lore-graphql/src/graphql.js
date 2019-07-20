import _ from 'lodash';
import { createMutation, destroyMutation, updateMutation, findQuery, getQuery } from './index';

/*
 * Generate a Query for each module definition
 */

export function getQueries(config={}, modules={}) {
  const {
    graphql: {
      queries,
      fragments
    }
  }  = config;

  return _.mapValues(modules.models, function(module, moduleName) {
    const modelName = moduleName;

    return _.merge({
      find: findQuery(modelName, fragments),
      get: getQuery(modelName, fragments)
    }, queries[modelName]);
  });
}

/*
 * Generate a Mutation for each module definition
 */

export function getMutations(config={}, modules={}) {
  const {
    graphql: {
      mutations,
      fragments
    }
  }  = config;

  return _.mapValues(modules.models, function(module, moduleName) {
    const modelName = moduleName;

    return _.merge({
      create: createMutation(modelName, fragments),
      destroy: destroyMutation(modelName, fragments),
      update: updateMutation(modelName, fragments)
    }, mutations[modelName]);
  });
}
