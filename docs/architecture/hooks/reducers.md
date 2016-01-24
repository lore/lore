# hooks/reducers

### Purpose

Loads all user defined reducers, which will override any blueprints previously created. 

The result is exposed on `lore.reducers`.

### Dependant Hooks

None, but needs to be run **after** the `reducerBlueprints` hook or else the blueprints will override the user 
defined reducers.


### Needed improvements

Suggestions are welcome. 


### Example Usage

Given a project where a custom `todo.count` reducer has been declared like so:

```sh
src
|-reducers
  |-todo
    |-count.js
```

This hook will find it and expose it on `lore.reducers.todo.count` and make sure it's combined into the Redux store.

Reducers should follow this format:

```js
// file: src/reducers/todo/count.js

module.exports = function count(state, action) {
   state = state || 0;

   switch (action.type) {
     case ActionTypes.ADD_TODO:
       return state + 1;

     default:
       return nextState
   }
 };;
```
