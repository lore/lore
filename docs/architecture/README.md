# Architecture

Explanation of the underlying architecture of Lore. Intended to accelerate the learning curve for anyone who wants 
to help improve it.

* [app](/docs/architecture/app/README.md) - core code to build the Lore app and config objects
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
* [hooks](/docs/architecture/hooks/README.md)
  * [actionBlueprints](/docs/architecture/hooks/actionBlueprints.md) - creates default CRUD hooks for all models
  * [actions](/docs/architecture/hooks/actions.md) - appends or overrides previously defined actions with project defined ones
  * [collections](/docs/architecture/hooks/collections.md) - creates a collection for every model
  * [connect](/docs/architecture/hooks/connect.md) - configures the `lore.connect` decorator
  * [dialog](/docs/architecture/hooks/dialog.md) - helper for launching dialogs
  * [models](/docs/architecture/hooks/models.md) - creates models from configs in `src/models`
  * [moduleloader](/docs/architecture/hooks/moduleloader.md) - loads any project fiels other hooks need
  * [reducerBlueprints](/docs/architecture/hooks/reducerBlueprints.md) - creates default CRUD reducers for all models
  * [reducers](/docs/architecture/hooks/reducers.md) - appends or overrides previously defined reducers with project defined ones
  * [redux](/docs/architecture/hooks/redux.md) - creates the store that Redux will use
  * [userconfig](/docs/architecture/hooks/userconfig.md) - builds the project config from files in `/config`
* [utils](/docs/architecture/urils/README.md) - generic utility functions used in multiple places
  * [ActionTypes](/docs/architecture/urils/ActionTypes.md) - factory that generates ActionTypes based on naming conventions
  * [PayloadStates](/docs/architecture/urils/PayloadStates.md) - default PayloadStates used by the action blueprints
  * [requireDir](/docs/architecture/urils/requireDir.md) - helper that converts a `require.context` instance into a nested object tree
  * [requireDirCb](/docs/architecture/urils/requireDirCb.md) - callback veresion of requireDir that needs to be merged and deleted
