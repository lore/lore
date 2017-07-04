import WebSocketConnection from './WebSocketConnection';
import created from './blueprints/dispatchers/created';
import updated from './blueprints/dispatchers/updated';
import destroyed from './blueprints/dispatchers/destroyed';

const blueprints = {
  dispatchers: {
    created,
    updated,
    destroyed
  }
};

export {
  blueprints,
  WebSocketConnection
};
