var _ = require('lodash');
var chalk = require('chalk');

var colors = {
  trace: chalk.cyan,
  debug: chalk.blue,
  log:   chalk.black,
  info:  chalk.green,
  warn:  chalk.yellow,
  error: chalk.red
};

var LogLevels = {
  TRACE: 1,
  DEBUG: 2,
  LOG:   3,
  INFO:  4,
  WARN:  5,
  ERROR: 6
};

var Logger = function(options) {
  var options = options || {};
  var logLevel = String(options.logLevel).toUpperCase();
  this.logLevel = LogLevels[logLevel] || LogLevels.INFO;
};

_.extend(Logger.prototype, {

  write: function(writer, label, message, logLevel) {
    if (logLevel < this.logLevel) {
      return;
    }
    message = message || '';
    writer('  ' + label + ' ' + message);
  },

  trace: function(message) {
    var label = colors.trace('trace:');
    this.write(console.log, label, message, LogLevels.TRACE);
  },

  debug: function(message) {
    var label = colors.debug('debug:');
    this.write(console.log, label, message, LogLevels.DEBUG);
  },

  log: function(message) {
    var label = colors.log('log:  ');
    this.write(console.log, label, message, LogLevels.LOG);
  },

  info: function(message) {
    var label = colors.info('info: ');
    this.write(console.info, label, message, LogLevels.INFO);
  },

  warn: function(message) {
    var label = colors.warn('warn: ');
    this.write(console.warn, label, message, LogLevels.WARN);
  },

  error: function(message) {
    var label = colors.error('error:');
    this.write(console.error, label, message, LogLevels.ERROR);
  }

});

module.exports = Logger;
