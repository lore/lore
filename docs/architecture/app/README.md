# lib/app

Everything required to build the core Lore instance and run all the hooks.

* [configuration](/docs/architecture/app/configuration.md) - folder containing code to build the Configuration object
  * [default-hooks](/docs/architecture/app/configuration/default-hooks.md) - hook execution order
  * [index](/docs/architecture/app/configuration/index.md) - the Configuration class that knows how to build a config
  * [load](/docs/architecture/app/configuration/load.md) - the load method for the Configuration class
  * [rc](/docs/architecture/app/configuration/rc.md) - loads the `.lorerc` file
* [private](/docs/architecture/app/private.md) - folder containing private methods for Lore instance
  * [initialize](/docs/architecture/app/private/initialize.md) - holds code that needs to run before hooks load (currently nothing)
  * [loadHooks](/docs/architecture/app/private/loadHooks.md) - load and run all hooks
* [Lore](/docs/architecture/app/Lore.md) - the Lore class object
* [getRoot](/docs/architecture/app/getRoot.md) - returns root React component that should be mounted to the DOM  
* [index](/docs/architecture/app/index.md) - Factory wrapper for Lore that will be deleted
* [load](/docs/architecture/app/load.md) - controller that loads the config and hooks for the app
* [summon](/docs/architecture/app/summon.md) - starts the Lore app and mounts it to the DOM
