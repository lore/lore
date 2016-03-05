# utils/PayloadStates.js

### Purpose

Stores the PayloadStates used by action and reducer blueprints.

### Needed improvements

Something's weird about this.  The true set of PayloadStates (from Lore's perspective) is this file plus whatever
custom Payload States the user specifies in `src/constants/PayloadStates.js`, a file which starts off empty.

This file was created because Lore needs to emit PayloadStates in the action blueprints.  But it's obnoxious and opaque
that there's no easy way for a user to learn what they are.  One idea is created a CLI command like `lore payloadStates`
that lists the full set of payload states for the application.  That would at least give the user something to 
copy/paste when they need to check them.  Another option is to copy them into `src/constants/PayloadStates` as part of
the 'lore-generate-new' project generator (the thing responsible for generating the new project structure).

Additionally, PayloadStates are usable in any component, and trying to keep track of the relative path is obnoxious. It
doesn't take a very large app before you have require statements in components like:

```js
var PayloadStates = require('../../../../constants/PayloadStates');
```

We should solve this by either:

1. Aliasing `src/constants` in `webpack.config.js` as `constants`, so you can require PayloadStates as 
`require('constants/PayloadStates')`

2. Attaching PayloadStates to lore as lore.PayloadStates.XYZ.  The downside with that is auto-complete will break, as
PayloadStates becomes a dynamic object, but I believe aliasing will also cause that issue.

### Default Payload States

```js
module.exports = {
  INITIAL_STATE: 'INITIAL_STATE',

  RESOLVED     : 'RESOLVED',
  NONEXISTENT: 'NONEXISTENT',

  CREATING: 'CREATING',
  UPDATING: 'UPDATING',
  DELETING: 'DELETING',
  FETCHING: 'FETCHING',

  ERROR_CREATING: 'ERROR_CREATING',
  ERROR_UPDATING: 'ERROR_UPDATING',
  ERROR_DELETING: 'ERROR_DELETING',
  ERROR_FETCHING: 'ERROR_FETCHING'
};
```
