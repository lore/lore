# lore-hook-redux

### Purpose

This hooks is responsible for creating the [Redux Store](http://redux.js.org/docs/basics/Store.html) and applying
any desired middleware.

### Dependant Hooks

Needs run after the `reducers` hook, since it needs them to build up the store.

### Needed improvements

1. Should maybe be renamed to `store` since the thing it creates is the Redux store, and the hook exposes it as
`lore.store`.


### Example Usage

Takes whatever middleware is specified in `config/redux.js` and applies it to Redux build steps for the Store. The
default middleware is the `redux-thunk` middleware as it allows for asynchronous actions.  So a `redux.js` config
file that looks like this:

```js
// file: config/redux.js
var thunk = require('redux-thunk');

module.exports = {
  middleware: [
    applyMiddleware(thunk)
  ]
}
```

is equivalent to the standard Redux Store build process that looks like this:

```js
var Redux = require('redux');
var thunk = require('redux-thunk');
var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var compose = Redux.compose;
var applyMiddleware = Redux.applyMiddleware;

var finalCreateStore = compose([
  applyMiddleware(thunk)
])(createStore);

var reducer = combineReducers({
  // your object of reducers
})

var store = finalCreateStore(reducer);

// expose store on Lore instance
lore.store = store;
```


