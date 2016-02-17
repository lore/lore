# lib/hooks/index.js

### Purpose

The Hook class.

### Needed Improvements

Is there any reason the moduleloader hook would ever be disabled?  What purpose/useful advantage would that serve?

### methods

#### constructor

Seups up `hook.config` and `hook.config.envs` (which is an array of the environments the hook should run in)

#### load(cb)

1. Do nothing if the hook shouldn't load
2. loadModules() if the moduleloader hook is 
3. initialze() the hook once modules are loaded

#### initialize(cb)

cb() by default, can be overridden by hooks as needed

#### defaults(config)

{} by default, can be overridden by hooks as needed

#### configure()

does nothing by default, can be overridden by hooks as needed

#### loadModules(cb)

cb() by default, can be overridden by hooks as needed


### Example

Todo: create example showing usage
