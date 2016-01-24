# app/src/reducers

### Purpose

This folder is where you define any custom reducers or override the ones defined by the blueprints.

### Example

```js
var _ = require('lodash');
var ActionTypes = require('../constants/ActionTypes');
var PayloadStates = require('../constants/PayloadStates');

var initialState = {
  state: PayloadStates.INITIAL_STATE,
  data: []
};

return function customReducer(state, action) {
  state = state || initialState;
  var nextState = _.assign({}, state);

  switch (action.type) {
    case ActionTypes.FOUND_SOMETHING_COOL:
      // push the cool things into the array of other cool things
      return _.assign(nextState, {
         data: nextState.data.concat(action.payload.data)
       });

    default:
      return nextState
  }
};
```
