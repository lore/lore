var path = require('path');
var camelCase = require('camel-case');
var Generator = require('@lore/cli-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname, './templates'),

  after: function(options, targets) {
    var modelName = options.modelName;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new model `' + modelName + '` at `' + dest + '`');
  },

  targets: function(options) {
    var result = {};
    var filename = './src/models/' + camelCase(options.modelName) + '.js';

    if (options.es6 || options.esnext || true) {
      result[filename] = { copy: './model.es6.js'};
    }

    return result;
  }

});
