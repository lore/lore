## Installation

Lore-Actions is available as an [npm package](https://www.npmjs.org/package/lore-actions).
```sh
npm install @lore/actions
```
After npm install, you'll find all the .js files in the /src folder and their compiled versions in the /lib folder.

## Usage

This provides an abstraction tier to reduce the boilerplate associated with making ajax calls in client side applications that use [React](https://github.com/facebook/react) and [Redux](https://github.com/rackt/redux).  It works by defining a set of blueprints for standard REST calls for CRUD operations, and then leveraging those blueprints using a configuration file.  Example configuration file:

```js
module.exports = {
  blueprint: 'create',

  model: Todo,

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
      console.log({
        message: "Todo could not be created",
        response: response
      });
    }
  }
};
```

Configuration options are as follows:

`blueprint` [required]: can be one of `create`, `destroy`, `fetch`, or `update`

`model` [required]: A [Backbone](https://github.com/jashkenas/backbone) Model or Collection, or any function/object that abides by the Backbone interface (has `fetch()` and `save()` methods that return a promise).

`optimistic` [optional]: Action to emit before making an AJAX call to the server.  Must be specified as a pair of strings called `actionType` and `payloadState`.  These values will be picked up by the Redux reducers.  `actionType` should be something like `ADD_TODO` or `REMOVE_TODO` (value is arbitrary but should be unique).  `payloadState` should be something like `FETCHING` or `ERROR_CREATING`.

`onSuccess` [optional]: Action to emit if the AJAX call to the server is successful (returns a 200 level status code).  Arguments are same as `optimistic` option.

`onError` [optional]: Action to emit if the AJAX call to the server fails (returns a non-200 level status code).  Supports an optional `beforeDispatch` callback that allows you to handle the error case by notifying the user (such as through the console or through a toast or snack in the UI).
