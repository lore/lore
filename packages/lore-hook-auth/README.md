# lore-hook-auth

### Purpose

Generates an action and reducer for handling retrieval and storage of 
the current user. 

### Config

```js
module.exports = {

  /**
   * The name of the model with a URL property set to the endpoint
   * that can return the current user.
   */
  modelName: 'currentUser'

  /**
   * The name of the reducer that should be created that is responsible
   * for storing the current user. This defaults to the name of the
   * model.
   */
  // reducerName: 'currentUser'

  /**
   * The name of the action that should be created at this responsible
   * for fetching the current user. This defaults to the name of the
   * model.
   */
  // actionName: 'currentUser'

};
```

When using this hook you should also modify the dependencies array of the 
`redux` hook in `index.js`to make sure it runs _after_ this hook:

```js
// index.js
lore.summon({
  hooks: {
    auth: require('lore-hook-auth'),
    actions: require('lore-hook-actions'),
    bindActions: require('lore-hook-bind-actions'),
    connect: require('lore-hook-connect'),
    models: require('lore-hook-models'),
    reducers: require('lore-hook-reducers'),
    redux: _.extend(require('lore-hook-redux'), {
      dependencies: ['reducers', 'auth']
    })
  }
});
```
