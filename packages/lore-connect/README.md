# @lore/connect

### Purpose

Provides a decorator for React components that allows components to specify which data they need
and will automatically fetch that data if it doesn't exist.  The data is either returned from the
store or triggers the action they fetches the data (and notifies the store when it arrives).

### Dependant Hooks

None.

### Example Usage

**Scenario 1**: If the component doesn't need to be subscribed to changes in the store (which
is the typical scenario) just pass in two arguments; the state function and the component:

```js
connect(function(getState, props, context){
  return {
    user: getState('user.current')
  }
}, createReactClass({...}))
```

**Scenario 2**: If the component does need to be subscribed to changs in the store, pass in
three arguments; options, the state function, and the component.

```js
connect({
   subscribe: true
}, function(getState, props, context){
   return {
      user: getState('user.current')
   }
}, createReactClass({...}))
```

