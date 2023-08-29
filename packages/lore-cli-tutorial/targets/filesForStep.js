/**
 * Helper function to generate a file mapping between a given step
 * number and it's folder location in ../templates
 *
 * Example call:
 * filesForStep('step1')([
 *   'src/components/Header.js'
 * ])
 *
 * Returns:
 * {
 *   './src/components/Header.js': 'step1/src/components/Header.js'
 * }
 *
 * @param {String} section - top level folder containing steps for this section, e.g "02.layout"
 * @param {String} step - name of the subfolder for this step, e.g "step1"
 * @returns {Function} Curry function taking an array of file names
 */

var path = require('path');

module.exports = function filesForStep(section, step) {
  return function(files, locatorFunction) {
    var result = {};
    files.forEach(function(file) {
      var output = './' + file;
      // var target = locatorFunction(`${section}/${step}/${file}`);
      var target = path.join(section, step, file);
      result[output] = {
        copy: target
      };
    });
    return result;
  }
};
