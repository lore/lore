var io = require('socket.io-client');
var WebSocketConnection = require('lore-websockets').WebSocketConnection;

module.exports = WebSocketConnection.extend({

  // serverUrl: '',

  // namespace: '',

  // event: '',

  connect: function() {
    var url = this.serverUrl + this.namespace;
    this.socket = io(url);
  },

  subscribe: function() {
    this.socket.on(this.event, this.dispatch);
  },

  unsubscribe: function() {
    this.socket.off(this.event, this.dispatch);
  }

});
