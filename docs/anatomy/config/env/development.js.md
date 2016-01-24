# app/config/env/development.js

### Purpose

This file is where you define overrides for any of the config settings when operating under the development 
environment. Development environment is defined as `NODE_ENV=development` or the absense of an `NODE_ENV` environment 
variable.


```js
/**
 * Development environment settings
 */
// import createBrowserHistory from 'history/lib/createBrowserHistory'

module.exports = {

  /****************************************************************************
  *                                                                           *
  * This file will override other config settings based on the environment    *
  *                                                                           *
  ****************************************************************************/

  // models: {
  //   apiRoot: 'https://api.example.dev'
  // },

  // router: {
  //   history: createBrowserHistory()
  // }

};
```
