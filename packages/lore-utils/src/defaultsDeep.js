var _ = require('lodash');

/**
 * defaultsDeep
 *
 * Implement a deep version of `_.defaults`.
 *
 * This method is hopefully temporary, until lodash has something
 * similar that can be called in a single method.  For now, it's
 * worth it to use a temporary module for readability.
 * (i.e. I know what `_.defaults` means offhand- not true for `_.partialRight`)
 */

/**
 * NOTE:
 *
 * This code is taken directly from https://github.com/balderdashy/merge-defaults
 * but is located here so we can control the version of lodash it uses to reduce
 * project bloat.
 *
 * A future update should look at removing it completely in favor of:
 *
 * https://lodash.com/docs/4.17.4#defaultsDeep
 */

module.exports = _.partialRight(_.merge, function recursiveDefaults (dest,src) {

  // Ensure dates and arrays are not recursively merged
  if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
    return arguments[0];
  }
  return _.merge(dest, src, recursiveDefaults);
});
