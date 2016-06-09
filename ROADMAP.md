# Roadmap

### Immediate-term

The features with immediate focus (either currently being worked on or next up in queue).


 Feature                                                  | Owner                                          | Details
 :------------------------------------------------------- | :--------------------------------------------- | :------
 Support numbers as ids, not just string                  | [@jchansen](https://github.com/jchansen)       | There's a bug where resources that have a number for the id field aren't sorted and grouped correctly by the reducer blueprints.  Fix it. 
 Docs! Docs! Docs!                                        | [@jchansen](https://github.com/jchansen)       | Create docs for all the things. Include motivation, basic usage, advanced usage, and architecture (like what all the hooks are what they do and how the code is organized).
 Test! Test! Test!                                        | [@jchansen](https://github.com/jchansen)       | Create tests for all the things.  At a minimum, need tests for all the hooks
 Break up `lore` into lore (framework) and lore-cli       | [@mikrofusion](https://github.com/mikrofusion) | [https://github.com/storcery/lore/issues/4](https://github.com/storcery/lore/issues/4)

### Backlog

The backlog consists of features which are not currently in the immediate-term roadmap above, but will be prioritized once the items in that list are completed.

_(feel free to suggest things)_

 Feature                                         | Owner                                             | Details
 :---------------------------------------------- | :------------------------------------------------ | :------
 CLI support for listing all actions             | _unassigned_                                      | List full set of actions, both explicit and those created from blueprints
 CLI support for listing all reducers            | _unassigned_                                      | List full set of reducers, both explicit and those created from blueprints
 CLI support for listing all constants           | _unassigned_                                      | List full set of constants, both explicit and those created from blueprints
 Support real-time through a socket hook         | _unassigned_                                      | Add a socket hook that can support real-time communication. Should integrate seamlessly into existing action/reducer interaction (i.e. the hook should publish ActionTypes and Payloads that mirror the existing types sent by the Action blueprints)
 Make sure we didn't break the Redux dev-tools   | _unassigned_                                      | Redux dev-tools haven't been tested.  Update the the libraries and make sure they work as intended. Refactor framework as required if they don't.
 Refactor/Reexamine reducer setup                | _unassigned_                                      | I'm sure there's a way to simplify the reducers and blueprints.  They're also not as extendable as they should be as they need to be overwritten as a group (you can't over-ride just by `byId`, `byCid` or `find` methods. 
 Replace Backbone/jQuery.ajax in `lore-models`   | [@bringking](https://github.com/bringking)        | `lore-models` uses Backbone and jQuery.ajax under the hood as the abstraction tier for AJAX requests.  Replace this with something like [Axios](https://github.com/mzabriskie/axios), but keep the Backbone interface.  This will more naturally support testing, as well as removing thousands of lines of library code that is never used.
 Integrate full-featured logging library         | _unassigned_                                      | There is currently a `lore.log` object, just it's just a wrapper over console.  Swap this out for a real logger, to enable `warn()`, `info()`, `error()`, etc. Should also create a log hook, and allow setting the output level in `config.log`.
 Add a metrics hook                              | _unassigned_                                      | Add a `metrics` hook to support sending data to services like Keen.io, MixPanel, etc. Whatever default transports are created should support best practices for the respective service (for example Keen.io supports nested metric objects but MixPanel doesn't).
 Refactor/cleanup/simplify generators            | _unassigned_                                      | Generators are a little more complex/unclear than they probably need to be. Look into that and clean them up.  Make sure it's easy to create new generators and integrate them into the lore-cli.
 Add generator for actions                       | _unassigned_                                      | Create a generator for `lore generation action actionName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 Add generator for reducers                      | _unassigned_                                      | Create a generator for `lore generation reducer reducerName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 Convert everything to ES6                       | _unassigned_                                      | Everything should be converted to ES6, especially as browsers and Node [become fully compatible](https://kangax.github.io/compat-table/es6/).  Lore was originally developed in ES5 to facilitate browser debugging, and source maps were not an adequate solution. 
 More examples                                   | _unassigned_                                      | There need to be more examples, especially to demonstrate framework overrides for the actions and reducers.
 Authentication                                  | _unassigned_                                      | Create a hook for supporting authentication. Probably need to add a default action and reducer inside the hook to handle the auth flow.
 Authorization/Permissions                       | _unassigned_                                      | Create a hook to support authorization (user permissions). Currently thinking this should be a decorator that specifies a permission and automatically extracts the current user (and permission) from context.  If the permission exists, show the component, if not render nothing. For example, if a user doesn't have view permission, a list might not appear. If the user doesn't have edit permissions, the edit button wouldn't render. Or something like that :)
Dialog Blueprints                                | _unassigned_                                      | Dialogs are pretty boilerplate at an early stage.  We should create a hook that supports dialog blueprints for Create, Update and Delete. Maybe something like `lore.dialog('todo.create', {title: 'string', isCompleted: 'boolean'}, function onSubmitCallback(){})`.  Add options for declaring data types, required fields, field to focus on after launch.  Could also remove some of the boilerplate if `src/models` supports the ability to specify model fields, default values, etc.  Then some of the information could be pulled from the model config, and overwritten when launching the dialog.
