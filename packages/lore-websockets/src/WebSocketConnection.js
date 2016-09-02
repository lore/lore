var _ = require('lodash');
var extend = require('./utils/extend');

var WebSocketConnection = function(dispatchers, actions, options) {
  this.dispatchers = dispatchers || {};
  this.actions = actions || {};
  this.options = options || {};
  _.bindAll(this, _.functionsIn(this));
  this.initialize.apply(this, arguments);
};

_.extend(WebSocketConnection.prototype, {

  serverUrl: '',

  initialize: function() {},

  connect: function() {},

  subscribe: function() {},

  unsubscribe: function() {},

  parse: function(message) {
    return message;
  },

  dispatch: function(message) {
    var parsedMessage = this.parse(message);
    var verb = parsedMessage.verb;
    var dispatcher = this.dispatchers[verb];

    if (dispatcher) {
      dispatcher(parsedMessage);
    }
  }

});

WebSocketConnection.extend = extend;

module.exports = WebSocketConnection;
