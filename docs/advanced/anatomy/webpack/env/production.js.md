# app/config/env/production.js

### Purpose

This file is where you define webpack config overrides that should take place when operating under the production 
environment. The production environment is defined as `NODE_ENV=production`.


```js
/**
 * Production specific settings for webpack
 */

module.exports = function(settings) {
  return {
    // add production specific webpack settings
  }
};
```
