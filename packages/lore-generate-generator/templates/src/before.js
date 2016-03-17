var Promise = require('bluebird');

module.exports = function(scope) {
  return Promise.resolve().then(function() {
    // put logic here that should occur before the generator executes
  });
};
