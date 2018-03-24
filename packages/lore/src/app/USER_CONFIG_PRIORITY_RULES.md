# User Config Priority Rules

This final user configuration is built from a combination of `/config`, `/config/env` and `/config/local.js`.

The final configuration is built using the following rules:

1. Build a config object from any files in `/config` *except* `/config/local.js` and anything in `/config/env`.
2. Based on the environemtn (development, production, test, etc.) load the corresponding file in `/config/env` and 
override any fields already specified.
3. Load `/config/local.js` (if it exists) and override any fields that already exist.

### Example Usage

Given the following config files:

```js
// file: config/example.js
export default {
  prop: 'bobcat'
}

// file: config/production.js
export default {
  example: {
    prop: 'cheetah'
  }
}

// file: config/local.js
export default {
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

When `LORE_ENV=development`, `config.example.prop` will be `dragon` because `local.js` takes precedence.  

If there was no `local.js` the value would be `bobcat` because the configuration for `config/env/production.js` 
only takes effect when `LORE_ENV=production`

When `LORE_ENV=production`, `config.example.prop` will be `dragon` because `local.js` takes precedence. If there was
no definition for `example.prop` in `local.js` then the value would be `cheetah`.
