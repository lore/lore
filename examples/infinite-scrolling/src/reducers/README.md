# app/src/reducers

### Purpose

This folder is where you define any custom reducers or override the ones defined by the blueprints.

### Example

```js
const _ = require('lodash');
const ActionTypes = require('../constants/ActionTypes');
const PayloadStates = require('../constants/PayloadStates');

const initialState = {
  state: PayloadStates.INITIAL_STATE,
  data: []
};

return function customReducer(state, action) {
  state = state || initialState;
  const nextState = _.assign({}, state);

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
