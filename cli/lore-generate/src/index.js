var generate = require('./generate');
var path = require('path');

module.exports = function(scope) {
  scope = scope || {};

  if (!scope.generator) {
    throw new Error('Sorry, `scope.generator` must be defined.');
  }

  return generate(scope.generator, scope);
};
