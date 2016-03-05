var _ = require('lodash');

/**
 * Build a logger that works in both the browser and in Node (to support testing)
 * TODO: Replace this with a more capable logger that supports colors and logging levels
 *
 * @returns {Function} The logger to be used
 */
module.exports = function getLogger() {
  var logger = console.log.bind(console);

  // Add additional logging methods and bind them to console. If you don't, they
  // will throw "Illegal Invocation" errors.
  var additionalLoggingMethods = ['error', 'debug', 'verbose', 'silly', 'info'];
  additionalLoggingMethods.forEach(function(logMethod) {
    logger[logMethod] = (console[logMethod] || console.log).bind(console);
  });

  return logger;
};
