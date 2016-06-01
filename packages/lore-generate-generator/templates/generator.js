var path = require('path');

module.exports = {

  /**
   * The absolute path to the root of this generator
   */
  moduleRoot: path.resolve(__dirname),

  /**
   * OPTIONAL: Path to the 'templates' directory, assumed to be './templates',
   * relative to moduleRoot if not specified explicitly.
   */
  templatesDirectory: path.resolve(__dirname, './templates'),

  /**
   * OPTIONAL: Logic that should run before files are placed in the project.
   *
   * @param options {Object} arguments passed through command line
   */
  before: function(options) {
    this.logger.info('About to create a new file!');
  },

  /**
   * OPTIONAL: Logic that should run after files are placed in the project.
   *
   * @param options {Object} arguments passed through command line
   */
  after: function(options, targets) {
    var filename = options.filename;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new file `' + filename + '` at `' + dest + '`');
  },

  /**
   * List of files that should be placed into the project. Can also be a simple
   * object if files are not dynamically named, like:
   *
   * targets: {
   *  './src/examples/example.js': { copy: 'example.js'}
   * }
   *
   * @param options {Object} arguments passed through command line
   * @returns {Object} list of files to be generated
   */
  targets: function(options) {
    var filename = options.filename;
    var files = {};
    files['./src/examples/' + filename + '.js'] = { copy: 'example.js'};
    return files;
  }

};
