var path = require('path');
var camelCase = require('camel-case');
var Generator = require('lore-generate').Generator;

module.exports = Generator.extend({

  moduleRoot: path.resolve(__dirname),

  templatesDirectory: path.resolve(__dirname,'./templates'),

  after: function(options, targets) {
    var reducerName = options.reducerName;
    var dest = targets[0].destination.relativePath;
    this.logger.info('Created a new reducer `' + reducerName + '` at `' + dest + '`');
  },

  targets: function(options) {
    var result = {};
    var filename = './src/reducers/' + camelCase(options.reducerName) + '.js';

    if (options.es6 || options.esnext || true) {
      result[filename] = { copy: './reducer.es6.js'};
    }

    return result;
  }

});
