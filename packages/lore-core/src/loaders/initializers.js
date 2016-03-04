var _ = require('lodash');

module.exports = {

  load: function() {
    var req = require.context(__LORE_ROOT__ + '/initializers', true, /\.js$/);
    return req.keys().map(function(key) {
      return req(key);
    });
  }

};
