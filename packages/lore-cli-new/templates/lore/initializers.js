import _ from 'lodash';

/*
 * Run each initializer
 */

export function runInitializers(config={}, modules={}) {
  const { initializers } = modules;

  return _.mapValues(initializers, function(initializer) {
    initializer(config);
  });
}
