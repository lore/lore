# Loaders

Loaders are responsible for loading files from disk.  They were abstracted out into this interface in order to 
support testing, as Webpack requires the use of require.context in order to dynamically specify groups of files 
to load BEFORE they're required, where as Node doesn't have a require.context method (as all file loading is 
synchronous).

### Illustrative Example

To understand what the loaders do, take a look at this example `/models` directory:

```
src
|-models
  |-list.js
  |-todo.js
```

Here we've created two models that we want pulled into Lore (list and todo) so that we can auto-generate the respective
actions and reducers. Because we never know how many models a project has, we need to iterate through the folder and
pull in everything we fine.  So a typical loader function will look like this: 

```js
loadModels: function() {
  var context = require.context(__LORE_ROOT__ + '/src/models', false, /\.js$/);
  return buildDictionary(context, {
    // options
  });
}
```

The name of the function is what we're trying to load (all of the models for the project).  Because we don't know what
the files are ahead of time, we can't use `require()` directly.  Instead we need to use a feature of Webpack called
[require.context](https://webpack.github.io/docs/context.html). The first argument is the directory we want to iterate
through. We're using `__LORE_ROOT__` so that Webpack can unambiguously complete the string for us and know the proper
directory at build time.  The second arguments is whether the directory should be searched recursively (it should not
as we only care about files in the root of the folder), and the third argument is a regex string to match on (which
is all files ending in `.js`).

If you check out `context.keys()` it will looks like this:

```js
[
  "./list.js", 
  "./todo.js"
]
```

Which is the list of models found in that folder (the path is relative to `__LORE_ROOT__ + '/src/models'`).  The
`buildDictionary` function then iterates through each of the files, loads them, and creates an object that looks like
this:

```js
{
  // contents of models/list.js
  list: {...},
    
  // contents of models/todo.js
  todo: {...},
}
``` 

Then any hooks that need the model config files can just call:

```js
var models = lore.loaders.loadModels();
// iterate through the models
```
