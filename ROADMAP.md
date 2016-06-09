# Roadmap

### Immediate-term

The features with immediate focus (either currently being worked on or next up in queue).


 Feature                                                  | Owner                                          | Details
 :------------------------------------------------------- | :--------------------------------------------- | :------
 Support ES6 version of project                           | [@jchansen](https://github.com/jchansen)       | There needs to a FULL ES6 version of the project, especially as browsers and Node [become fully compatible](https://kangax.github.io/compat-table/es6/). Lore was originally developed in ES5 to facilitate browser debugging, and source maps were not an adequate solution.
 Upgrade React-Router to v2                               | [@jchansen](https://github.com/jchansen)       | React-Router has been at v2 for a while, but Lore hasn't integrated yet due to a focus on videos, docs and the website. So catch up!
 Verify @lore.connect decorator works                     | [@jchansen](https://github.com/jchansen)       | It might, but it hasn't been tried. If it does, --esnext generators also need to be created to use it.

### Backlog

The backlog consists of features which are not currently in the immediate-term roadmap above, but will be prioritized once the items in that list are completed.

_(feel free to suggest things)_

 Feature                                         | Owner                                             | Details
 :---------------------------------------------- | :------------------------------------------------ | :------
 Make CLI extendable                             | _unassigned_                                      | The CLI is designed to allow people to extend it, but that ability isn't completed yet. Finish it and create some examples.
 CLI support for listing all actions             | _unassigned_                                      | List full set of actions, both explicit and those created from blueprints
 CLI support for listing all reducers            | _unassigned_                                      | List full set of reducers, both explicit and those created from blueprints
 CLI support for listing all constants           | _unassigned_                                      | List full set of constants, both explicit and those created from blueprints
 Support real-time through a socket hook         | _unassigned_                                      | Add a socket hook that can support real-time communication. Should integrate seamlessly into existing action/reducer interaction (i.e. the hook should publish ActionTypes and Payloads that mirror the existing types sent by the Action blueprints)
 Make sure we didn't break the Redux dev-tools   | _unassigned_                                      | Redux dev-tools haven't been tested.  Update the the libraries and make sure they work as intended. Refactor framework as required if they don't.
 Refactor/Reexamine reducer setup                | _unassigned_                                      | I'm sure there's a way to simplify the reducers and blueprints.  They're also not as extendable as they should be as they need to be overwritten as a group (you can't over-ride just by `byId`, `byCid` or `find` methods. 
 Integrate full-featured logging library         | _unassigned_                                      | There is currently a `lore.log` object, just it's just a wrapper over console.  Swap this out for a real logger, to enable `warn()`, `info()`, `error()`, etc. Should also create a log hook, and allow setting the output level in `config.log`.
 Add a metrics hook                              | _unassigned_                                      | Add a `metrics` hook to support sending data to services like Keen.io, MixPanel, etc. Whatever default transports are created should support best practices for the respective service (for example Keen.io supports nested metric objects but MixPanel doesn't).
 Enhance generator for actions                   | _unassigned_                                      | Create a generator for `lore generation action actionName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 Enhance generator for reducers                  | _unassigned_                                      | Create a generator for `lore generation reducer reducerName --config` so people don't have to dig into the library to see what the blueprint structure looks like
 More examples                                   | _unassigned_                                      | There need to be more examples, especially to demonstrate framework overrides for the actions and reducers.
 Authentication                                  | _unassigned_                                      | Create a hook for supporting authentication. Probably need to add a default action and reducer inside the hook to handle the auth flow.
 Authorization/Permissions                       | _unassigned_                                      | Create a hook to support authorization (user permissions). Currently thinking this should be a decorator that specifies a permission and automatically extracts the current user (and permission) from context.  If the permission exists, show the component, if not render nothing. For example, if a user doesn't have view permission, a list might not appear. If the user doesn't have edit permissions, the edit button wouldn't render. Or something like that :)
 Dialog Blueprints                               | _unassigned_                                      | Dialogs are pretty boilerplate at an early stage.  We should create a hook that supports dialog blueprints for Create, Update and Delete. Maybe something like `lore.dialog('todo.create', {title: 'string', isCompleted: 'boolean'}, function onSubmitCallback(){})`.  Add options for declaring data types, required fields, field to focus on after launch.  Could also remove some of the boilerplate if `src/models` supports the ability to specify model fields, default values, etc.  Then some of the information could be pulled from the model config, and overwritten when launching the dialog.
 Test! Test! Test!                               | [@jchansen](https://github.com/jchansen)          | Create tests for all the things.  At a minimum, need tests for all the hooks
