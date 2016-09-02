var _ = require('lodash');
var WebSocketConnection = require('lore-websockets').WebSocketConnection;
var ActionCable = require('actioncable');

module.exports = WebSocketConnection.extend({

  // serverUrl: '',

  // channel: '',

  connect: function () {
    this.cable = ActionCable.createConsumer(this.serverUrl);
  },

  subscribe: function subscribe() {
    var channel = this.channel;
    var that = this;

    this.cable.subscriptions.create(channel, {
      connected: function () {
        console.log('ActionCable:WebSocket - connected!')
      },

      disconnected: function () {
        console.log('ActionCable:WebSocket - disconnected!')
      },

      received: function (data) {
        that.dispatch(data);
      }
    });
  }
});
