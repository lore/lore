# polling

Example application to demonstrate use of polling.

![lore example polling](https://cloud.githubusercontent.com/assets/2637399/23101096/1eec92e8-f64a-11e6-930b-bde38117fbd4.png)

## Usage

This example uses [json-server](https://github.com/typicode/json-server) to provide an API for the example. All data
is stored persistently in the `db.json` file at the root of the project.

To start the API server, run this command:

```
npm run server
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.

For this example, it is recommended to open two browser tabs so you can see changes sync across browsers.

> NOTE: while you _can_ delete tweets, you'll notice they don't sync across browsers. Lore's default behavior is to
> merge data, not replace it. In this example, the new collection is merged into the old collection, which is why
> new tweets appear, and changes to tweets are reflected. But deleted tweets don't disappear because Lore would have 
> to interpret the absence of data as a "delete" action.
>
> This may not be expected behavior. If you want to see different behavior, please file an issue for discussion.


## Notes

This example is a modified version of the Quickstart, using the code from the end of the Dialogs section.

The first modification is installing the `lore-hook-polling` hook, and adding it to the list of hooks in `index.js`.

```js
// index.js
lore.summon({
  hooks: {
    // ...
    models: require('lore-hook-models'),
    polling: require('packages/lore-hook-polling'),
    reducers: require('lore-hook-reducers'),
    // ...
  }
});
```

Next, the `Feed` component is configured to begin polling when the component is mounted, and to stop polling when 
the component is unmounted.

```jsx
// src/components/Feed.js
...

  componentDidMount: function() {
    this.poll = lore.polling.tweet.find();
    this.poll.start();
  },

  componentWillUnmount: function() {
    this.poll.stop();
  },

...
```

In this example, we aren't querying the server for anything, so we don't pass any arguments to the action call. But
if you needed to, the recommended way to accomplish that is by extract the arguments from the `query` attribute of
the collection data passed to `Feed` like this:

```jsx
// src/components/Feed.js
...

  componentDidMount: function() {
    var tweets = this.props.tweets;
    var query = tweets.query;
    this.poll = lore.polling.tweet.find(query.where, query.pagination);
    this.poll.start();
  },

  componentWillUnmount: function() {
    this.poll.stop();
  },

...
```
