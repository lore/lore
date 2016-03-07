# Creating a Model

One of Lore's goals is to reduce the boilerplate associated with creating React/Redux applications. Models are how this
is done. Once a model is created, a whole host of actions and reducers are automatically available, based on conventions
that use the model's name.

Let's create a model to illustrate. From the root of your project, run this command:

```sh
$ lore generate-model Color
```

You should see output similar to this:

```sh
Generating 'lore-generate-model' at /Users/jchansen/lore-example-app...
Generator finished successfully.
|-> Generated file: ./src/models/color.js
```

This command created a file called `Color.js` in `src/models` with the following contents:

```js
module.exports = {
  // properties: {
  //   parse: function(attributes) {
  //     return attributes;
  //   }
  // }
};
```

While the file is basically empty (excluding some commented out code we'll touch on later), there's actually quite a 
bit of functionality that is now available.  To illustrate that, we'll need to go back to our `Home` component.


## Next Steps

Next we'll modify our `Home` component to [connect it to a data-source](./ConnectComponent.md).
