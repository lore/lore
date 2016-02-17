# lib/app/configuration/default-hooks.js

### Purpose

Specifies the order that hooks are executed in...kind of.  See below for explanation.

### Example

They key order is the order the hooks are executed in, and the value is whether that hook is executed.  In theory,
this is overridable.  However, `lib/app/private/loadHooks.js` has a hard-coded execution order for certain hooks, so
this sequence isn't *truly* overridable.  Currently, `moduleloader` will always go first, followed by `connect` and
`userconfig`.

```js
module.exports = {
  moduleloader: true,
  connect: true,
  userconfig: true,
  models: true,
  collections: true,
  reducerBlueprints: true,
  reducers: true,
  redux: true,
  dialog: true,
  actionBlueprints: true,
  actions: true
};
```
