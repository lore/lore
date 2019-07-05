/* eslint prefer-rest-params: "off" */
/* eslint prefer-spread: "off" */

import _ from 'lodash';
import extend from './utils/extend';

const WebSocketConnection = function(dispatchers, actions, options) {
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
    const parsedMessage = this.parse(message);
    const verb = parsedMessage.verb;
    const dispatcher = this.dispatchers[verb];

    if (dispatcher) {
      dispatcher(parsedMessage);
    }
  }

});

WebSocketConnection.extend = extend;

export default WebSocketConnection;
