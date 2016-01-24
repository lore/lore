# lib/app/configuration/load.js

### Purpose

Loads the project configuration.

1. **mapOverrides** - default the config to an empty object or whatever was passed into `lore.summon(config)`
2. **logger** - Creates the setup for logging and assigns it to `lore.log`
3. **mixinDefaults** - creates the final config setup, using the override sequence (in order or priority):
  * implicit defaults
  * environment config
  * project config
  * local.js config
  * anything passed into `lore.summon(config)`
4. **configLoaded** - assigns the result to `lore.config`

### Needed Improvements

1. Would be nice to move the logger into it's own hook and configure it for use before any other hooks...but considering
the framework uses it, might not be practical.

2. Expose version information lore the lore object, i.e. `lore.version`.
