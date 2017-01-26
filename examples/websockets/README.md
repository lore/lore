# websockets

Example application to demonstrate how to configure and use one of the `lore-hook-websockets-*` hooks. Demonstrates 
usage with Sails, Socket.io and ActionCable.

The example is similar to the `dialogs-bootstrap` example, as the example is built around a "todo list" and still uses 
a REST API for CRUD operations, except that the application also subscribes to the WebSocket server and listens for 
events about create, update and delete operations performed by other users.

![lore_example_bootstrap_dialogs_1](https://cloud.githubusercontent.com/assets/2637399/17275569/8ec4bad8-56c1-11e6-8493-4c52a1ebdbaa.png)


## Usage: Express

To run the example, first install the dependencies:

```
npm install
```

Then install the dependencies for the Express server:

```
cd server-express
npm install
cd ..
```

Next, start the Express server, configured for use with Socket.io.

```
npm run server-express
```

Next, open up `index.js` and make sure the `lore-hook-websockets-express` hook is configured:

```js
lore.summon({
  hooks: {
    actions: require('lore-hook-actions'),
    ...
    redux: require('lore-hook-redux'),
    // websockets: require('lore-hook-websockets-sails')
    websockets: require('lore-hook-websockets-socketio')
    // websockets: require('lore-hook-websockets-actioncable')
  }
});
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.

## Usage: Sails

To run the example, first install the dependencies:

```
npm install
```

Then install the dependencies for the Sails server:

```
cd server-sails
npm install
cd ..
```

Next, start the Sails server.

```
npm run server-sails
```

Next, open up `index.js` and make sure the `lore-hook-websockets-sails` hook is configured:

```js
lore.summon({
  hooks: {
    actions: require('lore-hook-actions'),
    ...
    redux: require('lore-hook-redux'),
    websockets: require('lore-hook-websockets-sails')
    // websockets: require('lore-hook-websockets-socketio')
    // websockets: require('lore-hook-websockets-actioncable')
  }
});
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.

## Usage: Rails

> NOTE: The Rails example appears to be broken at the moment, need to debug : (

To run the example, first install the dependencies:

```
npm install
```

Then install the dependencies for the Rails server (you will need to have Ruby and Bundler installed):

```
cd server-sails
bundle install
cd ..
```

Next, start the Rails server.

```
npm run server-rails
```

Next, open up `index.js` and make sure the `lore-hook-websockets-actioncable` hook is configured:

```js
lore.summon({
  hooks: {
    actions: require('lore-hook-actions'),
    ...
    redux: require('lore-hook-redux'),
    // websockets: require('lore-hook-websockets-sails') // for example
    // websockets: require('lore-hook-websockets-socketio') // for example
    websockets: require('lore-hook-websockets-actioncable') // for example
  }
});
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.
