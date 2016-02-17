# Creating A Project

**Create a new app:**

```sh
# Create a new lore app
$ lore new [path-to-your-project-name]
```
This will create a new lore app at the path you specified, with the same name.

**Run app:**

```sh
$ cd [path-to-your-project-name]
$ npm install
$ npm start
```

At this point webpack should have done its thing and should give you some output that ends with:

```sh
  webpack: bundle is now VALID.
```

**View app:**

Go to ```localhost:3000``` in your browser and verify that your app is running.

Now lets add some data to our project: [Creating Models](/docs/basics/creatingModels.md)

