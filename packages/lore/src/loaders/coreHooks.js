var _ = require('lodash');
var DEFAULT_HOOKS = require('../defaultHooks');

module.exports = {

  load: function() {
    // This line makes sure webpack loads all the core hooks so that
    // the ones we need are available when we ask for them below
    // TODO: do this in a way that doesn't cause webpack to display a warning
    if (require.context) {
      require.context('../hooks', true, /\.js$/);
    }

    return _.reduce(DEFAULT_HOOKS, function (hooks, hookEnabled, hookIdentity) {
      // If true, load the hook from `src/hooks/:hookIdentity`
      if (hookEnabled) {
        hooks[hookIdentity] = require('../hooks/' + hookIdentity + '/index.js');
      }
      return hooks;
    }, {});
  }

};
