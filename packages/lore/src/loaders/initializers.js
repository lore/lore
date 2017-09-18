/* global __LORE_ROOT__ */

export default {

  load: function() {
    const req = require.context(`${__LORE_ROOT__}/initializers`, true, /\.js$/);
    return req.keys().map(function(key) {
      const initializer = req(key);
      return initializer.__esModule ? initializer.default : initializer;
    });
  }

};
