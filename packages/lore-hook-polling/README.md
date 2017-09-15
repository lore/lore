# lore-hook-polling

### Purpose

A hook that implements polling behavior, providing the ability to invoke an action repeatedly at a given interval.

### Usage
First register the hook so that it gets loaded:

```js
lore.summon({
  hooks: {
    // ...
    polling: require('lore-hook-polling'),
    // ...
  }
});
```

This hook duplicates the `lore.actions` object but wraps each action with a function that allows it to be polled (it will call that action repeatedly at a specified interval). To illustrate usage, let's say you have a `Feed` component that fetches a list of tweets from the server. That component might look like this:

```js
module.exports = lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  };
})(
React.createClass({
  propTypes: {
    tweets: PropTypes.object.isRequired
  },

  render: function() {
    // .. render tweets
  }
})
```

Normally this component will fetch the list of tweets from the server once, and display what it gets back. This hook allows you to repeatedly fetch the list of tweets on a given interval. To use it, add a `componentDidMount` method to `Feed` that looks like this:

```js
...
  componentDidMount: function() {
    this.poll = lore.polling.tweet.find();
    this.poll.start();
  },
...
```

The `lore.polling.tweet.find` call mirrors the action structure. Invoking one of the "actions" returns a polling object. Calling `poll.start()` will start the process of invoking that action on specified interval (defaults to 5 seconds).

If you want to stop polling, you can call `poll.stop()`. For example, let's say the data you're fetching is only relevant (and visible) to this component. In that case, there's no point to continually polling for changes when the user isn't viewing this page. To address that use case, simply add a `componentWillUnmount` method that stops polling.

```jsx
...
  componentWillUnmount: function() {
    this.poll.stop();
  },
...
```

If your component needs data with query or pagination information, you can leverage the `query` attribute of the collection data to duplicate the action:

```js
module.exports = lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find')
  };
})(
React.createClass({
  propTypes: {
    tweets: PropTypes.object.isRequired
  },

  componentDidMount: function() {
    var tweets = this.props.tweets;
    var query = tweets.query;
    this.poll = lore.polling.tweet.find(query.where, query.pagination);
    this.poll.start();
  },

  componentWillUnmount: function() {
    this.poll.stop();
  },

  render: function() {
    // .. render tweets
  }
})
```

### Note
The hook generates a unique key internally for each action call that's a combination of the action name (e.g. `tweet.find`) and the arguments passed to that action (for example the `where` and `pagination` objects). It uses this key to make sure only one polling object exists per unique action call.

This means even if you call that same action repeatedly, like this:

```js
lore.polling.tweet.find().start()
lore.polling.tweet.find().start()
lore.polling.tweet.find().start()
```

Only one polling action will be created. Subsequent calls return the same polling object, and subsequent calls to `start()` are ignored because the polling object is already polling for data.

### Config
There are two config options exposed for this hook

```js
module.exports = {

   /**
    * The frequency at which the action should be invoked (in milliseconds)
    */

   // interval: 5000,

   /**
    * Determines whether the first request should be delayed when polling starts.
    * If 'true', poll.start() will wait for the specified interval before invoking
    * the action. It 'false', the action will be invoked immediately.
    */

   // delayOnStart: true

};
```

### Model Overrides
Additionally, these config values can be specified on per-model basis by adding a `polling` section to the model's config:

```js
// src/models/tweet.js
module.exports = {
  polling: {
    interval: 20000,
    delayOnStart: false
  }
};
```
