var _ = require('lodash');

function Hook(definition) {
  this.config = {};
  _.merge(this, definition || {});
  _.bindAll(this);
}

_.extend(Hook.prototype, {

  defaults: function () {
    return {};
  },

  load: function () {}

});

module.exports = Hook;