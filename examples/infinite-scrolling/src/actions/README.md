# app/src/actions

### Purpose

This folder is where you define any custom actions or override the ones defined by the blueprints.

### Example

If you wanted to wanted override the default behavior for the `todo.fetchAll` action for example, you just need to
define a file called `actions/todo/fetchAll.js` and populate it with the following:

```js
const ActionTypes = require('../constants/ActionTypes');
const PayloadStates = require('../constants/PayloadStates');
const utils = require('lore-actions').utils;

module.exports = function fetchAll(query) {
  query = query || {};

  return function(dispatch) {
    const collection = new lore.collections.todo();

    collection.fetch({
      data: query
    }).done(function() {
      dispatch({
        type: ActionTypes.FETCH_TODOS,
        payload: utils.payloadCollection(collection, query, PayloadStates.RESOLVED),
        query: query
      })
    }).fail(function(response) {
      const error = response.responseJSON;
      dispatch({
        type: ActionTypes.FETCH_TODOS,
        payload: utils.payload(collection, PayloadStates.ERROR_FETCHING, error),
        query: query
      })
    });

    return dispatch({
      type: ActionTypes.FETCH_TODOS,
      payload: utils.payloadCollection(collection, PayloadStates.FETCHING),
      query: query
    })
  }
}
```
