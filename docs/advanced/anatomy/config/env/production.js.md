# app/config/env/production.js

### Purpose

This file is where you define overrides for any of the config settings when operating under the production 
environment. Production environment is defined as `NODE_ENV=production`.


```js
/**
 * Production environment settings
 */
// import createBrowserHistory from 'history/lib/createBrowserHistory'

module.exports = {

  /****************************************************************************
  *                                                                           *
  * This file will override other config settings based on the environment    *
  *                                                                           *
  ****************************************************************************/

  // models: {
  //   apiRoot: 'https://api.example.prod'
  // },

  // router: {
  //   history: createBrowserHistory()
  // }

};
```
