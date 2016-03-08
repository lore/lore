var _ = require('lodash');
var DEFAULT_HOOKS = require('../defaultHooks');

module.exports = {

  load: function() {
    // In theory, this line is required in order for Webpack to load all the hooks
    // into bundle.js, as the require(...) statement below is a dynamically composed
    // string, which could make it impossible for Webpack to know which files it needs
    // to include at build time. But currently, this line doesn't appear to be required.
    //
    // I *think* it's because DEFAULT_HOOKS below is a static file, and webpack is able
    // to do some static analysis to compose the require(...) statements and know which
    // files it needs to include.
    //
    // I'm commenting this line out, so Webpack stops displaying a warning in the browser,
    // but I'm leaving it in the code because it may only be coincidental that we can remove
    // it right now (i.e. if DEFAULT_HOOKS is removed, we may need it again and I want this
    // comment near that code to help with errors if/when they happen).
    //
    // require.context('../hooks', true, /\.js$/);

    return _.reduce(DEFAULT_HOOKS, function (hooks, hookEnabled, hookIdentity) {
      // If true, load the hook from `src/hooks/:hookIdentity`
      if (hookEnabled) {
        hooks[hookIdentity] = require('../hooks/' + hookIdentity + '/index.js');
      }
      return hooks;
    }, {});
  }

};
