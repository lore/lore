# Config

This folder contains all of the configuration settings for lore.

* [env](/docs/anatomy/config/env/README.md)
  * [development](/docs/anatomy/config/env/development.js.md)
  * [production](/docs/anatomy/config/env/production.js.md)
* [actionBlueprints.js](/docs/anatomy/config/actionBlueprints.js.md)
* [actions.js](/docs/anatomy/config/actions.js.md)
* [collections.js](/docs/anatomy/config/collections.js.md)
* [connect.js](/docs/anatomy/config/connect.js.md)
* [dialog.js](/docs/anatomy/config/dialog.js.md)
* [local](/docs/anatomy/config/local.js.md)
* [models.js](/docs/anatomy/config/models.js.md)
* [reducerActionMap.js](/docs/anatomy/config/reducerActionMap.js.md)
* [reducerBlueprints.js](/docs/anatomy/config/reducerBlueprints.js.md)
* [reducers.js](/docs/anatomy/config/reducers.js.md)
* [redux.js](/docs/anatomy/config/redux.js.md)
* [router.js](/docs/anatomy/config/router.js.md)

The final configuration for Lore is determined as follows:

1. **Build the config object** - A configuration object is built from everything in /config (excluding /dev an local.js)
2. **Apply environent specific settings** - The appropriate environment config is pulled from /env and overrides any config options previously
specified.
3. **Apply any settings in local.js** - Local.js is examined, and any config options specified there will override anything previously.
