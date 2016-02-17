# lib/app/getRoot.js

### Purpose

Returns the Root component that should be mounted to the DOM, which wraps the **Provider** from Redux (which adds store
to context) and the **Router** from React-Router. It requires access to the lore object in order to obtain the store,
router history, and routes.

### Example

This is a wrapper around this:

```js
<Provider store={lore.store}>
  <Router history={lore.config.router.history}>
    {lore.config.router.routes}
  </Router>
</Provider>
```
