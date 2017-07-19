/* global __LORE_ROOT__ */

export default {

  load: function() {
    const req = require.context(`${__LORE_ROOT__}/initializers`, true, /\.js$/);
    return req.keys().map(function(key) {
      return req(key);
    });
  }

};
