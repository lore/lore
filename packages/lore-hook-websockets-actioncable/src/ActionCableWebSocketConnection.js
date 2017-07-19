import { WebSocketConnection } from 'lore-websockets';
import ActionCable from 'actioncable';

export default WebSocketConnection.extend({

  // serverUrl: '',

  // channel: '',

  connect: function () {
    this.cable = ActionCable.createConsumer(this.serverUrl);
  },

  subscribe: function subscribe() {
    const channel = this.channel;
    const that = this;

    this.cable.subscriptions.create(channel, {
      connected: function () {
        console.log('ActionCable:WebSocket - connected!');
      },

      disconnected: function () {
        console.log('ActionCable:WebSocket - disconnected!');
      },

      received: function (data) {
        that.dispatch(data);
      }
    });
  }
});
