# hooks/actions

### Purpose

Loads all user defined actions, which will override any blueprints previously created. Also binds all the actions
to the Redux store, so they can be accessed like `lore.actions.todo.create(...)` without having to call 
`bindActionCreators` and pass in the store's dispatch method.

Iterates through all models in `lore.models` and creates actions for all of them.

### Dependant Hooks

Depends on the `redux` hook being run first as it needs to bind the actions to `lore.store`.

Needs to be run **after** the `actionBlueprints` hook or else the blueprints will override the user defined actions.


### Needed improvements

Suggestions welcome if you think of something. 


### Example Usage

Given a project where a custom `todo.create` has been declared by creating a `src/actions/todo/create.js` file:

```sh
src
|-actions
  |-todo
    |-create.js
```

This hook will find it and expose it on `lore.actions.todo.create`.  Custom actions can take two forms, a config
object that primarily exists just to expose before and after hooks and modify the ActionTypes that the blueprints
emit, or a function that serves as a full replacement of the default action.

**Example replacement action:**

```js
// file: src/actions/todo/create.js

module.exports = function create(params) {
  return function(dispatch) {
    const model = new lore.models.todo(params);

    model.save().done(function() {
      dispatch({
        type: ActionTypes.UPDATE_TODO,
        payload: payload(model, PayloadStates.RESOLVED)
      });
    }).fail(function(response) {
      const error = response.responseJSON;
      dispatch({
        type: ActionTypes.UPDATE_TODO,
        payload: payload(model, PayloadStates.ERROR_CREATING, error)
      });
    });

    return dispatch({
      type: ActionTypes.ADD_TODO,
      payload: payload(model, PayloadStates.CREATING)
    });
  };
};
```

**Example blueprint modification through config**

In this config object, we're modifying the default "onError" behavior to simply remove any todos that fail creation,
but to log an error to the console.


```js
// file: src/actions/todo/create.js

module.exports = {
  blueprint: 'create',

  model: lore.models.todo,

  optimistic: {
    actionType: ActionTypes.ADD_TODO,
    payloadState: PayloadStates.CREATING
  },

  onSuccess: {
    actionType: ActionTypes.UPDATE_TODO,
    payloadState: PayloadStates.RESOLVED
  },

  onError: {
    actionType: ActionTypes.REMOVE_TODO,
    payloadState: PayloadStates.ERROR_CREATING,
    beforeDispatch: function(response, args){
      lore.log.error('Oh no! The create called failed. Deleting todo.')
    }
  }
};
```
