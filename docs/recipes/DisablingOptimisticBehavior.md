# Disabling Optimistic Behavior

TODO: fill this out. Answer is to override the action template or completely replace the action.

```js
// actions/color/create.js

return {
  blueprint: 'create',

  model: lore.models.color,

  // comment out or remove this 'optimistic' section to disable 
  // optimistic behavior 
  optimistic: {
    actionType: ActionTypes.ADD_COLOR,
    payloadState: PayloadStates.CREATING
  },

  onSuccess: {
    actionType: ActionTypes.UPDATE_COLOR,
    payloadState: PayloadStates.RESOLVED
  },

  onError: {
    actionType: ActionTypes.REMOVE_COLOR,
    payloadState: PayloadStates.ERROR_CREATING,
    beforeDispatch: function(response, args){
      // no op
    }
  }
};
```
