# hooks/moduleloader

### Purpose

This loader is responsible for loading any of the project directories that Lore needs to inspect in order to build
the proper configuration for the app.  This hook is used to get the project-defined models, actions, reducers, 
config files any other files that the other hooks need. It's sole responsibility is to require files. 

### Dependant Hooks

None, but needs to be the first hook that gets run in order to make sure whatever modules the other hooks need can
be 

### Needed improvements

1. I think a third of this file can be removed. `appPath` has no purpose as Webpack can't look up files dynamically,
and I don't think `bindToLore` is actually used anywhere.  Need to write tests - delete unused stuff once tests 
exist and pass.


### Example Usage

To understand what this hook does, take a look at this example `/models` directory:

```
src
|-models
  |-list.js
  |-todo.js
```

Here we've created two models that we want pulled into Lore (list and todo) so that we can auto-generate the respective
actions and reducers. Because we never know how many models a project has, we need to iterate through the folder and
pull in everything we fine.  So a typical function in this hook will look like this: 

```js
loadModels: function (cb) {
  var context = require.context(__LORE_ROOT__ + '/src/models', false, /\.js$/);
  buildDictionary(context, {
    // options if needed
  }, cb);
}
```

The name of the function is what we're trying to load (all of the models for the project).  Because we don't know what
the files are, we can't use `require()` directly.  Instead we need to use a feature of Webpack called
[require.context](https://webpack.github.io/docs/context.html). The first argument is the directory we want to iterate
through. We're using `__LORE_ROOT__` so that Webpack can unambiguously complete the string for us and know the proper
directory at build time.  The second arguments is whether the directory should be searched recursively (it should not
as we only care about files in the root of the folder), and the third argument is the a regex string to match on (which
is ending folder ending in `.js`.

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
lore.moduleloader.loadModels(function(modelModules){
  // do stuff with the modules
})
```
