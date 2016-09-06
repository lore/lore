var _ = require('lodash');
var WebSocketConnection = require('lore-websockets').WebSocketConnection;
var io = require('socket.io-client');
var SailsIOClient = require('sails.io.js');

var SOCKET_VERBS = {
  CREATED: 'created',
  UPDATED: 'updated',
  DESTROYED: 'destroyed',
  ADDED_TO: 'addedTo'
};

module.exports = WebSocketConnection.extend({

  // serverUrl: '',

  // namespace: '',

  // event: '',

  initialize: function(dispatchers, actions) {
    this.io = SailsIOClient(io);
    this.io.sails.url = this.serverUrl;
  },

  url: function() {},

  connect: function() {
    var namespace = this.namespace;
    // we have to make a GET request to this endpoint before we're connected
    this.io.socket.get(namespace, function() {
      console.log(`Connected to ${namespace}`);
    });
  },

  subscribe: function() {
    this.io.socket.on(this.event, this.dispatch);
  },

  unsubscribe: function() {
    this.io.socket.off(this.event, this.dispatch);
  },

  parse: function(message) {
    if (message.verb === SOCKET_VERBS.CREATED) {
      return {
        verb: message.verb,
        data: message.data
      }
    } else if (message.verb === SOCKET_VERBS.UPDATED) {
      return {
        verb: message.verb,
        data: message.data
      }
    } else if (message.verb === SOCKET_VERBS.DESTROYED) {
      return {
        verb: message.verb,
        data: message.previous
      }
    } else if (message.verb === SOCKET_VERBS.ADDED_TO) {
      return {
        verb: message.verb,
        data: message.data
      }
    } else {
      return {
        verb: 'unknown_verb',
        data: message
      }
    }
  }

});
