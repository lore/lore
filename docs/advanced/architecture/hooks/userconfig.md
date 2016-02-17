# hooks/userconfig

### Purpose

This hooks is responsible for building the config object (from the combination of `/config`, `/config/env` and 
`/config/local.js`).  If you pass in a config object when calling `lore.summon()` it will also be included in the
config chain and will take precedence over anything else.

### Dependant Hooks

Should be run before any hook that requires access to the `lore.config` object as the config object isn't done being
built until this hook runs.

### Needed improvements

1. Has references to `appPath` which should be removed as it isn't used anywhere.


### Example Usage

Given the following config files:

```js
// file: config/example.js
module.exports = {
  prop: 'bobcat'
}

// file: config/production.js
module.exports = {
  example: {
    prop: 'cheetah'
  }
}

// file: config/local.js
module.exports = {
  example: {
    prop: 'dragon'
  }
}

```

If the app is called like this:

```js
lore.summon({
  example: {
    prop: 'ape'
  }
});
```

The value for `config.example.prop` will be `ape`, because the config passed into `lore.summon()` takes priority. It's
equivalent to hard-coding the value. 

If the app is called without a config, like this:

```js
lore.summon();
```

The value will be as follows:

When `NODE_ENV=development`, `config.example.prop` will be `dragon` because `local.js` takes precedence.  

If there was no `local.js` the value would be `bobcat` because the configuration for `config/env/production.js` 
only takes effect when `NODE_ENV=production`

When `NODE_ENV=production`, `config.example.prop` will be `dragon` because `local.js` takes precedence. If there was
no definition for `example.prop` in `local.js` then the value would be `cheetah`.
