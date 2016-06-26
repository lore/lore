module.exports = {

  load: function() {
    var routes = require(__LORE_ROOT__ + '/routes.js');

    // ES6 hack around: return .default if it exists.
    return routes.default ? routes.default : routes;
  }

};
