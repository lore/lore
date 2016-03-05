# app

Code to build the Lore core.

Most of these files are functions intended to be used only by the Lore core, found in `./index.js`.  The 
official public interface for lore is this:

```js
var lore = require('lore');

// Builds the lore app, but does not mount it to the DOM. Useful for testing.
lore.build(configOverride)

// Builds the lore app AND mounts it to the DOM.
lore.summon(configOverride)
```

### Needed Improvements

1. The `logger` should be moved into a hook, so users can override it with their own implementation and support
use caes like sending data to a logging service.  Another option might be to expose a logger interface, similar to
what Sails does with `captains-log`, and allow users to modify it's behavior.  One problem with moving the logger
into a hook however is that it makes it challenging to log anything before the hook is loaded...Sails solved this by
using a console logger early on, and then overriding it with a different implementation later.
