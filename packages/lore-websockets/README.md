# @lore/websockets

This library defines the interface for WebSockets used in Lore and has two main concepts; a `WebSocketConnection` class 
responsible for connected to the server and listening for events, and a set of `dispatchers` responsible for converting 
a websocket message into an action the Redux reducers understand what to do with.

### Dispatchers

Each `dispatcher` is a curry function that takes the redux store as the argument for the first function, and a 
websocket message as the argument for the second function. Here's an example dispatcher that converts a message 
about a new Post resource being created into an action understood by the Redux store:

``` js
// dispatchers/create.js
function (store) {
  return function (message) {
    var post = new Post(message.data);
    store.dispatch({
      type: ActionTypes.ADD_POST,
      payload: payload(post, PayloadStates.RESOLVED)
    });
  }
}
```
### Default Message Structure

While the interface can adapt to any type of message emitted by the server, it assumes a default structure with a 
`verb` field broadcasting the type of change (created, updated, or deleted) and a `data` field containing the data 
about that resource. Examples for each assumed default message type are below:

``` js
// for a resource that was just CREATED
{
  verb: 'created',
  data: {
    id: 1,
    title: 'Some New Post'
  }
}
```

``` js
// for a resource that was just UPDATED
{
  verb: 'updated',
  data: {
    id: 1,
    title: 'Some Updated Post'
  }
}
```

``` js
// for a resource that was just DESTROYED
{
  verb: 'destroyed',
  data: {
    id: 1,
    title: 'Some Updated Post'
  }
}
```
### WebSocketConnection class

Now that we've covered dispatchers and message structure, the last thing to cover for the interface is the process 
of connection to the server, listening for events, and then invoking the proper dispatcher to handle each event type.

The WebSocketConnection class looks like this:

``` js
var WebSocketConnection = function(dispatchers, actions, options) {
  this.dispatchers = dispatchers || {};
  this.actions = actions || {};
  this.options = options || {};
  _.bindAll(this, _.functionsIn(this));
  this.initialize.apply(this, arguments);
};

_.extend(WebSocketConnection.prototype, {

  serverUrl: '',

  initialize: function() {},

  connect: function() {},

  subscribe: function() {},

  unsubscribe: function() {},

  parse: function(message) {
    return message;
  },

  dispatch: function(message) {
    var parsedMessage = this.parse(message);
    var verb = parsedMessage.verb;
    var dispatcher = this.dispatchers[verb];

    if (dispatcher) {
      dispatcher(parsedMessage);
    }
  }

});
```

When creating a websocket connection, it expects a set of dispatchers as an argument, which is an object of key/value 
pairs where the key is the verb in the message (created, updated, etc.) and the value is the dispatcher function that
 has already been invoked with the store. So a set of dispatchers being provided would look like this:

``` js
var dispatchers = {
  created: createDispatcher(store) // returns a function that takes a message
}
```

The methods `initialize`, `connect`, `subscribe` and `unsubscribe` are left to be implemented by specific websocket 
implementations (such as those for Sails, Socket.io and ActionCable).

The two methods that have a default implementation are `parse` and `dispatch`.
#### parse: function(message)

Parse is a method that lets you transform the message from the server before a dispatcher converts it into an action. 
For example, let's say that when a resource was created your server emitted a message structure that looked like this:

``` js
{
  action: 'create',
  result: {
    id: 1,
    title: 'Some New Post'
  }
}
```

While you don't _have_ to convert the message to the default assumed structure, doing so allows you to take advantage 
of the default dispatchers and `dispatch` implementation (otherwise you need to provide a custom implementation). So 
if you wanted to convert the above structure to the assumed one, your parse method would look like this:

``` js
parse: function(message) {
  if(message.action === 'create') {
    return {
      verb: 'created',
      data: message.result
    }
  }
}
```
#### dispatch: function(message)

The Dispatch method is responsible for figuring out which dispatcher should handle the message, and then invoking 
that dispatcher. The default implementation looks like this:

``` js
dispatch: function(message) {
  var parsedMessage = this.parse(message);
  var verb = parsedMessage.verb;
  var dispatcher = this.dispatchers[verb];

  if (dispatcher) {
    dispatcher(parsedMessage);
  }
}
```

First the message is parsed, to make sure it has the expected structure. Then the verb is extracted, and (recalling 
that the dispatchers are a key/value pair where the key is the verb) the verb is used to see if a matching dispatcher 
exists. If one does, it's invoked with the message, and will then convert it to an action that gets dispatched to the 
Redux store.
