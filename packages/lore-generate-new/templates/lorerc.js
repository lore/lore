/**
 * .lorerc
 *
 * This file provides you with the ability to override lore generators and
 * hooks on a per-project basis. So if you don't like how Lore implements
 * `connect` for example, you can create your own connect hook, upload it to
 * npm, install it, and reference it here to declare that Lore should use your
 * connect hook and not the one it has bundled with it.
 *
 * @param  {[type]} scope [description]
 * @return {[type]}       [description]
 */

module.exports = function(scope) {

  var package = {};
  package.generators = {};
  package.generators.modules = {};
  package.hooks = {};

  return package;

};
