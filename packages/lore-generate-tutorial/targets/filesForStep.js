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
 * @param {String} step Name of the tutorial step, also name of folder
 * @returns {Function} Curry function taking an array of file names
 */
module.exports = function filesForStep(step) {
  return function(files, locatorFunction) {
    var result = {};
    files.forEach(function(file) {
      var output = './' + file;
      var target = locatorFunction(step + '/' + file);
      result[output] = {
        copy: target
      };
    });
    return result;
  }
};
