# Roadmap

### Immediate-term

The features with immediate focus (either currently being worked on or next up in queue).


 Feature                                                  | Owner                                          | Details
 :------------------------------------------------------- | :--------------------------------------------- | :------
 Create "API" concept in /config                          | [@jchansen](https://github.com/jchansen)       | When interacting with multiple APIs, the URL for second server needs to be copied into a lot of models, and there are collections that need to be created that are hard to justify. This could be solved by creating a way to specify an API server, and then grouping models into that API. Sails does this using "connections".

### Backlog

The backlog consists of features which are not currently in the immediate-term roadmap above, but will be prioritized once the items in that list are completed.

_(feel free to suggest things)_

 Feature                                         | Owner                                             | Details
 :---------------------------------------------- | :------------------------------------------------ | :------
 CLI support for listing all actions             | _unassigned_                                      | List full set of actions, both explicit and those created from blueprints
 CLI support for listing all reducers            | _unassigned_                                      | List full set of reducers, both explicit and those created from blueprints
 CLI support for listing all constants           | _unassigned_                                      | List full set of constants, both explicit and those created from blueprints
 Make sure we didn't break the Redux dev-tools   | _unassigned_                                      | Redux dev-tools haven't been tested.  Update the the libraries and make sure they work as intended. Refactor framework as required if they don't.
 Integrate full-featured logging library         | _unassigned_                                      | There is currently a `lore.log` object, just it's just a wrapper over console.  Swap this out for a real logger, to enable `warn()`, `info()`, `error()`, etc. Should also create a log hook, and allow setting the output level in `config.log`.
 Add a metrics hook                              | _unassigned_                                      | Add a `metrics` hook to support sending data to services like Keen.io, MixPanel, etc. Whatever default transports are created should support best practices for the respective service (for example Keen.io supports nested metric objects but MixPanel doesn't).
 Enhance generator for actions                   | _unassigned_                                      | Create a generator for `lore generation action actionName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 Enhance generator for reducers                  | _unassigned_                                      | Create a generator for `lore generation reducer reducerName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 More examples                                   | _unassigned_                                      | There need to be more examples, especially to demonstrate framework overrides for the actions and reducers.
 Dialog Blueprints                               | _unassigned_                                      | Dialogs are pretty boilerplate at an early stage.  We should create a hook that supports dialog blueprints for Create, Update and Delete. Maybe something like `lore.dialog('todo.create', {title: 'string', isCompleted: 'boolean'}, function onSubmitCallback(){})`.  Add options for declaring data types, required fields, field to focus on after launch.  Could also remove some of the boilerplate if `src/models` supports the ability to specify model fields, default values, etc.  Then some of the information could be pulled from the model config, and overwritten when launching the dialog.
 Test! Test! Test!                               | [@jchansen](https://github.com/jchansen)          | Create tests for all the things.  At a minimum, need tests for all the hooks
