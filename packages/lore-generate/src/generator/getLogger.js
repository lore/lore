/**
 * A sad hack to forceably write info-level and above messages to the
 * console by setting default environment variables, but being careful
 * not to override real ones.
 */

// This __has__ to be required __after__ environment variables are set
// var debug = require('debug-logger');

module.exports = function getLogger() {
  var env = process.env;

  // if DEBUG hasn't been set, enable logging for all namespaces
  if (env.DEBUG === void 0) {
    env.DEBUG = '*';
  }

  // if a log level hasn't been set, set it to "info"
  if (env.DEBUG_LEVEL === void 0) {
    env.DEBUG_LEVEL = 3;
  }

  var debug = require('debug-logger');
  var logger = debug('lore');

  return logger;
};
