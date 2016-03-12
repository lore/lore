# Step 5: Adding a Model

In this step we'll be adding a Model to our project, which will allow us to persist and retrieve our color data. 

If you're using the CLI to follow along, you can complete this step by running the following command:

```sh
lore generate:tutorial step5
```

## IMPORTANT! And needs to be communicated before demo is released. Should be in it's own step.

While Lore is developing a local storage abstraction library that will emulate the server experience in the browser (to
remove the need to spin up a server for simple app dev) it's still a work in progress. In the meantime, you still need 
a server. Also, since Lore is focused on promoting architecture and patterns that scale, we're not going to use local
storage for this tutorial as integrating it sometimes glosses over where/how server communication happens in an app.

So for now, you'll need to download the API server for this example using:

```sh
git clone https://github.com/lore/lore-tutorial-server.git
cd lore-tutorial-server
npm install
sails lift
```

Cloning this repo will install a [Sails](https://github.com/balderdashy/sails) server pre-configured to support this 
example app.  By default, the server will start on port `1337`. If you need to change the port, you can do so by
providing a `--port` argument to the `sails lift` command, such as `sails lift --port=3001`.

Finally, you'll need to let Lore know what port your API server is running on. For that, modify `config/models.js` and
change the default `apiRoot` from `https://api.example.com` to `http://localhost:1337`.

```js
// config/models.js

module.exports = {
  ...
  apiRoot: 'http://localhost:1337',
  ...
};
```

### Generate a Color Model

One of Lore's goals is to reduce the boilerplate associated with creating React/Redux applications. Models are how this
is done. Once a model is created, a whole host of actions and reducers are automatically available, based on conventions
that use the model's name.

Let's create a model to illustrate. Since our app is about creating colors for the Guessatron to display, we will
create a `Color` model. From the root of your project, run this command:

```sh
lore generate:model Color
```

You should see output similar to this:

```sh
Generating 'lore-generate-model' at /Users/jchansen/lore-example-app...
Generator finished successfully.
|-> Generated file: ./src/models/color.js
```

This command created a file called `color.js` in `src/models` with the following contents:

```js
module.exports = {

};
```

Yep! It's empty. Since Lore's conventions are driven off the filename, it doesn't need to know anything else until
you need to override those default behaviors. Among other things, you can use the file to change the API server that
specific model uses, or to manipulate data before or after it comes back from the API server. You can learn more about 
all the available overrides [in the Model docs](../misc/Models.md). For this tutorial, we won't need any of them.

### Visual Check-in

If everything went well, your application should now look like this. Exactly the same! But considering we didn't change
any visual elements, I guess that isn't surprising.

![New Lore App](../../images/step5-visual.png)

## Code Changes

Below is a list of files modified during this step, as well as a visual diff to show you what was added or removed 
between this step and the last one.

### src/models/color.js

{% tabs tab1="Diff", tab2="Source" %}
{% tab1 %}
![New Lore App](../../images/step5-diff-model.png)
{% tab2 %}
```js
module.exports = {

};
```
{% endtabs %}

## Next Steps

Next we're going to [connect our ColorCreator component to the data store](./Step6.md), so we can start populating 
it with real data.
