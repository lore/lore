var _ = require('lodash');
var initializerLoader = require('../loaders/initializers');
var Hook = require('../Hook');

module.exports = function getInitializers() {
  return initializerLoader.load();
};
