# lore-hook-websockets-sails

The Sails hook behaves identical to the SocketIo hook, except for the implementation. The big callout here is that 
you need to install both the `socket.io-client` _and_ the `sails.io.js` package (that takes the socket.io client as 
an argument). You also need to set the URL _immediately_ after creating this object, as it will try to call out to 
the server. Alternatively, you can set `io.sails.url.authConnect = false`. I'm still playing with this implementation 
a bit, but am leaning towards that solution (so that it doesn't make ANY server calls until you tell it to).

The other thing to point out is the `dispatch` implementation. For the most part Sails used a message structure 
consisting of `verb` and `data` fields, but sometimes replaces `data` with `previous` when it comes to updated and 
deleted data. So the parse method has been modified to convert everything into a verb/data structure.

``` js
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

  // serverUrl: 'http://localhost:1337',
  // namespace: '/posts',
  // event: 'post',

  initialize: function(dispatchers, actions) {
    this.io = SailsIOClient(io);
    this.io.sails.url = this.serverUrl;
  },

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
```
