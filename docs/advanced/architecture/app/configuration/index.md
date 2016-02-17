# lib/app/configuration/index.js

Returns the configuration object.

### Needed Improvements

Should `hooks` really be part of config?  This seems to be mixing responsibilities.  Might be better to break that
out and let the config object be just the final config setup, and any code it has during construction is solely related
to combining the default config + user config + env config + local.js.  Just a thought.  Not sure it's correct.

If we do that, then maybe the `hooks` builder should be broken out on it's own.

### Methods

#### defaults

Returns an object containing the current environment and all the hooks. Example:

```js
return {
  environment: 'production',
  hooks: {
    // all the hooks, where the key is the hook name
  }
}
```

#### load

Calls `lib/app/configuration/load`, passing in the lore instance.
