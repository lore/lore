# utils/ActionTypes.js

### Purpose

Methods that generate ActionTypes used by action and reducer blueprints using naming conventions.

### Needed improvements

This is really more of an "action type generator based on conventions"...so maybe rename it to ActionTypeGenerator or
ActionTypeFactory.

```js
var actionType = ActionTypeFactory.add('todo'); // ADD_TODO
```

### Example Usage

```js
ActionType.add('todo'); // ADD_TODO
ActionType.update('todo'); // UPDATE_TODO
ActionType.remove('todo'); // REMOVE_TODO
ActionType.fetch('todo'); // FETCH_TODO
ActionType.fetchPlural('todo'); // FETCH_TODOS
```
