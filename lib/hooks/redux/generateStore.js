var Redux = require('redux');
var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var compose = Redux.compose;

module.exports = function generateStore(middleware, reducers) {
  var reducer = function () {};
  var finalCreateStore = compose.apply(null, middleware)(createStore);

  // If we have reducers, combine them
  if (Object.keys(reducers).length > 0) {
    reducer = combineReducers(reducers);
  }

  return finalCreateStore(reducer);
};