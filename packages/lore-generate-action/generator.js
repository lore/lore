var path = require('path');
var camelCase = require('camel-case');
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname,'./templates'),

  after: function(options, targets) {
    var actionName = options.actionName;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new action `' + actionName + '` at `' + dest + '`');
  },

  targets: function(options) {
    var result = {};
    var filename = './src/actions/' + camelCase(options.actionName) + '.js';

    if (options.es6 || options.esnext || true) {
      result[filename] = { copy: './action.es6.js'};
    }

    return result;
  }

});
