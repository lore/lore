# lore-hook-websockets-actioncable

The ActionCable hook behaves identical to the SocketIO hook, except for the implementation. The big callout here is the 
interface that ActionCable uses, which is a bit different than the other two implementations.

Instead of using `namespaces`, ActionCable uses `channels`. I _think_ they're equivalent, but not sure. Meaning 
Socket.io breaks data up into namespaces & rooms, but ActionCable seems to only use one of those (?). I played with 
it only enough to get this to work and see if the interface could adapt to something not based in Node : )

``` js
var _ = require('lodash');
var WebSocketConnection = require('lore-websockets').WebSocketConnection;
var ActionCable = require('actioncable');

module.exports = WebSocketConnection.extend({

  // serverUrl: 'http://localhost:1337/cable',
  // channel: 'PostsChannel',

  connect: function () {
    this.cable = ActionCable.createConsumer(this.serverUrl);
  },

  subscribe: function subscribe() {
    var that = this;

    this.cable.subscriptions.create(this.channel, {
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
```

# Usage

To use any of these hooks, you need to do four things:

1. Install it
2. Tell Lore about it
3. Create a configuration file for it
4. Connect and subscribe to your data

### Install the Desired Hook

If you have a Sails backend for example, then you'll need to run:

`npm install lore-hook-websockets-sails --save`

### Tell Lore about the Hook
To notify Lore about the hook (so it loads it during the build process) modify the `lore.summon` method call in 
your `index.js` file at the root of the project to look like this:

```
lore.summon({
  hooks: {
    websockets: require('lore-hook-websockets-sails')
  }
});
```

### Create the WebSockets Config File
Lastly, you need to create a file called `websockets.js` in your `/config` folder that looks like this (replacing 
the serverUrl with the real location of your server):

``` js
// config/websockets.js

module.exports = {
  serverUrl: 'http://localhost:1337'
}
```

### Connect and Subscribe

Each of these hooks create dispatchers for handling messages about created, updated or deleted resources. So if you
have models for `post` and `comment`, you'll have corresponding `connect()` and `subscribe()` methods user 
`lore.websockets.post` and `lore.websockets.comment`. Just invoke those methods in your `src/components/Master.js` 
component and you should start seeing data appear.

# Needed Improvements

Overall I think this is a decent first/second pass (first at a generic implementation), but there's a few things that 
need to be added before it's "complete":

1. The example(s) need to be updated to visually display the websocket status, such as when it's connected,
disconnected, and reconnecting. This is important as it's fairly standard these days to display connection issues to 
the user (and a good user experience overall). That will also provide a good test of the expressiveness of the 
interface and it's ability to integrate into an app with more real-world type concerns.

2. Combining optimistic updates with websockets requires sending a client-generated ID to the server to allow 
linking the optimistic data to the real data when it comes back. Lore supports that (and it's tested in a non-example 
app), but the configuration isn't exposed in this PR. There needs to be an option to a) send the cid to the server, b) 
control the name of the cid field that's sent (so it doesn't have to be called cid), c) make it optional to send that 
field, and d) change the generator for that field, so it could be a UUID instead of something like `c1`. Right now that 
behavior can be obtained by overriding actions, but it would be good to have it supported as a built-in feature.

3. The cascading overrides that are standard for other lore configuration is not yet implemented in the hooks. Meaning,
the behavior should be something like:
   - Start with default hook configuration
   - Override with conventions
   - Override with values in config/websockets.js
   - Override with model-specific values in models/post.js (or whatever model is called)

4. Allow the user to add custom dispatchers and actions by creating a `websockets` folder and places files inside. For
 example, `src/websockets/post/dispatchers/created.js` would be a custom implementation to override the default 
 `created` dispatcher. Actions could also be created by placing them inside `src/websockets/post/actions/create.js` 
 if you also wanted to perform CRUD actions through the websocket connection (something the hooks might support, but 
 not yet). Aside from overriding the defaults, you could also place custom dispatchers and actions there that the 
 blueprints wouldn't provide by default.
