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

var sailsIoClient = null;

module.exports = WebSocketConnection.extend({

  // serverUrl: '',

  // namespace: '',

  // event: '',

  initialize: function(dispatchers, actions) {
    // sails.io.js modifies the `io` instance passed in which prevents you from
    // creating multiple clients using the same `io` import (will throw an
    // error if you try).
    // Currently this also means you can only talk to a SINGLE WebSockets server
    if (!sailsIoClient) {
      sailsIoClient = SailsIOClient(io);
      sailsIoClient.sails.url = this.serverUrl;
    }
    this.io = sailsIoClient;
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
