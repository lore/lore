import _ from 'lodash';
import buildDictionary from 'webpack-requiredir';

/*
 * Import all files in /initializers and convert into a dictionary, where the key
 * is the name of the file
 */

const modules = buildDictionary(require.context(`${__LORE_ROOT__}/initializers`, false, /\.js$/));

/*
 * Get the initializers
 */

export function getInitializers(config) {
  return modules;
}

/*
 * Execute each initializer
 */

export function runInitializers(config, { initializers }) {
  return _.mapValues(initializers, function(initializer) {
    initializer(config);
  });
}
