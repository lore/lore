# lib/app/private/loadHooks.js

### Purpose

Loads and executes all hooks according to a given sequence (mix of hard-coded order and user configured).

### Needed Improvements

1. Hook order should be fully customizable...or at least fully customizable internally, with limited exposure for projects
to override (or full customization with an "override at your own risk" disclaimer).  Reason being that some custom user
hooks may need to get inserted between the projects default hooks, similar to the way that `connect` was inserted 
between `moduleloader` and `userconfig`.

2. Need a better solution for loading decorators.  Currently they create a situation for where a file may try to use 
a decoratator like `@lore.connect` before the `connect` hook has actually executed, so `lore.connect` won't exist 
yet.  But that's only because some hooks load files, and that causes the file to be examined during load time. So we
need to imagine a scenario where users are defining lots of custom decorator hooks and come up with a solution to
address that.

3. Implement a logging solution so the hook load order isn't printed to the console unless desired (i.e. typically
desired in production)

### Methods

#### initializeHooks(hooks, cb)

This iterates through all the hooks, executing them in the following order:

1. `moduleloader` always goes first.  Since its responsibility to is providing files to other hooks, and we have no 
way of knowing which hooks require files (at least not when the user can override hook behavior) this has to go first. 
2. `connect` executes second, to make sure it's executed before any files are loaded (see decorator comment above in
improvement section)
3. `userconfig` is loaded third.
4. Any `userhooks` defined are loaded fourth.
5. Then the `prepare` method is run all all the remaining hooks.
5. Then the `defaults` method is run all all the remaining hooks.
5. Then the `configure` method is run all all the remaining hooks.
5. Then the `load` method is run all all the remaining hooks.


#### (prepare) prepareHook(id)

1. Block execution if the hook has beendisabled
2. Verify minimal required hook configuration has been met, meaning no required hooks have been disabled and any hooks
that must exist together have not been partially disabled
3. Convert folder defined hooks to a function (if the hook is in a folder with an index.js file)
4. Make sure the hook has the proper function signature
5. Instantiate the hook, setting it's identity and config key (todo: explain purpose of those fields)

#### (defaults) applyDefaults(hook)

1. Get a copy of the hook's default (which can be an object or a function that returns an object)
2. Override the defaults with any explicit config values that were set for the hook (userconfig)

#### (configure)

1. Runs hook.configure() (defaults to nothing or whatever that hook has specified) 

#### loadHook(id, cb)

1. Set a timeout interval for how long a hook can take to load.  Defaults to 20 seconds.
2. Call hook.load(), cancelling the timeout interval once the hook has successfully loaded.
3. Log a message to the console (helpful for debugging
