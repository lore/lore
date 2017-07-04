import _ from 'lodash';

/**
 * Hook class object.  The thing all definitions in /hooks are eventually instantiated as.
 *
 * @param {Object} definition Object describing the hooks methods and behavior
 * @constructor
 */
function Hook(definition) {
  this.config = {};
  _.merge(this, definition || {});
  _.bindAll(this);
}

_.extend(Hook.prototype, {

  /**
   * Any attributes the hook needs added to the default configuration
   * Can be overridden in hook definitions.
   */
  defaults: {},

  /**
   * Function to store the core behavior for a hook.
   * Can be overridden in hook definitions.
   *
   * @returns {*}
   */
  load: function() {}

});

export default Hook;
