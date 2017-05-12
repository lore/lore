# normalization

Example application to demonstrate normalization.

![lore example normalization](https://cloud.githubusercontent.com/assets/2637399/25986626/8725c2f8-36a5-11e7-8ac1-07d9d5b3886e.png)

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

When the application normally requests `tweets` from the API, it makes a network request for `localhost:1337/tweets` which produces a response that looks like this:

```js
{
  id: 1,
  userId: 1,
  text: "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
  createdAt: "2016-11-26T04:03:25.546Z"
}
```

Since this application needs information about the user, like the URL for their avatar, we then need to make an additional request to retrieve the user data. To reduce the number of network requests, we can instead pass a query parameter to `json-server` asking it to `expand` the `user` field and include the user resource in the response.

That network request looks like `localhost:1337/tweets?_expand=user` and the response looks like this:

```js
{
  id: 1,
  userId: 1,
  text: "Ayla fight while alive! Win and live. Lose and die. Rule of life. No change rule.",
  createdAt: "2016-11-26T04:03:25.546Z",
  user: {
    id: 1,
    nickname: "ayla",
    avatar: "https://cloud.githubusercontent.com/assets/2637399/19027069/a356e82a-88e1-11e6-87d8-e3e74f55c069.png"
  }
}
```

The first modification we need to perform to perform to get this response is to provide a `pagination` parameter to the `lore.connect` call in the `Feed` component, requesting that the API embed the `user` in all tweet responses.

```js
// src/components/Feed.js
lore.connect(function(getState, props){
  return {
    tweets: getState('tweet.find', {
      pagination: {
        _expand: 'user'
      }
    })
  }
})
```

Next, we need to tell Lore some API responses may contain data for the `user` embedded inside a `tweet`. To communicate this to the framework, we need to add an `attribute` to the `tweet` model and specifying the `type` of the `user` attribute as a `model`, where that model is going to be a `user`.

```js
// src/models/tweet.js
module.exports = {
  attributes: {
    user: {
      type: 'model',
      model: 'user'
    }
  }
};
```

Now, whenever we get `tweet` data from the API, Lore will inspect the response, and if the `user` field is an object, it will extract the data, convert it to a `user` model, and dispatch that action to Store.

The result of this behavior is that we can reduce the number of network requests the application makes. Without normalization, we would need to make 8 network requests to populate the Feed - one request to get the list of tweets (7 in total) and then 7 more requests to fetch the user for each tweet:

```
GET "http://localhost:1337/tweets"
GET "http://localhost:1337/users/1"
GET "http://localhost:1337/users/2"
GET "http://localhost:1337/users/3"
GET "http://localhost:1337/users/4"
GET "http://localhost:1337/users/5"
GET "http://localhost:1337/users/6"
GET "http://localhost:1337/users/7"
```

But WITH normalization, we only need to make one network request, and the framework understands how to break up the data and store it so that we won't need the follow up requests. Now we can populate the feed with just a single request:

```
GET "http://localhost:1337/tweets?_expand=user"
```

If you'd like to see the effect or normalization, you can disable it completely by opening `config/actions.js` and setting `normalize` to `false`:

```js
// config/actions.js
module.exports = {
  normalize: false
};
```
