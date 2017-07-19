/* global __LORE_ROOT__ */
/* eslint global-require: "off" */
/* import/no-dynamic-require: "off" */

export default {

  load: function() {
    const routes = require(`${__LORE_ROOT__}/routes.js`);

    // ES6 hack around: return .default if it exists.
    return routes.default ? routes.default : routes;
  }

};
