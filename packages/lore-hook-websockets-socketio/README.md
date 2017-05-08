# lore-hook-websockets-socketio

This hook does two things:

1. It provides an implementation of the above interface that can be used with socket.io
2. Provides a set of methods and dispatchers that can be used by default with any model in the application (using some 
overridable conventions)

### Implementation

Implementing support for socket.io is fairly straight forward. The implementation just needs to know the `serverUrl` 
(which is the root URL for the socket.io server), the `namespace` (if your server uses one) and the `event` that will 
be emitted when CRUD operations occur for the desired resource.

``` js
var io = require('socket.io-client');
var WebSocketConnection = require('lore-websockets').WebSocketConnection;

module.exports = WebSocketConnection.extend({

  // These three values are provided by the project configuration or conventions
  serverUrl: 'http://localhost:1337',
  namespace: '/posts',
  event: 'post',

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
```
### Default Methods and Dispatchers

The code below illustrates the general setup process used when the hook creates the WebSocket instance:

``` js
// these "guess" the namespace and event based on conventions
// can be provided explicitly by the user
var conventions = {
  namespace: config.pluralize ? `/${pluralize(modelName)}` : `/${modelName}`,
  event: modelName
};

// these three dispatchers are provided by default to update the Redux store
// based on data that was created, updated or deleted by other users.
var dispatchers = {
  created: blueprints.dispatchers.created(modelName, Model)(store),
  updated: blueprints.dispatchers.updated(modelName, Model)(store),
  destroyed: blueprints.dispatchers.destroyed(modelName, Model)(store)
};


// override the SocketIo WebSocketConnection with conventions and configuration
var CustomWebSocketConnection = SocketIoWebSocketConnection.extend(_.extend(conventions, config));

// make the connection accessible under lore.websockets, i.e. lore.websockets.post for example.
lore.websockets[modelName] = new CustomSocketIoWebSocketConnection(dispatchers);
```

If you want to listen for events during the entire lifecycle of your application, a good place to connect and listen 
for data is within the `componentDidMount` method of the `Master` component, like so:

``` js
// src/components/Master.js
React.createClass({
  componentDidMount: function() {
    lore.websockets.post.connect();
    lore.websockets.post.subscribe();
  },

  componentWillUnmount: function() {
    lore.websockets.post.unsubscribe();
  }
})
```

Calling `lore.websockets.post.connect()` will cause the websocket instance to connect with the server. Calling 
`lore.websockets.post.subscribe()` will cause it to listen for the event it was configured for, such as events 
called `post` that contain data about Post resources that have been created, updated or deleted by other users.
