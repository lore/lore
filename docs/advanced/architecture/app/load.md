# lib/app/load.js

### Purpose

1. Loads the config
2. Loads the hooks


### Methods

#### loadHooks()

Don't load hooks if disabled.
Extend `lore.hooks` with any user defined hooks in `lore.config.hooks`.
Initialize all the hooks (calling `./private/loadHooks` with the current `lore.hooks` object)


#### initializeHooks()

### Needed Improvements

Do we need the registry? It's designed to expose the hooks as `lore.middleware['hookName']` but I'm not sure what the
benefit of doing that is.  What meaningful/useful advantage would that provide?
