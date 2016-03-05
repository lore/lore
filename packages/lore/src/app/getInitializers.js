var _ = require('lodash');
var initializerLoader = require('../loaders/initializers');

/**
 * Obtain the set of initializers that should be executed.
 *
 * @returns {Object} Set of initializers that should be loaded and executed.
 */
module.exports = function getInitializers() {
  return initializerLoader.load();
};
