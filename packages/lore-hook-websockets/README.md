# lore-hook-websockets

> WARNING: This hook is the original v1 test implementation of websocket integration for Lore, and IS NOT intended to 
> be used in a project. If you want to use websockets, use one of the `lore-hook-websockets-*` hooks (for Rails, Sails 
> or Socket.io) or create your own hook using the `lore-websockets` library.

A [Lore](http://www.lorejs.org) hook that generates actions usable with the WebSockets implementation in [Sails](http://sailsjs.org).

This is the first implementation of this hook, and currently Sails is the reference implementation for the WebSockets interface. In the future it will be expanded to account for other implementations (such as ActionCable in Rails), with the goal of creating an interface that can be adapted to *any* (convention abiding) WebSocket implementation.

As a worst case scenario, if there ends up being no sensible common abstraction, there will need to be multiple hooks like `lore-hook-websockets-sails`, `lore-hook-websockets-rails`, etc.

## Usage
The steps below describe how to use this hook.

### Register the Hook
First, tell Lore you want the hook to be loaded by adding a reference to it in the `index.js` file at the root of your project:

```
Lore.summon({
  hooks: {
    websockets: require('lore-hook-websockets')
  }
});
```

### Install Packages
Next you'll need to install two packages:

```
npm install socket.io-client --save
npm install sails.io.js --save
```

### Create Initializer File
Next, create an `initializer` file that will configure the websocket connection when Lore boots up. You can call it whatever you want, but we'll call it `initializers/websockets.js` for this README. Because `sails.io.js` attempts to connect to the server as soon as it's created, we need to set the url for the websocket connection immediately after it's created (before it has a chance to connect). We also need to expose the `io` variable as a global for now, though in the future it will likely be attached to lore like `lore.websockets.io`.

```
// initializers/websockets.js
var SocketIOClient = require('socket.io-client');
var SailsIOClient = require('sails.io.js');

module.exports = function() {
  var io = SailsIOClient(SocketIOClient);
  io.sails.url = 'http://localhost:1337';
  window.io = io;
};
```

### Subscribe to Endpoints
Finally, you need to subscribe to the endpoints you want to listen to in your app. For that, create a `componentDidMount` method in `components/Master`, and subscribe to your endpoints:

```
// components/Master.js
  ...
  componentDidMount: function() {
    lore.websockets.posts.subscribe();
  },
  ...
```

For Sails, the call above (`lore.websockets.posts.subscribe()`) would make a GET call to `http://localhost:1337/posts`, which is how you subscribe to data in Sails by default.

### Authentication (optional)
If your server uses token based authentication, you will need to configure the `io` connection to use the appropriate headers. For this example, we'll set the header before we subscribe to any endpoints in our `Master` component.

```
// components/Master.
  ...
  componentDidMount: function() {
    io.sails.headers = {
      authorization: 'Bearer ' + localStorage.userToken
    };
    lore.websockets.posts.subscribe();
  },
  ...
```
