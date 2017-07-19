import io from 'socket.io-client';
import { WebSocketConnection } from 'lore-websockets';

export default WebSocketConnection.extend({

  // serverUrl: '',

  // namespace: '',

  // event: '',

  connect: function() {
    const url = this.serverUrl + this.namespace;
    this.socket = io(url);
  },

  subscribe: function() {
    this.socket.on(this.event, this.dispatch);
  },

  unsubscribe: function() {
    this.socket.off(this.event, this.dispatch);
  }

});
